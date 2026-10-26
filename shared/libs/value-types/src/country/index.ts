/**
 * Country — ISO 3166-1 alpha-2 codes.
 *
 * The lib ships a curated tuple of commonly-targeted countries. Products
 * narrow this set in their preferences config; products that need a
 * country not in the curated tuple add it to `data.ts`.
 */

import { z } from "zod";
import { COUNTRY_ROWS, type CountryRow } from "./data";
export { COUNTRY_ROWS };

export type { CountryRow };

/**
 * Country alpha-2 type — the literal union of every code declared in
 * `COUNTRY_ROWS`. Adding a row to data.ts widens this type automatically.
 */
export type Country = (typeof COUNTRY_ROWS)[number]["code"];

/**
 * Whether the OS/browser can meaningfully resolve a value for this field.
 * Country: no — the locale region tag (e.g. `en-US`) hints at language
 * region, not at residence/billing/shipping country. Resolving "the
 * user's country" from `navigator.language` is ambiguous; products that
 * need it ask the user explicitly. Kept as a literal `false`.
 */
export const systemResolvable = false;

/**
 * Materialised tuple of codes. Convenient for `z.enum()` and for products
 * that want to iterate countries.
 */
const COUNTRIES_MUTABLE: Country[] = COUNTRY_ROWS.map((row) => row.code);
export const COUNTRIES: readonly Country[] = Object.freeze(COUNTRIES_MUTABLE);

/**
 * Zod schema. Built from a non-empty tuple guard so `z.enum` keeps its
 * literal-union typing.
 */
function buildCountrySchema() {
  const [first, ...rest] = COUNTRIES_MUTABLE;
  if (!first) throw new Error("COUNTRY_ROWS must not be empty");
  return z.enum([first, ...rest] as [Country, ...Country[]]);
}
export const countrySchema = buildCountrySchema();

const COUNTRY_BY_CODE: ReadonlyMap<Country, CountryRow> = new Map(
  COUNTRY_ROWS.map((row) => [row.code, row]),
);

/**
 * Get display metadata for a country.
 */
export function getCountryMeta(code: Country): CountryRow {
  const row = COUNTRY_BY_CODE.get(code);
  if (!row) {
    // Unreachable — code is constrained to the literal union over COUNTRY_ROWS.
    throw new Error(`Country metadata missing for ${code}`);
  }
  return row;
}
