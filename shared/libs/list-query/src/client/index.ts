/**
 * @libs/list-query/client — frontend public entry.
 *
 * Frontend helpers for list-query call sites:
 *
 *   - `serializeListQuery` — framework-agnostic URLSearchParams builder
 *     for the list endpoint query object. Zero dependencies.
 *
 *   - `useListQueryState` — React hook that binds the list query state
 *     to TanStack Router's search params. Reads current state, writes
 *     updates back. Optional peer deps: `react`, `@tanstack/react-router`.
 *
 *   - `ListPagination` — React pagination control pre-bound to the
 *     list query state. Consumes the shadcn `Pagination` primitive
 *     from `@libs/web-components`. Optional peer deps: `react`,
 *     `@libs/web-components`.
 *
 * Types and the sort-string parser are isomorphic and live at the
 * root entry (`@libs/list-query`).
 */

export {
  serializeListQuery,
  type SerializeListQueryInput,
} from "./serialize-list-query";

export {
  useListQueryState,
  type ListQueryBaseState,
  type ListQueryState,
  type UseListQueryStateInput,
  type UseListQueryStateReturn,
} from "./use-list-query-state";

export {
  ListPagination,
  listPaginationSchema,
  type ListPaginationProps,
} from "./list-pagination";
