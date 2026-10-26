// The expression language of a document: a JSON tree, no functions of its own, no loops, a step budget.
// A value is a literal (string, number, boolean, null) or one of these objects (one key, the operation).
export type Scope = Record<string, unknown>;
import { OPS } from "../dictionary";
export { OPS };
export type Op = (typeof OPS)[number];
export const MAX_DEPTH = 10, MAX_STEPS = 4000;

const get = (scope: Scope, path: string): unknown => path.split(".").reduce<unknown>((o, k) => (o !== null && o !== undefined && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), scope);
export const isExpr = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === "object" && !Array.isArray(v);
export const opOf = (e: Record<string, unknown>): string | null => { const k = Object.keys(e); return k.length === 1 ? k[0] : null; };

export function evalExpr(e: unknown, scope: Scope, budget = { n: 0 }): unknown {
  if (++budget.n > MAX_STEPS) throw new Error("expression budget exceeded");
  if (Array.isArray(e)) return e.map((x) => evalExpr(x, scope, budget));
  if (!isExpr(e)) return e;
  const op = opOf(e) as Op;
  // an object with more than one key (or none) is a plain object: a record whose values are evaluated (a `style`, a `query`)
  if (!op || !(OPS as readonly string[]).includes(op)) return Object.fromEntries(Object.entries(e).map(([k, v]) => [k, evalExpr(v, scope, budget)]));
  const arg = e[op];
  if (op === "bind") return get(scope, String(arg));
  if (op === "obj") return Object.fromEntries(Object.entries(arg as Record<string, unknown>).map(([k, v]) => [k, evalExpr(v, scope, budget)]));
  if (op === "map") { const [list, tpl] = arg as unknown[]; const l = evalExpr(list, scope, budget); return Array.isArray(l) ? l.map((item) => evalExpr(tpl, { ...scope, item }, budget)) : []; }
  // a predicate over each item (`item` in scope): the items it holds for, or the first
  if (op === "filter" || op === "find") { const [list, pred] = arg as unknown[]; const l = evalExpr(list, scope, budget); const hit = (item: unknown) => !!evalExpr(pred, { ...scope, item }, budget); return !Array.isArray(l) ? (op === "filter" ? [] : undefined) : op === "filter" ? l.filter(hit) : l.find(hit); }
  const a = (Array.isArray(arg) ? arg : [arg]).map((x) => evalExpr(x, scope, budget));
  switch (op) {
    case "eq": return a[0] === a[1];
    case "ne": return a[0] !== a[1];
    case "gt": return Number(a[0]) > Number(a[1]);
    case "gte": return Number(a[0]) >= Number(a[1]);
    case "lt": return Number(a[0]) < Number(a[1]);
    case "lte": return Number(a[0]) <= Number(a[1]);
    case "and": return a.every(Boolean);
    case "or": return a.some(Boolean);
    case "not": return !a[0];
    case "in": return Array.isArray(a[1]) ? a[1].includes(a[0]) : false;
    case "concat": return a.map((x) => (Array.isArray(x) ? x.join(", ") : x ?? "")).join("");
    case "count": return typeof a[0] === "string" ? a[0].length : Array.isArray(a[0]) ? a[0].length : 0;
    case "exists": return a[0] !== undefined && a[0] !== null && a[0] !== "";
    case "upper": return String(a[0] ?? "").toUpperCase();
    case "lower": return String(a[0] ?? "").toLowerCase();
    case "initials": return String(a[0] ?? "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    case "if": return a[0] ? a[1] : a[2];
    case "anyPrefix": return Array.isArray(a[0]) ? a[0].some((x) => String(x).startsWith(String(a[1]))) : false;
    case "pluck": return Array.isArray(a[0]) ? a[0].map((x) => (x as Record<string, unknown>)?.[String(a[1])]) : [];
    case "prepend": return [a[0], ...(Array.isArray(a[1]) ? a[1] : [])];
    case "join": return (Array.isArray(a[0]) ? a[0] : []).join(String(a[1] ?? ", "));
    case "split": return String(a[0] ?? "").split(String(a[1] ?? ",")).map((x) => x.trim()).filter(Boolean);
    case "append": return [...(Array.isArray(a[0]) ? a[0] : []), a[1]];
    case "without": return (Array.isArray(a[0]) ? a[0] : []).filter((x) => x !== a[1]);
    case "includes": return String(a[0] ?? "").toLowerCase().includes(String(a[1] ?? "").toLowerCase());
    case "add": return Number(a[0] ?? 0) + Number(a[1] ?? 0);
    case "sub": return Number(a[0] ?? 0) - Number(a[1] ?? 0);
    case "mul": return Number(a[0] ?? 0) * Number(a[1] ?? 0);
    case "div": return Number(a[1]) === 0 ? 0 : Number(a[0] ?? 0) / Number(a[1]);
    case "first": return Array.isArray(a[0]) ? a[0][0] : undefined;
    case "stripHtml": return String(a[0] ?? "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+\n/g, "\n").trim();
    case "format": return formatValue(a[0], String(a[1] ?? "number"));
    default: throw new Error("unknown operation " + String(op));
  }
}

/** a value for people: dates and numbers. `kind` is date | datetime | time | number | percent | <currency code> (EUR, USD…) */
function formatValue(v: unknown, kind: string): string {
  if (v === undefined || v === null || v === "") return "";
  if (kind === "date" || kind === "datetime" || kind === "time") {
    const d = new Date(v as string); if (isNaN(d.getTime())) return String(v);
    return d.toLocaleString("en-GB", kind === "date" ? { day: "numeric", month: "short", year: "numeric" } : kind === "time" ? { hour: "2-digit", minute: "2-digit" } : { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  const n = Number(v); if (isNaN(n)) return String(v);
  if (kind === "percent") return new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 }).format(n);
  if (/^[A-Z]{3}$/.test(kind)) return new Intl.NumberFormat("en-GB", { style: "currency", currency: kind }).format(n);
  return new Intl.NumberFormat("en-GB").format(n);
}

/** every `bind` root an expression reads (for validation and dependencies); `item` belongs to the template of a map */
export function bindRoots(e: unknown, out = new Set<string>(), inMap = false): Set<string> {
  if (Array.isArray(e)) { e.forEach((x) => bindRoots(x, out, inMap)); return out; }
  if (!isExpr(e)) return out;
  const op = opOf(e);
  if (!op || !(OPS as readonly string[]).includes(op)) { Object.values(e).forEach((x) => bindRoots(x, out, inMap)); return out; }
  if (op === "bind") { const root = String(e.bind).split(".")[0]; if (!(inMap && root === "item")) out.add(root); }
  else if (op === "obj") Object.values(e.obj as Record<string, unknown>).forEach((x) => bindRoots(x, out, inMap));
  else if (op === "map" || op === "filter" || op === "find") { const [l, t] = e[op] as unknown[]; bindRoots(l, out, inMap); bindRoots(t, out, true); }
  else for (const x of Array.isArray(e[op]) ? (e[op] as unknown[]) : [e[op]]) bindRoots(x, out, inMap);
  return out;
}
export const depthOf = (e: unknown): number => {
  if (Array.isArray(e)) return Math.max(0, ...e.map(depthOf));
  if (!isExpr(e)) return 0;
  const op = opOf(e);
  if (!op || !(OPS as readonly string[]).includes(op)) return 1 + Math.max(0, ...Object.values(e).map(depthOf));
  if (op === "bind") return 1;
  if (op === "obj") return 1 + Math.max(0, ...Object.values(e.obj as Record<string, unknown>).map(depthOf));
  return 1 + Math.max(0, ...(Array.isArray(e[op]) ? (e[op] as unknown[]) : [e[op]]).map(depthOf));
};
