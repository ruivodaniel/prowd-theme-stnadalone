/**
 * ISO 4217 currencies (selected) with display name, symbol, and minor
 * unit (decimal places). Curated to the most commonly-used currencies —
 * adding a currency is a one-line append.
 *
 * `decimals` is the standard ISO 4217 minor unit count: 2 for most
 * currencies, 0 for JPY/KRW/HUF/CLP/etc., 3 for KWD/BHD/OMR/JOD/TND.
 */

export interface CurrencyRow {
  /** ISO 4217 alpha-3 */
  code: string;
  /** English name */
  name: string;
  /** Common UI symbol */
  symbol: string;
  /** Minor unit count (number of decimal places) */
  decimals: number;
}

export const CURRENCY_ROWS = [
  { code: "AED", name: "UAE Dirham",          symbol: "د.إ", decimals: 2 },
  { code: "ARS", name: "Argentine Peso",      symbol: "$",   decimals: 2 },
  { code: "AUD", name: "Australian Dollar",   symbol: "A$",  decimals: 2 },
  { code: "BRL", name: "Brazilian Real",      symbol: "R$",  decimals: 2 },
  { code: "CAD", name: "Canadian Dollar",     symbol: "C$",  decimals: 2 },
  { code: "CHF", name: "Swiss Franc",         symbol: "CHF", decimals: 2 },
  { code: "CLP", name: "Chilean Peso",        symbol: "$",   decimals: 0 },
  { code: "CNY", name: "Renminbi",            symbol: "¥",   decimals: 2 },
  { code: "COP", name: "Colombian Peso",      symbol: "$",   decimals: 2 },
  { code: "CZK", name: "Czech Koruna",        symbol: "Kč",  decimals: 2 },
  { code: "DKK", name: "Danish Krone",        symbol: "kr",  decimals: 2 },
  { code: "EUR", name: "Euro",                symbol: "€",   decimals: 2 },
  { code: "GBP", name: "Pound Sterling",      symbol: "£",   decimals: 2 },
  { code: "HKD", name: "Hong Kong Dollar",    symbol: "HK$", decimals: 2 },
  { code: "HUF", name: "Hungarian Forint",    symbol: "Ft",  decimals: 0 },
  { code: "IDR", name: "Indonesian Rupiah",   symbol: "Rp",  decimals: 2 },
  { code: "ILS", name: "Israeli New Shekel",  symbol: "₪",   decimals: 2 },
  { code: "INR", name: "Indian Rupee",        symbol: "₹",   decimals: 2 },
  { code: "JPY", name: "Yen",                 symbol: "¥",   decimals: 0 },
  { code: "KRW", name: "Won",                 symbol: "₩",   decimals: 0 },
  { code: "MXN", name: "Mexican Peso",        symbol: "$",   decimals: 2 },
  { code: "MYR", name: "Malaysian Ringgit",   symbol: "RM",  decimals: 2 },
  { code: "NOK", name: "Norwegian Krone",     symbol: "kr",  decimals: 2 },
  { code: "NZD", name: "New Zealand Dollar",  symbol: "NZ$", decimals: 2 },
  { code: "PEN", name: "Sol",                 symbol: "S/",  decimals: 2 },
  { code: "PHP", name: "Philippine Peso",     symbol: "₱",   decimals: 2 },
  { code: "PLN", name: "Złoty",               symbol: "zł",  decimals: 2 },
  { code: "RON", name: "Romanian Leu",        symbol: "lei", decimals: 2 },
  { code: "RUB", name: "Russian Ruble",       symbol: "₽",   decimals: 2 },
  { code: "SAR", name: "Saudi Riyal",         symbol: "﷼",   decimals: 2 },
  { code: "SEK", name: "Swedish Krona",       symbol: "kr",  decimals: 2 },
  { code: "SGD", name: "Singapore Dollar",    symbol: "S$",  decimals: 2 },
  { code: "THB", name: "Baht",                symbol: "฿",   decimals: 2 },
  { code: "TRY", name: "Turkish Lira",        symbol: "₺",   decimals: 2 },
  { code: "TWD", name: "New Taiwan Dollar",   symbol: "NT$", decimals: 2 },
  { code: "UAH", name: "Hryvnia",             symbol: "₴",   decimals: 2 },
  { code: "USD", name: "US Dollar",           symbol: "$",   decimals: 2 },
  { code: "ZAR", name: "Rand",                symbol: "R",   decimals: 2 },
] as const satisfies readonly CurrencyRow[];
