import { describe, it, expect } from "vitest";
import { applyPagination } from "./apply-pagination";

/**
 * Fake query builder mimicking drizzle's progressive-narrowing chain:
 *   .limit(n)  returns an object with .offset(n)
 *   .offset(n) returns a "final" object we verify against
 *
 * The shared `calls` record lives on the outer builder and the final
 * object alike, so assertions can inspect it from either end.
 */
interface Calls {
  limit?: number;
  offset?: number;
}

function makeFakeQb() {
  const calls: Calls = {};
  const qb = {
    calls,
    limit(n: number) {
      calls.limit = n;
      return {
        calls,
        offset(m: number) {
          calls.offset = m;
          return { calls, executed: true as const };
        },
      };
    },
  };
  return qb;
}

describe("applyPagination", () => {
  it("calls .limit(pageSize) then .offset((page-1)*pageSize)", () => {
    const qb = makeFakeQb();
    const result = applyPagination(qb, 1, 25);
    expect(result.executed).toBe(true);
    expect(qb.calls).toEqual({ limit: 25, offset: 0 });
  });

  it("offset is (page - 1) * pageSize", () => {
    const qb = makeFakeQb();
    applyPagination(qb, 3, 25);
    expect(qb.calls.offset).toBe(50);
  });

  it("page=1 yields offset=0", () => {
    const qb = makeFakeQb();
    applyPagination(qb, 1, 10);
    expect(qb.calls.offset).toBe(0);
  });

  it("page=2 yields offset=pageSize", () => {
    const qb = makeFakeQb();
    applyPagination(qb, 2, 10);
    expect(qb.calls.offset).toBe(10);
  });

  it("page=100, pageSize=25 → offset=2475", () => {
    const qb = makeFakeQb();
    applyPagination(qb, 100, 25);
    expect(qb.calls.offset).toBe(2475);
  });

  it("returns the final chain link (the result of .offset())", () => {
    const qb = makeFakeQb();
    const result = applyPagination(qb, 5, 10);
    // TS should infer `result` as the final object with `executed: true`.
    expect(result.executed).toBe(true);
  });
});
