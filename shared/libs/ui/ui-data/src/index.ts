// @libs/ui-data — the pure parts: the document model, the expression language, the dictionary, the validator, the lock. No React here: a node script imports this.
// The interpreter (React) is `@libs/ui-data/runtime`; the schemas the validator reads come from the component libraries, through `@libs/ui-data/schema`.
export * from "./types";
export * from "./expr";
export * from "./dictionary";
export * from "./lock";
