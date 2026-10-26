/**
 * @libs/value-types — universe of valid values for shared vocabulary.
 *
 * Pure data + thin validators backed by ISO/IANA/BCP 47/E.164 standards.
 * Zero product knowledge: the lib does not import from any product config,
 * module, or app. Products narrow these tuples in their own preferences
 * config; the lib is the upstream universe.
 *
 * Two consumption shapes are supported:
 *
 *   import { phoneSchema, LOCALES } from "@libs/value-types";
 *     - Flat named exports for the day-to-day case.
 *
 *   import { locale, timezone } from "@libs/value-types";
 *     locale.systemResolvable    // typed as `true`
 *     timezone.detectSystemValue();
 *     - Namespace re-exports for type-level introspection (e.g. Phase 3's
 *       `PreferencesConfig` reads `typeof locale.systemResolvable`).
 *
 * Subpath imports also work (`@libs/value-types/locale`, etc.).
 */

// ---------------------------------------------------------------------------
// Namespace re-exports — required by consumers that read capability flags
// at the type level (e.g. `typeof locale.systemResolvable`).
// ---------------------------------------------------------------------------

export * as locale from "./locale";
export * as timezone from "./timezone";
export * as phone from "./phone";
export * as country from "./country";
export * as currency from "./currency";
export * as address from "./address";

// ---------------------------------------------------------------------------
// Flat named exports — convenience for the common case.
// ---------------------------------------------------------------------------

export {
  LOCALES,
  type Locale,
  isLocale,
  localeSchema,
  type LocaleMeta,
  getLocaleMeta,
} from "./locale";

export {
  TIMEZONES,
  type Timezone,
  isTimezone,
  timezoneSchema,
  groupTimezonesByRegion,
} from "./timezone";

export {
  E164_REGEX,
  isE164,
  phoneSchema,
  type Phone,
} from "./phone";

export {
  COUNTRIES,
  COUNTRY_ROWS,
  type Country,
  countrySchema,
  type CountryRow,
  getCountryMeta,
} from "./country";

export {
  CURRENCIES,
  type Currency,
  currencySchema,
  type CurrencyRow,
  getCurrencyMeta,
} from "./currency";

export {
  type AddressValue,
  addressSchema,
  buildFormattedAddress,
} from "./address";
