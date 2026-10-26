// The theme standalone's one page: the design system and the themes. Every surface sits under ThemeRoot, which links the active
// theme's CSS and re-reads it when the themes tab activates another (a BroadcastChannel; no reload).
import "./index.css";
import { Component, createContext, useContext, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import bundledThemeUrls from "virtual:theme-urls";   // { "theme:version": url, "theme:version:fonts": url }: the bundled read, until the live one lands
import { CatalogView } from "./catalog/CatalogView";
import { LAYERS, byLayer, find, type Layer } from "./catalog/registry";
import { ThemesTab } from "./themes-tab";

const PROJECT = "project";
let themeUrls: Record<string, string> = bundledThemeUrls;
const keyOf = (a: { theme: string; version: number | string } | null | undefined) => (a ? `${a.theme}:${String(a.version).replace(/^v/, "")}` : null);
const ThemePin = createContext<(key: string | null) => void>(() => {});
void ThemePin;

function applyTheme(key: string | null) {
  for (const kind of ["css", "fonts"] as const) {
    const linkId = `frame-theme-${kind}`;
    let el = document.getElementById(linkId) as HTMLLinkElement | null;
    const url = key ? themeUrls[kind === "fonts" ? `${key}:fonts` : key] ?? null : null;
    if (!url) { el?.remove(); continue; }
    if (!el) { el = document.createElement("link"); el.id = linkId; el.rel = "stylesheet"; document.head.appendChild(el); }
    if (el.getAttribute("href") !== url) el.setAttribute("href", url);
  }
}
function ThemeRoot({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<{ theme: string; version: number | string } | null>(null);
  const [, bump] = useState(0);
  useEffect(() => {
    let dead = false;
    const read = () => {
      fetch("/live/__themes", { cache: "no-store" }).then((r) => r.json()).then((urls: Record<string, string>) => { if (!dead && urls && Object.keys(urls).length) { themeUrls = urls; bump((n) => n + 1); } }).catch(() => {});
      fetch(`/live/__active?project=${PROJECT}`, { cache: "no-store" }).then((r) => r.json()).then((a) => { if (!dead) setActive(a); }).catch(() => {});
    };
    read();
    const bc = new BroadcastChannel("slice-design:theme");
    bc.onmessage = () => read();
    addEventListener("focus", read);
    return () => { dead = true; bc.close(); removeEventListener("focus", read); };
  }, []);
  const activeKey = keyOf(active);
  const key = activeKey && themeUrls[activeKey] ? activeKey : null;
  useEffect(() => { applyTheme(key); }, [key]);
  const problem = key ? null : activeKey ? `active theme ${activeKey} is not in the library` : "no project/shared/themes/active.json";
  return (
    <>
      {problem && <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "#b42318", color: "#fff", font: "12px 'SF Mono', Menlo, monospace", padding: "6px 14px" }}>theme: {problem} — set one in the themes tab</div>}
      {children}
    </>
  );
}

class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("theme standalone · ", error, info.componentStack); }
  render() { return this.state.error ? <div style={{ padding: 24, font: "12px Menlo, monospace", color: "#b42318" }}>the page failed to render: {this.state.error.message}</div> : this.props.children; }
}

// ── the tool's own look: inline, so the theme under test cannot touch it ─────────────────────────────────────────
const MONO = "'SF Mono', Menlo, monospace";
const T = { ink: "#1a1a1a", soft: "#6b675f", faint: "#9a968d", rule: "#dedbd3", bg: "#faf9f6", bg3: "#f3f1ec" };
const TOOL_VARS: React.CSSProperties = { ["--ink" as string]: T.ink, ["--ink-soft" as string]: T.soft, ["--ink-faint" as string]: T.faint, ["--rule" as string]: T.rule, ["--bg" as string]: T.bg, ["--bg-2" as string]: T.bg, ["--bg-3" as string]: T.bg3, ["--accent" as string]: "#b8651b", ["--red" as string]: "#b42318" };

type Tab = "design-system" | "themes";
const readHash = (): { tab: Tab; id: string } => { const h = location.hash.replace(/^#\/?/, ""); const [tab, ...rest] = h.split("/"); return { tab: tab === "themes" ? "themes" : "design-system", id: rest.join("/") }; };

function DesignSystem({ id, pick }: { id: string; pick: (id: string) => void }) {
  const current = find(id) ?? byLayer("components")[0];
  const layer: Layer = current?.layer ?? "components";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div data-catalog-chrome style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid " + T.rule, background: T.bg, flexShrink: 0 }}>
        <select value={layer} onChange={(e) => { const first = byLayer(e.target.value as Layer)[0]; if (first) pick(first.id); }}
          style={{ font: "11.5px " + MONO, color: T.ink, background: T.bg3, border: "1px solid " + T.rule, borderRadius: 7, padding: "5px 8px", outline: "none", cursor: "pointer" }}>
          {LAYERS.map((l) => <option key={l} value={l} disabled={!byLayer(l).length}>{l === "pages" ? "check mode" : l}{byLayer(l).length ? "" : " (none yet)"}</option>)}
        </select>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {current && <CatalogView id={current.id} bare onPick={pick} onBack={() => {}} />}
      </div>
    </div>
  );
}

function App() {
  const [at, setAt] = useState(readHash);
  useEffect(() => { const on = () => setAt(readHash()); addEventListener("hashchange", on); return () => removeEventListener("hashchange", on); }, []);
  const go = (tab: Tab, id = "") => { location.hash = "/" + tab + (id ? "/" + id : ""); };
  const tabs: Tab[] = ["design-system", "themes"];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", ...TOOL_VARS }}>
      <div data-catalog-chrome style={{ display: "flex", gap: 18, padding: "10px 16px", borderBottom: "1px solid " + T.rule, background: T.bg, font: "12.5px " + MONO, flexShrink: 0 }}>
        {tabs.map((t) => <span key={t} onClick={() => go(t)} style={{ cursor: "pointer", color: at.tab === t ? T.ink : T.faint, borderBottom: at.tab === t ? "2px solid #b8651b" : "2px solid transparent", paddingBottom: 4 }}>{t === "design-system" ? "design system" : "themes"}</span>)}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        {at.tab === "themes"
          ? <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.bg }}><ThemesTab project={PROJECT} /></div>
          : <DesignSystem id={at.id} pick={(id) => go("design-system", id)} />}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<ThemeRoot><Boundary><App /></Boundary></ThemeRoot>);
