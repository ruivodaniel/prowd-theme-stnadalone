/**
 * System detection — read the browser's reported locale and check it
 * against the lib's curated `LOCALES` tuple.
 *
 * Web only. Mobile (React Native / Expo) ships its own detection helper
 * in a separate subpath if/when needed; deferred per Phase 1's web-only
 * constraint.
 */

import { isLocale, type Locale } from "./index";

/**
 * Returns the browser's locale if it's a member of the lib's curated
 * `LOCALES` tuple, otherwise `null`. Caller decides what to do with
 * `null` (typically: fall back to product default).
 *
 * Returns `null` (not throws) in non-browser environments — the helper
 * is safe to import on the server, where it's a no-op.
 */
export function detectSystemValue(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const raw = navigator.language;
  return isLocale(raw) ? raw : null;
}
