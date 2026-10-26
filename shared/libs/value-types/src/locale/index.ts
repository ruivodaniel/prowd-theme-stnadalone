/**
 * Locale — BCP 47 language tags.
 *
 * The lib ships a curated tuple of common language and language-region
 * codes (`en`, `en-US`, `pt`, `pt-BR`, …). Products narrow this set in
 * their preferences config.
 *
 * If a product needs a locale not in the curated tuple it adds the entry
 * to this file — that's deliberately the only way to extend, so the
 * typed universe stays accurate.
 *
 * Display names come from `Intl.DisplayNames` (built into Node 14+ and
 * every modern browser) so we don't ship a static name table.
 */

import { z } from "zod";

/**
 * Curated set of BCP 47 codes. Base codes (language only) and the most
 * common language-region tags.
 */
export const LOCALES = [
  "en",
  "en-US",
  "en-GB",
  "en-CA",
  "en-AU",
  "pt",
  "pt-PT",
  "pt-BR",
  "es",
  "es-ES",
  "es-MX",
  "es-AR",
  "fr",
  "fr-FR",
  "fr-CA",
  "de",
  "de-DE",
  "de-AT",
  "de-CH",
  "it",
  "it-IT",
  "nl",
  "nl-NL",
  "nl-BE",
  "pl",
  "pl-PL",
  "ja",
  "ja-JP",
  "zh",
  "zh-CN",
  "zh-TW",
  "ko",
  "ko-KR",
  "ru",
  "ru-RU",
  "ar",
  "ar-SA",
  "tr",
  "tr-TR",
] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Whether the OS/browser can meaningfully resolve a value for this field.
 * Locale: yes — `navigator.language` (web) / `expo-localization` (mobile).
 *
 * Phase 3's `PreferencesConfig` reads this at the type level to enforce
 * that `allowSystemBinding: true` only compiles for system-resolvable
 * fields. Keep as a literal `true` (not `boolean`).
 */
export const systemResolvable = true;

/**
 * Predicate. `true` if `value` is a member of the curated `LOCALES` tuple.
 *
 * Mirrors the `isE164` / `isTimezone` predicates in the other subfolders
 * so consumers don't have to choose between "use the schema" and "use the
 * predicate" — they're the same check.
 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Zod schema. Accepts any value present in `LOCALES`.
 */
export const localeSchema = z.enum(LOCALES);

/**
 * Display metadata for a locale. Sourced from CLDR via `Intl.DisplayNames`.
 */
export interface LocaleMeta {
  /** BCP 47 code */
  code: Locale;
  /** Name in English (from CLDR) */
  name: string;
  /** Name in the locale's own language (from CLDR) */
  nativeName: string;
}

/**
 * Get display metadata for a curated locale.
 */
export function getLocaleMeta(code: Locale): LocaleMeta {
  const inEn = new Intl.DisplayNames(["en"], { type: "language" });
  const inSelf = new Intl.DisplayNames([code], { type: "language" });
  return {
    code,
    name: inEn.of(code) ?? code,
    nativeName: inSelf.of(code) ?? code,
  };
}

export { detectSystemValue } from "./detect";
