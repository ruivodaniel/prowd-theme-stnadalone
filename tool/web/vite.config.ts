import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, join } from "node:path";
import { existsSync, readdirSync, readFileSync } from "node:fs";

// The theme standalone's web: one vite app. THE MAP of the libraries is here, by name.
export const WEB_PORT = 4510;
export const API_PORT = 4500;
const WEB = __dirname;                       // tool/web
const ROOT = resolve(WEB, "../..");          // the standalone
const LIB_THEMES = resolve(ROOT, "shared/libs/ui/themes");

const themeCss = (theme: string, v: string, fonts = false) => join(LIB_THEMES, theme, `v${v}`, "generated", `${theme}${fonts ? "-fonts" : ""}.css`);
function readThemeUrls(): Record<string, string> {
  const urls: Record<string, string> = {};
  for (const theme of readdirSync(LIB_THEMES, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name))
    for (const v of readdirSync(join(LIB_THEMES, theme)).filter((x) => /^v\d+$/.test(x)).map((x) => x.slice(1))) {
      const css = (kind: string) => `/api/slice-design/themes/css?theme=${theme}&version=${v}&kind=${kind}`;
      if (existsSync(themeCss(theme, v))) { urls[`${theme}:${v}`] = css("css"); urls[`${theme}:${v}:fonts`] = css("fonts"); }
    }
  return urls;
}
const BUNDLED: [string, string] = ["wireframe-stroke", "1"];

const virtualThemeUrls = (): Plugin => ({
  name: "theme-urls",
  resolveId: (id) => (id === "virtual:theme-urls" ? "\0virtual:theme-urls" : null),
  load: (id) => (id === "\0virtual:theme-urls" ? `export default ${JSON.stringify(readThemeUrls())}` : null),
});
const json = (res: import("node:http").ServerResponse, body: string) => { res.setHeader("Content-Type", "application/json"); res.setHeader("Cache-Control", "no-store"); res.end(body); };
const libraryThemes = (): Plugin => ({ name: "library-themes", configureServer(s) { s.middlewares.use("/live/__themes", (_req, res) => { let b = "{}"; try { b = JSON.stringify(readThemeUrls()); } catch { /* {} */ } json(res, b); }); } });
const activeTheme = (): Plugin => ({
  name: "active-theme",
  configureServer(s) {
    s.middlewares.use("/live/__active", (_req, res) => {
      const p = resolve(ROOT, "project/shared/themes/active.json");
      let b = "null";
      try { if (existsSync(p)) b = readFileSync(p, "utf-8"); } catch { /* null */ }
      json(res, b);
    });
  },
});
const watchLibrary = (): Plugin => ({ name: "watch-library", configureServer(s) { s.watcher.add(resolve(ROOT, "shared/libs/ui")); } });

export default defineConfig({
  root: WEB,
  plugins: [react(), tailwindcss(), virtualThemeUrls(), libraryThemes(), activeTheme(), watchLibrary()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      { find: "@libs/web-components-src", replacement: resolve(ROOT, "shared/libs/ui/web/components/src/components") },
      { find: "@libs/web-components", replacement: resolve(ROOT, "shared/libs/ui/web/components/src/index.ts") },
      { find: "@libs/web-layouts", replacement: resolve(ROOT, "shared/libs/ui/web/layouts/src/index.ts") },
      { find: "@libs/value-types/country", replacement: resolve(ROOT, "shared/libs/value-types/src/country/index.ts") },
      { find: "@libs/value-types", replacement: resolve(ROOT, "shared/libs/value-types/src/index.ts") },
      { find: "@libs/list-query/client", replacement: resolve(ROOT, "shared/libs/list-query/src/client/index.ts") },
      { find: "@libs/list-query", replacement: resolve(ROOT, "shared/libs/list-query/src/index.ts") },
      { find: "@libs/rich-text-editor", replacement: resolve(ROOT, "shared/libs/rich-text-editor/src/index.ts") },
      { find: "@libs/ui-data", replacement: resolve(ROOT, "shared/libs/ui/ui-data/src") },
      { find: "@libs/ui-types", replacement: resolve(ROOT, "shared/libs/ui/types/index.ts") },
      { find: "@libs/ui-fixtures", replacement: resolve(ROOT, "shared/libs/ui/web/fixtures") },
      { find: "@libs/theme-engine", replacement: resolve(ROOT, "shared/libs/ui/web/theme-engine") },
      // mobile is not here: the engine's mobile tables read an empty module
      { find: /^@libs\/mobile-(components|layouts)(\/schemas)?$/, replacement: resolve(WEB, "stubs/mobile.ts") },
      { find: "@theme-fonts", replacement: themeCss(BUNDLED[0], BUNDLED[1], true) },
      { find: "@theme", replacement: themeCss(BUNDLED[0], BUNDLED[1]) },
    ],
  },
  server: {
    port: WEB_PORT, strictPort: true, fs: { allow: [ROOT] },
    proxy: { "/api": { target: `http://localhost:${API_PORT}`, changeOrigin: true } },
  },
});
