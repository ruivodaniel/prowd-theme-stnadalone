/**
 * Drizzle orderBy builder — backend-only.
 *
 * Translates a validated `SortSpec[]` into a list of Drizzle
 * ordering expressions (`asc(col)` / `desc(col)`), and automatically
 * appends a tiebreaker column so the ordering is always deterministic.
 *
 * The caller supplies:
 *   - `sort`        — already validated by the zod factory
 *   - `columnMap`   — a whitelist → Drizzle column map; the whitelist
 *                     must be a superset of the sortable fields
 *                     declared to the zod factory
 *   - `tiebreaker`  — the final column appended as `asc(...)` to
 *                     guarantee a total order (typically the primary
 *                     key column)
 *
 * Null ordering follows PostgreSQL defaults (nulls last on ASC,
 * nulls first on DESC) — we don't emit NULLS FIRST/LAST.
 */

import { asc, desc, type Column, type SQL } from "drizzle-orm";
import type { SortSpec } from "../../types";

/**
 * Whitelist → Drizzle column map.
 *
 * Keys must match the sortable fields declared to the zod factory.
 * A missing key at runtime indicates a programmer error: the zod
 * factory already rejected unknown fields at 400.
 */
export type ColumnMap = Readonly<Record<string, Column>>;

/**
 * Build the `orderBy` expression list for a Drizzle query.
 *
 * The tiebreaker column is appended as an ascending final field
 * unless it's already present in `sort` (in which case its
 * declared direction wins). This guarantees total ordering even
 * when the primary sort field has ties, without duplicating the
 * tiebreaker in the ORDER BY clause.
 *
 * @throws Error if `sort` references a field absent from
 * `columnMap`. This is a bug at the endpoint definition — the
 * validator's whitelist and the column map must stay in sync.
 */
export function buildOrderBy(
  sort: SortSpec[],
  columnMap: ColumnMap,
  tiebreaker: Column,
): SQL[] {
  const orderBy: SQL[] = [];
  const fieldsInSort = new Set<string>();

  for (const spec of sort) {
    const column = columnMap[spec.field];
    if (!column) {
      throw new Error(
        `buildOrderBy: sort field "${spec.field}" is not in the column map. ` +
          `The zod sortable whitelist and the Drizzle column map must stay in sync.`,
      );
    }
    orderBy.push(spec.direction === "desc" ? desc(column) : asc(column));
    fieldsInSort.add(spec.field);
  }

  // Append the tiebreaker only if the caller didn't already include
  // an equivalent column via a declared field. We compare by column
  // identity — same Column object means same SQL column.
  const tiebreakerAlreadyPresent = Object.entries(columnMap).some(
    ([fieldName, col]) => col === tiebreaker && fieldsInSort.has(fieldName),
  );

  if (!tiebreakerAlreadyPresent) {
    orderBy.push(asc(tiebreaker));
  }

  return orderBy;
}
