// Serves the repo root over HTTP and opens the docs viewer: the docs live in many folders, so the root of the repo must be the root of the server.
// Run from anywhere:  node docs/engine/serve.mjs   (PORT=8901 by default)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ENGINE = dirname(fileURLToPath(import.meta.url)), ROOT = dirname(dirname(ENGINE)), PORT = Number(process.env.PORT) || 8901;
execFileSync("node", [join(ENGINE, "build.ts")], { stdio: "inherit" });
const TYPES = { ".html": "text/html", ".json": "application/json", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".webp": "image/webp" };
const server = createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(ROOT, p);
  if (p === "/" || p === "\\") { res.writeHead(302, { Location: "/docs/" }); res.end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file); // read first: headers go out only when the file is in hand
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }); res.end(body);
  } catch { if (!res.headersSent) res.writeHead(404); res.end("not found: " + p); }
});
server.on("error", (e) => { console.error(e.code === "EADDRINUSE" ? `Port ${PORT} is taken (an older docs server?). Stop it, or run: PORT=${PORT + 1} node docs/engine/serve.mjs` : e); process.exit(1); });
server.listen(PORT, () => console.log(`docs: http://localhost:${PORT}/docs/`));
