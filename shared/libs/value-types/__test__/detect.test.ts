/**
 * Detection helpers — locale.detectSystemValue + timezone.detectSystemValue.
 *
 * Locale: stubbed via `vi.stubGlobal("navigator", …)` because Node 21+
 * exposes a frozen built-in `globalThis.navigator` that direct assignment
 * cannot replace.
 *
 * Timezone: the mock has to be selective. detect.ts calls
 * `Intl.DateTimeFormat()` (no args) to get the resolved zone, then
 * delegates to `isTimezone(tz)` which calls
 * `Intl.DateTimeFormat("en", { timeZone: tz })`. The mock returns the
 * bad zone for the no-args call but defers to the real impl for the
 * isTimezone check, so the validation path stays honest.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { detectSystemValue as detectLocale } from "../src/locale/detect";
import { detectSystemValue as detectTimezone } from "../src/timezone/detect";

// ---------------------------------------------------------------------------
// Locale
// ---------------------------------------------------------------------------

describe("locale.detectSystemValue", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the value when navigator.language is in LOCALES", () => {
    vi.stubGlobal("navigator", { language: "en-US" });
    expect(detectLocale()).toBe("en-US");
  });

  it("returns the base code when only the base is in LOCALES", () => {
    vi.stubGlobal("navigator", { language: "ja" });
    expect(detectLocale()).toBe("ja");
  });

  it("returns null when navigator.language is unsupported", () => {
    vi.stubGlobal("navigator", { language: "xx-XX" });
    expect(detectLocale()).toBeNull();
  });

  it("returns null in environments without `navigator` (server-side import)", () => {
    vi.stubGlobal("navigator", undefined);
    expect(detectLocale()).toBeNull();
  });

  it("rejects an unrelated dialect (e.g. fr-LU) that is not curated", () => {
    vi.stubGlobal("navigator", { language: "fr-LU" });
    expect(detectLocale()).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Timezone
// ---------------------------------------------------------------------------

describe("timezone.detectSystemValue", () => {
  let realDateTimeFormat: typeof Intl.DateTimeFormat;

  beforeEach(() => {
    realDateTimeFormat = Intl.DateTimeFormat;
  });

  afterEach(() => {
    Intl.DateTimeFormat = realDateTimeFormat;
  });

  it("returns the engine-resolved timezone in normal operation", () => {
    const tz = detectTimezone();
    expect(tz).not.toBeNull();
    expect(typeof tz).toBe("string");
  });

  it("returns the value Intl reports when it's a valid IANA zone", () => {
    Intl.DateTimeFormat = makeSelectiveMock("Europe/Lisbon", realDateTimeFormat);
    expect(detectTimezone()).toBe("Europe/Lisbon");
  });

  it("returns null when Intl reports an invalid zone (defensive)", () => {
    Intl.DateTimeFormat = makeSelectiveMock("Mars/Olympus", realDateTimeFormat);
    expect(detectTimezone()).toBeNull();
  });

  it("returns null when Intl throws", () => {
    const throwing = function (): Intl.DateTimeFormat {
      throw new Error("Intl unavailable");
    };
    Intl.DateTimeFormat = throwing as unknown as typeof Intl.DateTimeFormat;
    expect(detectTimezone()).toBeNull();
  });
});

/**
 * Build a DateTimeFormat replacement that:
 *   - returns the given fake zone when called with no `timeZone` option
 *     (this is what `detect.ts` uses to read the system-resolved zone)
 *   - delegates to the real implementation when called with an explicit
 *     `timeZone` (this is what `isTimezone` uses to validate the zone)
 *
 * Cast at the boundary because Intl's overloads exceed what a focused
 * mock needs to model.
 */
function makeSelectiveMock(
  fakeZone: string,
  real: typeof Intl.DateTimeFormat,
): typeof Intl.DateTimeFormat {
  const fn = function (
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): Intl.DateTimeFormat {
    if (options && "timeZone" in options) {
      return new real(locales, options);
    }
    return {
      resolvedOptions: () => ({ timeZone: fakeZone } as Intl.ResolvedDateTimeFormatOptions),
    } as Intl.DateTimeFormat;
  };
  return fn as unknown as typeof Intl.DateTimeFormat;
}
