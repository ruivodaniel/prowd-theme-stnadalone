import { describe, it, expect } from "vitest";
import { isE164, phoneSchema, E164_REGEX } from "../src/phone";

describe("phone E.164", () => {
  it("accepts valid international numbers", () => {
    for (const n of ["+351912345678", "+14155552671", "+442071838750", "+819012345678", "+5511999998888"]) {
      expect(isE164(n)).toBe(true);
      expect(phoneSchema.safeParse(n).success).toBe(true);
    }
  });

  it("rejects missing leading +", () => {
    expect(isE164("351912345678")).toBe(false);
  });

  it("rejects spaces and punctuation", () => {
    expect(isE164("+351 912 345 678")).toBe(false);
    expect(isE164("+1-415-555-2671")).toBe(false);
    expect(isE164("+1 (415) 555-2671")).toBe(false);
  });

  it("rejects leading zero in country code", () => {
    expect(isE164("+0123456789")).toBe(false);
  });

  it("rejects out-of-range lengths", () => {
    // 7 digits after `+1` = 8 total digits — minimum E.164 is 8 digits, so border-line
    expect(isE164("+12")).toBe(false); // 2 digits (too short)
    expect(isE164("+1234567")).toBe(false); // 7 digits (too short)
    expect(isE164("+12345678")).toBe(true); // 8 digits, valid
    expect(isE164("+123456789012345")).toBe(true); // 15 digits, max
    expect(isE164("+1234567890123456")).toBe(false); // 16 digits, too long
  });

  it("rejects empty + non-digit characters", () => {
    expect(isE164("")).toBe(false);
    expect(isE164("+")).toBe(false);
    expect(isE164("+1abc4567")).toBe(false);
    expect(isE164("not a phone")).toBe(false);
  });

  it("regex export is anchored", () => {
    // Anchors prevent substring matches (security: don't accept "garbage+12345678")
    expect("garbage+12345678".match(E164_REGEX)).toBeNull();
  });
});
