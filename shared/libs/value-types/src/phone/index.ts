/**
 * Phone — E.164 international format.
 *
 * E.164: a leading `+`, then a country code (1–3 digits, first must be 1–9),
 * then the subscriber number. Total length 8–15 digits including the country
 * code. No spaces, dashes, or extensions in canonical form.
 *
 * Storage rule: phone numbers persist in E.164. Display formatting (spaces,
 * country-specific grouping) is the UI's job; the database holds canonical.
 */

import { z } from "zod";

/**
 * E.164 regex. Anchored, strict. Rejects empty strings, missing `+`, leading
 * zero in country code, non-digit characters, and lengths outside 8–15.
 */
export const E164_REGEX: RegExp = /^\+[1-9]\d{7,14}$/;

/**
 * Predicate. `true` if `value` is a valid E.164 phone number.
 */
export function isE164(value: string): boolean {
  return E164_REGEX.test(value);
}

/**
 * Zod schema for E.164 phone numbers. Use directly in validation pipelines.
 */
export const phoneSchema = z
  .string()
  .regex(E164_REGEX, "Phone number must be in E.164 format (e.g. +351912345678)");

export type Phone = z.infer<typeof phoneSchema>;

/**
 * Whether the OS/browser can meaningfully resolve a value for this field.
 * Phone: no — there is no platform API that exposes the device owner's
 * own E.164 number to web/JS code. Kept as a literal `false` so Phase 3's
 * `PreferencesConfig` rejects `allowSystemBinding: true` for this field
 * at compile time.
 */
export const systemResolvable = false;
