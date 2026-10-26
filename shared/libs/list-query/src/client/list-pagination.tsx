/**
 * ListPagination
 *
 * Pagination control pre-bound to the list-query state shape. Takes
 * the current `query` (from `useListQueryState`) and the `total` row
 * count from the list response, renders the shadcn `Pagination`
 * primitive from @libs/web-components, and wires page navigation back
 * through `setQuery`.
 *
 * Pages just drop this in:
 *
 * @example
 *   const { query, setQuery } = useListQueryState<Filters>({ defaultSort: "name" });
 *   const { data } = useQuery({ queryKey: [...query], queryFn: ... });
 *   return (
 *     <>
 *       <MyTable rows={data.rows} />
 *       <ListPagination
 *         query={query}
 *         total={data.total}
 *         onPageChange={(page) => setQuery({ page })}
 *       />
 *     </>
 *   );
 *
 * The control hides itself entirely when there's nothing to paginate
 * (total === 0, or total fits on a single page), so pages don't need
 * to conditionally render it themselves.
 */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@libs/web-components";
import type { ListQueryState } from "./use-list-query-state";

/** the props schema, for tooling (the UI-as-data validator reads it) */
export const listPaginationSchema = {
  component: "ListPagination",
  props: {
    query: { kind: "other", required: true, doc: "{ page, pageSize }" },
    total: { kind: "number", required: true, doc: "Total row count" },
    onPageChange: { kind: "function", doc: "(page) — the page the user asked for" },
    siblingCount: { kind: "number", default: 1, doc: "Page links around the current page" },
    "data-testid": { kind: "string", default: "list-pagination", doc: "Test id; the buttons take it as a prefix" },
  },
} as const;

export interface ListPaginationProps {
  /** The current query state from `useListQueryState`. Reads `page` + `pageSize`. */
  query: Pick<ListQueryState<unknown>, "page" | "pageSize">;
  /** The test id of the control; its buttons take it as a prefix: <id>-previous-btn, <id>-next-btn, <id>-page-<n>-btn (default: "list-pagination") */
  "data-testid"?: string;
  /** Total row count from the list response. */
  total: number;
  /** Called with the next page when the user clicks prev / next / a page link. */
  onPageChange: (nextPage: number) => void;
  /** Max number of page links to render around the current page. Defaults to 5. */
  siblingCount?: number;
}

export function ListPagination({
  query,
  total,
  onPageChange,
  siblingCount = 1,
  "data-testid": testId = "list-pagination",
}: ListPaginationProps) {
  const { page, pageSize } = query;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (total === 0) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const multiPage = totalPages > 1;

  const pageNumbers = multiPage ? buildPageRange(page, totalPages, siblingCount) : [];

  return (
    <div
      className="flex items-center justify-between gap-4 py-2"
      data-testid={testId}
    >
      <div className="text-sm text-muted-foreground">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
        <strong>{total}</strong>
      </div>
      {multiPage && (
        <Pagination className="mx-0 justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                data-testid={`${testId}-previous-btn`}
                disabled={!hasPrev}
                onClick={() => hasPrev && onPageChange(page - 1)}
              />
            </PaginationItem>
            {pageNumbers.map((p, i) =>
              p === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    data-testid={`${testId}-page-${p}-btn`}
                    isActive={p === page}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                data-testid={`${testId}-next-btn`}
                disabled={!hasNext}
                onClick={() => hasNext && onPageChange(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page range helper
// ─────────────────────────────────────────────────────────────────────────────

type PageRangeItem = number | "ellipsis";

/**
 * Compact page range with ellipsis markers.
 *
 * Examples (siblingCount=1, current=5, totalPages=20):
 *   [1, "…", 4, 5, 6, "…", 20]
 *
 * Always includes the first and last pages, the current page, and
 * `siblingCount` pages on either side of the current. Replaces any
 * gap larger than 1 with an ellipsis.
 */
function buildPageRange(
  current: number,
  totalPages: number,
  siblingCount: number,
): PageRangeItem[] {
  const firstPage = 1;
  const lastPage = totalPages;

  // Small range: render every page, no ellipsis.
  if (totalPages <= siblingCount * 2 + 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, firstPage);
  const rightSibling = Math.min(current + siblingCount, lastPage);

  const showLeftEllipsis = leftSibling > firstPage + 1;
  const showRightEllipsis = rightSibling < lastPage - 1;

  const range: PageRangeItem[] = [];

  // Always: first page
  range.push(firstPage);

  if (showLeftEllipsis) {
    range.push("ellipsis");
  } else {
    // Fill gap: 2 .. leftSibling-1
    for (let p = firstPage + 1; p < leftSibling; p++) range.push(p);
  }

  // Window around current
  for (let p = leftSibling; p <= rightSibling; p++) {
    if (p !== firstPage && p !== lastPage) range.push(p);
  }

  if (showRightEllipsis) {
    range.push("ellipsis");
  } else {
    // Fill gap: rightSibling+1 .. lastPage-1
    for (let p = rightSibling + 1; p < lastPage; p++) range.push(p);
  }

  // Always: last page
  if (lastPage !== firstPage) range.push(lastPage);

  return range;
}
