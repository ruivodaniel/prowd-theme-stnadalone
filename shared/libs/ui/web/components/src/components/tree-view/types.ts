import type * as React from "react";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named alias kept for consumers; the values come from the treeView row. */
export type TreeViewScale = ScaleOf<"treeView">;

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  /** Children nodes. Omit for leaves. */
  children?: TreeNode[];
  /** Leading icon slot */
  icon?: React.ReactNode;
  /** Disabled nodes aren't selectable but are still expandable */
  disabled?: boolean;
}

// list--tree-view is the parent; each row is control--tree-view-item, each branch surface--tree-view-group.
export interface TreeViewOwnProps extends ElementProps<"treeView"> {
  /** Tree data */
  items: TreeNode[];
  /** Controlled expanded ids */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Selected id(s) — single-select if string, multi if array */
  selected?: string | string[] | null;
  defaultSelected?: string | string[] | null;
  onSelect?: (selected: string | string[] | null) => void;
  /** Enable multi-select via ctrl/cmd-click */
  multi?: boolean;
  /** Custom renderer for a node (after the chevron + icon slot) */
  renderItem?: (node: TreeNode) => React.ReactNode;
}
export type TreeViewProps = TreeViewOwnProps & Omit<React.ComponentProps<"ul">, keyof TreeViewOwnProps | AxisName>;

export const treeViewSchema = defineProps<TreeViewOwnProps>("TreeView", {
  ...axesSchema("treeView"),
  items: { kind: "other", required: true, doc: "Tree data: TreeNode[]" },
  expanded: { kind: "other", doc: "Controlled expanded ids" },
  defaultExpanded: { kind: "other", doc: "Initially expanded ids" },
  onExpandedChange: { kind: "function", doc: "Expanded ids changed" },
  selected: { kind: "other", doc: "Selected id (string) or ids (string[])" },
  defaultSelected: { kind: "other", doc: "Initial selection" },
  onSelect: { kind: "function", doc: "Selection changed" },
  multi: { kind: "boolean", default: false, doc: "Multi-select with ctrl/cmd-click" },
  renderItem: { kind: "function", doc: "Custom node renderer" },
});
