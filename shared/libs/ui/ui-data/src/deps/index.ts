import { latest, type Catalog, type Doc, type Json, type Node, type Registry } from "../types"

export interface Deps { components: { name: string; version: number; asked: string }[]; contracts: string[]; actions: { action: string; verb: string | null; target: string | null }[] }
/** what a document depends on, found by walking it and the components it references, recursively */
export function dependencies(doc: Doc, reg: Registry, catalog: Catalog): Deps {
  const ACTIONS = catalog.ACTIONS;
  const comps = new Map<string, { name: string; version: number; asked: string }>(), contracts = new Set<string>(), actions = new Map<string, { action: string; verb: string | null; target: string | null }>();
  const seen = new Set<Doc>();
  const scanActions = (v: Json | undefined) => {
    if (Array.isArray(v)) return v.forEach(scanActions);
    if (v && typeof v === "object") {
      const o = v as Record<string, Json>;
      if (o.dispatch && typeof o.dispatch === "object") { const name = (o.dispatch as Record<string, Json>).action as string; const def = ACTIONS[name]; if (def) actions.set(name, { action: name, verb: def.capability?.verb ?? null, target: def.capability?.target ?? null }); }
      Object.values(o).forEach(scanActions);
    }
  };
  const visit = (d: Doc) => {
    if (seen.has(d)) return; seen.add(d);
    for (const x of Object.values(d.data ?? {})) contracts.add(x.source);
    const walk = (n: Node) => {
      for (const list of Object.values(n.on ?? {})) scanActions(list);
      if (n.use) {
        const v = n.use.version === "latest" ? latest(reg, n.use.component) : n.use.version;
        comps.set(n.use.component, { name: n.use.component, version: v, asked: String(n.use.version) });
        const c = reg.components[n.use.component]?.[v]; if (c) visit(c);
      }
      (n.children ?? []).forEach(walk);
      for (const list of Object.values(n.slots ?? {})) list.forEach(walk);
    };
    walk(d.root);
  };
  visit(doc);
  return { components: [...comps.values()], contracts: [...contracts], actions: [...actions.values()] };
}
