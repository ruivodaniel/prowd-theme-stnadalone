/**
 * URLSearchParams serializer — frontend-only (but framework-agnostic).
 *
 * Accepts a loosely-typed list-query object and produces the
 * canonical query string for a list endpoint. Used by the FE API
 * adapter so every list call serializes page / pageSize / sort /
 * search consistently.
 *
 * - `sort` may be passed as an already-stringified canonical form
 *   (`"type,-name,createdAt"`) or as a `SortSpec[]`. Arrays are
 *   re-stringified into the canonical form.
 * - `undefined` values are omitted — callers pass the full options
 *   object and only the defined keys end up in the URL.
 * - Extra filter keys (status, type, isActive, …) flow through
 *   verbatim as `String(value)`. `null` and `undefined` filter
 *   values are omitted; `false` and `0` are preserved.
 */

import type { SortSpec } from "../types";

/**
 * Input accepted by the serializer.
 *
 * `sort` may be a raw string (already canonical) or a SortSpec[].
 * Extra filter keys are allowed and serialised verbatim.
 */
export interface SerializeListQueryInput {
  page?: number | string;
  pageSize?: number | string;
  sort?: string | SortSpec[];
  search?: string;
  [filterKey: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | SortSpec[];
}

function sortSpecsToString(specs: SortSpec[]): string {
  return specs
    .map((spec) => (spec.direction === "desc" ? `-${spec.field}` : spec.field))
    .join(",");
}

/**
 * Serialize a list-query options object into `URLSearchParams`.
 *
 * @example
 * ```ts
 * const params = serializeListQuery({
 *   page: 2,
 *   pageSize: 25,
 *   sort: "-createdAt",
 *   search: "alice",
 *   status: "active",
 * });
 * // → "page=2&pageSize=25&sort=-createdAt&search=alice&status=active"
 * ```
 */
export function serializeListQuery(
  input: SerializeListQueryInput,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;

    if (key === "sort") {
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
        params.set("sort", sortSpecsToString(value));
      } else if (typeof value === "string" && value !== "") {
        params.set("sort", value);
      }
      continue;
    }

    // Everything else: page, pageSize, search, and any extra filter keys.
    // Arrays should only appear under "sort", so at this point `value`
    // is string | number | boolean. Stringify uniformly.
    if (Array.isArray(value)) continue;
    params.set(key, String(value));
  }

  return params;
}
