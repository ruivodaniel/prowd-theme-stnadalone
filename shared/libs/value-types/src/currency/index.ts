/**
 * Currency — ISO 4217 alpha-3 codes.
 *
 * The lib ships a curated tuple of commonly-used currencies. Products
 * narrow this set in their preferences config; products that need a
 * currency not in the curated tuple add it to `data.ts`.
 */

import { z } from "zod";
import { CURRENCY_ROWS, type CurrencyRow } from "./data";

export type { CurrencyRow };

/**
 * Currency code type — literal union of every code declared in
 * `CURRENCY_ROWS`. Adding a row to data.ts widens this type automatically.
 */
export type Currency = (typeof CURRENCY_ROWS)[number]["code"];

/**
 * Whether the OS/browser can meaningfully resolve a value for this field.
 * Currency: no — the OS doesn't expose a "preferred currency" anywhere.
 * Country region in a locale tag is a regional language indicator, not
 * a preferred-currency declaration. Kept as a literal `false`.
 */
export const systemResolvable = false;

const CURRENCIES_MUTABLE: Currency[] = CURRENCY_ROWS.map((row) => row.code);
export const CURRENCIES: readonly Currency[] = Object.freeze(CURRENCIES_MUTABLE);

function buildCurrencySchema() {
  const [first, ...rest] = CURRENCIES_MUTABLE;
  if (!first) throw new Error("CURRENCY_ROWS must not be empty");
  return z.enum([first, ...rest] as [Currency, ...Currency[]]);
}
export const currencySchema = buildCurrencySchema();

const CURRENCY_BY_CODE: ReadonlyMap<Currency, CurrencyRow> = new Map(
  CURRENCY_ROWS.map((row) => [row.code, row]),
);

/**
 * Get display metadata (name, symbol, decimals) for a currency.
 */
export function getCurrencyMeta(code: Currency): CurrencyRow {
  const row = CURRENCY_BY_CODE.get(code);
  if (!row) {
    // Unreachable — code is constrained to the literal union over CURRENCY_ROWS.
    throw new Error(`Currency metadata missing for ${code}`);
  }
  return row;
}
