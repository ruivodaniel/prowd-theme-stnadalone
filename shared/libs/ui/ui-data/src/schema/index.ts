// What a document may name as a node `type`: the library's components, by their own names, with their own props and events, read from the packages'
// props schemas (defineProps); the layout regions the same way; five built-in HTML nodes the library has no component for; and the project's own
// components (its binding names them, with their schema). Nothing here lists a library component: a new component in the library is usable the moment it exists.
import * as components from "@libs/web-components";
import * as layouts from "@libs/web-layouts";
import * as mobileSchemas from "@libs/mobile-components/schemas";
import * as mobileLayoutSchemas from "@libs/mobile-layouts/schemas";
import { ListPagination, listPaginationSchema } from "@libs/list-query/client";
import { RichTextEditor } from "@libs/rich-text-editor";
import { POSITION } from "@libs/ui-types";
import type { Kind, Prim, Surface } from "../types";
export type { Kind, Prim, Surface } from "../types";
export { LIMITS, TESTID } from "../dictionary";

/** the markup axis: where a surface stands in its parent and how much it takes — the library's closed list */
export const POSITIONS = [...POSITION] as string[];
const common = { "data-testid": "string" as Kind, id: "string" as Kind, position: "position" as Kind, concept: "string" as Kind, key: "string" as Kind, children: "any" as Kind };
/** what every mobile component takes: React Native's test id and style */
const commonMobile = { testID: "string" as Kind, style: "any" as Kind, key: "string" as Kind, children: "any" as Kind };
/** the test id prop of a surface: the web's data attribute, React Native's testID */
export const testIdProp = (surface: Surface) => (surface === "mobile" ? "testID" : "data-testid");

/** the five built-in nodes: HTML the library has no component for. `Text` is any text tag with the theme's `element` attribute; it takes every HTML attribute. */
export const BUILTINS: Record<string, Prim> = {
  Fragment: { props: {}, events: [], container: true },
  Slot: { props: { name: "string" }, events: [], container: false },
  Form: { props: { ...common }, events: ["submit"], container: true, interactable: true },
  Text: { props: { ...common, as: "string", element: "string", emphasis: "string", status: "string", state: "string", href: "string", target: "string", rel: "string", role: "string", htmlFor: "string", "aria-current": "string", "aria-label": "string", style: "any", className: "string" }, events: ["click"], container: true },
  Img: { props: { ...common, src: "string", alt: "string", width: "number", height: "number" }, events: [], container: false },
  Html: { props: { ...common, html: "string", element: "string", className: "string" }, events: [], container: false },
};

type Meta = { kind: string; values?: readonly string[] };
type Schema = { component: string; props: Record<string, Meta> };
const kindOf = (m: Meta): Kind | null => m.kind === "enum" && m.values ? { enum: [...m.values] } : m.kind === "string" || m.kind === "number" || m.kind === "boolean" || m.kind === "node" ? m.kind : m.kind === "function" ? null : "any";
/** the Prim of one library component, from its props schema: a function prop `onX` is the event `x`; everything else is a prop of its kind */
export function primOf(s: Schema, surface: Surface = "web"): Prim {
  const props: Record<string, Kind> = { ...(surface === "mobile" ? commonMobile : common) }, events: string[] = [];
  for (const [name, m] of Object.entries(s.props)) {
    if (m.kind === "function") { if (/^on[A-Z]/.test(name)) events.push(name[2].toLowerCase() + name.slice(3)); continue; }
    const k = kindOf(m); if (k) props[name] = k;
  }
  return { props, events, container: true, open: true };
}
const schemasOf = (mod: Record<string, unknown>): Schema[] => Object.entries(mod).filter(([k, v]) => k.endsWith("Schema") && v && typeof v === "object" && "component" in (v as object)).map(([, v]) => v as Schema);
/** every library component the interpreter can draw, by name: the components package, the layouts package, the list-query client */
const richTextEditorSchema: Schema = { component: "RichTextEditor", props: { content: { kind: "string" }, placeholder: { kind: "string" }, onChangeHtml: { kind: "function" } } };
export const LIBRARY: Record<string, Prim> = Object.fromEntries([...schemasOf(components as never), ...schemasOf(layouts as never), listPaginationSchema as unknown as Schema, richTextEditorSchema].map((s) => [s.component, primOf(s)]));
/** the components themselves, by the same names */
export const COMPONENTS: Record<string, unknown> = { ...Object.fromEntries(Object.entries({ ...(layouts as object), ...(components as object) }).filter(([k, v]) => /^[A-Z]/.test(k) && (typeof v === "function" || (v && typeof v === "object" && "$$typeof" in (v as object))))), ListPagination, RichTextEditor };
// ── mobile: the same tables for the mobile library. Its schemas are pure data (read here, and by a node script); its components come through React Native Web, loaded when a mobile document is first asked for.
/** the two built-ins of a mobile document: no HTML here, `Text` is the library's */
export const BUILTINS_MOBILE: Record<string, Prim> = { Fragment: BUILTINS.Fragment, Slot: BUILTINS.Slot };
export const LIBRARY_MOBILE: Record<string, Prim> = Object.fromEntries([...schemasOf(mobileSchemas as never), ...schemasOf(mobileLayoutSchemas as never)].map((s) => [s.component, primOf(s, "mobile")]));
let mobileComponents: Record<string, unknown> | null = null;
/** the mobile components, once loaded (ensureSurface("mobile") first) */
export const componentsOf = (surface: Surface): Record<string, unknown> => (surface === "mobile" ? (mobileComponents ?? {}) : COMPONENTS);
export const libraryOf = (surface: Surface): Record<string, Prim> => (surface === "mobile" ? LIBRARY_MOBILE : LIBRARY);
export const builtinsOf = (surface: Surface): Record<string, Prim> => (surface === "mobile" ? BUILTINS_MOBILE : BUILTINS);
/** loads what a surface draws with; the web is always there, the mobile library comes in its own chunk */
export async function ensureSurface(surface: Surface): Promise<void> {
  if (surface !== "mobile" || mobileComponents) return;
  const [c, l] = await Promise.all([import("@libs/mobile-components"), import("@libs/mobile-layouts")]);
  mobileComponents = Object.fromEntries(Object.entries({ ...(l as object), ...(c as object) }).filter(([k, v]) => /^[A-Z]/.test(k) && (typeof v === "function" || (v && typeof v === "object" && "$$typeof" in (v as object)))));
}

/** interactable: a library component that hands up events, and a Form */
/** interactable — a test or a play addresses it, so it needs a test id: a Form; a control that takes input (its schema hands back a value); any library component the document wires an event on (a pressed card, a row) */
export const isInteractable = (type: string, prim: Prim, wired = false) => !!prim.interactable || (!!prim.open && !NOT_INTERACTABLE.has(type) && (wired || prim.events.some((e) => INPUT_EVENTS.has(e))));
/** the events of a control that takes input */
const INPUT_EVENTS = new Set(["change", "changeText", "checkedChange", "valueChange", "pageChange"]);
/** wiring with events but no element of its own to address, or a component that takes no test id */
const NOT_INTERACTABLE = new Set(["Tabs", "Sheet", "AlertDialog", "SidebarProvider", "DropdownMenu", "RadioGroup", "RichTextEditor", "ChoiceGroup", "ListPagination"]);   // a pagination names its buttons by its own id
