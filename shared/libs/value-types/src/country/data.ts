/**
 * ISO 3166-1 alpha-2 countries (selected) with display name, dialing code,
 * and emoji flag. Curated to the most commonly-targeted markets — adding
 * a country is a one-line append.
 *
 * Dialing codes are the country prefix without the leading `+`. Some
 * countries share a code (e.g. North American Numbering Plan: US, CA);
 * that's expected.
 *
 * Flag emojis are produced from the regional indicator codepoints of the
 * alpha-2 letters; we hardcode them so the result is stable regardless of
 * the runtime's font.
 */

export interface CountryRow {
  /** ISO 3166-1 alpha-2 */
  code: string;
  /** English name */
  name: string;
  /** E.164 country code without leading `+` */
  dialingCode: string;
  /** Regional indicator emoji */
  flag: string;
}

export const COUNTRY_ROWS = [
  { code: "AR", name: "Argentina", dialingCode: "54", flag: "🇦🇷" },
  { code: "AT", name: "Austria", dialingCode: "43", flag: "🇦🇹" },
  { code: "AU", name: "Australia", dialingCode: "61", flag: "🇦🇺" },
  { code: "BE", name: "Belgium", dialingCode: "32", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", dialingCode: "55", flag: "🇧🇷" },
  { code: "CA", name: "Canada", dialingCode: "1", flag: "🇨🇦" },
  { code: "CH", name: "Switzerland", dialingCode: "41", flag: "🇨🇭" },
  { code: "CL", name: "Chile", dialingCode: "56", flag: "🇨🇱" },
  { code: "CN", name: "China", dialingCode: "86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dialingCode: "57", flag: "🇨🇴" },
  { code: "CZ", name: "Czechia", dialingCode: "420", flag: "🇨🇿" },
  { code: "DE", name: "Germany", dialingCode: "49", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", dialingCode: "45", flag: "🇩🇰" },
  { code: "ES", name: "Spain", dialingCode: "34", flag: "🇪🇸" },
  { code: "FI", name: "Finland", dialingCode: "358", flag: "🇫🇮" },
  { code: "FR", name: "France", dialingCode: "33", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", dialingCode: "44", flag: "🇬🇧" },
  { code: "GR", name: "Greece", dialingCode: "30", flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong", dialingCode: "852", flag: "🇭🇰" },
  { code: "ID", name: "Indonesia", dialingCode: "62", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", dialingCode: "353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dialingCode: "972", flag: "🇮🇱" },
  { code: "IN", name: "India", dialingCode: "91", flag: "🇮🇳" },
  { code: "IT", name: "Italy", dialingCode: "39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dialingCode: "81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialingCode: "82", flag: "🇰🇷" },
  { code: "MX", name: "Mexico", dialingCode: "52", flag: "🇲🇽" },
  { code: "MY", name: "Malaysia", dialingCode: "60", flag: "🇲🇾" },
  { code: "NL", name: "Netherlands", dialingCode: "31", flag: "🇳🇱" },
  { code: "NO", name: "Norway", dialingCode: "47", flag: "🇳🇴" },
  { code: "NZ", name: "New Zealand", dialingCode: "64", flag: "🇳🇿" },
  { code: "PE", name: "Peru", dialingCode: "51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dialingCode: "63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dialingCode: "48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialingCode: "351", flag: "🇵🇹" },
  { code: "RO", name: "Romania", dialingCode: "40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dialingCode: "7", flag: "🇷🇺" },
  { code: "SA", name: "Saudi Arabia", dialingCode: "966", flag: "🇸🇦" },
  { code: "SE", name: "Sweden", dialingCode: "46", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", dialingCode: "65", flag: "🇸🇬" },
  { code: "TH", name: "Thailand", dialingCode: "66", flag: "🇹🇭" },
  { code: "TR", name: "Turkey", dialingCode: "90", flag: "🇹🇷" },
  { code: "TW", name: "Taiwan", dialingCode: "886", flag: "🇹🇼" },
  { code: "UA", name: "Ukraine", dialingCode: "380", flag: "🇺🇦" },
  { code: "US", name: "United States", dialingCode: "1", flag: "🇺🇸" },
  { code: "ZA", name: "South Africa", dialingCode: "27", flag: "🇿🇦" },
] as const satisfies readonly CountryRow[];
