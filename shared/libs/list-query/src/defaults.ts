/**
 * Baseline defaults for the list-query contract.
 *
 * Three-tier fallback:
 *   lib baseline (here) → product config override → per-call-site override
 *
 * Products set their canonical values in `@configs/list-query`.
 * Individual call sites may pass their own `defaults` to the zod factory
 * when they truly need to diverge from the product default.
 */

/** Default page number when the client omits `page`. 1-indexed. */
export const DEFAULT_PAGE = 1;

/** Default page size when the client omits `pageSize`. */
export const DEFAULT_PAGE_SIZE = 25;

/** Hard ceiling on `pageSize`. Requests above this are rejected (400). */
export const MAX_PAGE_SIZE = 100;

/**
 * Convenience bundle for consumers that want to pass all three values
 * in one object (e.g. the zod factory's `defaults` option).
 */
export interface ListQueryDefaults {
  page: number;
  pageSize: number;
  maxPageSize: number;
}

/** The lib's baseline defaults as a single object. */
export const LIST_QUERY_BASELINE: ListQueryDefaults = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  maxPageSize: MAX_PAGE_SIZE,
};
