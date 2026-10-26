// The catalog registry — the library's fixtures, discovered by glob through
// the map (imported, never copied). Four layers, each its own folder and
// its own status file (written by hand, keyed by fixture name).
// Schemas come from the library itself: every `<component>/types.ts`.
import type { ComponentType } from "react";
import type { ComponentSchema } from "@libs/web-components";
import statusComponents from "./status.json";
import statusFoundations from "./status.foundations.json";
import statusPatterns from "./status.patterns.json";
import statusLayouts from "./status.layouts.json";
import statusPages from "./status.pages.json";
import type { Doc } from "@libs/ui-data/types";
import { dataFixture } from "./data-fixture";
import { findFixtures } from "@libs/ui-fixtures/scan";
/** the check pages come in this order: the mix of components, then the others by name */
const PAGE_ORDER = ["mix-of-components"];

export type Layer = "foundations" | "components" | "patterns" | "layouts" | "pages";
export const LAYERS: Layer[] = ["foundations", "components", "patterns", "layouts", "pages"];

export interface CatalogStatus {
  /** "pending" until reviewed */
  status: string;
  note?: string;
}

export interface CatalogEntry {
  layer: Layer;
  /** "components/controls/button", "foundations/colors" — the URL id */
  id: string;
  group: string;
  name: string;
  Fixture: ComponentType;
  status: CatalogStatus;
}

type Mods = Record<string, unknown>;
const globs: Record<Layer, Mods> = {
  foundations: import.meta.glob("@libs/ui-fixtures/foundations/*.tsx", { eager: true }),
  components: import.meta.glob("@libs/ui-fixtures/elements/*/*.tsx", { eager: true }),
  // patterns and layouts are UI as data: a fixture is a folder with an index.json (any depth, found by the library's own scan); the other .json beside it are its parts
  patterns: import.meta.glob("@libs/ui-fixtures/patterns/**/*.json", { eager: true }),
  layouts: import.meta.glob("@libs/ui-fixtures/layouts/**/*.json", { eager: true }),
  // whole pages, static (the check mode): the same folder shape
  pages: import.meta.glob("@libs/ui-fixtures/pages/**/*.json", { eager: true }),
};
const status: Record<Layer, Record<string, CatalogStatus>> = {
  foundations: statusFoundations,
  components: statusComponents,
  patterns: statusPatterns,
  layouts: statusLayouts,
  pages: statusPages,
};

/** The six layout archetypes shown on top, in this order; every other layout
 *  fixture is a single region shown below. */
const ARCHETYPES = ["full-anatomy", "anatomy-soft", "anatomy-paneled", "anatomy-framed", "content", "content-nav", "content-panel", "focus", "auth"];
const archIdx = (name: string) => { const i = ARCHETYPES.indexOf(name); return i === -1 ? 99 : i; };

/** a pattern or layout fixture: the folder's index.json, drawn by the engine with the folder's other documents as its parts (the rule is the library's, scan.ts) */
const dataEntries = (layer: "patterns" | "layouts" | "pages") => {
  const byRel = new Map(Object.entries(globs[layer]).map(([path, mod]) => [path.slice(path.indexOf(`/${layer}/`) + layer.length + 2), (mod as { default: Doc }).default]));
  return findFixtures([...byRel.keys()]).map((f) => ({ name: f.name, Fixture: dataFixture(byRel.get(f.entry)!, f.parts.map((p) => byRel.get(p)!)) }));
};

export const entries: CatalogEntry[] = LAYERS.flatMap((layer): CatalogEntry[] =>
  (layer === "patterns" || layer === "layouts" || layer === "pages"
    ? dataEntries(layer)
    : Object.entries(globs[layer]).map(([path, mod]) => {
        const [file, folder] = path.split("/").reverse();
        return { name: file.replace(/\.tsx$/, ""), folder, Fixture: (mod as { default: ComponentType }).default };
      })
  )
    .map((x) => {
      const folder = "folder" in x ? (x as { folder: string }).folder : "";
      const name = x.name;
      const group = layer === "components" ? folder : layer === "layouts" ? (ARCHETYPES.includes(name) ? "archetypes" : name === "stack" ? "primitives" : "regions") : layer;
      const id = layer === "components" ? `${layer}/${group}/${name}` : `${layer}/${name}`;
      return { layer, id, group, name, Fixture: x.Fixture, status: status[layer][name] ?? { status: "pending" } };
    })
    .filter((e) => !e.name.startsWith("_"))
    .sort((a, b) => {
      if (a.layer === "layouts" && b.layer === "layouts") {
        const d = archIdx(a.name) - archIdx(b.name);
        if (d !== 0) return d;
      }
      if (a.layer === "pages" && b.layer === "pages") {
        const ia = PAGE_ORDER.indexOf(a.name), ib = PAGE_ORDER.indexOf(b.name);
        if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      }
      return a.id.localeCompare(b.id);
    }),
);

export const byLayer = (layer: Layer) => entries.filter((e) => e.layer === layer);
export const groupsOf = (layer: Layer) => [...new Set(byLayer(layer).map((e) => e.group))];

/** Find by id; an id without a layer prefix is an old components id ("controls/button"). */
export function find(id: string): CatalogEntry | undefined {
  if (!id) return entries.find((e) => e.layer === "components");
  const withLayer = LAYERS.some((l) => id.startsWith(`${l}/`)) ? id : `components/${id}`;
  return entries.find((e) => e.id === withLayer) ?? (LAYERS.includes(id as Layer) ? byLayer(id as Layer)[0] : undefined);
}

// ── Component schemas ────────────────────────────────────────────────────────
// One folder per component in the library; its types.ts exports the schemas.
// Keyed by folder so a fixture finds exactly its component's schemas.
const typeMods = import.meta.glob(["@libs/web-components-src/*/types.ts", "@libs/web-components-src/_deprecated/*/types.ts"], { eager: true }) as Record<string, Record<string, unknown>>;
const isSchema = (v: unknown): v is ComponentSchema =>
  typeof v === "object" && v !== null && "component" in v && "props" in v;

const schemasByFolder: Record<string, ComponentSchema[]> = Object.fromEntries(
  Object.entries(typeMods).map(([path, m]) => [path.split("/").at(-2) ?? "", Object.values(m).filter(isSchema)]),
);

/** Schemas for a fixture: its component folder (exact name, else the folder that starts with "<name>-"). */
export function schemasFor(name: string): ComponentSchema[] {
  const folder = schemasByFolder[name] ? name : Object.keys(schemasByFolder).find((f) => f.startsWith(`${name}-`));
  return folder ? [...schemasByFolder[folder]].sort((a, b) => a.component.localeCompare(b.component)) : [];
}
