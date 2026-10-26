/**
 * Zod schema factory — backend-only.
 *
 * Produces a reusable ZodObject that every list endpoint composes with
 * its own endpoint-specific filters via `.merge(...)`.
 *
 * The schema enforces the full contract at the validator layer:
 *   - page          : coerce int, min 1, default from options
 *   - pageSize      : coerce int, min 1, max from options, default from options
 *   - sort          : parsed into SortSpec[]; unknown field → 400
 *   - search        : present only when `searchable: true`;
 *                     unknown key (incl. `search` on non-searchable) → 400 via strict
 */

import { z } from "zod";
import type { SortSpec } from "../../types";
import { LIST_QUERY_BASELINE, type ListQueryDefaults } from "../../defaults";
import { parseSortString } from "../../sort/parse-sort-string";

export interface CreateListQuerySchemaOptions {
  /**
   * Whitelist of allowed sort fields for this endpoint. Any token in
   * the client's `sort` param that isn't in this list is rejected
   * with a 400.
   */
  sortable: readonly string[];

  /**
   * Mandatory default sort — applied when the client omits `sort`.
   * Same syntax as the `sort` param (e.g. "name", "-createdAt",
   * "type,-name"). Must parse against `sortable`.
   */
  defaultSort: string;

  /**
   * Whether the endpoint accepts a `search` query param. When
   * `false` (the default), sending `search` is a 400 — we never
   * silently ignore an unsupported param.
   */
  searchable?: boolean;

  /**
   * Override the three numeric defaults (page / pageSize / maxPageSize).
   * Typical consumers pass `LIST_QUERY_DEFAULTS` from
   * `@configs/list-query` here so the product-tunable values flow
   * in. Omit to use the lib baseline (1 / 25 / 100).
   */
  defaults?: ListQueryDefaults;
}

function buildPageField(defaultPage: number) {
  return z.coerce.number().int().min(1).optional().default(defaultPage);
}

function buildPageSizeField(defaultPageSize: number, maxPageSize: number) {
  return z.coerce
    .number()
    .int()
    .min(1)
    .max(maxPageSize)
    .optional()
    .default(defaultPageSize);
}

function buildSortField(sortable: readonly string[], defaultSort: string) {
  return z
    .string()
    .optional()
    .transform((val, ctx): SortSpec[] => {
      const result = parseSortString(val, { sortable, defaultSort });
      if (!result.ok) {
        for (const err of result.errors) {
          // Empty `path`: zod's ZodEffects wrapper already prepends
          // the field name ("sort") to the path, so adding it again
          // here would produce `["sort", "sort"]`.
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Invalid sort field "${err.field || err.token}": ${err.reason}`,
            path: [],
          });
        }
        return z.NEVER;
      }
      return result.value;
    });
}

/**
 * Build the base list-query ZodObject for an endpoint.
 *
 * The returned schema is strict: any unknown key is a 400. Compose
 * endpoint-specific filters with `.extend({...})` — NOT `.merge(...)`.
 * Zod's `.merge()` takes unknown-keys mode from the right-hand side
 * (default: strip), which silently loses the strict mode we need.
 * `.extend()` preserves it.
 *
 * Two overloads based on `searchable`:
 *   - `searchable: true`  → schema includes `search?: string`
 *   - otherwise           → schema has no `search` field; passing it → 400
 *
 * @example
 * ```ts
 * export const GetOrganizationsQuerySchema = createListQuerySchema({
 *   defaults: LIST_QUERY_DEFAULTS,
 *   sortable: ["name", "createdAt"] as const,
 *   defaultSort: "name",
 *   searchable: true,
 * }).extend({
 *   status: z.enum(["active", "inactive"]).optional(),
 *   type:   z.enum(["system_admin", "platform_admin", "organization"]).optional(),
 * });
 * ```
 */
export function createListQuerySchema(
  opts: CreateListQuerySchemaOptions & { searchable: true },
): ReturnType<typeof buildSearchableSchema>;
export function createListQuerySchema(
  opts: CreateListQuerySchemaOptions & { searchable?: false },
): ReturnType<typeof buildUnsearchableSchema>;
export function createListQuerySchema(opts: CreateListQuerySchemaOptions) {
  const defaults = opts.defaults ?? LIST_QUERY_BASELINE;
  return opts.searchable === true
    ? buildSearchableSchema(opts.sortable, opts.defaultSort, defaults)
    : buildUnsearchableSchema(opts.sortable, opts.defaultSort, defaults);
}

function buildSearchableSchema(
  sortable: readonly string[],
  defaultSort: string,
  defaults: ListQueryDefaults,
) {
  return z
    .object({
      page: buildPageField(defaults.page),
      pageSize: buildPageSizeField(defaults.pageSize, defaults.maxPageSize),
      sort: buildSortField(sortable, defaultSort),
      search: z.string().optional(),
    })
    .strict();
}

function buildUnsearchableSchema(
  sortable: readonly string[],
  defaultSort: string,
  defaults: ListQueryDefaults,
) {
  return z
    .object({
      page: buildPageField(defaults.page),
      pageSize: buildPageSizeField(defaults.pageSize, defaults.maxPageSize),
      sort: buildSortField(sortable, defaultSort),
    })
    .strict();
}
