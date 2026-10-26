import * as React from "react";
import {
  DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, pointerWithin,
  useDraggable, useDroppable, useSensor, useSensors,
  type CollisionDetection, type DragEndEvent, type DragMoveEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { findItem, flattenTree, holds, moveItem, siblingsOf, type Drop, type DropPosition, type ListTreeFlatRow, type ListTreeItem } from "./tree";
import type { ListTreeNodeContext, ListTreeProps } from "./types";

// ONE list for every tree of rows. The tree is always JSON, `{ id, children? }`; it is drawn flat, one row after another,
// each row knowing its depth. Switches: reorderable, collapsible, indent, lines (see types.ts).
// Lines: each row has a gutter of one column per level. A column carries the stem of the ancestor at that level while that
// ancestor has a sibling below, so the line runs on through every row between, however tall; the last column is the row's own
// elbow: a stem from the top to its middle (to the bottom if it is not the last child) and a branch into the row.
// Dragging, when reorderable: grab the handle, the drop shows where it lands, release. A row has three zones: the top is
// "before it", the bottom is "after it" (below an open row that has children: its first child), the middle is "inside it".
// The top and bottom act at once; the middle acts only after the pointer has stayed in it for `dwellMs`.
// Structural positions are inline: the component brings no stylesheet and no utility class; how things look is the theme's.

type Item = ListTreeItem<any>;

interface Shared {
  renderNode: (item: Item, ctx: ListTreeNodeContext) => React.ReactNode;
  collapsible: boolean;
  clickToggles: (depth: number) => boolean;
  showToggle: boolean;
  toggle: (id: string) => void;
  indentPx: string | null;          // one level's width as a css length; null = no indentation
  lines: boolean;
  rootJoined: boolean;              // with lines: the top level has a gutter with its elbow and stem too
  anchorY: string;
  selectedId: string | null;
  onSelect?: (item: Item) => void;
  disabled: boolean;
  // only when reorderable
  reorderable: boolean;
  drop: Drop | null;
  activeId: string | null;
  activeItem: Item | null;
}
const Shared = React.createContext<Shared | null>(null);

/** where a stem sits in its column: near the left, so the branch into a row has the rest of the column to run */
const STEM = 2;
const lineStyle = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", pointerEvents: "none", ...s });

/** the gutter of one row: a column per level, with the stems that go on and the row's own elbow. With `lines` true the top level is joined too, so no row floats free; with "children" or without lines, the top level has no gutter */
function Gutter({ row, s }: { row: ListTreeFlatRow<Item>; s: Shared }) {
  if (!s.indentPx || (!s.rootJoined && row.depth === 0)) return null;
  const cols = [];
  for (let c = s.rootJoined ? 0 : 1; c <= row.depth; c++) {
    const own = c === row.depth;
    cols.push(
      <div key={c} aria-hidden style={{ position: "relative", flex: `0 0 ${s.indentPx}`, alignSelf: "stretch" }}>
        {s.lines && !own && row.stems[c] && <div element="shape--list-tree-line" style={lineStyle({ left: STEM, top: 0, bottom: 0, width: 1 })} />}
        {s.lines && own && (
          <>
            <div element="shape--list-tree-line" style={lineStyle({ left: STEM, top: 0, width: 1, ...(row.last ? { height: s.anchorY } : { bottom: 0 }) })} />
            <div element="shape--list-tree-line" style={lineStyle({ left: STEM, right: 0, top: s.anchorY, height: 1 })} />
          </>
        )}
      </div>,
    );
  }
  return <>{cols}</>;
}

/** the chevron at the right of a row that has children: right when closed, down when open */
function Toggle({ row, s, expanded }: { row: ListTreeFlatRow<Item>; s: Shared; expanded: boolean }) {
  if (!s.showToggle || !s.collapsible || !row.hasChildren) return null;
  const Chevron = expanded ? ChevronDown : ChevronRight;
  return (
    <span element="control--list-tree-toggle" role="button" tabIndex={s.disabled ? -1 : 0} aria-label={expanded ? "Collapse" : "Expand"} {...(s.disabled && { state: "disabled" })}
      onClick={(e) => { e.stopPropagation(); if (!s.disabled) s.toggle(row.item.id); }}
      onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !s.disabled) { e.preventDefault(); e.stopPropagation(); s.toggle(row.item.id); } }}
      style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, cursor: s.disabled ? "default" : "pointer" }}>
      <Chevron size={16} aria-hidden />
    </span>
  );
}

function Row({ row, s, expanded }: { row: ListTreeFlatRow<Item>; s: Shared; expanded: boolean }) {
  const { item } = row;
  const selected = s.selectedId === item.id;
  const clickable = !!s.onSelect && !s.disabled;
  const rowToggles = s.collapsible && !s.disabled && row.hasChildren && s.clickToggles(row.depth);
  const ctxBase = { path: row.path, depth: row.depth, hasChildren: row.hasChildren, expanded, toggle: () => s.toggle(item.id), last: row.last, selected };
  return (
    <li role="treeitem" aria-level={row.depth + 1} aria-expanded={row.hasChildren ? expanded : undefined} aria-selected={selected || undefined}
      {...(rowToggles && { tabIndex: 0, onClick: () => s.toggle(item.id), onKeyDown: (e: React.KeyboardEvent) => { if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) { e.preventDefault(); s.toggle(item.id); } } })}
      style={{ display: "flex", alignItems: "stretch", paddingBlock: 2, ...(rowToggles && { cursor: "pointer" }) }}>
      <Gutter row={row} s={s} />
      {s.reorderable ? <DragRowControl row={row} s={s} ctxBase={ctxBase} clickable={clickable} selected={selected} /> : (
        <div element="control--list-tree-row" {...(selected && { state: "selected" })} {...(s.disabled && { state: "disabled" })}
          onClick={clickable ? () => s.onSelect!(item) : undefined}
          style={{ position: "relative", flex: 1, minWidth: 0, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 4, cursor: clickable ? "pointer" : undefined }}>
          <div style={{ flex: 1, minWidth: 0 }}>{s.renderNode(item, { ...ctxBase, handle: null, dragging: false })}</div>
          <Toggle row={row} s={s} expanded={expanded} />
        </div>
      )}
    </li>
  );
}

function DragRowControl({ row, s, ctxBase, clickable, selected }: { row: ListTreeFlatRow<Item>; s: Shared; ctxBase: Omit<ListTreeNodeContext, "handle" | "dragging">; clickable: boolean; selected: boolean }) {
  const { item } = row;
  const dragging = s.activeId === item.id;
  // a row under the dragged one is not a place it can land
  const underActive = !!s.activeItem && holds(s.activeItem, item.id);
  const drag = useDraggable({ id: item.id, disabled: s.disabled });
  const drop = useDroppable({ id: item.id, disabled: underActive });
  const here = s.drop?.id === item.id ? s.drop.pos : null;
  const handle = (
    <span ref={drag.setActivatorNodeRef} element="control--list-tree-handle" aria-label="Drag to move" {...drag.attributes} onClick={(e) => e.stopPropagation()}
      {...(s.disabled ? { state: "disabled", tabIndex: -1 } : drag.listeners)}
      style={{ cursor: s.disabled ? "default" : "grab", touchAction: "none", display: "inline-flex", alignItems: "center" }}>
      <GripVertical size={16} aria-hidden />
    </span>
  );
  return (
    <div ref={(el) => { drag.setNodeRef(el); drop.setNodeRef(el); }} element="control--list-tree-row"
      {...(selected && { state: "selected" })} {...(s.disabled && { state: "disabled" })}
      onClick={clickable ? () => s.onSelect!(item) : undefined}
      style={{ position: "relative", flex: 1, minWidth: 0, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 4, cursor: clickable ? "pointer" : undefined }}>
      <div style={{ flex: 1, minWidth: 0, ...(dragging && { visibility: "hidden" as const }) }}>{s.renderNode(item, { ...ctxBase, handle, dragging: false })}</div>
      <div style={{ ...(dragging && { visibility: "hidden" as const }) }}><Toggle row={row} s={s} expanded={ctxBase.expanded} /></div>
      {dragging && <div element="surface--list-tree-ghost" aria-hidden style={{ position: "absolute", inset: 0 }} />}
      {here === "before" && <div element="shape--list-tree-drop-line" aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />}
      {here === "after" && <div element="shape--list-tree-drop-line" aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none" }} />}
      {here === "first" && <div element="shape--list-tree-drop-line" aria-hidden style={{ position: "absolute", left: "1.5rem", right: 0, bottom: 0, pointerEvents: "none" }} />}
      {here === "into" && <div element="shape--list-tree-drop-into" aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}
    </div>
  );
}

const edgePosition = (item: Item, below: boolean, collapsed: Set<string>): DropPosition =>
  !below ? "before" : (item.children?.length ?? 0) > 0 && !collapsed.has(item.id) ? "first" : "after";

// the pointer's own place when the drag came from a pointer or a touch; else the middle of the dragged row (keyboard)
function pointerY(e: DragMoveEvent): number | null {
  const ev = e.activatorEvent as Partial<PointerEvent> & Partial<TouchEvent>;
  const y0 = typeof ev.clientY === "number" ? ev.clientY : ev.touches?.[0]?.clientY;
  if (typeof y0 === "number") return y0 + e.delta.y;
  const t = e.active.rect.current.translated;
  return t ? t.top + t.height / 2 : null;
}
const collision: CollisionDetection = (args) => { const p = pointerWithin(args); return p.length ? p : closestCenter(args); };

const css = (v: number | string) => (typeof v === "number" ? `${v}px` : v);

function ListTree<T extends ListTreeItem<T>>({ position,
  className, items, renderNode,
  reorderable = false, onItemsChange, nesting = true, dwellMs = 500, dragPreview = true,
  collapsible = true, expand = "multiple", toggleOnClick = false, collapsed, defaultCollapsed, onCollapsedChange,
  indent = 18, lines = false, toggle: showToggle = true, anchor = "center",
  selectedId = null, onSelect, disabled = false,
  emphasis, status, state, scale = "md", concept, ...props
}: ListTreeProps<T>) {
  const isControlled = collapsed !== undefined;
  const [internal, setInternal] = React.useState<string[]>(defaultCollapsed ?? []);
  const collapsedIds = collapsible ? (isControlled ? collapsed : internal) : [];
  const collapsedSet = React.useMemo(() => new Set(collapsedIds), [collapsedIds]);
  const commit = (next: string[]) => { if (!isControlled) setInternal(next); onCollapsedChange?.(next); };
  const modeAt = (depth: number) => (Array.isArray(expand) ? expand[Math.min(depth, expand.length - 1)] : expand) ?? "multiple";
  const clickToggles = (depth: number) => (Array.isArray(toggleOnClick) ? toggleOnClick[Math.min(depth, toggleOnClick.length - 1)] : toggleOnClick) ?? false;
  const toggle = (id: string) => {
    if (!collapsible) return;
    if (!collapsedSet.has(id)) return commit([...collapsedIds, id]);
    const opened = collapsedIds.filter((x) => x !== id);
    const at = siblingsOf(items as Item[], id);
    if (!at || modeAt(at.depth) !== "single") return commit(opened);
    const others = at.siblings.filter((x) => x.id !== id && (x.children?.length ?? 0) > 0).map((x) => x.id);
    commit([...new Set([...opened, ...others])]);
  };
  const rows = React.useMemo(() => flattenTree(items as Item[], collapsedSet), [items, collapsedSet]);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeWidth, setActiveWidth] = React.useState<number | undefined>();
  const [drop, setDrop] = React.useState<Drop | null>(null);
  const zone = React.useRef<string | null>(null);
  const dwell = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const stop = () => { clearTimeout(dwell.current); zone.current = null; };
  React.useEffect(() => stop, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );
  const activeItem = activeId ? (findItem(items as Item[], activeId) as Item | null) : null;

  const onDragStart = (e: DragStartEvent) => { setActiveId(String(e.active.id)); setActiveWidth(e.active.rect.current.initial?.width); };
  const onDragMove = (e: DragMoveEvent) => {
    const over = e.over, y = pointerY(e);
    if (!over || y === null || (activeItem && holds(activeItem, String(over.id)))) { stop(); setDrop(null); return; }
    const id = String(over.id), r = over.rect, ratio = (y - r.top) / r.height;
    const band = ratio < 0.28 ? "top" : ratio > 0.72 ? "bottom" : "mid", key = id + ":" + band;
    if (zone.current === key) return;   // still in the same zone: nothing changes, nothing flickers
    zone.current = key; clearTimeout(dwell.current);
    const target = findItem(items as Item[], id) as Item;
    if (band === "mid" && nesting) {
      setDrop({ id, pos: edgePosition(target, ratio > 0.5, collapsedSet) });   // the nearest line until the dwell
      dwell.current = setTimeout(() => { if (zone.current === key) setDrop({ id, pos: "into" }); }, dwellMs);
    } else setDrop({ id, pos: edgePosition(target, band === "bottom" || (band === "mid" && ratio > 0.5), collapsedSet) });
  };
  const finish = () => { stop(); setActiveId(null); setDrop(null); };
  const onDragEnd = (e: DragEndEvent) => {
    const d = drop, id = String(e.active.id);
    finish();
    if (!d || d.id === id) return;
    onItemsChange?.(moveItem(items, id, d.id, d.pos));
    if (d.pos === "into" || d.pos === "first") commit(collapsedIds.filter((x) => x !== d.id));
  };

  const indentPx = indent === false ? null : css(indent);
  const shared: Shared = {
    renderNode: renderNode as Shared["renderNode"], collapsible, clickToggles, showToggle, toggle, indentPx, lines: !!lines && indentPx !== null, rootJoined: lines === true && indentPx !== null,
    anchorY: anchor === "top" ? "14px" : "50%", selectedId, onSelect: onSelect as Shared["onSelect"], disabled,
    reorderable, drop, activeId, activeItem,
  };
  const themeAttrs: Record<string, string | undefined> = { element: "list--list-tree", ...axisAttrs({ emphasis, status, scale, concept, state, position }) };
  const list = (
    <ul role="tree" {...themeAttrs} className={cn(className, positionClasses(position))} {...props} style={{ display: "flex", flexDirection: "column", listStyle: "none", margin: 0, padding: 0, ...props.style }}>
      {rows.map((row) => <Row key={row.item.id} row={row as ListTreeFlatRow<Item>} s={shared} expanded={row.hasChildren && !collapsedSet.has(row.item.id)} />)}
    </ul>
  );

  return (
    <Shared.Provider value={shared}>
      {reorderable ? (
        <DndContext sensors={sensors} collisionDetection={collision} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd} onDragCancel={finish}>
          {list}
          <DragOverlay dropAnimation={null}>
            {dragPreview && activeItem ? (
              <div element="overlay--list-tree-overlay" style={{ width: activeWidth }}>
                {renderNode(activeItem as T, { path: "", depth: 0, hasChildren: (activeItem.children?.length ?? 0) > 0, expanded: false, toggle: () => {}, last: false, selected: false, handle: null, dragging: true })}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : list}
    </Shared.Provider>
  );
}

export { ListTree };
