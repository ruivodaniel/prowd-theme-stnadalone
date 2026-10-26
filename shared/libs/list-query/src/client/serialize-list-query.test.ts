import { describe, it, expect } from "vitest";
import { serializeListQuery } from "./serialize-list-query";

describe("serializeListQuery", () => {
  it("empty input → empty params", () => {
    const params = serializeListQuery({});
    expect(params.toString()).toBe("");
  });

  it("serializes page, pageSize, sort, search", () => {
    const params = serializeListQuery({
      page: 2,
      pageSize: 25,
      sort: "-createdAt",
      search: "alice",
    });
    expect(params.get("page")).toBe("2");
    expect(params.get("pageSize")).toBe("25");
    expect(params.get("sort")).toBe("-createdAt");
    expect(params.get("search")).toBe("alice");
  });

  it("SortSpec[] → canonical string", () => {
    const params = serializeListQuery({
      sort: [
        { field: "type", direction: "asc" },
        { field: "name", direction: "desc" },
        { field: "createdAt", direction: "asc" },
      ],
    });
    expect(params.get("sort")).toBe("type,-name,createdAt");
  });

  it("empty SortSpec[] is omitted", () => {
    const params = serializeListQuery({ sort: [] });
    expect(params.has("sort")).toBe(false);
  });

  it("empty string sort is omitted", () => {
    const params = serializeListQuery({ sort: "" });
    expect(params.has("sort")).toBe(false);
  });

  it("string sort is passed through verbatim", () => {
    const params = serializeListQuery({ sort: "type,-name" });
    expect(params.get("sort")).toBe("type,-name");
  });

  it("undefined values are omitted", () => {
    const params = serializeListQuery({
      page: 1,
      pageSize: undefined,
      search: undefined,
    });
    expect(params.has("page")).toBe(true);
    expect(params.has("pageSize")).toBe(false);
    expect(params.has("search")).toBe(false);
  });

  it("null values are omitted", () => {
    const params = serializeListQuery({ customFilter: null });
    expect(params.has("customFilter")).toBe(false);
  });

  it("extra filter keys flow through", () => {
    const params = serializeListQuery({
      status: "active",
      type: "organization",
    });
    expect(params.get("status")).toBe("active");
    expect(params.get("type")).toBe("organization");
  });

  it("preserves 0 and false (not treated as undefined)", () => {
    const params = serializeListQuery({
      page: 0, // hypothetical; real validator would reject this
      isActive: false,
    });
    expect(params.get("page")).toBe("0");
    expect(params.get("isActive")).toBe("false");
  });

  it("coerces numbers to strings", () => {
    const params = serializeListQuery({ page: 3, pageSize: 10 });
    expect(params.get("page")).toBe("3");
    expect(params.get("pageSize")).toBe("10");
  });
});
