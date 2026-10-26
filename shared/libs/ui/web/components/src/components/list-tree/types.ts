import type * as React from "react";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";
import type { ListTreeItem } from "./tree";

/** How the siblings of one level open: `multiple` any number at once, `single` opening a row closes its open siblings (same parent). */
export type ListTreeExpandMode = "single" | "multiple";

export type { ListTreeItem, ListTreeFlatRow, DropPosition, Drop } from "./tree";

/** What `renderNode` is given beside the item: where the row is, whether it opens, and the handle to place in it. */
export interface ListTreeNodeContext {
  /** the number of the row by position: "3", "3.1", "3.1.2" */
  path: string;
  /** 0 for the top level. The caller may turn it into anything: a heading level, a size, a colour. */
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  toggle: () => void;
  /** the last child of its parent */
  last: boolean;
  selected: boolean;
  /** the grip that starts a drag, to place where the row wants it. null unless the list is reorderable, and in the floating copy. */
  handle: React.ReactNode;
  /** true in the floating copy of the dragged row */
  dragging: boolean;
}

// ONE list for every tree of rows: always a tree of `{ id, children? }`, drawn flat, one row after another, each knowing its depth.
// What it can be is switched on or off: reorderable (drag into order and into nesting), collapsible, indented (a level steps in),
// lines (connector lines in the indent, like a printed directory tree).
// list--list-tree is the parent; each row is control--list-tree-row; a connector is shape--list-tree-line. While a drag lasts:
// surface--list-tree-ghost where the row was, overlay--list-tree-overlay following the pointer,
// shape--list-tree-drop-line / -drop-into where the drop lands; the grip is control--list-tree-handle.
export interface ListTreeOwnProps<T extends ListTreeItem<T> = ListTreeItem<any>> extends ElementProps<"listTree"> {
  /** The tree. Every item has an `id`; `children` is absent or empty for a leaf; the rest is the caller's. */
  items: T[];
  /** Draws what sits in one row. The list draws the lines and the row around it. */
  renderNode: (item: T, ctx: ListTreeNodeContext) => React.ReactNode;

  /** A row can be dragged into order and into nesting. The tree after a drag comes back in `onItemsChange`. */
  reorderable?: boolean;
  onItemsChange?: (items: T[]) => void;
  /** Allow a drop inside a row (nesting). Off: a drop is only before or after a row. Only when reorderable. */
  nesting?: boolean;
  /** How long the pointer stays in the middle of a row before the drop becomes "inside it", in ms */
  dwellMs?: number;
  /** Show a floating copy of the dragged row. Off: only the drop indicator shows. */
  dragPreview?: boolean;

  /** A row with children opens and closes. Off: every row is open and `toggle` does nothing. */
  collapsible?: boolean;
  /** Controlled: ids of the items whose children are hidden */
  collapsed?: string[];
  defaultCollapsed?: string[];
  onCollapsedChange?: (ids: string[]) => void;

  /** Open siblings per level: one mode for every level, or one per level from the top (levels past the list repeat its last entry). Default `multiple`. */
  expand?: ListTreeExpandMode | ListTreeExpandMode[];

  /** A click anywhere on a row with children (content, indent, lines) opens or closes it, and Enter or Space on the focused row. One boolean for every level, or one per level from the top (levels past the list repeat its last entry). Default false. */
  toggleOnClick?: boolean | boolean[];

  /** A row with children draws its own chevron at the right, right when closed and down when open. Off: the caller draws its own with `ctx.toggle`. */
  toggle?: boolean;
  /** A level steps in by this much: a number is px (default 18), a string is any css length. false: no indentation; every level starts at the left (and there are no lines). */
  indent?: number | string | false;
  /** Connector lines in the indent: a stem down each level that goes on, an elbow into each row. Needs an indent. `true` joins the top level too (an elbow and a stem, so no row floats free);
   *  `"children"` draws lines from the second level down and gives the top level no gutter: for a list whose top rows are standalone cards that draw their own left edge. */
  lines?: boolean | "children";
  /** Where the elbow meets a row: its middle, or near its top (a tall row) */
  anchor?: "center" | "top";

  /** The chosen row's id, and what a click on a row does. Without onSelect a row is not clickable. */
  selectedId?: string | null;
  onSelect?: (item: T) => void;
  disabled?: boolean;
}
export type ListTreeProps<T extends ListTreeItem<T> = ListTreeItem<any>> = ListTreeOwnProps<T> & Omit<React.ComponentProps<"ul">, keyof ListTreeOwnProps<T> | AxisName | "children">;

export const listTreeSchema = defineProps<ListTreeOwnProps>("ListTree", {
  ...axesSchema("listTree"),
  items: { kind: "other", required: true, doc: "The tree: items with id and children" },
  renderNode: { kind: "function", required: true, doc: "Draws what sits in one row: (item, ctx) => node" },
  reorderable: { kind: "boolean", default: false, doc: "Rows are dragged into order and into nesting" },
  onItemsChange: { kind: "function", doc: "The tree after a drag" },
  nesting: { kind: "boolean", default: true, doc: "Allow a drop inside a row" },
  dwellMs: { kind: "number", default: 500, doc: "Pointer stay in the middle of a row before the drop is inside it (ms)" },
  dragPreview: { kind: "boolean", default: true, doc: "Show a floating copy of the dragged row" },
  collapsible: { kind: "boolean", default: true, doc: "Rows with children open and close" },
  expand: { kind: "other", doc: "Default \"multiple\". Open siblings per level: \"single\" | \"multiple\", or one per level from the top (last entry repeats)" },
  toggleOnClick: { kind: "other", doc: "Default false. A click anywhere on a row with children toggles it; boolean, or one per level from the top (last entry repeats)" },
  toggle: { kind: "boolean", default: true, doc: "A row with children draws its own chevron at the right" },
  collapsed: { kind: "other", doc: "Controlled ids of the items whose children are hidden" },
  defaultCollapsed: { kind: "other", doc: "Initially hidden ids" },
  onCollapsedChange: { kind: "function", doc: "Collapsed ids changed" },
  indent: { kind: "other", doc: "Width of one level (px, or a css length; default 18); false for none" },
  lines: { kind: "other", doc: "Default false. Connector lines in the indent: true (the top level joined too) | \"children\" (from the second level down; the top level has no gutter)" },
  anchor: { kind: "enum", values: ["center", "top"], default: "center", doc: "Where the elbow meets a row" },
  selectedId: { kind: "string", doc: "The chosen row's id" },
  onSelect: { kind: "function", doc: "A row was clicked" },
  disabled: { kind: "boolean", default: false, doc: "The list does not respond" },
});
