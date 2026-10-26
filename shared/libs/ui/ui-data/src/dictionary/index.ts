// THE DICTIONARY — what a document may say, as data: the operations of the expression language, the keys of a node, the actions, the limits, the naming law of a test id.
// Pure data, no React: the validator, the interpreter and the agents' documentation read the same lists. The components a node may name are not here: the libraries are that registry
// (their props schemas), read by schema/.

/** the operations of the expression language: one key, the operation */
export const OPS = ["bind", "eq", "ne", "gt", "gte", "lt", "lte", "and", "or", "not", "in", "concat", "count", "exists", "upper", "lower", "initials", "if", "anyPrefix", "pluck", "map", "obj", "prepend", "join", "split", "append", "without", "includes", "add", "sub", "mul", "div", "filter", "find", "first", "stripHtml", "format"] as const;

/** the keys of a node */
export const NODE_KEYS = new Set(["type", "use", "props", "args", "slots", "children", "when", "repeat", "on"]);
/** the keys of a document */
export const DOC_KEYS = ["kind", "schemaVersion", "name", "version", "surface", "params", "emits", "slots", "data", "state", "calc", "root"] as const;
/** the actions a document may run: the document's own bookkeeping, the three moves on the frame, the product's actions, and a condition */
export const ACTIONS = ["set", "emit", "navigate", "setStorage", "moveWorld", "dispatch", "when"] as const;
/** the nodes that are not library components: HTML the web has no component for, and the two every surface has */
export const BUILTIN_NODES = { web: ["Fragment", "Slot", "Form", "Text", "Img", "Html"], mobile: ["Fragment", "Slot"] } as const;
/** the size limits of a document */
export const LIMITS = { nodes: 400, depth: 24 };

/** The e2e docs' naming law for data-testid: `{context}-{element}-{type}`, kebab-case. Every interactable node carries one; UI Play and the tests address elements by it. */
export const TESTID = {
  /** a Text is interactable when it handles a click */
  types: ["input", "select", "btn", "link", "tab", "form", "check", "menu", "radio", "switch", "editor", "pagination", "dialog", "card", "row"] as const,
  pattern: /^[a-z0-9]+(-[a-z0-9]+){2,}$/,
};
