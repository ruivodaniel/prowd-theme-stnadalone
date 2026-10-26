/**
 * Timezone — IANA Time Zone Database identifiers (Olson names).
 *
 * The IANA database has ~600 zones. Rather than ship a static tuple that
 * goes stale every release, the lib exposes:
 *
 * - `TIMEZONES` — the list reported by the runtime via
 *   `Intl.supportedValuesOf("timeZone")` (Node 18+, all modern browsers).
 *   This is the authoritative current set as the engine sees it.
 * - `isTimezone(tz)` — runtime validator backed by `Intl.DateTimeFormat`,
 *   which rejects anything the engine can't construct a formatter for.
 * - `timezoneSchema` — Zod schema using the runtime validator.
 * - Region helpers — group zones by their first segment (`Africa`,
 *   `America`, `Asia`, `Atlantic`, `Australia`, `Etc`, `Europe`, `Indian`,
 *   `Pacific`).
 */

import { z } from "zod";

/**
 * Snapshot of supported zones at module load.
 *
 * Sourced from `Intl.supportedValuesOf("timeZone")`, which returns
 * canonical IANA Olson names (e.g. `Etc/UTC` rather than the bare `UTC`
 * alias). We prepend the `UTC` alias because most products store the
 * short form; the `Intl` validator accepts both, so this is purely a
 * convenience for downstream code.
 *
 * Within a process the list is stable.
 */
function buildTimezoneList(): readonly string[] {
  const supported = Intl.supportedValuesOf("timeZone");
  const list = supported.includes("UTC") ? [...supported] : ["UTC", ...supported];
  return Object.freeze(list);
}

export const TIMEZONES: readonly string[] = buildTimezoneList();

export type Timezone = string;

/**
 * Whether the OS/browser can meaningfully resolve a value for this field.
 * Timezone: yes — `Intl.DateTimeFormat().resolvedOptions().timeZone`.
 *
 * Phase 3's `PreferencesConfig` reads this at the type level to enforce
 * that `allowSystemBinding: true` only compiles for system-resolvable
 * fields. Keep as a literal `true` (not `boolean`).
 */
export const systemResolvable = true;

/**
 * Predicate. `true` if the engine can construct a `DateTimeFormat` for
 * this timezone — the canonical IANA "is this a real zone" test.
 */
export function isTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Zod schema for IANA timezones. Validates at runtime via `Intl`.
 */
export const timezoneSchema = z
  .string()
  .refine(isTimezone, { message: "Invalid IANA timezone" });

/**
 * Group zones by their first path segment. `Etc` includes `UTC` and the
 * `Etc/GMT+N` family. Useful for grouped dropdowns.
 */
export function groupTimezonesByRegion(
  zones: readonly string[] = TIMEZONES,
): ReadonlyMap<string, readonly string[]> {
  const groups = new Map<string, string[]>();
  for (const tz of zones) {
    const slash = tz.indexOf("/");
    const region = slash === -1 ? "Etc" : tz.slice(0, slash);
    const bucket = groups.get(region) ?? [];
    bucket.push(tz);
    groups.set(region, bucket);
  }
  for (const bucket of groups.values()) bucket.sort();
  return groups;
}

export { detectSystemValue } from "./detect";
