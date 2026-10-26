// What a document may reach beyond its own tree: data contracts (read) and actions (effects). The type lives in the library; the catalog itself is the project's (its binding):
// a document names these, it never calls the API.
export interface Catalog {
  CONTRACTS: Record<string, { params: string[]; doc: string }>;
  ACTIONS: Record<string, { args: string[]; capability: { verb: string; target: string } | null; doc: string }>;
}
