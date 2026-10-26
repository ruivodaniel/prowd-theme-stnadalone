/**
 * Sort string parser — isomorphic.
 *
 * Parses the `sort` query param into an ordered, deduped list of
 * `SortSpec` objects, validated against a per-endpoint whitelist.
 *
 * Grammar:
 *   sort     := field ("," field)*
 *   field    := ["-"] identifier
 *   "-" prefix = descending; no prefix = ascending.
 *
 * Duplicates (same field twice) are rejected — the client is stating
 * a contradiction, not a preference, and silently collapsing it would
 * hide the bug.
 *
 * The parser never throws. It returns a discriminated result and lets
 * the caller (typically the zod factory's transform) translate errors
 * into 400 responses.
 */

import type { SortSpec } from "../types";

/** Successful parse result. */
export interface ParseSortOk {
  ok: true;
  value: SortSpec[];
}

/** Failed parse result. */
export interface ParseSortErr {
  ok: false;
  errors: ParseSortError[];
}

/**
 * Structured parse error. One entry per problem found so the zod
 * factory can add individual issues for each.
 */
export interface ParseSortError {
  /** The raw token that caused the error (e.g. "-unknownField"). */
  token: string;
  /** The field name after stripping any "-" prefix. */
  field: string;
  /** Machine-readable reason. */
  reason:
    | "empty_token"
    | "unknown_field"
    | "duplicate_field"
    | "invalid_character";
}

export type ParseSortResult = ParseSortOk | ParseSortErr;

export interface ParseSortOptions {
  /**
   * The per-endpoint whitelist of allowed sort fields.
   *
   * Every token in `input` must match one of these after stripping
   * the optional "-" prefix; otherwise the parse fails with
   * `unknown_field`.
   */
  sortable: readonly string[];

  /**
   * The endpoint's mandatory default sort, used when `input` is
   * empty or only whitespace. Same syntax as the `sort` query
   * param (e.g. "name", "-createdAt", "type,-name").
   *
   * MUST itself parse successfully against `sortable` — if it
   * doesn't, that's a programmer error at the endpoint definition
   * and the parser surfaces it as a regular `unknown_field` result,
   * because it can't distinguish a buggy default from a buggy input.
   */
  defaultSort: string;
}

// Only plain identifier characters are allowed in a field name.
// Keep this tight — the whitelist is the real guard, but rejecting
// weird characters early produces clearer error messages.
const FIELD_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

function parseToken(
  rawToken: string,
  sortable: readonly string[],
  seen: Set<string>,
): { ok: true; spec: SortSpec } | { ok: false; error: ParseSortError } {
  const token = rawToken.trim();
  if (token === "") {
    return { ok: false, error: { token: rawToken, field: "", reason: "empty_token" } };
  }

  const isDesc = token.startsWith("-");
  const field = isDesc ? token.slice(1) : token;

  if (!FIELD_NAME_RE.test(field)) {
    return { ok: false, error: { token, field, reason: "invalid_character" } };
  }

  if (!sortable.includes(field)) {
    return { ok: false, error: { token, field, reason: "unknown_field" } };
  }

  if (seen.has(field)) {
    return { ok: false, error: { token, field, reason: "duplicate_field" } };
  }

  return {
    ok: true,
    spec: { field, direction: isDesc ? "desc" : "asc" },
  };
}

function parseNonEmpty(
  input: string,
  sortable: readonly string[],
): ParseSortResult {
  const tokens = input.split(",");
  const seen = new Set<string>();
  const specs: SortSpec[] = [];
  const errors: ParseSortError[] = [];

  for (const raw of tokens) {
    const result = parseToken(raw, sortable, seen);
    if (result.ok) {
      specs.push(result.spec);
      seen.add(result.spec.field);
    } else {
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, value: specs };
}

/**
 * Parse a `sort` query-param string into an ordered list of `SortSpec`.
 *
 * @param input  Raw string from the query param. May be `undefined`,
 *               empty, or whitespace — in any of those cases the
 *               `defaultSort` is used instead.
 * @param opts   Whitelist + mandatory default sort.
 *
 * @returns A discriminated result. Never throws.
 */
export function parseSortString(
  input: string | undefined,
  opts: ParseSortOptions,
): ParseSortResult {
  const effective = (input ?? "").trim();
  const source = effective === "" ? opts.defaultSort : effective;
  return parseNonEmpty(source, opts.sortable);
}
