import { latest, type Doc, type Node, type Registry } from "../types";

// The lock a ui_snapshot carries: the page document and every component it uses, each at a version and a content hash.
// A version is immutable: the hash is how an edit made in place is caught.
export type Lock = { documentName: string; documentVersion: number; documentHash: string; componentVersions: Record<string, { version: number; hash: string }> };

const canon = (x: unknown): unknown => Array.isArray(x) ? x.map(canon) : x && typeof x === "object" ? Object.fromEntries(Object.keys(x as object).sort().map((k) => [k, canon((x as Record<string, unknown>)[k])])) : x;
/** FNV-1a over the canonical JSON: stable across key order, small, no dependency */
export function hashOf(doc: unknown): string {
  const s = JSON.stringify(canon(doc));
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
}

const uses = (n: Node, out: { component: string; version: number | "latest" }[]) => {
  if (n.use) out.push({ component: n.use.component, version: n.use.version });
  for (const c of n.children ?? []) uses(c, out);
  for (const list of Object.values(n.slots ?? {})) for (const c of list) uses(c, out);
};

/** the lock of a page as the documents stand now: every `latest` resolved, transitively */
export function lockOf(reg: Registry, pageName: string): Lock | null {
  const page: Doc | undefined = reg.pages[pageName];
  if (!page) return null;
  const componentVersions: Lock["componentVersions"] = {};
  const visit = (doc: Doc) => {
    const refs: { component: string; version: number | "latest" }[] = []; uses(doc.root, refs);
    for (const r of refs) {
      const v = r.version === "latest" ? latest(reg, r.component) : r.version;
      const target = reg.components[r.component]?.[v];
      if (!target || componentVersions[r.component]) continue;
      componentVersions[r.component] = { version: v, hash: hashOf(target) };
      visit(target);
    }
  };
  visit(page);
  return { documentName: page.name, documentVersion: page.version, documentHash: hashOf(page), componentVersions };
}
