import * as React from "react";
import { latest, type Binding, type ComponentLock, type Doc, type EntitiesSnapshot, type Json, type Node, type Registry, type Surface } from "../types";
import { evalExpr, isExpr, opOf, type Scope } from "../expr";
import { run, type Env, type Runtime } from "../actions";
import { builtinsOf, componentsOf } from "../schema";

export type { Binding, ComponentLock, EntitiesSnapshot } from "../types";

// The one trusted interpreter, running in the live viewer. A node's `type` names a library component (drawn by name from the package, with the
// document's props and its `on.<event>` wired to the component's `on<Event>`), one of five built-in HTML nodes, or a component the project's binding
// hosts. Data comes from the named contracts and effects from the named actions, both implemented by the binding against the project's API client.

type Any = Record<string, unknown>;

/** a text: an array of scalars reads as a list, nothing as nothing */
const flat = (v: unknown) => (Array.isArray(v) ? v.join(", ") : v === undefined || v === null ? "" : String(v));

const EntitiesContext = React.createContext<EntitiesSnapshot | null>(null);
const LockContext = React.createContext<ComponentLock | null>(null);
/** the content a referencing document handed to this component's slots, already drawn in the referencing document's scope */
const SlotsContext = React.createContext<Record<string, React.ReactNode> | null>(null);

/** the surface of the screen being drawn: the library package its nodes come from */
const SurfaceContext = React.createContext<Surface>("web");
/** the surface of the screen being drawn, for the binding (a product action may differ by surface: where "home" is) */
export const useSurface = () => React.useContext(SurfaceContext);

const BindingContext = React.createContext<Binding | null>(null);
const RegistryContext = React.createContext<Registry | null>(null);
const useBinding = () => React.useContext(BindingContext)!;
const useRegistry = () => React.useContext(RegistryContext)!;


/** one instance of a document (a page, or a component with its arguments): its own data and its own UI state */
function Instance({ doc, args, path, rt, emitters, slots }: { doc: Doc; args: Any; path: string; rt: Runtime; emitters?: Record<string, (payload: Any) => void>; slots?: Record<string, React.ReactNode> }) {
  const binding = useBinding();
  const env: Env = { b: binding, e: binding.useEnv() };
  const entitiesCtx = React.useContext(EntitiesContext);
  const state = { ...(doc.state ?? {}), ...(rt.states[path] ?? {}) } as Record<string, Json>;
  const scope: Scope = { ...args, state, data: {} as Any, calc: {} as Any };
  const calc = (): void => { for (const [k, c] of Object.entries(doc.calc ?? {})) { try { (scope.calc as Any)[k] = evalExpr(c, scope); } catch { (scope.calc as Any)[k] = undefined; } } };
  // data in order, the calc recomputed between: a later contract can depend on what an earlier one returned
  for (const [k, d] of Object.entries(doc.data ?? {})) {
    calc();
    let enabled = true, params: Any = {};
    try { enabled = d.when === undefined ? true : !!evalExpr(d.when, scope); params = Object.fromEntries(Object.entries(d.params ?? {}).map(([pk, pv]) => [pk, evalExpr(pv, scope)])); } catch { enabled = false; }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (scope.data as Any)[k] = binding.useContract(d.source, params, enabled, entitiesCtx);
  }
  calc();
  const view = <View node={doc.root} scope={scope} path={path} instance={path} rt={rt} env={env} emit={(e, p) => emitters?.[e]?.(p)} />;
  return slots ? <SlotsContext.Provider value={slots}>{view}</SlotsContext.Provider> : view;
}

const Err = ({ text }: { text: string }) => <span style={{ color: "#c0392b", fontSize: 11 }}>{text}</span>;
const isNode = (v: unknown): v is Node => !!v && typeof v === "object" && !Array.isArray(v) && ("type" in (v as object) || "use" in (v as object));
const isNodes = (v: unknown): v is Node[] => Array.isArray(v) && v.length > 0 && v.every(isNode);
/** an in-app link never navigates the frame natively: navigation is an action of the document */
const inApp = (href: unknown) => typeof href === "string" && href.startsWith("/");

/** one node. A parent that composes onto its child (Radix `asChild`) clones this element with its own props: they arrive as `extra` and go onto what is drawn. */
function View({ node, scope, path, instance, rt, env, emit, ...extra }: { node: Node; scope: Scope; path: string; instance: string; rt: Runtime; env: Env; emit: (e: string, p: Any) => void } & Any): React.ReactElement | null {
  const lock = React.useContext(LockContext);
  const mySlots = React.useContext(SlotsContext);
  const surface = React.useContext(SurfaceContext);
  const reg = useRegistry();
  const binding = useBinding();
  try {
    if (node.when !== undefined && !evalExpr(node.when, scope)) return null;
    if (node.repeat) {
      const list = evalExpr({ bind: node.repeat.each }, scope);
      const { repeat, ...rest } = node;
      return <>{(Array.isArray(list) ? list : []).map((item, i) => <View key={i} node={rest} scope={{ ...scope, [repeat.as]: item }} path={`${path}[${i}]`} instance={instance} rt={rt} env={env} emit={emit} />)}</>;
    }
    const draw = (nodes: Node[], at: string) => nodes.map((c, i) => <View key={i} node={c} scope={scope} path={`${at}.${i}`} instance={instance} rt={rt} env={env} emit={emit} />);
    if (node.use) {
      const versions = reg.components[node.use.component];
      const v = node.use.version === "latest" ? (lock?.[node.use.component]?.version ?? latest(reg, node.use.component)) : node.use.version;
      const doc = versions?.[v];
      if (!doc) return <Err text={`no ${node.use.component} version ${v}`} />;
      const args = Object.fromEntries(Object.entries(node.args ?? {}).map(([k, a]) => [k, evalExpr(a, scope)]));
      const emitters = Object.fromEntries(Object.entries(node.on ?? {}).map(([ev, list]) => [ev, (payload: Any) => { void run(list, { ...scope, event: payload }, instance, rt, env, emit); }]));
      const slots = Object.fromEntries(Object.entries(node.slots ?? {}).map(([name, nodes]) => [name, <SlotsContext.Provider key={name} value={mySlots}>{draw(nodes, `${path}/${name}`)}</SlotsContext.Provider>]));
      return <Instance doc={doc} args={args} path={`${path}/${node.use.component}@${v}`} rt={rt} emitters={emitters} slots={node.slots ? slots : undefined} />;
    }
    // the props: every value evaluated; a value that is a node (or nodes) is drawn — a prop of kind "node" (an icon, an action)
    const p: Any = {};
    for (const [k, v] of Object.entries(node.props ?? {})) {
      if (isNode(v)) p[k] = draw([v], `${path}.${k}`)[0];
      else if (isNodes(v)) p[k] = <>{draw(v, `${path}.${k}`)}</>;
      else p[k] = isExpr(v) || Array.isArray(v) ? evalExpr(v, scope) : v;
    }
    const { key, ...props } = p;
    // the content: the `children` nodes (one child stays one element, so a parent may compose onto it), else the `children` prop (a text)
    const drawn = node.children?.length ? draw(node.children, path) : null;
    const kids: React.ReactNode = drawn ? (drawn.length === 1 ? drawn[0] : drawn) : props.children !== undefined ? (React.isValidElement(props.children) ? props.children : flat(props.children)) : undefined;
    // what a composing parent handed down (its className, attributes, handlers): onto this node, under its own props
    const inherited = (mine: Any): Any => { const out: Any = { ...extra, ...mine }; for (const k of Object.keys(extra)) if (/^on[A-Z]/.test(k) && typeof mine[k] === "function" && typeof extra[k] === "function") out[k] = (...a: unknown[]) => { (extra[k] as (...a: unknown[]) => void)(...a); (mine[k] as (...a: unknown[]) => void)(...a); }; return out; };
    delete props.children;
    // the events: `on.<name>` is the component's `on<Name>`; the handler's first argument is `event` in the actions' scope
    const fire = (ev: string, event: unknown = undefined) => { void run(node.on?.[ev], { ...scope, event }, instance, rt, env, emit); };
    const handlers: Any = {};
    for (const ev of Object.keys(node.on ?? {})) handlers["on" + ev[0].toUpperCase() + ev.slice(1)] = (first: unknown) => fire(ev, first);
    const type = node.type as string;
    const k = typeof key === "string" || typeof key === "number" ? key : undefined;
    // 1. the built-ins: a fragment and a slot on any surface; on the web, the HTML the library has no component for
    if (type === "Fragment") return <React.Fragment key={k}>{kids}</React.Fragment>;
    if (type === "Slot") return <>{mySlots?.[props.name as string]}</>;
    const html = surface === "web";
    if (html && type === "Form") return <form key={k} {...(inherited(props) as object)} onSubmit={(e) => { e.preventDefault(); fire("submit"); }}>{kids}</form>;
    if (html && type === "Text") {
      const { as, ...attrs } = props;
      if (node.on?.click || inApp(attrs.href)) attrs.onClick = (e: React.MouseEvent) => { if (node.on?.click || inApp(attrs.href)) e.preventDefault(); fire("click"); };
      return React.createElement((as as string) ?? "span", { key: k, ...inherited(attrs) }, kids);
    }
    if (html && type === "Img") return <img key={k} {...(inherited(props) as object)} alt={(props.alt as string) ?? ""} />;
    if (html && type === "Html") { const { html: markup, ...attrs } = props; return <div key={k} {...(inherited(attrs) as object)} dangerouslySetInnerHTML={{ __html: String(markup ?? "") }} />; }
    // 2. a component the project hosts (its binding names it); 3. a library component, by name
    const H = binding.hosted[type] as React.ComponentType<Any> | undefined;
    const C = (H ?? componentsOf(surface)[type]) as React.ComponentType<Any> | undefined;
    if (!C) return <Err text={`unknown ${surface} component ${type}`} />;
    if (builtinsOf(surface)[type]) return <Err text={`${type} is a built-in`} />;
    return <C key={k} {...inherited({ ...props, ...handlers })} {...(H ? { fire } : {})}>{kids}</C>;
  } catch (e) { return <Err text={String(e)} />; }
}

/** a page document, mounted as a screen: the project's providers, the document registry, the lock and the UI entities snapshot it serves.
 *  The page is bound to the key the binding names (the product's rule: the active organization): when it changes the document's
 *  instance remounts, so every data contract asks again and every local state starts over. */
export function DocumentScreen({ doc, registry, binding, entities = null, lock = null }: { doc: Doc; registry: Registry; binding: Binding; entities?: EntitiesSnapshot | null; lock?: ComponentLock | null }) {
  return (
    <SurfaceContext.Provider value={doc.surface ?? "web"}>
    <React.Suspense fallback={null}>
    <BindingContext.Provider value={binding}>
      <RegistryContext.Provider value={registry}>
        <binding.Provider>
          <LockContext.Provider value={lock}>
            <EntitiesContext.Provider value={entities}>
              <ScopeBound doc={doc} />
            </EntitiesContext.Provider>
          </LockContext.Provider>
        </binding.Provider>
      </RegistryContext.Provider>
    </BindingContext.Provider>
    </React.Suspense>
    </SurfaceContext.Provider>
  );
}

function ScopeBound({ doc }: { doc: Doc }) {
  const key = useBinding().useScopeKey();
  return <Page_ key={key} doc={doc} />;
}

function Page_({ doc: declared }: { doc: Doc }) {
  // the screen starts from the state its snapshot serves (only the keys the document declares); it adds no logic
  const served = React.useContext(EntitiesContext)?.state;
  const doc = React.useMemo(() => (served ? { ...declared, state: { ...(declared.state ?? {}), ...Object.fromEntries(Object.entries(served).filter(([k]) => k in (declared.state ?? {}))) } } : declared), [declared, served]);
  const [states, setStates] = React.useState<Record<string, Record<string, Json>>>({});
  const rt: Runtime = React.useMemo(() => ({ states, setState: (inst, k, v) => setStates((s) => ({ ...s, [inst]: { ...(s[inst] ?? {}), [k]: v } })) }), [states]);
  return <Instance doc={doc} args={{}} path={`/${doc.name}`} rt={rt} />;
}
