import { useEffect, useMemo, useState } from "react";

// The theme tab — the library's themes (shared/libs/ui/themes/<theme>/v<n>/),
// searchable, and the pointers this product states in shared/themes/active.json:
// one per platform. The web theme is what every web frame wears unless a design
// pins its own; the mobile theme is what the mobile components read. A theme is
// for one platform, so activating it sets that platform's pointer and no other.

type Platform = "web" | "mobile";
/** hasCss = the version has its generated output: CSS for a web theme, the native theme for a mobile one */
type Version = { version: number; hasCss: boolean; name?: string; type?: string; kind?: string; platform?: Platform };
type LibTheme = { id: string; name: string; type?: string; kind?: string; platform?: Platform; versions: Version[] };
type Active = { theme: string; version: number } | null;

const MONO = "'SF Mono', Menlo, monospace";
const ink = "var(--ink, #e8e6e1)";
const soft = "var(--ink-soft, #b0aca3)";
const faint = "var(--ink-faint, #6f6c66)";
const rule = "var(--rule, #33363f)";
const bg2 = "var(--bg-2, #1c1e26)";
const bg3 = "var(--bg-3, #242732)";
const accent = "var(--accent, #e8a33d)";
const chip: React.CSSProperties = { font: "11px " + MONO, color: faint, border: "1px solid " + rule, borderRadius: 6, padding: "2px 7px" };

export function ThemesTab({ project }: { project: string }) {
  const [library, setLibrary] = useState<LibTheme[]>([]);
  const [activeWeb, setActiveWeb] = useState<Active>(null);
  const [activeMobile, setActiveMobile] = useState<Active>(null);
  /** the pointer of a theme's own platform */
  const activeFor = (t: LibTheme): Active => (t.platform === "mobile" ? activeMobile : activeWeb);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);   // "theme:version" being activated
  const [regen, setRegen] = useState<string | null>(null); // theme id being regenerated
  const [error, setError] = useState<string | null>(null);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    let dead = false;
    fetch("/api/slice-design/themes?project=" + encodeURIComponent(project)).then((r) => r.json()).then((d) => { if (!dead) { setLibrary(d.library ?? []); setActiveWeb(d.active ?? null); setActiveMobile(d.activeMobile ?? null); } }).catch(() => {});
    return () => { dead = true; };
  }, [project, bump]);

  const norm = (s: string) => s.toLowerCase();
  const shown = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return library;
    return library.filter((th) => [th.id, th.name, th.type, th.kind, th.platform, ...th.versions.map((v) => "v" + v.version)].filter(Boolean).some((s) => norm(String(s)).includes(t)));
  }, [library, q]);

  const activate = async (theme: string, version: number) => {
    setBusy(theme + ":" + version); setError(null);
    const r = await fetch("/api/slice-design/themes/active", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ project, theme, version }) });
    const d = await r.json().catch(() => ({ error: "bad response" }));
    setBusy(null);
    if (!r.ok || d.error) { setError(d.error ?? String(r.status)); return; }
    setBump((b) => b + 1);
    // tell every open live viewer of this project — it re-reads active.json, no reload
    try { const bc = new BroadcastChannel("slice-design:theme"); bc.postMessage({ project }); bc.close(); } catch { /* not supported */ }
  };
  // regenerate ONE theme's CSS from source — only the active theme; a re-run
  // picks up engine changes. Live viewers re-read on the broadcast.
  const regenerate = async (theme: string) => {
    setRegen(theme); setError(null);
    const r = await fetch("/api/slice-design/themes/regenerate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme }) });
    const d = await r.json().catch(() => ({ error: "bad response" }));
    setRegen(null);
    if (!r.ok || d.error) { setError(d.error ?? String(r.status)); return; }
    setBump((b) => b + 1);
    try { const bc = new BroadcastChannel("slice-design:theme"); bc.postMessage({ project }); bc.close(); } catch { /* not supported */ }
  };
  // the two controls, apart: a version pick per theme (local until it matters),
  // and ONE active mark — activating a theme writes it at its picked version;
  // re-picking the active theme's version writes at once.
  const [pick, setPick] = useState<Record<string, number>>({});
  const pickOf = (t: LibTheme) => pick[t.id] ?? (activeFor(t)?.theme === t.id ? activeFor(t)!.version : [...t.versions].reverse().find((v) => v.hasCss)?.version ?? t.versions[t.versions.length - 1]?.version ?? 1);
  const choose = (t: LibTheme, version: number) => { setPick((m) => ({ ...m, [t.id]: version })); if (activeFor(t)?.theme === t.id) activate(t.id, version); };
  const inLibrary = (a: Active) => !!a && library.some((t) => t.id === a.theme && t.versions.some((v) => v.version === a.version && v.hasCss));
  const field: React.CSSProperties = { font: "12.5px " + MONO, color: ink, background: bg3, border: "1px solid " + rule, borderRadius: 7, padding: "4px 8px", outline: "none" };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", color: ink }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 20px 30px" }}>
        <div>
          {/* the bar: search · the pointer */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="⌕ search themes…"
              style={{ ...field, flex: 1, padding: "6px 11px", font: "13px " + MONO }} />
            <span style={{ font: "12px " + MONO, color: faint, whiteSpace: "nowrap" }}>{shown.length} / {library.length}</span>
          </div>
          {error && <div style={{ font: "12px " + MONO, color: "var(--red, #f7768e)", padding: "0 3px 10px" }}>{error}</div>}

          {/* two lists, one per platform: a product's web app and its mobile app each wear one theme.
              One row per theme — the active mark on the left, the version pick on the right, the name between. */}
          {!library.length && <div style={{ padding: "24px 2px", font: "12px " + MONO, color: faint }}>no themes in shared/libs/ui/themes — a theme is &lt;theme&gt;/v&lt;n&gt;/theme.ts, compiled by pnpm theme:build</div>}
          {library.length > 0 && !shown.length && <div style={{ padding: "24px 2px", font: "12px " + MONO, color: faint }}>— nothing matches “{q}”</div>}
          <div style={{ display: "flex", gap: 36, alignItems: "flex-start", flexWrap: "wrap" }}>
          {library.length > 0 && shown.length > 0 && (["web", "mobile"] as Platform[]).map((platform) => {
            const rows = shown.filter((t) => (t.platform ?? "web") === platform);
            const a = platform === "mobile" ? activeMobile : activeWeb;
            return (
              <div key={platform} data-testid={"themes-" + platform} style={{ flex: "1 1 420px", minWidth: 0, marginBottom: 26 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "0 3px 8px", borderBottom: "1px solid " + rule }}>
                  <span style={{ font: "10px " + MONO, letterSpacing: ".16em", textTransform: "uppercase", color: soft }}>{platform}</span>
                  <span style={{ font: "12px " + MONO, color: faint }}>active</span>
                  {a
                    ? <span style={{ font: "12px " + MONO, color: inLibrary(a) ? accent : "var(--red, #f7768e)" }} title={inLibrary(a) ? "shared/themes/active.json" + (platform === "mobile" ? " → mobile" : "") : "active.json names a theme@version the library does not offer"}>
                        {a.theme} v{a.version}{inLibrary(a) ? "" : " · not in library"}
                      </span>
                    : <span style={{ font: "12px " + MONO, color: platform === "web" ? "var(--red, #f7768e)" : faint }} title={platform === "web" ? "no shared/themes/active.json — the viewer wears the bundled default" : "this project names no mobile theme: activate one below"}>none stated</span>}
                </div>
                {!rows.length && <div style={{ padding: "14px 2px", font: "12px " + MONO, color: faint }}>no {platform} theme{q.trim() ? ` matches “${q}”` : " in the library"}</div>}
                {rows.map((t) => {
            const on = activeFor(t)?.theme === t.id;
            const mobile = t.platform === "mobile";
            const v = pickOf(t);
            const css = t.versions.find((x) => x.version === v)?.hasCss ?? false;
            const working = busy?.startsWith(t.id + ":");
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 2px", borderBottom: "1px solid " + rule, opacity: working ? .6 : 1 }}>
                <button disabled={on || !css || !!busy} onClick={() => activate(t.id, v)}
                  title={on ? `the active ${mobile ? "mobile" : "web"} theme` : !css ? `v${v} has no generated output — run pnpm theme:build` : `make ${t.id} v${v} the active ${mobile ? "mobile" : "web"} theme for ${project}`}
                  style={{ width: 16, height: 16, flexShrink: 0, borderRadius: 8, padding: 0, cursor: on || !css ? "default" : "pointer",
                    border: "1.5px solid " + (on ? accent : rule), background: on ? accent : "transparent", boxShadow: on ? "inset 0 0 0 3px var(--bg, #14151a)" : undefined }} />
                <span style={{ fontSize: 13, fontWeight: on ? 600 : 500, color: on ? ink : soft, whiteSpace: "nowrap" }}>{t.name}</span>
                <span style={{ font: "10.5px " + MONO, color: faint, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{t.id}</span>
                {t.type && <span style={chip}>{t.type}</span>}
                {t.kind && <span style={chip}>{t.kind}</span>}
                <span style={{ flex: 1 }} />
                <select value={v} onChange={(e) => choose(t, Number(e.target.value))} disabled={!on || !!busy} title={on ? "the version in use — picking another writes it at once" : "activate this theme to pick a version"}
                  style={{ ...field, flexShrink: 0, color: on ? ink : soft, opacity: on ? 1 : .5 }}>
                  {t.versions.map((x) => <option key={x.version} value={x.version} disabled={!x.hasCss}>v{x.version}{x.hasCss ? "" : " · no output"}</option>)}
                </select>
                <button disabled={!on || !!busy || regen === t.id} onClick={() => regenerate(t.id)}
                  title={on ? "regenerate this theme's output from source" : "only an active theme can be regenerated"}
                  style={{ ...field, flexShrink: 0, cursor: on && !busy && regen !== t.id ? "pointer" : "default", opacity: on ? 1 : .4, padding: "3px 8px", minWidth: 30 }}>
                  {regen === t.id ? "…" : "⟳"}
                </button>
              </div>
            );
                })}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
