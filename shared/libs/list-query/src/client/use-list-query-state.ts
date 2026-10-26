/**
 * useListQueryState
 *
 * React hook that manages list-page URL state (page, pageSize, sort,
 * search + endpoint-specific filters) via TanStack Router's search
 * params. One hook, consumed by every list page in the monorepo.
 *
 * Reads the current query from `useSearch` and writes updates via
 * `useNavigate` with `to: "."` (stay on current route, update search
 * only) + `replace: true` (browser history stays clean — pagination
 * and filter tweaks don't accumulate history entries).
 *
 * Pages never touch URL params themselves: they call this hook, read
 * `query`, call `setQuery({...})`. The "pages never call useSearch /
 * useNavigate" rule is respected — this hook IS the abstraction.
 *
 * Contract:
 * - Defaults follow the lib baselines (`page=1, pageSize=25`).
 * - Any filter change (non-page field) resets page to 1. Page changes
 *   preserve filters.
 * - `undefined` in the setter clears a field. Empty string is treated
 *   as undefined so the URL stays clean.
 * - Generic over the endpoint-specific filter tail (`TFilters`);
 *   page / pageSize / sort / search are always present.
 *
 * @example
 *   interface OrgListFilters { status?: "active" | "inactive"; type?: string }
 *   const { query, setQuery } = useListQueryState<OrgListFilters>({
 *     defaultSort: "name",
 *   });
 *   // query.page, query.pageSize, query.sort, query.search, query.status, query.type
 *   setQuery({ search: "acme" });   // → URL updates, page resets to 1
 *   setQuery({ page: 2 });          // → URL updates, filters preserved
 *   setQuery({ status: undefined }); // → clear the filter
 */

import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../defaults";

export interface ListQueryBaseState {
  page: number;
  pageSize: number;
  /** Undefined when the URL has no `sort` and no `defaultSort` was supplied. */
  sort?: string;
  search?: string;
}

export type ListQueryState<TFilters> = ListQueryBaseState & TFilters;

export interface UseListQueryStateInput {
  /**
   * Default sort for this endpoint. Used when the URL has no `sort`
   * param. Must match the endpoint validator's `defaultSort`.
   *
   * Omit on pages that switch between multiple endpoints with
   * different sort whitelists (e.g. a tab switching between a
   * members list and an invitations list) — the page then computes
   * the effective sort per active endpoint and falls back locally
   * when `query.sort` is undefined.
   */
  defaultSort?: string;
  /**
   * Override the baseline page/pageSize defaults for this page.
   * Omit to use the lib defaults (`1 / 25`).
   */
  defaults?: {
    page?: number;
    pageSize?: number;
  };
}

export interface UseListQueryStateReturn<TFilters> {
  /** Current query state merged from URL + defaults. */
  query: ListQueryState<TFilters>;
  /**
   * Merge a partial update into the URL search. Any non-page field
   * change resets page to 1. Page-only updates preserve filters.
   * `undefined` / empty string clears a field.
   */
  setQuery: (updates: Partial<ListQueryState<TFilters>>) => void;
}

export function useListQueryState<TFilters>(
  input: UseListQueryStateInput,
): UseListQueryStateReturn<TFilters> {
  const { defaultSort, defaults } = input;
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false }) as Record<string, unknown>;

  const basePage = defaults?.page ?? DEFAULT_PAGE;
  const basePageSize = defaults?.pageSize ?? DEFAULT_PAGE_SIZE;

  const query = normalizeQuery<TFilters>(rawSearch, {
    basePage,
    basePageSize,
    defaultSort,
  });

  const setQuery = useCallback(
    (updates: Partial<ListQueryState<TFilters>>) => {
      const isPageOnlyUpdate =
        Object.keys(updates).length === 1 && "page" in updates;

      // Merge the current query with the updates, reset page unless
      // the update is exclusively a page change.
      const merged: Record<string, unknown> = {
        ...rawSearch,
        ...updates,
        page: isPageOnlyUpdate ? updates.page : 1,
      };

      // Strip empty / null / undefined values so the URL stays clean.
      // Pagination defaults are also stripped when they match baseline —
      // a URL with the defaults is equivalent to a URL without them.
      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(merged)) {
        if (v === undefined || v === null || v === "") continue;
        cleaned[k] = v;
      }

      // Cast: TanStack Router's navigate({ to: "." }) requires search
      // to match the current route's schema, but this hook is generic
      // over TFilters — we can't know the route schema at lib level.
      // The server validates when the request lands.
      navigate({
        to: ".",
        search: cleaned,
        replace: true,
      } as never);
    },
    [navigate, rawSearch],
  );

  return { query, setQuery };
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

interface NormalizeOptions {
  basePage: number;
  basePageSize: number;
  defaultSort?: string;
}

function normalizeQuery<TFilters>(
  raw: Record<string, unknown>,
  opts: NormalizeOptions,
): ListQueryState<TFilters> {
  const pageRaw = raw.page;
  const pageSizeRaw = raw.pageSize;
  const sortRaw = raw.sort;
  const searchRaw = raw.search;

  const page = coerceInt(pageRaw) ?? opts.basePage;
  const pageSize = coerceInt(pageSizeRaw) ?? opts.basePageSize;
  const sort = typeof sortRaw === "string" && sortRaw
    ? sortRaw
    : opts.defaultSort;
  const search = typeof searchRaw === "string" && searchRaw ? searchRaw : undefined;

  // Everything else in raw is an endpoint-specific filter. Pass it
  // through — the generic TFilters tells the caller what shape to
  // expect. We don't strip / validate individual filter keys here;
  // the zod schema on the server does that when the request lands.
  // Cast: raw search params are Record<string, unknown>. We overlay
  // the parsed base fields and assert the result matches TFilters.
  // The generic TFilters is caller-declared; runtime validation
  // happens server-side when the query lands. No Zod schema available
  // here because TFilters is an open generic.
  const base = { page, pageSize, sort, search };
  return { ...raw, ...base } as ListQueryState<TFilters>;
}

function coerceInt(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return Math.floor(v);
  if (typeof v === "string" && v !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? Math.floor(n) : undefined;
  }
  return undefined;
}
