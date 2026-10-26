import { describe, it, expect } from "vitest";
import { LOCALES, localeSchema, getLocaleMeta } from "../src/locale";

describe("locale", () => {
  it("LOCALES contains expected anchor codes", () => {
    expect(LOCALES).toContain("en");
    expect(LOCALES).toContain("en-US");
    expect(LOCALES).toContain("pt-BR");
    expect(LOCALES).toContain("ja-JP");
  });

  it("schema accepts curated codes", () => {
    expect(localeSchema.safeParse("en").success).toBe(true);
    expect(localeSchema.safeParse("pt-BR").success).toBe(true);
  });

  it("schema rejects unknown codes", () => {
    expect(localeSchema.safeParse("xx-XX").success).toBe(false);
    expect(localeSchema.safeParse("english").success).toBe(false);
    expect(localeSchema.safeParse("EN").success).toBe(false);
  });

  it("getLocaleMeta returns English + native names from CLDR", () => {
    const en = getLocaleMeta("en");
    expect(en.code).toBe("en");
    expect(en.name).toMatch(/English/);

    const ja = getLocaleMeta("ja");
    expect(ja.name).toMatch(/Japanese/);
    expect(ja.nativeName).toMatch(/日本語/);
  });
});
