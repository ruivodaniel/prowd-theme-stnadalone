// A fixture that is UI as data: the library's own JSON documents (fixtures/patterns/<name>/index.json, layouts/<name>/index.json; the other documents of the folder are its parts, which it `use`s), drawn by the engine with an empty binding —
// a pattern or a layout reads no contract and runs no action. The code fixture of the same name stays in the library; the catalog reads the data ones.
import type { ComponentType } from "react";
import { DocumentScreen } from "@libs/ui-data/runtime";
import type { Binding, Doc, Registry } from "@libs/ui-data/types";

const binding: Binding = {
  Provider: ({ children }) => <>{children}</>,
  hosted: {},
  useContract: () => undefined,
  useEnv: () => ({}),
  actions: {},
  navigate: async () => {},
  errText: (e) => String(e),
  useScopeKey: () => "fixture",
  catalog: { CONTRACTS: {}, ACTIONS: {} },
};

export const dataFixture = (doc: Doc, parts: Doc[] = []): ComponentType => {
  const registry: Registry = { pages: {}, components: {} };
  for (const d of [doc, ...parts]) (registry.components[d.name] ??= {})[d.version] = d;
  return function DataFixture() { return <DocumentScreen doc={doc} registry={registry} binding={binding} />; };
};
