/**
 * Isomorphic types — the shared vocabulary for list endpoints.
 *
 * Imported by backend (zod factory, Drizzle helpers) and frontend
 * (URLSearchParams serializer, API client type contracts) alike.
 */

/**
 * Direction for a single sort field.
 */
export type SortDirection = "asc" | "desc";

/**
 * A single parsed sort field with its direction.
 *
 * Produced by `parseSortString` from the raw query param, e.g.
 *   "-createdAt" → { field: "createdAt", direction: "desc" }
 */
export interface SortSpec {
  field: string;
  direction: SortDirection;
}

/**
 * The base shape every list endpoint's validated query extends.
 *
 * - `page` / `pageSize` always have values (defaults applied by validator).
 * - `sort` is always a non-empty array (the default sort is injected when
 *   the client sent none).
 * - `search` is only present when the endpoint declares `searchable: true`.
 */
export interface ListQueryBase {
  page: number;
  pageSize: number;
  sort: SortSpec[];
  search?: string;
}

/**
 * The uniform response envelope every list endpoint returns.
 *
 * - `rows`: the sliced window for the current page.
 * - `total`: the full count under the exact same scope/where filters as
 *   the list query. Past-end pages return `{ rows: [], total: <real> }`
 *   (never 404).
 */
export interface ListResponse<T> {
  rows: T[];
  total: number;
}
