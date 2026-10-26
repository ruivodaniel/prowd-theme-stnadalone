/**
 * Drizzle pagination helper — backend-only.
 *
 * Applies `.limit(pageSize).offset((page - 1) * pageSize)` to an
 * existing query builder, preserving its type chain so the caller
 * can continue composing or awaiting it.
 *
 * This is a two-line helper, but wrapping it guarantees every list
 * endpoint computes the offset identically and keeps the intent
 * visible at the call site.
 */

/**
 * Query-builder shape we need to call `.limit` and `.offset` on.
 *
 * Drizzle's chainable select methods return progressively narrowed
 * types (e.g. `Omit<PgSelectBase, 'limit'>` after `.limit()`), so we
 * can't parameterise on a single `Self`. Instead, `LimitAndOffset<T>`
 * models the shape "something that has `.limit(n)`, whose return has
 * `.offset(n)`, whose return is `T`". TypeScript infers `T` from the
 * concrete drizzle type at the call site, and we return `T` — the
 * original chain type preserved.
 */
export type LimitAndOffset<T> = {
  limit(n: number): {
    offset(n: number): T;
  };
};

/**
 * Apply LIMIT and OFFSET to a Drizzle query builder.
 *
 * @param qb        The query builder to page.
 * @param page      1-indexed page number.
 * @param pageSize  Number of rows per page.
 *
 * @returns The same query builder after `.limit().offset()` has been
 *          applied, ready to be awaited or chained further.
 */
export function applyPagination<T>(
  qb: LimitAndOffset<T>,
  page: number,
  pageSize: number,
): T {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
