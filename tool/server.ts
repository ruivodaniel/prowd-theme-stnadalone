// The theme standalone's server: the theme routes only. The library's themes, their generated CSS (built when missing or stale),
// the project's active pointer, and a regenerate. No database: node + this file.
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const LIB = join(ROOT, "shared/libs/ui/themes");
const ENGINE = join(ROOT, "shared/libs/ui/web/theme-engine/build.ts");
const ACTIVE = join(ROOT, "project/shared/themes/active.json");
const PORT = Number(process.env.PORT ?? 4500);

type Pointer = { theme: string; version: number | string };
const sendJSON = (res: ServerResponse, body: unknown, status = 200) => { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); };
const readBody = (req: IncomingMessage) => new Promise<string>((ok) => { let s = ""; req.on("data", (c) => { s += c; }); req.on("end", () => ok(s)); });
const dirs = (p: string) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".") && !d.name.startsWith("_")).map((d) => d.name) : []);
const field = (src: string, key: string) => new RegExp(`^\\s*${key}:\\s*["']([^"']+)["']`, "m").exec(src)?.[1];
const build = (theme: string) => execFileSync("npx", ["tsx", ENGINE, "--only", theme], { cwd: ROOT, timeout: 120000, encoding: "utf-8" });

const routes: Record<string, (req: IncomingMessage, res: ServerResponse, url: URL) => void | Promise<void>> = {
  "GET /api/slice-design/themes": (_req, res) => {
    const library = dirs(LIB).map((id) => {
      const versions = dirs(join(LIB, id)).filter((v) => /^v\d+$/.test(v)).map((v) => Number(v.slice(1))).sort((a, b) => a - b).map((v) => {
        const src = existsSync(join(LIB, id, `v${v}`, "theme.ts")) ? readFileSync(join(LIB, id, `v${v}`, "theme.ts"), "utf-8") : "";
        return { version: v, hasCss: existsSync(join(LIB, id, `v${v}`, "generated", `${id}.css`)), name: field(src, "name"), type: field(src, "type"), kind: field(src, "kind"), platform: "web" as const };
      });
      const last = versions[versions.length - 1];
      return { id, name: last?.name ?? id, type: last?.type, kind: last?.kind, platform: "web" as const, versions };
    });
    const pointer = existsSync(ACTIVE) ? (JSON.parse(readFileSync(ACTIVE, "utf-8")) as Pointer) : null;
    sendJSON(res, { library, active: pointer?.theme ? { theme: pointer.theme, version: Number(String(pointer.version).replace(/^v/, "")) } : null, activeMobile: null });
  },
  "GET /api/slice-design/themes/css": (req, res, url) => {
    const theme = url.searchParams.get("theme") ?? "", version = String(url.searchParams.get("version") ?? "").replace(/^v/, ""), kind = url.searchParams.get("kind") ?? "css";
    if (!/^[a-z0-9-]+$/.test(theme) || !/^\d+$/.test(version) || !["css", "fonts"].includes(kind)) return sendJSON(res, { error: "theme, version and kind css|fonts" }, 400);
    const dir = join(LIB, theme, `v${version}`), src = join(dir, "theme.ts");
    const out = join(dir, "generated", kind === "fonts" ? `${theme}-fonts.css` : `${theme}.css`);
    if (!existsSync(src)) return sendJSON(res, { error: `no theme ${theme} v${version}` }, 404);
    if (!existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs) { try { build(theme); } catch (e) { return sendJSON(res, { error: String((e as Error).message ?? e).slice(0, 400) }, 500); } }
    if (!existsSync(out)) return sendJSON(res, { error: `${theme} v${version} has no ${kind} output` }, 404);
    const st = statSync(out), etag = `"${theme}-${version}-${kind}-${Math.round(st.mtimeMs)}-${st.size}"`;
    if (req.headers["if-none-match"] === etag) { res.writeHead(304); res.end(); return; }
    res.writeHead(200, { "Content-Type": "text/css; charset=utf-8", ETag: etag, "Cache-Control": "no-cache" });
    res.end(readFileSync(out));
  },
  "POST /api/slice-design/themes/active": async (req, res) => {
    const { theme, version } = JSON.parse((await readBody(req)) || "{}");
    if (!theme || !Number.isInteger(version)) return sendJSON(res, { error: "theme and an integer version required" }, 400);
    if (!existsSync(join(LIB, theme, `v${version}`, "generated", `${theme}.css`))) return sendJSON(res, { error: `${theme} v${version} has no generated output; run pnpm theme:build` }, 404);
    mkdirSync(dirname(ACTIVE), { recursive: true });
    writeFileSync(ACTIVE, JSON.stringify({ theme, version }, null, 2) + "\n");
    sendJSON(res, { ok: true, platform: "web", active: { theme, version } });
  },
  "POST /api/slice-design/themes/regenerate": async (req, res) => {
    const { theme } = JSON.parse((await readBody(req)) || "{}") as { theme?: string };
    if (!theme || !/^[a-z0-9-]+$/.test(theme)) return sendJSON(res, { error: "a theme id is required" }, 400);
    try { const out = build(theme); sendJSON(res, { ok: true, out: out.trim().split("\n").filter((l) => l.includes("generated/")).slice(-2).join(" · ") }); }
    catch (e) { sendJSON(res, { error: String((e as Error).message ?? e).slice(0, 400) }, 500); }
  },
};

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const route = routes[`${req.method} ${url.pathname}`];
  if (!route) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("not found: the API is /api/slice-design/themes…"); return; }
  try { await route(req, res, url); } catch (e) { sendJSON(res, { error: String((e as Error).message ?? e) }, 500); }
}).listen(PORT, () => console.log("theme standalone server · http://localhost:" + PORT));
