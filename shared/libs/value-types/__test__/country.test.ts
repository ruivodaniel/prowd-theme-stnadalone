import { describe, it, expect } from "vitest";
import { COUNTRIES, countrySchema, getCountryMeta } from "../src/country";
import { COUNTRY_ROWS } from "../src/country/data";

describe("country", () => {
  it("COUNTRIES tuple matches COUNTRY_ROWS one-to-one", () => {
    const fromRows = COUNTRY_ROWS.map((r) => r.code);
    expect([...COUNTRIES].sort()).toEqual([...fromRows].sort());
    expect(COUNTRIES.length).toBe(COUNTRY_ROWS.length);
  });

  it("each row has alpha-2 code, dialing code, flag", () => {
    for (const row of COUNTRY_ROWS) {
      expect(row.code).toMatch(/^[A-Z]{2}$/);
      expect(row.dialingCode).toMatch(/^\d{1,3}$/);
      expect(row.flag.length).toBeGreaterThan(0);
      expect(row.name.length).toBeGreaterThan(0);
    }
  });

  it("schema accepts known and rejects unknown", () => {
    expect(countrySchema.safeParse("PT").success).toBe(true);
    expect(countrySchema.safeParse("US").success).toBe(true);
    expect(countrySchema.safeParse("XX").success).toBe(false);
    expect(countrySchema.safeParse("pt").success).toBe(false);
  });

  it("getCountryMeta returns the row", () => {
    const pt = getCountryMeta("PT");
    expect(pt.code).toBe("PT");
    expect(pt.name).toBe("Portugal");
    expect(pt.dialingCode).toBe("351");
    expect(pt.flag).toBe("🇵🇹");
  });
});
