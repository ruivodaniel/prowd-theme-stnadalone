// Removes what belongs to a part of the repo, from the database. Dry run by default; --apply deletes.
//   node docs/engine/remove.ts shared/libs/ui [--apply]
// An entry whose paths are all inside the removed path goes. An entry that also belongs elsewhere keeps its other paths. A global entry (no path) stays.
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DB = join(dirname(dirname(fileURLToPath(import.meta.url))), "db");
const target = (process.argv[2] ?? "").replace(/\/+$/, ""), apply = process.argv.includes("--apply");
if (!target) { console.error("usage: node docs/engine/remove.ts <path> [--apply]"); process.exit(1); }
const inside = (p: string) => p === target || p.startsWith(target + "/");
const walk = (dir: string): string[] => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return n === "assets" || p.endsWith("index.json") || p.endsWith("search.json") ? [] : statSync(p).isDirectory() ? walk(p) : [p]; });
let removed = 0, trimmed = 0;
for (const f of ["doc", "term", "adr", "standards"].flatMap((k) => walk(join(DB, k)))) {
  const e = JSON.parse(readFileSync(f, "utf8")), paths: string[] = e.paths ?? [];
  if (!paths.some(inside)) continue;
  if (paths.every(inside)) {
    removed++; console.log(`${apply ? "delete" : "would delete"}  ${e.id}`);
    if (apply) { rmSync(f); if (e.kind === "doc" && e.docId) rmSync(join(DB, "assets", e.docId), { recursive: true, force: true }); }
  } else {
    trimmed++; console.log(`${apply ? "trim  " : "would trim"}  ${e.id}  (keeps ${paths.filter((p) => !inside(p)).join(", ")})`);
    if (apply) writeFileSync(f, JSON.stringify({ ...e, paths: paths.filter((p) => !inside(p)) }, null, 2) + "\n");
  }
}
console.log(`${removed} to delete, ${trimmed} to trim${apply ? " (applied). Run: node docs/engine/build.ts" : ". Add --apply to do it."}`);
