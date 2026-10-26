// What a document is drawn with, beyond its own tree: the snapshot it serves, the locked component versions, and the project's binding.
import type * as React from "react";
import type { Json } from "./doc";
import type { Catalog } from "./catalog";
import type { Prim } from "./prim";

type Any = Record<string, unknown>;

/** the UI entities snapshot this screen serves — given by the design that mounts the document */
export interface EntitiesSnapshot { activeUserId?: string; activeOrganizationId?: string; entities: Record<string, { table: string; ids: string[] }>; served?: Record<string, unknown>; state?: Record<string, Json> }
/** the component versions a snapshot was locked at: `latest` resolves through it; absent = the newest version (a live design) */
export type ComponentLock = Record<string, { version: number; hash: string }>;
/** What the engine cannot know about a project: its providers, its hosted primitives, how a contract is read and an action performed, what a snapshot's ids resolve to.
 *  The project's own binding (projects/<p>/shared/ui-host/binding.tsx) supplies it; the interpreter is generic. */
export interface Binding {
  /** mounts the product's providers around a screen, the way the product's own screens mount theirs */
  Provider: React.ComponentType<{ children: React.ReactNode }>;
  /** primitives the product hosts as React (a document names them like any primitive) */
  hosted: Record<string, React.ComponentType<Any>>;
  /** the data contracts: one hook, always the same hooks in the same order, the contract chosen by its name */
  useContract: (source: string, params: Any, enabled: boolean, entities: EntitiesSnapshot | null) => unknown;
  /** what an action needs (the API client, the router…) */
  useEnv: () => unknown;
  actions: Record<string, (env: unknown, args: Any) => Promise<unknown>>;
  navigate: (env: unknown, to: string) => Promise<void>;
  /** WRITE STORAGE: a key the pages read, kept until written again */
  setStorage?: (key: string, value: string) => void;
  /** MOVE THE WORLD: the feed answers from that moment from then on (this world, or another) */
  moveWorld?: (to: { slug?: string; at: string | number }) => void;
  errText: (e: unknown) => string;
  /** a screen is bound to this key: when it changes the document's instance remounts */
  useScopeKey: () => string;
  catalog: Catalog;
  /** how the viewer binds a page's parameters (e.g. the session row naming the viewer), by document name */
  pageApi?: Record<string, Any>;
  /** the schema entries of the hosted primitives: what props and events each takes (the validator reads them) */
  prims?: Record<string, Prim>;
}
