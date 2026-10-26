/**
 * Address — structured postal address value.
 *
 * Stored as a structured value (jsonb on the API side) so the result of an
 * autocomplete lookup can be persisted without losing components. `formatted`
 * is the single-line representation ready for display; structured parts are
 * optional because not every backend returns every part.
 */

import { z } from "zod";
import { countrySchema } from "../country";

export interface AddressValue {
  /** Single-line representation ready for display. Derived from parts on submit. */
  formatted?: string | null;
  street?: string | null;
  /** Apartment / unit / floor — user-entered, never set by autocomplete. */
  line2?: string | null;
  city?: string | null;
  region?: string | null;
  postcode?: string | null;
  /** ISO 3166-1 alpha-2; consume `Country` from `@libs/value-types`. */
  country?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export const addressSchema: z.ZodType<AddressValue> = z.object({
  formatted: z.string().nullish(),
  street: z.string().nullish(),
  line2: z.string().nullish(),
  city: z.string().nullish(),
  region: z.string().nullish(),
  postcode: z.string().nullish(),
  country: countrySchema.nullish(),
  lat: z.number().nullish(),
  lng: z.number().nullish(),
});

/**
 * Rebuild the single-line `formatted` representation from the structured parts.
 * Called on submit so a user who edits `city` / `region` / `postcode` after
 * picking from autocomplete still gets a coherent single-line string.
 */
export function buildFormattedAddress(a: AddressValue): string {
  const head =
    a.street && a.line2 ? `${a.street}, ${a.line2}` : (a.street ?? a.line2 ?? null);
  const cityZip =
    a.postcode && a.city ? `${a.postcode} ${a.city}` : (a.city ?? a.postcode ?? null);
  const tail = [cityZip, a.region, a.country].filter(Boolean).join(", ");
  return [head, tail].filter(Boolean).join(", ");
}
