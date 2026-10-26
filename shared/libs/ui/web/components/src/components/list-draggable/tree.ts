// The pure part of a draggable list: a tree of items (`{ id, children }` plus whatever the caller holds), the
// places a drop can land, and the move. No React, no DOM.

export interface TreeItem<T extends TreeItem<T>> { id: string; children: T[] }
/** where a dragged item lands, relative to the row it is over: before it · after it · first child of it (below an open row) · inside it, as its last child */
export type DropPosition = "before" | "after" | "first" | "into";
export interface Drop { id: string; pos: DropPosition }

export function findItem<T extends TreeItem<T>>(items: T[], id: string): T | null {
  for (const it of items) { if (it.id === id) return it; const f = findItem(it.children, id); if (f) return f; }
  return null;
}

/** is `id` the item itself or anything under it */
export function holds<T extends TreeItem<T>>(item: T, id: string): boolean {
  return item.id === id || item.children.some((c) => holds(c, id));
}

function take<T extends TreeItem<T>>(items: T[], id: string): [T[], T | null] {
  let got: T | null = null;
  const walk = (list: T[]): T[] => list.flatMap((it) => (it.id === id ? ((got = it), []) : [{ ...it, children: walk(it.children) }]));
  return [walk(items), got];
}

function put<T extends TreeItem<T>>(items: T[], target: string, pos: DropPosition, item: T): T[] {
  return items.flatMap((it) => {
    if (it.id === target) {
      if (pos === "before") return [item, it];
      if (pos === "after") return [it, item];
      if (pos === "first") return [{ ...it, children: [item, ...it.children] }];
      return [{ ...it, children: [...it.children, item] }];
    }
    return [{ ...it, children: put(it.children, target, pos, item) }];
  });
}

/** move `id` to `pos` of `target`. A move into the item's own subtree, or onto itself, changes nothing. */
export function moveItem<T extends TreeItem<T>>(items: T[], id: string, target: string, pos: DropPosition): T[] {
  if (id === target) return items;
  const [rest, item] = take(items, id);
  if (!item || holds(item, target)) return items;
  return put(rest, target, pos, item);
}
