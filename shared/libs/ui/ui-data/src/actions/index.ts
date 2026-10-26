// The actions of a document and how they run: the document's own bookkeeping (set, emit), and the three moves on the frame (navigate, setStorage, moveWorld) and the product's
// actions (dispatch), through the binding.
import type { Binding, Json } from "../types";
import { evalExpr, isExpr, opOf, type Scope } from "../expr";

type Any = Record<string, unknown>;
export interface Runtime { states: Record<string, Record<string, Json>>; setState: (instance: string, key: string, value: Json) => void }
/** what an action runs against: the binding, and what its hook gave */
export interface Env { b: Binding; e: unknown }

export async function run(list: Json[] | undefined, scope: Scope, instance: string, rt: Runtime, env: Env, emit: (event: string, payload: Any) => void): Promise<void> {
  for (const a of list ?? []) {
    if (!isExpr(a)) continue;
    if ("when" in a) { if (evalExpr(a.when, scope)) await run(a.do as Json[], scope, instance, rt, env, emit); continue; }
    const op = opOf(a);
    if (op === "set") { const s = a.set as { state: string; to: Json }; rt.setState(instance, s.state, evalExpr(s.to, scope) as Json); }
    else if (op === "navigate") { const to = String(evalExpr((a.navigate as { to: Json }).to, scope)); if (to.startsWith("/")) await env.b.navigate(env.e, to); }
    else if (op === "setStorage") { const w = a.setStorage as { key: string; to: Json }; env.b.setStorage?.(w.key, String(evalExpr(w.to, scope) ?? "")); }
    else if (op === "moveWorld") { const m = a.moveWorld as { world?: Json; at: Json }; env.b.moveWorld?.({ ...(m.world !== undefined ? { slug: String(evalExpr(m.world, scope)) } : {}), at: evalExpr(m.at, scope) as string | number }); }
    else if (op === "emit") { const e = a.emit as { event: string; payload?: Record<string, Json> }; emit(e.event, Object.fromEntries(Object.entries(e.payload ?? {}).map(([k, v]) => [k, evalExpr(v, scope)]))); }
    else if (op === "dispatch") {
      const d = a.dispatch as { action: string; args?: Record<string, Json>; pending?: string; then?: Json[]; else?: Json[] };
      if (d.pending) rt.setState(instance, d.pending, true);
      try {
        const result = await env.b.actions[d.action](env.e, Object.fromEntries(Object.entries(d.args ?? {}).map(([k, v]) => [k, evalExpr(v, scope)])));
        await run(d.then, { ...scope, result }, instance, rt, env, emit);
      } catch (e) { await run(d.else, { ...scope, error: env.b.errText(e) }, instance, rt, env, emit); }
      finally { if (d.pending) rt.setState(instance, d.pending, false); }
    }
  }
}
