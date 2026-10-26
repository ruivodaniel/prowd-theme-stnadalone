// Structural check of the database: every entry file must match docs/engine/doc.types.ts.
// Run from the repo root:  node docs/engine/build.ts && node docs/engine/validate-docs.mjs
import { readFile, readdir, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const DB = join(dirname(dirname(fileURLToPath(import.meta.url))), "db");
let errors = 0;
const fail = (where, msg) => { errors++; console.log(`  ERROR   ${where}: ${msg}`); };
const exists = (p) => access(p).then(() => true, () => false);
const walk = async (dir) => (await readdir(dir, { withFileTypes: true })).flatMap((d) => d.isDirectory() ? [] : [join(dir, d.name)]);

const SUBJECTS = new Set(JSON.parse(await readFile(join(DB, "subjects.json"), "utf8")).subjects.map((s) => s.id));
const KINDS = ["doc", "term", "adr", "standards"], STATUS = ["todo", "converted", "approved"], seen = new Set();
for (const kind of KINDS) {
  for (const f of (await walk(join(DB, kind))).filter((x) => x.endsWith(".json"))) {
    const e = JSON.parse(await readFile(f, "utf8")), where = `${kind}/${f.split("/").pop()}`;
    if (join(DB, e.id + ".json") !== f) fail(where, `the id "${e.id}" does not match the file path`);
    if (seen.has(e.id)) fail(where, "duplicate id"); seen.add(e.id);
    if (e.kind !== kind) fail(where, `kind "${e.kind}" is in the ${kind}/ folder`);
    if (!e.title) fail(where, "no title");
    if (!STATUS.includes(e.status)) fail(where, `status "${e.status}" is not todo|converted|approved`);
    if (kind === "term") { if (!e.subjects?.length || !e.subjects.every((s) => SUBJECTS.has(s))) fail(where, "a term needs one or more known subjects"); }
    else if (!SUBJECTS.has(e.subject)) fail(where, `subject "${e.subject}" is not a known subject: a doc has exactly one`);
    if (!Array.isArray(e.tags)) fail(where, "tags must be an array"); if (!Array.isArray(e.paths)) fail(where, "paths must be an array");
    if (kind === "doc" && e.status !== "todo") {
      if (!e.doc) fail(where, "no doc payload");
      else for (const m of JSON.stringify(e.doc).matchAll(/"src":\s*"([^"]+)"/g)) if (!(await exists(join(dirname(f), m[1])))) fail(where, `asset does not exist: ${m[1]}`);
    }
    if (kind === "term" && !e.term?.def) fail(where, "a term needs a def");
    if (kind === "adr" && !e.adr) fail(where, "an adr entry needs its adr payload");
    if (kind === "standards" && !e.standards?.files) fail(where, "standards need files");
  }
}
console.log(`\n${seen.size} entries, ${errors} error(s).`);
if (errors) process.exit(1);
