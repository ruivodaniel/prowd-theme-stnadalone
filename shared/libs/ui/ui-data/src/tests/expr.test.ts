import { describe, expect, it } from "vitest";
import { evalExpr, isExpr, opOf } from "../expr";
import { ACTIONS, BUILTIN_NODES, NODE_KEYS, OPS } from "../dictionary";

const scope = { state: { n: 3, name: "Ana Maria", list: ["a", "b"] }, item: { id: 7 } };

describe("expressions", () => {
  it("reads a path of the scope", () => expect(evalExpr({ bind: "state.n" }, scope)).toBe(3));
  it("compares, combines and chooses", () => {
    expect(evalExpr({ gt: [{ bind: "state.n" }, 2] }, scope)).toBe(true);
    expect(evalExpr({ and: [true, { not: false }] }, scope)).toBe(true);
    expect(evalExpr({ if: [{ eq: [1, 2] }, "yes", "no"] }, scope)).toBe("no");
  });
  it("works on text and lists", () => {
    expect(evalExpr({ concat: ["hi ", { bind: "state.name" }] }, scope)).toBe("hi Ana Maria");
    expect(evalExpr({ initials: [{ bind: "state.name" }] }, scope)).toBe("AM");
    expect(evalExpr({ join: [{ bind: "state.list" }, "-"] }, scope)).toBe("a-b");
    expect(evalExpr({ split: ["a, b ,,c", ","] }, scope)).toEqual(["a", "b", "c"]);
    expect(evalExpr({ append: [{ bind: "state.list" }, "c"] }, scope)).toEqual(["a", "b", "c"]);
    expect(evalExpr({ without: [{ bind: "state.list" }, "a"] }, scope)).toEqual(["b"]);
  });
  it("an object with two keys is a record whose values are evaluated", () => {
    expect(evalExpr({ a: { bind: "state.n" }, b: 1 }, scope)).toEqual({ a: 3, b: 1 });
  });
  it("stops at its budget", () => {
    let e: unknown = 1;
    for (let i = 0; i < 12; i++) e = { and: [e, e, e] };
    expect(() => evalExpr(e, scope)).toThrow();
  });
});

describe("the dictionary and the evaluator agree", () => {
  it("every operation of the dictionary is one the evaluator knows", () => {
    for (const op of OPS) {
      if (op === "bind" || op === "obj" || op === "map") continue;   // their arguments are not a plain list
      try { evalExpr({ [op]: [1, 2, 3] }, scope); } catch (e) { expect(String(e)).not.toContain("unknown operation"); }
    }
  });
  it("lists the actions, the node keys and the built-ins", () => {
    expect(ACTIONS).toContain("navigate");
    expect(NODE_KEYS.has("slots")).toBe(true);
    expect(BUILTIN_NODES.mobile).toEqual(["Fragment", "Slot"]);
    expect(isExpr({ a: 1 })).toBe(true);
    expect(opOf({ a: 1 })).toBe("a");
  });
});
