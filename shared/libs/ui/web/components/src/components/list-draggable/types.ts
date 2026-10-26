import type * as React from "react";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";
import type { TreeItem } from "./tree";

export type { TreeItem, DropPosition, Drop } from "./tree";

/** What `renderRow` is given beside the item: where the row is, whether it opens, and the handle to place in it. */
export interface ListDraggableRowContext {
  /** the number of the row by position: "3", "3.1", "3.1.2" */
  path: string;
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  toggle: () => void;
  /** the grip that starts a drag; place it where the row wants it. null in the floating copy. */
  handle: React.ReactNode;
  /** true in the floating copy of the dragged row */
  dragging: boolean;
}

// list--list-draggable is the parent; each row is control--list-draggable-row, each nested level surface--list-draggable-group,
// the grip control--list-draggable-handle. While a drag lasts: surface--list-draggable-ghost where the row was,
// overlay--list-draggable-overlay following the pointer, shape--list-draggable-drop-line / -drop-into where the drop lands.
export interface ListDraggableOwnProps<T extends TreeItem<T> = TreeItem<any>> extends ElementProps<"listDraggable"> {
  /** The tree. Every item has an `id` and `children` (empty for a leaf); the rest is the caller's. */
  items: T[];
  /** The tree after a drag: the same items, moved. */
  onItemsChange: (items: T[]) => void;
  /** Draws one row. The list draws everything around it. */
  renderRow: (item: T, ctx: ListDraggableRowContext) => React.ReactNode;
  /** Controlled: ids of the items whose children are hidden */
  collapsed?: string[];
  defaultCollapsed?: string[];
  onCollapsedChange?: (ids: string[]) => void;
  /** How long the pointer stays in the middle of a row before the drop becomes "inside it", in ms */
  dwellMs?: number;
  /** Allow a drop inside a row (nesting). Off: a drop is only before or after a row. */
  nesting?: boolean;
  /** Show a floating copy of the dragged row. Off: only the drop indicator shows. */
  dragPreview?: boolean;
  disabled?: boolean;
}
export type ListDraggableProps<T extends TreeItem<T> = TreeItem<any>> = ListDraggableOwnProps<T> & Omit<React.ComponentProps<"ul">, keyof ListDraggableOwnProps<T> | AxisName | "children">;

export const listDraggableSchema = defineProps<ListDraggableOwnProps>("ListDraggable", {
  ...axesSchema("listDraggable"),
  items: { kind: "other", required: true, doc: "The tree: items with id and children" },
  onItemsChange: { kind: "function", required: true, doc: "The tree after a drag" },
  renderRow: { kind: "function", required: true, doc: "Draws one row: (item, ctx) => node" },
  collapsed: { kind: "other", doc: "Controlled ids of the items whose children are hidden" },
  defaultCollapsed: { kind: "other", doc: "Initially hidden ids" },
  onCollapsedChange: { kind: "function", doc: "Collapsed ids changed" },
  dwellMs: { kind: "number", default: 500, doc: "Pointer stay in the middle of a row before the drop is inside it (ms)" },
  nesting: { kind: "boolean", default: true, doc: "Allow a drop inside a row" },
  dragPreview: { kind: "boolean", default: true, doc: "Show a floating copy of the dragged row" },
  disabled: { kind: "boolean", default: false, doc: "The list does not drag" },
});
