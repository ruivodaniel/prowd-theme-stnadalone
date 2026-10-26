import { describe, it, expect } from "vitest";
import { z } from "zod";
import { createListQuerySchema } from "./create-list-query-schema";

const SORTABLE = ["name", "createdAt"] as const;

function base() {
  return createListQuerySchema({
    sortable: SORTABLE,
    defaultSort: "name",
    searchable: true,
  });
}

describe("createListQuerySchema — defaults", () => {
  it("applies defaults when the client sends nothing", () => {
    const schema = base();
    const parsed = schema.parse({});
    expect(parsed).toEqual({
      page: 1,
      pageSize: 25,
      sort: [{ field: "name", direction: "asc" }],
    });
  });

  it("honours call-site defaults override", () => {
    const schema = createListQuerySchema({
      sortable: SORTABLE,
      defaultSort: "name",
      searchable: false,
      defaults: { page: 3, pageSize: 50, maxPageSize: 200 },
    });
    const parsed = schema.parse({});
    expect(parsed.page).toBe(3);
    expect(parsed.pageSize).toBe(50);
  });

  it("provide only page → use it, pageSize defaults", () => {
    const parsed = base().parse({ page: "7" });
    expect(parsed.page).toBe(7);
    expect(parsed.pageSize).toBe(25);
  });

  it("provide only pageSize → use it, page defaults", () => {
    const parsed = base().parse({ pageSize: "50" });
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(50);
  });
});

describe("createListQuerySchema — coercion and bounds", () => {
  it("coerces string numbers (query params are strings)", () => {
    const parsed = base().parse({ page: "2", pageSize: "10" });
    expect(parsed.page).toBe(2);
    expect(parsed.pageSize).toBe(10);
  });

  it("rejects page=0", () => {
    expect(() => base().parse({ page: "0" })).toThrow(z.ZodError);
  });

  it("rejects negative page", () => {
    expect(() => base().parse({ page: "-1" })).toThrow(z.ZodError);
  });

  it("rejects pageSize above max", () => {
    expect(() => base().parse({ pageSize: "101" })).toThrow(z.ZodError);
  });

  it("rejects non-integer page", () => {
    expect(() => base().parse({ page: "1.5" })).toThrow(z.ZodError);
  });

  it("rejects non-numeric page", () => {
    expect(() => base().parse({ page: "abc" })).toThrow(z.ZodError);
  });

  it("respects a custom max from overridden defaults", () => {
    const schema = createListQuerySchema({
      sortable: SORTABLE,
      defaultSort: "name",
      searchable: false,
      defaults: { page: 1, pageSize: 10, maxPageSize: 10 },
    });
    expect(() => schema.parse({ pageSize: "11" })).toThrow(z.ZodError);
    expect(schema.parse({ pageSize: "10" }).pageSize).toBe(10);
  });
});

describe("createListQuerySchema — sort", () => {
  it("parses ascending single field", () => {
    const parsed = base().parse({ sort: "createdAt" });
    expect(parsed.sort).toEqual([{ field: "createdAt", direction: "asc" }]);
  });

  it("parses descending with - prefix", () => {
    const parsed = base().parse({ sort: "-createdAt" });
    expect(parsed.sort).toEqual([{ field: "createdAt", direction: "desc" }]);
  });

  it("parses multi-field preserving order", () => {
    const parsed = base().parse({ sort: "name,-createdAt" });
    expect(parsed.sort).toEqual([
      { field: "name", direction: "asc" },
      { field: "createdAt", direction: "desc" },
    ]);
  });

  it("rejects unknown sort field", () => {
    expect(() => base().parse({ sort: "bogus" })).toThrow(z.ZodError);
  });

  it("rejects duplicate sort field", () => {
    expect(() => base().parse({ sort: "name,-name" })).toThrow(z.ZodError);
  });

  it("sort error is attached to the `sort` path", () => {
    try {
      base().parse({ sort: "bogus" });
      throw new Error("should have thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(z.ZodError);
      const zerr = e as z.ZodError;
      // ZodEffects wrapper prepends the field name, so the issue
      // path resolves to ["sort"] even though the transform adds
      // an empty path of its own.
      expect(zerr.issues[0].path).toEqual(["sort"]);
    }
  });
});

describe("createListQuerySchema — search field presence", () => {
  it("searchable=true accepts search", () => {
    const parsed = base().parse({ search: "alice" });
    expect(parsed.search).toBe("alice");
  });

  it("searchable=false rejects search (unknown key, 400)", () => {
    const schema = createListQuerySchema({
      sortable: SORTABLE,
      defaultSort: "name",
      searchable: false,
    });
    expect(() => schema.parse({ search: "alice" })).toThrow(z.ZodError);
  });

  it("searchable omitted rejects search (unknown key, 400)", () => {
    const schema = createListQuerySchema({
      sortable: SORTABLE,
      defaultSort: "name",
    });
    expect(() => schema.parse({ search: "alice" })).toThrow(z.ZodError);
  });

  it("rejects unknown keys across the board", () => {
    expect(() => base().parse({ bogus: "x" })).toThrow(z.ZodError);
  });
});

describe("createListQuerySchema — extend with endpoint filters", () => {
  // Consumers MUST use `.extend()`, not `.merge()`. Zod's `.merge()`
  // takes unknown-keys mode from the right-hand side (default: strip),
  // losing the strictness we need to reject unknown keys at 400.
  // `.extend()` preserves the base schema's strict mode.

  it("extended schema still applies pagination defaults", () => {
    const schema = base().extend({
      status: z.enum(["active", "inactive"]).optional(),
    });
    const parsed = schema.parse({ status: "active" });
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(25);
    expect(parsed.status).toBe("active");
  });

  it("extended schema rejects unknown keys", () => {
    const schema = base().extend({
      status: z.enum(["active", "inactive"]).optional(),
    });
    expect(() => schema.parse({ weird: "x" })).toThrow(z.ZodError);
  });

  it("extended schema accepts known filter values", () => {
    const schema = base().extend({
      status: z.enum(["active", "inactive"]).optional(),
    });
    const parsed = schema.parse({ sort: "-createdAt", status: "inactive" });
    expect(parsed.sort[0]).toEqual({ field: "createdAt", direction: "desc" });
    expect(parsed.status).toBe("inactive");
  });
});
