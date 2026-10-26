import { describe, it, expect } from "vitest";
import {
  TIMEZONES,
  isTimezone,
  timezoneSchema,
  groupTimezonesByRegion,
} from "../src/timezone";

describe("timezone", () => {
  it("TIMEZONES contains UTC and major canonical zones", () => {
    expect(TIMEZONES).toContain("UTC");
    expect(TIMEZONES).toContain("Europe/Lisbon");
    expect(TIMEZONES).toContain("America/Sao_Paulo");
    expect(TIMEZONES).toContain("Asia/Tokyo");
  });

  it("isTimezone accepts canonical IANA names", () => {
    for (const tz of ["UTC", "Europe/London", "America/New_York", "Asia/Singapore"]) {
      expect(isTimezone(tz)).toBe(true);
    }
  });

  it("isTimezone rejects garbage", () => {
    expect(isTimezone("Not/A_Zone")).toBe(false);
    expect(isTimezone("")).toBe(false);
    expect(isTimezone("UTC+1")).toBe(false);
  });

  it("schema validates", () => {
    expect(timezoneSchema.safeParse("UTC").success).toBe(true);
    expect(timezoneSchema.safeParse("Mars/Olympus").success).toBe(false);
  });

  it("groupTimezonesByRegion buckets by first segment", () => {
    const groups = groupTimezonesByRegion();
    expect(groups.has("Europe")).toBe(true);
    expect(groups.has("America")).toBe(true);
    expect(groups.has("Asia")).toBe(true);
    const europe = groups.get("Europe") ?? [];
    expect(europe).toContain("Europe/Lisbon");
    // Sorted within bucket
    expect([...europe]).toEqual([...europe].sort());
  });

  it("UTC lands in the Etc bucket because it has no '/'", () => {
    const groups = groupTimezonesByRegion();
    const etc = groups.get("Etc") ?? [];
    expect(etc).toContain("UTC");
  });
});
