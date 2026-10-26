// What the validator and the interpreter know of a node type.
/** the surface a document is for: it names the library package the interpreter draws it with */
export type Surface = "web" | "mobile";

export type Kind = "position" | "string" | "number" | "boolean" | "node" | "any" | { enum: string[] };
/** what the validator knows of one node type */
export interface Prim {
  props: Record<string, Kind>;
  /** the events it hands up (`on.<name>` in a document = the component's `on<Name>` callback); a library component may hand up any event its package implements, so this list is advisory there */
  events: string[];
  container: boolean;
  /** a library component: props not listed here are its HTML and pass-through props, allowed; a built-in or a project component lists everything */
  open?: boolean;
  /** needs a testid, like Button and Input */
  interactable?: boolean;
}
