import * as React from "react";
import {
  DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, pointerWithin,
  useDraggable, useDroppable, useSensor, useSensors,
  type CollisionDetection, type DragEndEvent, type DragMoveEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { findItem, holds, moveItem, type Drop, type DropPosition, type TreeItem } from "./tree";
import type { ListDraggableProps, ListDraggableRowContext } from "./types";

// A list whose rows nest and are dragged into order and into nesting. One way of dragging, at every level:
// grab the handle, the drop shows where it lands, release. A row has three zones: the top is "before it",
// the bottom is "after it" (below an open row that has children: its first child), the middle is "inside it".
// The top and bottom act at once; the middle acts only after the pointer has stayed in it for `dwellMs`
// (until then the nearest line shows), so passing through never flickers. Once inside, it stays inside however
// the pointer moves within the middle, and it changes only when the pointer enters another zone.
// Structural positions are inline: the component brings no stylesheet and no utility class; how things look
// is the theme's (the elements named in types.ts).

type Item = TreeItem<any>;

interface Shared {
  renderRow: (item: Item, ctx: ListDraggableRowContext) => React.ReactNode;
  collapsed: Set<string>;
  toggle: (id: string) => void;
  drop: Drop | null;
  activeId: string | null;
  activeItem: Item | null;
  disabled: boolean;
  nesting: boolean;
}
const Shared = React.createContext<Shared | null>(null);

const edgePosition = (item: Item, below: boolean, collapsed: Set<string>): DropPosition =>
  !below ? "before" : item.children.length > 0 && !collapsed.has(item.id) ? "first" : "after";

function Row({ item, path, depth }: { item: Item; path: string; depth: number }) {
  const s = React.useContext(Shared)!;
  const dragging = s.activeId === item.id;
  // a row under the dragged one is not a place it can land
  const underActive = !!s.activeItem && holds(s.activeItem, item.id);
  const drag = useDraggable({ id: item.id, disabled: s.disabled });
  const drop = useDroppable({ id: item.id, disabled: underActive });
  const hasChildren = item.children.length > 0;
  const expanded = !s.collapsed.has(item.id);
  const here = s.drop?.id === item.id ? s.drop.pos : null;

  const handle = (
    <span
      ref={drag.setActivatorNodeRef}
      element="control--list-draggable-handle"
      aria-label="Drag to move"
      {...drag.attributes}
      {...(s.disabled ? { state: "disabled", tabIndex: -1 } : drag.listeners)}
      style={{ cursor: s.disabled ? "default" : "grab", touchAction: "none", display: "inline-flex", alignItems: "center" }}
    >
      <GripVertical size={16} aria-hidden />
    </span>
  );
  const ctx: ListDraggableRowContext = { path, depth, hasChildren, expanded, toggle: () => s.toggle(item.id), handle, dragging: false };

  return (
    <li role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      <div
        ref={(el) => { drag.setNodeRef(el); drop.setNodeRef(el); }}
        element="control--list-draggable-row"
        {...(s.disabled && { state: "disabled" })}
        // a row fills the width of its list: the theme dresses a control to fit its content, a row is not one
        style={{ position: "relative", display: "flex", width: "100%", boxSizing: "border-box" }}
      >
        <div style={{ flex: 1, minWidth: 0, ...(dragging && { visibility: "hidden" as const }) }}>{s.renderRow(item, ctx)}</div>
        {dragging && <div element="surface--list-draggable-ghost" aria-hidden style={{ position: "absolute", inset: 0 }} />}
        {here === "before" && <div element="shape--list-draggable-drop-line" aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 0, pointerEvents: "none" }} />}
        {here === "after" && <div element="shape--list-draggable-drop-line" aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none" }} />}
        {here === "first" && <div element="shape--list-draggable-drop-line" aria-hidden style={{ position: "absolute", left: "1.5rem", right: 0, bottom: 0, pointerEvents: "none" }} />}
        {here === "into" && <div element="shape--list-draggable-drop-into" aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}
      </div>
      {hasChildren && expanded && (
        <ul role="group" element="surface--list-draggable-group" style={{ listStyle: "none", margin: 0 }}>
          {item.children.map((child, j) => <Row key={child.id} item={child} path={`${path}.${j + 1}`} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}

// the pointer's own place when the drag came from a pointer or a touch; else the middle of the dragged row (keyboard)
function pointerY(e: DragMoveEvent): number | null {
  const ev = e.activatorEvent as Partial<PointerEvent> & Partial<TouchEvent>;
  const y0 = typeof ev.clientY === "number" ? ev.clientY : ev.touches?.[0]?.clientY;
  if (typeof y0 === "number") return y0 + e.delta.y;
  const t = e.active.rect.current.translated;
  return t ? t.top + t.height / 2 : null;
}
const collision: CollisionDetection = (args) => { const p = pointerWithin(args); return p.length ? p : closestCenter(args); };

function ListDraggable<T extends TreeItem<T>>({ position,
  className, items, onItemsChange, renderRow,
  collapsed, defaultCollapsed, onCollapsedChange,
  dwellMs = 500, nesting = true, dragPreview = true, disabled = false,
  emphasis, status, state, scale = "md", concept, ...props
}: ListDraggableProps<T>) {
  const isControlled = collapsed !== undefined;
  const [internal, setInternal] = React.useState<string[]>(defaultCollapsed ?? []);
  const collapsedIds = isControlled ? collapsed : internal;
  const collapsedSet = React.useMemo(() => new Set(collapsedIds), [collapsedIds]);
  const commit = (next: string[]) => { if (!isControlled) setInternal(next); onCollapsedChange?.(next); };
  const toggle = (id: string) => commit(collapsedSet.has(id) ? collapsedIds.filter((x) => x !== id) : [...collapsedIds, id]);

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
    onItemsChange(moveItem(items, id, d.id, d.pos));
    if (d.pos === "into" || d.pos === "first") commit(collapsedIds.filter((x) => x !== d.id));
  };

  const shared: Shared = { renderRow: renderRow as Shared["renderRow"], collapsed: collapsedSet, toggle, drop, activeId, activeItem, disabled, nesting };
  const themeAttrs: Record<string, string | undefined> = { element: "list--list-draggable", ...axisAttrs({ emphasis, status, scale, concept, state, position }) };

  return (
    <Shared.Provider value={shared}>
      <DndContext sensors={sensors} collisionDetection={collision} onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd} onDragCancel={finish}>
        <ul role="tree" {...themeAttrs} className={cn(className, positionClasses(position))} {...props} style={{ display: "flex", flexDirection: "column", listStyle: "none", ...props.style }}>
          {(items as Item[]).map((item, i) => <Row key={item.id} item={item} path={String(i + 1)} depth={0} />)}
        </ul>
        <DragOverlay dropAnimation={null}>
          {dragPreview && activeItem ? (
            <div element="overlay--list-draggable-overlay" style={{ width: activeWidth }}>
              {renderRow(activeItem as T, { path: "", depth: 0, hasChildren: activeItem.children.length > 0, expanded: false, toggle: () => {}, handle: null, dragging: true })}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Shared.Provider>
  );
}

export { ListDraggable };
