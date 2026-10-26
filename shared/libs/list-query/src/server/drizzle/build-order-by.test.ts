import { describe, it, expect, vi } from "vitest";
import { buildOrderBy, type ColumnMap } from "./build-order-by";

// We stub drizzle-orm's asc/desc at the module level so we can assert
// which column ended up in which direction without a real database.
vi.mock("drizzle-orm", () => {
  return {
    asc: (col: unknown) => ({ _fn: "asc", col }),
    desc: (col: unknown) => ({ _fn: "desc", col }),
  };
});

// Minimal fake columns. The helper treats columns as opaque values,
// comparing them only by reference identity.
const nameCol = { _name: "name" } as unknown as Parameters<typeof buildOrderBy>[2];
const createdAtCol = { _name: "createdAt" } as unknown as Parameters<typeof buildOrderBy>[2];
const idCol = { _name: "id" } as unknown as Parameters<typeof buildOrderBy>[2];

const columnMap: ColumnMap = {
  name: nameCol as unknown as ColumnMap[string],
  createdAt: createdAtCol as unknown as ColumnMap[string],
  id: idCol as unknown as ColumnMap[string],
};

describe("buildOrderBy", () => {
  it("single asc field + tiebreaker", () => {
    const result = buildOrderBy([{ field: "name", direction: "asc" }], columnMap, idCol);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ _fn: "asc", col: nameCol });
    expect(result[1]).toEqual({ _fn: "asc", col: idCol });
  });

  it("single desc field + tiebreaker", () => {
    const result = buildOrderBy([{ field: "createdAt", direction: "desc" }], columnMap, idCol);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ _fn: "desc", col: createdAtCol });
    expect(result[1]).toEqual({ _fn: "asc", col: idCol });
  });

  it("preserves multi-field order", () => {
    const result = buildOrderBy(
      [
        { field: "name", direction: "asc" },
        { field: "createdAt", direction: "desc" },
      ],
      columnMap,
      idCol,
    );
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ _fn: "asc", col: nameCol });
    expect(result[1]).toEqual({ _fn: "desc", col: createdAtCol });
    expect(result[2]).toEqual({ _fn: "asc", col: idCol });
  });

  it("empty sort still appends the tiebreaker", () => {
    // In practice the zod factory always returns a non-empty sort
    // array, but the helper tolerates an empty list defensively.
    const result = buildOrderBy([], columnMap, idCol);
    expect(result).toEqual([{ _fn: "asc", col: idCol }]);
  });

  it("does not duplicate the tiebreaker when it's already in the sort", () => {
    const result = buildOrderBy(
      [{ field: "id", direction: "desc" }],
      columnMap,
      idCol,
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ _fn: "desc", col: idCol });
  });

  it("throws when sort references a field absent from the column map", () => {
    expect(() =>
      buildOrderBy(
        [{ field: "unknown", direction: "asc" }],
        columnMap,
        idCol,
      ),
    ).toThrow(/not in the column map/);
  });
});
