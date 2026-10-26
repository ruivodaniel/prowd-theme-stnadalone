import { describe, it, expect } from "vitest";
import { CURRENCIES, currencySchema, getCurrencyMeta } from "../src/currency";
import { CURRENCY_ROWS } from "../src/currency/data";

describe("currency", () => {
  it("CURRENCIES tuple matches CURRENCY_ROWS one-to-one", () => {
    const fromRows = CURRENCY_ROWS.map((r) => r.code);
    expect([...CURRENCIES].sort()).toEqual([...fromRows].sort());
    expect(CURRENCIES.length).toBe(CURRENCY_ROWS.length);
  });

  it("each row has alpha-3 code, symbol, name, decimals 0/2/3", () => {
    for (const row of CURRENCY_ROWS) {
      expect(row.code).toMatch(/^[A-Z]{3}$/);
      expect(row.symbol.length).toBeGreaterThan(0);
      expect(row.name.length).toBeGreaterThan(0);
      expect([0, 2, 3]).toContain(row.decimals);
    }
  });

  it("zero-decimal currencies are flagged correctly", () => {
    expect(getCurrencyMeta("JPY").decimals).toBe(0);
    expect(getCurrencyMeta("KRW").decimals).toBe(0);
    expect(getCurrencyMeta("CLP").decimals).toBe(0);
    expect(getCurrencyMeta("HUF").decimals).toBe(0);
  });

  it("schema accepts known + rejects unknown", () => {
    expect(currencySchema.safeParse("EUR").success).toBe(true);
    expect(currencySchema.safeParse("USD").success).toBe(true);
    expect(currencySchema.safeParse("XYZ").success).toBe(false);
    expect(currencySchema.safeParse("eur").success).toBe(false);
  });

  it("getCurrencyMeta returns the row", () => {
    const eur = getCurrencyMeta("EUR");
    expect(eur.symbol).toBe("€");
    expect(eur.decimals).toBe(2);
    expect(eur.name).toBe("Euro");
  });
});
