import { describe, it, expect } from "vitest";
import { parseSortString } from "./parse-sort-string";

const sortable = ["name", "createdAt", "type"] as const;
const defaultSort = "name";

describe("parseSortString — empty input → default sort", () => {
  it("undefined input uses default", () => {
    const result = parseSortString(undefined, { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "name", direction: "asc" }] });
  });

  it("empty string uses default", () => {
    const result = parseSortString("", { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "name", direction: "asc" }] });
  });

  it("whitespace-only uses default", () => {
    const result = parseSortString("   ", { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "name", direction: "asc" }] });
  });

  it("defaults to a descending field when the default starts with -", () => {
    const result = parseSortString("", { sortable, defaultSort: "-createdAt" });
    expect(result).toEqual({ ok: true, value: [{ field: "createdAt", direction: "desc" }] });
  });

  it("defaults can be multi-field", () => {
    const result = parseSortString("", { sortable, defaultSort: "type,-name" });
    expect(result).toEqual({
      ok: true,
      value: [
        { field: "type", direction: "asc" },
        { field: "name", direction: "desc" },
      ],
    });
  });
});

describe("parseSortString — single field", () => {
  it("ascending by default", () => {
    const result = parseSortString("name", { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "name", direction: "asc" }] });
  });

  it("descending with - prefix", () => {
    const result = parseSortString("-createdAt", { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "createdAt", direction: "desc" }] });
  });

  it("trims surrounding whitespace", () => {
    const result = parseSortString("  name  ", { sortable, defaultSort });
    expect(result).toEqual({ ok: true, value: [{ field: "name", direction: "asc" }] });
  });
});

describe("parseSortString — multi-field", () => {
  it("preserves order", () => {
    const result = parseSortString("type,-name,createdAt", { sortable, defaultSort });
    expect(result).toEqual({
      ok: true,
      value: [
        { field: "type", direction: "asc" },
        { field: "name", direction: "desc" },
        { field: "createdAt", direction: "asc" },
      ],
    });
  });

  it("trims whitespace inside the comma list", () => {
    const result = parseSortString("type, -name , createdAt", { sortable, defaultSort });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.map((s) => s.field)).toEqual(["type", "name", "createdAt"]);
    }
  });
});

describe("parseSortString — rejections", () => {
  it("rejects unknown field with structured error", () => {
    const result = parseSortString("nope", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toMatchObject({ field: "nope", reason: "unknown_field" });
    }
  });

  it("rejects unknown field with leading -", () => {
    const result = parseSortString("-nope", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]).toMatchObject({ field: "nope", reason: "unknown_field" });
    }
  });

  it("rejects duplicate field", () => {
    const result = parseSortString("name,-name", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]).toMatchObject({ field: "name", reason: "duplicate_field" });
    }
  });

  it("rejects invalid character in field name", () => {
    const result = parseSortString("name$", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]).toMatchObject({ reason: "invalid_character" });
    }
  });

  it("rejects empty token from trailing comma", () => {
    const result = parseSortString("name,", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]).toMatchObject({ reason: "empty_token" });
    }
  });

  it("rejects empty token from leading comma", () => {
    const result = parseSortString(",name", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors[0]).toMatchObject({ reason: "empty_token" });
    }
  });

  it("collects multiple errors in one parse", () => {
    const result = parseSortString("nope,alsoNope", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(2);
      expect(result.errors.map((e) => e.field)).toEqual(["nope", "alsoNope"]);
    }
  });
});

describe("parseSortString — bare minus", () => {
  it("rejects a lone '-' token", () => {
    const result = parseSortString("-", { sortable, defaultSort });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      // "-" strips to "" which fails the identifier regex.
      expect(result.errors[0].reason).toBe("invalid_character");
    }
  });
});
