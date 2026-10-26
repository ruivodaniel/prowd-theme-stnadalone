// The one rule for finding the library's UI-as-data fixtures (patterns, layouts). Pure: it takes a list of paths (relative to a layer's folder,
// "/" separated) and returns the fixtures in them. The server lists the disk and the viewer lists its glob; both call this, so they cannot drift.
// A fixture is any folder holding an `index.json` (at any depth); its name is the folder's name; the other .json files beside it are the parts it `use`s.
export type Found = { name: string; dir: string; entry: string; parts: string[] };

export function findFixtures(paths: string[]): Found[] {
  const json = paths.map((p) => p.replace(/^\.?\//, "")).filter((p) => p.endsWith(".json"));
  const dirOf = (p: string) => p.slice(0, Math.max(p.lastIndexOf("/"), 0));
  return json
    .filter((p) => p === "index.json" || p.endsWith("/index.json"))
    .map((entry) => {
      const dir = dirOf(entry);
      return { name: dir.split("/").at(-1) ?? "", dir, entry, parts: json.filter((p) => p !== entry && dirOf(p) === dir) };
    })
    .filter((f) => f.name && !f.name.startsWith("_"));
}
