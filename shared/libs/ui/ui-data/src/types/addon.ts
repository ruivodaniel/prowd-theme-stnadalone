// An addon: what ONE unit of the UI as data migration adds to the project's binding, in its own folder (projects/<p>/shared/ui-data/units/<unit>/addon.tsx),
// so units written side by side never edit the same file. The binding merges every addon it finds. Everything is optional.
// Components are never added here: a document names the library's components by their own names, and the library is the registry.
type Any = Record<string, unknown>;
export interface Addon {
  /** data contracts the unit's documents read. `read` is a HOOK: it is called for every contract of every document, always in the same order, so it must call its hooks unconditionally and return undefined for a source that is not its own. */
  contracts?: Record<string, { params: string[]; doc: string; read: (params: Any, enabled: boolean) => unknown }>;
  /** actions the unit's documents dispatch */
  actions?: Record<string, { args: string[]; capability: { verb: string; target: string } | null; doc: string; run: (env: unknown, args: Any) => Promise<unknown> }>;
}
