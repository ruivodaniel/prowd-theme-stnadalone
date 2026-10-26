import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { TreeNode, TreeViewProps } from "./types";

// =============================================================================
// Helpers
// =============================================================================

function toArray<T>(v: T | T[] | null | undefined): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

// =============================================================================
// Component
// =============================================================================

function TreeView({ position,
  className,
  items,
  expanded,
  defaultExpanded,
  onExpandedChange,
  selected,
  defaultSelected,
  onSelect,
  multi,
  renderItem,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  ...props
}: TreeViewProps) {
  const isExpandedControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(
    defaultExpanded ?? [],
  );
  const expandedIds = isExpandedControlled ? expanded : internalExpanded;
  const expandedSet = React.useMemo(() => new Set(expandedIds), [expandedIds]);

  const commitExpanded = (next: string[]) => {
    if (!isExpandedControlled) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const isSelectedControlled = selected !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<
    string | string[] | null
  >(defaultSelected ?? (multi ? [] : null));
  const current = isSelectedControlled ? selected : internalSelected;
  const selectedSet = React.useMemo(() => new Set(toArray(current)), [current]);

  const commitSelected = (next: string | string[] | null) => {
    if (!isSelectedControlled) setInternalSelected(next);
    onSelect?.(next);
  };

  const toggleExpanded = (id: string) => {
    const next = expandedSet.has(id)
      ? expandedIds!.filter((x) => x !== id)
      : [...(expandedIds ?? []), id];
    commitExpanded(next);
  };

  const selectNode = (node: TreeNode, e: React.MouseEvent | React.KeyboardEvent) => {
    if (node.disabled) return;
    if (multi) {
      const arr = toArray(current);
      if (selectedSet.has(node.id)) {
        commitSelected(arr.filter((x) => x !== node.id));
      } else {
        const additive = "shiftKey" in e && (e.ctrlKey || e.metaKey);
        commitSelected(additive ? [...arr, node.id] : [node.id]);
      }
    } else {
      commitSelected(selectedSet.has(node.id) ? null : node.id);
    }
  };

  const themeAttrs: Record<string, string | undefined> = {
    element: "list--tree-view",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  return (
    <ul
      role="tree"
      {...themeAttrs}
      className={cn("flex flex-col", className, positionClasses(position))}
      {...props}
    >
      {items.map((node) => (
        <TreeViewItem
          key={node.id}
          node={node}
          depth={0}
          expandedSet={expandedSet}
          selectedSet={selectedSet}
          onToggle={toggleExpanded}
          onSelect={selectNode}
          renderItem={renderItem}
        />
      ))}
    </ul>
  );
}

// =============================================================================
// Item (internal)
// =============================================================================

interface TreeViewItemProps {
  node: TreeNode;
  depth: number;
  expandedSet: Set<string>;
  selectedSet: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNode, e: React.MouseEvent | React.KeyboardEvent) => void;
  renderItem?: (node: TreeNode) => React.ReactNode;
}

function TreeViewItem({
  node,
  depth,
  expandedSet,
  selectedSet,
  onToggle,
  onSelect,
  renderItem,
}: TreeViewItemProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expandedSet.has(node.id);
  const isSelected = selectedSet.has(node.id);

  const rowAttrs: Record<string, string | undefined> = {
    element: "control--tree-view-item",
    ...(isSelected && { state: "selected" }),
    ...(node.disabled && { state: "disabled" }),
  };

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <div
        {...rowAttrs}
        tabIndex={node.disabled ? -1 : 0}
        className={cn("flex items-center", node.disabled && "pointer-events-none")}
        onClick={(e) => onSelect(node, e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(node, e);
          } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
            e.preventDefault();
            onToggle(node.id);
          } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
            e.preventDefault();
            onToggle(node.id);
          }
        }}
        style={{ paddingInlineStart: `${depth * 1}rem` }}
      >
        {hasChildren ? (
          <button
            type="button"
            data-part="chevron"
            aria-label={isExpanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="inline-flex items-center"
          >
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        ) : (
          <span data-part="spacer" className="inline-flex items-center">
            <span className="size-4" />
          </span>
        )}
        {node.icon && <span data-part="icon">{node.icon}</span>}
        <span data-part="label" className="flex-1">
          {renderItem ? renderItem(node) : node.label}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <ul role="group" element="surface--tree-view-group" className="flex flex-col">
          {node.children!.map((child) => (
            <TreeViewItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedSet={expandedSet}
              selectedSet={selectedSet}
              onToggle={onToggle}
              onSelect={onSelect}
              renderItem={renderItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export { TreeView };
