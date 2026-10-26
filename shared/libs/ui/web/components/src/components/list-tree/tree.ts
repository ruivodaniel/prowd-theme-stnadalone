// The pure part of a tree list: a tree of items (`{ id, children? }` plus whatever the caller holds), laid out as flat
// rows (each knowing which of its ancestors still have a sibling below: all the connector lines need), and the move
// of one item to a place in it. No React, no DOM.

export interface ListTreeItem<T extends ListTreeItem<T>> { id: string; children?: T[] }

/** where a dragged item lands, relative to the row it is over: before it · after it · first child of it (below an open row) · inside it, as its last child */
export type DropPosition = "before" | "after" | "first" | "into";
export interface Drop { id: string; pos: DropPosition }

export interface ListTreeFlatRow<T> {
  item: T;
  depth: number;
  /** the number of the row by position: "3", "3.1", "3.1.2" */
  path: string;
  /** the last child of its parent: its elbow closes the line (└), else it goes on (├) */
  last: boolean;
  /** one entry per level from the top: does the ancestor at that level have a sibling below? then its stem runs through this row */
  stems: boolean[];
  hasChildren: boolean;
}

export function flattenTree<T extends ListTreeItem<T>>(items: T[], collapsed: ReadonlySet<string>): ListTreeFlatRow<T>[] {
  const out: ListTreeFlatRow<T>[] = [];
  const walk = (list: T[], stems: boolean[], prefix: string) => {
    list.forEach((item, i) => {
      const last = i === list.length - 1;
      const kids = item.children ?? [];
      const path = prefix ? `${prefix}.${i + 1}` : String(i + 1);
      out.push({ item, depth: stems.length, path, last, stems, hasChildren: kids.length > 0 });
      if (kids.length > 0 && !collapsed.has(item.id)) walk(kids, [...stems, !last], path);
    });
  };
  walk(items, [], "");
  return out;
}

export function findItem<T extends ListTreeItem<T>>(items: T[], id: string): T | null {
  for (const it of items) { if (it.id === id) return it; const f = findItem(it.children ?? [], id); if (f) return f; }
  return null;
}

/** the depth of `id` (0 = top level) and the items sharing its parent, itself included; null if absent */
export function siblingsOf<T extends ListTreeItem<T>>(items: T[], id: string, depth = 0): { depth: number; siblings: T[] } | null {
  if (items.some((it) => it.id === id)) return { depth, siblings: items };
  for (const it of items) { const f = siblingsOf(it.children ?? [], id, depth + 1); if (f) return f; }
  return null;
}

/** is `id` the item itself or anything under it */
export function holds<T extends ListTreeItem<T>>(item: T, id: string): boolean {
  return item.id === id || (item.children ?? []).some((c) => holds(c, id));
}

function take<T extends ListTreeItem<T>>(items: T[], id: string): [T[], T | null] {
  let got: T | null = null;
  const walk = (list: T[]): T[] => list.flatMap((it) => (it.id === id ? ((got = it), []) : [it.children ? { ...it, children: walk(it.children) } : it]));
  return [walk(items), got];
}

function put<T extends ListTreeItem<T>>(items: T[], target: string, pos: DropPosition, item: T): T[] {
  return items.flatMap((it) => {
    if (it.id === target) {
      if (pos === "before") return [item, it];
      if (pos === "after") return [it, item];
      if (pos === "first") return [{ ...it, children: [item, ...(it.children ?? [])] }];
      return [{ ...it, children: [...(it.children ?? []), item] }];
    }
    return [it.children ? { ...it, children: put(it.children, target, pos, item) } : it];
  });
}

/** move `id` to `pos` of `target`. A move into the item's own subtree, or onto itself, changes nothing. */
export function moveItem<T extends ListTreeItem<T>>(items: T[], id: string, target: string, pos: DropPosition): T[] {
  if (id === target) return items;
  const [rest, item] = take(items, id);
  if (!item || holds(item, target)) return items;
  return put(rest, target, pos, item);
}
