import type { Catalog, Doc, Json, Node, Prim, Registry } from "../types";
import { MAX_DEPTH, bindRoots, depthOf, isExpr, opOf } from "../expr";
import { LIMITS, NODE_KEYS, OPS, TESTID } from "../dictionary";
import { POSITIONS, builtinsOf, isInteractable, libraryOf, testIdProp } from "../schema";

export interface Issue { path: string; message: string }
const isNode = (v: unknown): boolean => !!v && typeof v === "object" && !Array.isArray(v) && ("type" in (v as object) || "use" in (v as object));
const isNodes = (v: unknown): boolean => Array.isArray(v) && v.length > 0 && v.every(isNode);

/** `hosted`: the project's own components (its binding's `prims`) */
export function validate(doc: Doc, reg: Registry, catalog: Catalog, hosted: Record<string, Prim> = {}): Issue[] {
  const surface = doc.surface ?? "web";
  const PRIMS: Record<string, Prim> = { ...libraryOf(surface), ...hosted, ...builtinsOf(surface) };
  const TID = testIdProp(surface);
  const { CONTRACTS, ACTIONS } = catalog;
  const out: Issue[] = [];
  const bad = (path: string, message: string) => out.push({ path, message });
  if (doc.schemaVersion !== 1) bad("schemaVersion", "unknown schema version");
  if (doc.kind !== "page" && doc.kind !== "component") bad("kind", "kind is page or component");
  if (!doc.name || !Number.isInteger(doc.version)) bad("name", "a name and an integer version are required");
  const base = new Set<string>([...(doc.params ?? []), "data", "state", "calc"]);
  let count = 0;
  const seenIds = new Set<string>();
  const expr = (e: Json | undefined, path: string, scope: Set<string>) => {
    if (e === undefined || e === null || typeof e !== "object") return;
    if (Array.isArray(e)) return e.forEach((x, i) => expr(x, `${path}[${i}]`, scope));
    if (!isExpr(e)) return;
    if (depthOf(e) > MAX_DEPTH) return bad(path, "expression too deep");
    const op = opOf(e);
    // an object with more than one key (or none) is a plain object whose values are expressions (a `style`, a `query`)
    if (!op) { Object.entries(e).forEach(([k, v]) => expr(v, `${path}.${k}`, scope)); return; }
    if (!(OPS as readonly string[]).includes(op)) return bad(path, `unknown operation "${op}"`);
    for (const r of bindRoots(e)) if (!scope.has(r)) bad(path, `"${r}" is not in scope here`);
  };
  /** a value of any shape (a style, a query): an expression where one is, a plain object otherwise, its values looked at the same way */
  const loose = (v: Json | undefined, path: string, scope: Set<string>): void => {
    if (Array.isArray(v)) return v.forEach((x, i) => loose(x, `${path}[${i}]`, scope));
    if (!isExpr(v)) return;
    const op = opOf(v);
    if (op && (OPS as readonly string[]).includes(op)) { expr(v, path, scope); return; }
    for (const [k, x] of Object.entries(v)) loose(x as Json, `${path}.${k}`, scope);
  };
  for (const [k, c] of Object.entries(doc.calc ?? {})) expr(c, `calc.${k}`, base);
  for (const [k, dd] of Object.entries(doc.data ?? {})) {
    const c = CONTRACTS[dd.source];
    if (!c) { bad(`data.${k}`, `unknown data contract "${dd.source}"`); continue; }
    for (const p of Object.keys(dd.params ?? {})) { if (!c.params.includes(p)) bad(`data.${k}.params.${p}`, `the contract ${dd.source} has no parameter "${p}"`); expr(dd.params![p], `data.${k}.params.${p}`, base); }
    if (dd.when !== undefined) expr(dd.when, `data.${k}.when`, base);
  }
  const actions = (list: Json[] | undefined, path: string, scope: Set<string>) => {
    (list ?? []).forEach((a, i) => {
      const p = `${path}[${i}]`;
      if (!isExpr(a)) return bad(p, "an action is an object");
      const keys = Object.keys(a);
      if (keys.includes("when")) { expr(a.when as Json, p + ".when", scope); actions(a.do as Json[], p + ".do", scope); return; }
      const op = opOf(a);
      if (op === "set") { const s = a.set as { state: string; to: Json }; if (!(s.state in (doc.state ?? {}))) bad(p, `state "${s.state}" is not declared`); expr(s.to, p, scope); }
      else if (op === "navigate") { const n = a.navigate as { to: Json }; if (typeof n.to === "string" && !n.to.startsWith("/")) bad(p, "navigate goes to a path of the app"); expr(n.to, p, scope); }
      else if (op === "setStorage") { const w = a.setStorage as { key?: Json; to?: Json }; if (typeof w.key !== "string") bad(p, "setStorage names a key"); expr(w.to, p, scope); }
      else if (op === "moveWorld") { const m = a.moveWorld as { world?: Json; at?: Json }; if (m.at === undefined) bad(p, "moveWorld names the moment (at)"); expr(m.at, p, scope); if (m.world !== undefined) expr(m.world, p, scope); }
      else if (op === "emit") { const e = a.emit as { event: string; payload?: Record<string, Json> }; if (!(doc.emits ?? []).includes(e.event)) bad(p, `"${e.event}" is not an event this component emits`); for (const v of Object.values(e.payload ?? {})) expr(v, p, scope); }
      else if (op === "dispatch") {
        const d = a.dispatch as { action: string; args?: Record<string, Json>; pending?: string; then?: Json[]; else?: Json[] };
        const def = ACTIONS[d.action];
        if (!def) bad(p, `unknown action "${d.action}"`); else for (const k of Object.keys(d.args ?? {})) if (!def.args.includes(k)) bad(p, `the action ${d.action} has no argument "${k}"`);
        if (d.pending && !(d.pending in (doc.state ?? {}))) bad(p, `state "${d.pending}" is not declared`);
        for (const v of Object.values(d.args ?? {})) expr(v, p, scope);
        actions(d.then, p + ".then", new Set([...scope, "result"])); actions(d.else, p + ".else", new Set([...scope, "error"]));
      } else bad(p, `unknown action type "${op}"`);
    });
  };
  const walk = (n: Node, path: string, scope: Set<string>, depth: number) => {
    if (++count > LIMITS.nodes) return bad(path, "too many nodes");
    if (depth > LIMITS.depth) return bad(path, "tree too deep");
    for (const k of Object.keys(n)) if (!NODE_KEYS.has(k)) bad(path, `unknown key "${k}"`);
    if (!!n.type === !!n.use) bad(path, "a node is either a primitive (type) or a reference (use)");
    if (n.when !== undefined) expr(n.when as Json, path + ".when", scope);
    let inner = scope;
    if (n.repeat) { if (!scope.has(n.repeat.each.split(".")[0])) bad(path + ".repeat", `"${n.repeat.each}" is not in scope here`); inner = new Set([...scope, n.repeat.as]); }
    if (n.type) {
      const prim = PRIMS[n.type];
      if (!prim) return bad(path, `"${n.type}" is not a library component, a built-in, or a component this project hosts`);
      if (n.type === "Slot" && !(doc.slots ?? []).includes(String(n.props?.name))) bad(path + ".props.name", `"${String(n.props?.name)}" is not a slot this document declares`);
      if (isInteractable(n.type, prim, Object.keys(n.on ?? {}).length > 0) || (n.type === "Text" && n.on?.click)) {
        const tid = n.props?.[TID] as Json | undefined;
        const typeOk = (s: string) => TESTID.types.some((t) => s.endsWith("-" + t));
        if (tid === undefined) bad(`${path}.props.${TID}`, `${n.type} is interactable: it needs a ${TID}, {context}-{element}-{type}`);
        else if (typeof tid === "string") {
          if (!TESTID.pattern.test(tid) || !typeOk(tid)) bad(`${path}.props.${TID}`, `"${tid}" is not {context}-{element}-{type} with a type of ${TESTID.types.join(", ")}`);
          else if (seenIds.has(tid)) bad(`${path}.props.${TID}`, `"${tid}" is used twice in this document`);
          seenIds.add(tid);
        } else if (isExpr(tid) && opOf(tid) === "concat") {
          const parts = (tid as { concat: Json[] }).concat; const last = parts[parts.length - 1], first = parts[0];
          // the context is a literal, or a value the document is given (a component's testId parameter); the type is always a literal at the end
          const contextOk = (typeof first === "string" && /^[a-z0-9]+(-[a-z0-9]+)*-$/.test(first)) || (isExpr(first) && opOf(first) === "bind");
          if (!contextOk || typeof last !== "string" || !typeOk(last)) bad(`${path}.props.${TID}`, `a dynamic ${TID} starts with its kebab-case context (a literal, or a bound parameter) and ends with -{type}`);
        }
      }
      for (const [k, v] of Object.entries(n.props ?? {})) {
        const kind = prim.props[k];
        if (!kind) { if (!prim.open) bad(`${path}.props.${k}`, `${n.type} has no property "${k}"`); else if (/^on[A-Z]/.test(k)) bad(`${path}.props.${k}`, `an event is wired with on.${k[2].toLowerCase() + k.slice(3)}, not as a prop`); else expr(v, `${path}.props.${k}`, inner); continue; }
        if (kind === "node" || kind === "any") { if (isNode(v)) walk(v as Node, `${path}.props.${k}`, inner, depth + 1); else if (isNodes(v)) (v as Node[]).forEach((c, i) => walk(c, `${path}.props.${k}[${i}]`, inner, depth + 1)); else loose(v, `${path}.props.${k}`, inner); continue; }
        if (isExpr(v) || Array.isArray(v)) expr(v, `${path}.props.${k}`, inner);
        else if (kind === "position") { if (n.type === "Stack") bad(`${path}.props.${k}`, "a Stack sizes with `size`, not `position`: position is for every other surface"); if (typeof v !== "string") bad(`${path}.props.${k}`, "position is a string"); else for (const one of v.split(/\s+/)) if (!POSITIONS.includes(one)) bad(`${path}.props.${k}`, `"${one}" is not a position`); }
        else if (typeof kind === "string") { if (typeof v !== kind) bad(`${path}.props.${k}`, `${k} is a ${kind}`); }
        else if (!kind.enum.includes(String(v))) bad(`${path}.props.${k}`, `${k} is one of ${kind.enum.join(", ")}`);
      }
      for (const ev of Object.keys(n.on ?? {})) { if (!prim.open && !prim.events.includes(ev)) bad(`${path}.on.${ev}`, `${n.type} has no event "${ev}"`); else actions(n.on![ev], `${path}.on.${ev}`, new Set([...inner, "event"])); }
      if (n.children?.length && !prim.container) bad(path, `${n.type} has no children`);
      (n.children ?? []).forEach((c, i) => walk(c, `${path}.children[${i}]`, inner, depth + 1));
    } else if (n.use) {
      const versions = reg.components[n.use.component];
      if (!versions) return bad(path, `unknown component "${n.use.component}"`);
      if (n.use.version !== "latest" && !versions[n.use.version]) bad(path, `${n.use.component} has no version ${n.use.version}`);
      const target = versions[n.use.version === "latest" ? Math.max(...Object.keys(versions).map(Number)) : n.use.version] ?? Object.values(versions)[0];
      for (const [k, v] of Object.entries(n.args ?? {})) { if (!(target.params ?? []).includes(k)) bad(`${path}.args.${k}`, `${n.use.component} has no parameter "${k}"`); expr(v, `${path}.args.${k}`, inner); }
      for (const ev of Object.keys(n.on ?? {})) { if (!(target.emits ?? []).includes(ev)) bad(`${path}.on.${ev}`, `${n.use.component} does not emit "${ev}"`); else actions(n.on![ev], `${path}.on.${ev}`, new Set([...inner, "event"])); }
      if (n.children?.length) bad(path, "a reference takes arguments and slots, not children");
      for (const [slot, nodes] of Object.entries(n.slots ?? {})) {
        if (!(target.slots ?? []).includes(slot)) { bad(`${path}.slots.${slot}`, `${n.use.component} has no slot "${slot}"`); continue; }
        (nodes ?? []).forEach((c, i) => walk(c, `${path}.slots.${slot}[${i}]`, inner, depth + 1));
      }
    }
  };
  walk(doc.root, "root", base, 0);
  return out;
}
