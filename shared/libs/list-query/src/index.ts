/**
 * @libs/list-query — isomorphic public entry.
 *
 * Types, constants, and the sort-string parser are safe to import from
 * both backend and frontend code. This entry has no zod or drizzle
 * dependencies.
 *
 * - Backend zod factory + Drizzle helpers: `@libs/list-query/server`
 * - Frontend URLSearchParams serializer:    `@libs/list-query/client`
 */

export type {
  SortDirection,
  SortSpec,
  ListQueryBase,
  ListResponse,
} from "./types";

export {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  LIST_QUERY_BASELINE,
  type ListQueryDefaults,
} from "./defaults";

export {
  parseSortString,
  type ParseSortOptions,
  type ParseSortResult,
  type ParseSortOk,
  type ParseSortErr,
  type ParseSortError,
} from "./sort/parse-sort-string";
