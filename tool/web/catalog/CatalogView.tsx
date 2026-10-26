// /catalog[/<layer>[/<group>]/<name>] — the library's fixtures in four layers
// (foundations · components · patterns · layouts), rendered under the
// project's active theme. Tool chrome only on
// the left; the fixture on the right is pure library under the theme css.
// Each entry carries one review tag from status.json (written by hand).
import { Component, createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { LAYERS, byLayer, find, groupsOf, schemasFor, type CatalogEntry, type Layer } from "./registry";
import { BASE } from "../router";   // the /live/<project> prefix — fixture urls must carry it
import type { ComponentSchema } from "@libs/web-components";
import { VALID_ELEMENT_VALUES, VALID_LAYOUT_VALUES, VALID_TYPOGRAPHY_ELEMENT_VALUES } from "@libs/theme-engine/conventions";

/**
 * The review tags. Every entry carries one.
 *   approved    strong green  — done
 *   to polish   light green   — structurally fine, tweaks listed in the note
 *   challenged  red           — needs action
 *   pending     orange        — not reviewed yet
 *   deprecated  grey          — kept for the app, do not use in new work
 */
const TAGS: Record<string, string> = { approved: "#1e7a3c", "to polish": "#6cbf7a", challenged: "#c0271b", pending: "#d97706", deprecated: "#8a867e" };
const tagColor = (t: string) => TAGS[t] ?? "#6b675f";

const mono: React.CSSProperties = { fontFamily: "'SF Mono',Menlo,monospace" };

/** Does the engine know this identity? Unknown ones only ever get family-level css. */
function known(idn: string): boolean {
  if (idn.startsWith("layout=")) return VALID_LAYOUT_VALUES.has(idn.slice(7));
  return VALID_ELEMENT_VALUES.has(idn) || VALID_TYPOGRAPHY_ELEMENT_VALUES.has(idn);
}

/** One broken fixture must not take the catalog down — it reports itself. */
class FixtureBoundary extends Component<{ id: string; children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null };
  static getDerivedStateFromError(e: unknown) {
    return { error: e instanceof Error ? `${e.name}: ${e.message}` : String(e) };
  }
  componentDidUpdate(prev: { id: string }) {
    if (prev.id !== this.props.id && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error)
      return <pre data-fixture-error style={{ ...mono, fontSize: 12, color: "#b3261e", whiteSpace: "pre-wrap", padding: 24 }}>{this.state.error}</pre>;
    return this.props.children;
  }
}

/** The element/layout identities currently in the DOM outside the tool chrome — portals included. */
function useIdentities(id: string): string[] {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    let last = "";
    const scan = () => {
      const set = new Set<string>();
      document.querySelectorAll("[element],[layout]").forEach((n) => {
        if (n.closest("[data-catalog-chrome]")) return;
        const e = n.getAttribute("element");
        const l = n.getAttribute("layout");
        if (e) set.add(e);
        if (l) set.add(`layout=${l}`);
      });
      const next = [...set].sort();
      const key = next.join(" ");
      if (key !== last) { last = key; setIds(next); }
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["element", "layout"] });
    return () => mo.disconnect();
  }, [id]);
  return ids;
}

/** The component's schema, straight from its types.ts. */
function PropsTable({ schema }: { schema: ComponentSchema }) {
  const rows = Object.entries(schema.props as Record<string, { kind: string; values?: readonly string[]; default?: unknown; doc?: string; required?: boolean }>);
  const [open, setOpen] = useState(false);
  const td: React.CSSProperties = { padding: "3px 10px 3px 0", verticalAlign: "top", borderBottom: "1px solid #eeece7" };
  return (
    <div data-catalog-chrome style={{ ...mono, fontSize: 11, color: "#1a1a1a", padding: "10px 24px 0" }}>
      <div onClick={() => setOpen((o) => !o)} style={{ color: "#6b675f", marginBottom: 4, cursor: "pointer", userSelect: "none" }}>
        {open ? "▾" : "▸"} {schema.component} · {rows.length} props
      </div>
      {open && <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(([name, m]) => (
            <tr key={name}>
              <td style={td}>{name}{m.required ? " *" : ""}</td>
              <td style={{ ...td, color: "#6b675f" }}>{m.kind}</td>
              <td style={{ ...td, maxWidth: 520, color: "#6b4fbb" }}>{m.values ? (m.values.length > 12 ? `${m.values.length} values` : m.values.join(" | ")) : ""}</td>
              <td style={{ ...td, color: "#6b675f" }}>{m.default !== undefined ? `= ${String(m.default)}` : ""}</td>
              <td style={{ ...td, color: "#9a968d", fontFamily: "inherit" }}>{m.doc ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}


/** A full-viewport fixture (a layout, a check page) drawn inline at a desktop size and scaled to the column: no frame, so the one viewer and its theme serve it. */
const DESK = { w: 1440, h: 900 };
function ScaledPage({ entry }: { entry: CatalogEntry }) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const scale = w ? Math.min(1, w / DESK.w) : 1;
  return (
    <div ref={box} style={{ width: "100%", height: DESK.h * scale, overflow: "hidden", border: "1px solid #dedbd3", borderRadius: 6, background: "#fff" }}>
      <div style={{ width: DESK.w, height: DESK.h, transform: `scale(${scale})`, transformOrigin: "0 0", overflow: "auto" }}>
        <FixtureBoundary id={entry.id}>{createElement(entry.Fixture)}</FixtureBoundary>
      </div>
    </div>
  );
}
const LayoutFrames = ({ entry }: { entry: CatalogEntry }) => <div style={{ padding: "0 24px" }}><ScaledPage entry={entry} /></div>;

/** /fixture/<id> — one fixture, full viewport, no chrome. Used by the frames; open it to see a layout at real size. */
export function BareFixture({ id }: { id: string }) {
  const entry = find(id);
  if (!entry) return <div style={{ ...mono, padding: 24, fontSize: 12 }}>no fixture: {id}</div>;
  return <FixtureBoundary id={entry.id}>{createElement(entry.Fixture)}</FixtureBoundary>;
}

/** Which tags are hidden from the sidebar. Approved and deprecated are hidden by default so pending and challenged surface first. Toggle by clicking a tag in the summary. Persisted per browser. */
const HIDDEN_KEY = "catalogHiddenTags";
const DEFAULT_HIDDEN = new Set(["approved", "deprecated"]);
function useHiddenTags(): [Set<string>, (t: string) => void] {
  const [hidden, setHidden] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(HIDDEN_KEY);
      if (raw === null) return new Set(DEFAULT_HIDDEN);
      return new Set(raw ? raw.split(",") : []);
    } catch { return new Set(DEFAULT_HIDDEN); }
  });
  const toggle = (t: string) => setHidden((prev) => {
    const next = new Set(prev);
    if (next.has(t)) next.delete(t); else next.add(t);
    try { localStorage.setItem(HIDDEN_KEY, [...next].join(",")); } catch { /* ignore */ }
    return next;
  });
  return [hidden, toggle];
}

// ── The page of a mode ───────────────────────────────────────────────────────
// One document: the mode's fixtures mapped to sections, in order. A section is at least one fold high and grows with its content;
// it has a large padding top and bottom, then a rule under it. The page knows nothing of frames or sidebars.
const PAD = 96;
/** the title at the top of a section: the fixture's name; on hover it lists every section of the mode, scrollable, a click jumps there */
function SectionTitle({ entry, all }: { entry: CatalogEntry; all: CatalogEntry[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-catalog-chrome onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: "relative", alignSelf: "flex-start", margin: "0 24px", zIndex: 2 }}>
      <div style={{ ...mono, fontSize: 12, color: "#6b675f", padding: "4px 0", cursor: "default" }}>{entry.name}</div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, minWidth: 220, maxHeight: 360, overflowY: "auto", background: "#fff", border: "1px solid #dedbd3", borderRadius: 6, boxShadow: "0 6px 20px rgba(0,0,0,.08)", padding: 6 }}>
          {all.map((e) => (
            <div key={e.id} onClick={() => { document.getElementById(e.id)?.scrollIntoView({ behavior: "auto", block: "start" }); setOpen(false); }}
              style={{ ...mono, fontSize: 12, padding: "4px 8px", borderRadius: 4, cursor: "pointer", color: e.id === entry.id ? "#1a1a1a" : "#6b675f", background: e.id === entry.id ? "#f3f1ec" : "transparent" }}>{e.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
function Section({ entry, all }: { entry: CatalogEntry; all: CatalogEntry[] }) {
  return (
    <section id={entry.id} style={{ minHeight: "100vh", boxSizing: "border-box", padding: `${PAD / 3}px 0 ${PAD}px`, display: "flex", flexDirection: "column", borderBottom: "1px solid #dedbd3" }}>
      <SectionTitle entry={entry} all={all} />
      <div style={entry.layer === "components" ? { margin: "auto" } : { paddingTop: PAD / 2 }}>
        {entry.layer === "layouts" || entry.layer === "pages" ? <LayoutFrames entry={entry} /> : <FixtureBoundary id={entry.id}>{createElement(entry.Fixture)}</FixtureBoundary>}
      </div>
    </section>
  );
}
function ModePage({ entries }: { entries: CatalogEntry[] }) {
  const all = entries.filter((e) => (e.status.status || "pending") !== "deprecated");
  return <>{all.map((e) => <Section key={e.id} entry={e} all={all} />)}</>;
}

/** all the check pages at once, small, three to a row, one scroll */
function AllPagesView({ entries }: { entries: CatalogEntry[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20, padding: 20 }}>
      {entries.map((e) => (
        <div key={e.id}>
          <div data-catalog-chrome style={{ ...mono, fontSize: 11, color: "#6b675f", padding: "0 0 6px 2px" }}>{e.name}</div>
          <ScaledPage entry={e} />
        </div>
      ))}
    </div>
  );
}

// ── The sidebar of the frame ─────────────────────────────────────────────────
// Always visible, beside the page; its styles are inline, so the theme under test cannot touch it. A click jumps to the section;
// the entry whose section is at the top of the fold is the one marked.
const SB = { ink: "#1a1a1a", soft: "#6b675f", faint: "#9a968d", rule: "#dedbd3", bg: "#faf9f6", on: "#eceae4" };
/** the check mode: two of its entries are views of their own, the rest one document */
const ALL_PAGES = "pages/all-pages", MIX = "pages/mix-of-components";
const ownView = (id: string) => id === ALL_PAGES || id === MIX;
type SbItem = { id: string; name: string; group: string; tag: string };
function FrameSidebar({ items, at, grouped, go }: { items: SbItem[]; at: string; grouped: boolean; go: (id: string) => void }) {
  const all = items;
  const groups = [...new Set(all.map((e) => e.group))];
  // up / down move to the previous / next entry (when no field has the focus)
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "ArrowDown" && ev.key !== "ArrowUp") return;
      const t = ev.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      const i = all.findIndex((e) => e.id === at);
      const next = all[ev.key === "ArrowDown" ? Math.min(i + 1, all.length - 1) : Math.max(i - 1, 0)];
      if (next && next.id !== at) { ev.preventDefault(); go(next.id); }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [all, at, go]);
  return (
    <nav data-catalog-chrome style={{ width: 240, flexShrink: 0, overflowY: "auto", padding: "12px 8px 28px 12px", borderRight: `1px solid ${SB.rule}`, background: SB.bg, color: SB.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 12.5, boxSizing: "border-box" }}>
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 12 }}>
          {grouped && <div style={{ ...mono, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: SB.faint, margin: "0 0 3px 8px" }}>{g}</div>}
          {all.filter((e) => e.group === g).map((e) => {
            const on = e.id === at, tag = e.tag;
            return (
              <div key={e.id} onClick={() => go(e.id)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, padding: "4px 8px", borderRadius: 6, cursor: "pointer", background: on ? SB.on : "transparent", color: on ? SB.ink : SB.soft }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</span>
                <span style={{ ...mono, fontSize: 10, color: tagColor(tag), flexShrink: 0 }}>{tag}</span>
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
/** the section at the top of the fold of a scrolling box, as it scrolls */
function useAtTop(box: React.RefObject<HTMLElement | null>, first: string) {
  const [at, setAt] = useState(first);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      const top = el.getBoundingClientRect().top + 1;
      let found = "";
      for (const s of Array.from(el.querySelectorAll<HTMLElement>("section[id]"))) { if (s.getBoundingClientRect().top <= top) found = s.id; else break; }
      if (found) setAt(found);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(read); };
    el.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  });
  return at;
}

// ── The micro server of the frame ────────────────────────────────────────────
// Out: { type: "catalog:at", id } — the section at the top of the fold, once on load and each time it changes while scrolling.
// In:  { type: "catalog:go", id } — jump to that section at once. Nothing else: it remembers no selection and never jumps on its own.
// not wired for now: the page is shown alone first
function _useFrameServer(scroller: () => HTMLElement | null) {
  useEffect(() => {
    const box = scroller();
    if (!box) return;
    let at = "", raf = 0;
    const report = () => {
      const top = box.getBoundingClientRect().top + 1;
      let found = "";
      for (const el of Array.from(box.querySelectorAll<HTMLElement>("section[id]"))) { if (el.getBoundingClientRect().top <= top) found = el.id; else break; }
      if (found && found !== at) { at = found; parent.postMessage({ type: "catalog:at", id: found }, location.origin); }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(report); };
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.data?.type !== "catalog:go" || typeof e.data.id !== "string") return;
      document.getElementById(e.data.id)?.scrollIntoView({ behavior: "auto", block: "start" });
      report();
    };
    box.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("message", onMsg);
    parent.postMessage({ type: "catalog:ready" }, location.origin);
    report();
    return () => { box.removeEventListener("scroll", onScroll); removeEventListener("message", onMsg); cancelAnimationFrame(raf); };
  }, []);
}

/** bare: the pane alone — the tool draws the sidebar itself and frames this (/catalog/<id>?pane=1) */
export function CatalogView({ id, onPick, onBack, bare }: { id: string; onPick: (id: string) => void; onBack: () => void; bare?: boolean }) {
  const current = find(id);
  const layer: Layer = current?.layer ?? "components";
  const list = byLayer(layer);
  const identities = useIdentities(current?.id ?? "");
  const schemas = current?.layer === "components" ? schemasFor(current.name) : [];
  const counts = list.reduce<Record<string, number>>((acc, e) => { const t = e.status.status || "pending"; acc[t] = (acc[t] ?? 0) + 1; return acc; }, {});
  const [hidden, toggleHidden] = useHiddenTags();
  const shows = (e: CatalogEntry) => !hidden.has(e.status.status || "pending");
  const box = useRef<HTMLElement>(null);
  const live = list.filter((e) => (e.status.status || "pending") !== "deprecated");
  // the views of the frame: the check mode has the gallery of all pages and the mix of components as views of their own; everything else is the document of sections
  const [view, setView] = useState<string>(() => (current && ownView(current.id) ? current.id : "doc"));
  const docEntries = layer === "pages" ? live.filter((e) => !ownView(e.id)) : live;
  const atDoc = useAtTop(box, current?.id ?? "");
  const at = view === "doc" ? atDoc : view;
  const goTo = (target: string) => {
    if (ownView(target)) { setView(target); return; }
    setView("doc");
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: "auto", block: "start" }));
  };
  useEffect(() => { if (bare && current && !ownView(current.id)) document.getElementById(current.id)?.scrollIntoView({ behavior: "auto", block: "start" }); }, [bare, current?.id]);   // the address names where to start
  if (bare) {
    const items: SbItem[] = layer === "pages"
      ? [{ id: ALL_PAGES, name: "all pages", group: "pages", tag: "" }, ...live.map((e) => ({ id: e.id, name: e.name, group: e.group, tag: e.status.status || "pending" }))]
      : live.map((e) => ({ id: e.id, name: e.name, group: e.group, tag: e.status.status || "pending" }));
    const mix = live.find((e) => e.id === MIX);
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <FrameSidebar items={items} at={at} grouped={layer === "components"} go={goTo} />
        <main key={view} ref={box} style={{ flex: 1, minWidth: 0, overflow: "auto" }}>
          {view === ALL_PAGES ? <AllPagesView entries={live.filter((e) => e.id !== MIX)} />
            : view === MIX && mix ? <FixtureBoundary id={mix.id}>{createElement(mix.Fixture)}</FixtureBoundary>
            : <ModePage entries={docEntries} />}
        </main>
      </div>
    );
  }
  const pane = (
    <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
      <div data-catalog-chrome style={{ ...mono, fontSize: 11, color: "#6b675f", padding: "14px 24px 0", display: "flex", flexDirection: "column", gap: 4 }}>
        <div>
          {current?.id}
          {current && <span style={{ color: tagColor(current.status.status || "pending"), marginLeft: 12 }}>{current.status.status || "pending"}</span>}
          {current?.status.note && <span title={current.status.note} style={{ color: "#6b675f", marginLeft: 6, cursor: "help" }}>◉</span>}
          {current?.status.note && <span style={{ marginLeft: 8 }}>— {current.status.note}</span>}
          {current && <a href={`${BASE}/fixture/${current.id}`} target="_blank" rel="noreferrer" style={{ marginLeft: 12, color: "#6b675f" }}>open ↗</a>}
        </div>
        <div data-identities style={{ color: "#9a968d", display: "flex", flexWrap: "wrap", gap: "0 12px" }}>
          <span>identities:</span>
          {identities.length === 0 && <span>none</span>}
          {identities.map((idn) => (
            <span key={idn} title={known(idn) ? "known to the engine" : "NOT in the engine map — family css only"} style={{ color: known(idn) ? "#9a968d" : "#6b4fbb" }}>
              {idn}{known(idn) ? "" : " ?"}
            </span>
          ))}
        </div>
      </div>
      {schemas.map((s) => <PropsTable key={s.component} schema={s} />)}
      {current?.layer === "layouts" ? (
          <>
            <LayoutFrames entry={current} />
            {current.status.note && <p style={{ ...mono, fontSize: 12, color: "#6b675f", padding: "0 24px 24px", maxWidth: 900 }}>{current.status.note}</p>}
          </>
        ) : current ? <FixtureBoundary id={current.id}>{createElement(current.Fixture)}</FixtureBoundary> : null}
    </main>
  );
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav data-catalog-chrome style={{ width: 260, flexShrink: 0, overflow: "auto", padding: "16px 12px", borderRight: "1px solid #dedbd3", fontSize: 12 }}>
        <div onClick={onBack} style={{ ...mono, fontSize: 11, color: "#6b675f", cursor: "pointer", marginBottom: 10 }}>◂ index</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          {LAYERS.map((l) => (
            <span key={l} data-layer={l} onClick={() => { const first = byLayer(l)[0]; if (first) onPick(first.id); }} style={{ ...mono, fontSize: 11, cursor: "pointer", color: l === layer ? "#1a1a1a" : "#9a968d", fontWeight: l === layer ? 700 : 400 }}>{l}</span>
          ))}
        </div>
        {/* Click a tag to toggle it in the list. Hidden tags render struck through. */}
        <div style={{ ...mono, fontSize: 10, color: "#6b675f", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: "2px 10px" }}>
          {Object.keys(TAGS).map((t) => {
            const off = hidden.has(t);
            return (
              <span key={t} onClick={() => toggleHidden(t)} title={off ? "click to show" : "click to hide from the list"} style={{ color: tagColor(t), cursor: "pointer", opacity: off ? 0.45 : 1, textDecoration: off ? "line-through" : "none", userSelect: "none" }}>
                {t} {counts[t] ?? 0}
              </span>
            );
          })}
        </div>
        {groupsOf(layer).map((g) => {
          const shown = list.filter((e) => e.group === g && shows(e));
          if (shown.length === 0) return null;
          return (
          <div key={g} style={{ marginBottom: 14 }}>
            {(layer === "components" || layer === "layouts") && <div style={{ ...mono, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#6b675f", marginBottom: 4 }}>{g}</div>}
            {shown.map((e) => (
              <div key={e.id} data-entry={e.id} onClick={() => onPick(e.id)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                padding: "4px 8px", borderRadius: 6, cursor: "pointer",
                background: e.id === current?.id ? "#f0eeea" : "transparent", color: "#1a1a1a",
              }}>
                <span>{e.name}</span>
                <span style={{ ...mono, fontSize: 10, color: tagColor(e.status.status || "pending"), display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {e.status.note && <span title={e.status.note} style={{ color: "#6b675f", cursor: "help" }}>◉</span>}
                  {e.status.status || "pending"}
                </span>
              </div>
            ))}
          </div>
          );
        })}
      </nav>
      {pane}
    </div>
  );
}
