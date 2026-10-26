// Reads every entry of the database (docs/db) and writes two generated files:
//   db/index.json   the metadata of every entry, with its mapper-compliance label, for the viewer
//   db/search.json  the text of every entry, for the search
// Run from the repo root:  node docs/engine/build.ts
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url)))), DB = join(ROOT, "docs/db");
type Label = { compliant: boolean; issues: string[] };
const label = (issues: string[]): Label => ({ compliant: issues.length === 0, issues });
const walk = (dir: string): string[] => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });

const files = ["doc", "term", "adr", "standards"].flatMap((k) => (existsSync(join(DB, k)) ? walk(join(DB, k)) : [])).filter((f) => f.endsWith(".json")).sort();
const entries = files.map((f) => JSON.parse(readFileSync(f, "utf8")));

const subjects = new Set<string>(JSON.parse(readFileSync(join(DB, "subjects.json"), "utf8")).subjects.map((s: any) => s.id));
function compliance(e: any): Label {
  const issues: string[] = [];
  if (e.kind === "term") { if (!e.subjects?.length || !e.subjects.every((s: string) => subjects.has(s))) issues.push("a term needs one or more known subjects"); }
  else if (!subjects.has(e.subject)) issues.push("a doc, decision or standard has exactly one known subject");
  if (!e.tags?.length) issues.push("no tags");
  for (const p of e.paths ?? []) if (!existsSync(join(ROOT, p))) issues.push(`the path ${p} does not exist`);
  if (e.status === "todo") issues.push("not migrated");
  else if (e.kind === "doc") {
    if (!e.doc?.axioms?.length) issues.push("no axioms");
    if (!e.doc?.purpose?.intro && !e.doc?.purpose?.points?.length) issues.push("no purpose");
    if (!e.doc?.reference?.some((t: any) => t.statement || t.claims?.length || t.examples?.length || t.imagesAndDiagrams?.length)) issues.push("no reference");
  } else if (e.kind === "term") { if (!e.term?.def) issues.push("no definition"); }
  else if (e.kind === "adr") { for (const f of ["date", "context", "decision"]) if (!e.adr?.[f]) issues.push(`no ${f}`); if (!e.adr?.consequences?.length) issues.push("no consequences"); }
  else issues.push(`a ${e.kind} file is not a MAPR artifact`);
  return label(issues);
}
const text = (o: unknown): string => (typeof o === "string" ? o : Array.isArray(o) ? o.map(text).join(" ") : o && typeof o === "object" ? Object.values(o).map(text).join(" ") : "");

const index = entries.map((e: any) => ({
  id: e.id, kind: e.kind, title: e.title, status: e.status, ...(e.subject ? { subject: e.subject } : {}), ...(e.subjects ? { subjects: e.subjects } : {}), tags: e.tags, paths: e.paths, summary: e.summary ?? "",
  ...(e.docId ? { docId: e.docId } : {}), ...(e.entry ? { entry: e.entry } : {}), ...(e.kind === "term" ? { term: e.term } : {}), compliance: compliance(e),
}));
writeFileSync(join(DB, "index.json"), JSON.stringify({ entries: index }, null, 1) + "\n");
writeFileSync(join(DB, "search.json"), JSON.stringify(Object.fromEntries(entries.map((e: any) => [e.id, text([e.title, e.subject, e.subjects, e.tags, e.paths, e.doc, e.term, e.adr, e.standards]).toLowerCase()]))) + "\n");
const ok = index.filter((e) => e.compliance.compliant).length;
console.log(`db/index.json: ${index.length} entries (${["doc", "term", "adr", "standards"].map((k) => `${index.filter((e) => e.kind === k).length} ${k}`).join(", ")}); ${ok} mapper compliant`);
