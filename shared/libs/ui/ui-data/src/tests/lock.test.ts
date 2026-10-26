import { describe, expect, it } from "vitest";
import { hashOf, lockOf } from "../lock";
import type { Doc, Registry } from "../types";

const doc = (name: string, version: number, root: Doc["root"], kind: Doc["kind"] = "page"): Doc => ({ kind, schemaVersion: 1, name, version, root });
const reg: Registry = {
  pages: { home: doc("home", 2, { use: { component: "Shell", version: "latest" } }) },
  components: { Shell: { 1: doc("Shell", 1, { type: "Fragment" }, "component"), 2: doc("Shell", 2, { type: "Fragment" }, "component") } },
};

describe("the lock", () => {
  it("hashes the same content the same, in any key order", () => expect(hashOf({ a: 1, b: 2 })).toBe(hashOf({ b: 2, a: 1 })));
  it("resolves latest and records the version and the hash of every component", () => {
    const l = lockOf(reg, "home")!;
    expect(l.documentVersion).toBe(2);
    expect(l.componentVersions.Shell.version).toBe(2);
    expect(l.componentVersions.Shell.hash).toBe(hashOf(reg.components.Shell[2]));
  });
  it("is null for a page that does not exist", () => expect(lockOf(reg, "nope")).toBeNull());
});
