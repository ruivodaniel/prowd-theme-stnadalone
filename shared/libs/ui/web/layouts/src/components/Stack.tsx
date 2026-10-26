import * as React from "react";
import { clsx } from "clsx";

/**
 * Stack — the auto-layout primitive. One box that is a row or a column, owning
 * the gap, the alignment and the padding between its children. Children own only
 * their content. Nest stacks to build any non-uniform composition; a "cell" is
 * just another Stack.
 *
 * Sizing is Figma's vocabulary, set on the child:
 *   hug   — the child is as small as its content (default)
 *   fill  — the child grows to eat the leftover space
 *   fixed — the child keeps an explicit width/height (set via style/className)
 *
 * Structure only — no colour, border, radius or shadow. Those stay in the theme
 * and in the content components placed inside.
 */

export type StackDir = "row" | "col";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around";
export type StackSize = "hug" | "fill" | "fixed";

const ALIGN: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const JUSTIFY: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

// fill grows and is allowed to shrink below content size (min-*:0), the classic
// flexbox overflow fix; hug and fixed never grow or shrink.
const SIZE: Record<StackSize, string> = {
  hug: "flex-none",
  fill: "flex-1 min-w-0 min-h-0",
  fixed: "flex-none",
};

export interface StackProps extends React.ComponentProps<"div"> {
  /** row lays children horizontally, col vertically. Default col. */
  dir?: StackDir;
  /** space between children (px number, or any CSS length). */
  gap?: number | string;
  /** cross-axis alignment. */
  align?: StackAlign;
  /** main-axis distribution. */
  justify?: StackJustify;
  /** wrap children onto multiple lines (a cluster). */
  wrap?: boolean;
  /** how THIS stack sizes inside its parent stack. */
  size?: StackSize;
  /** inner padding (px number, or any CSS length). */
  pad?: number | string;
}

export function Stack({
  dir = "col",
  gap,
  align,
  justify,
  wrap,
  size,
  pad,
  className,
  style,
  ...props
}: StackProps) {
  return (
    <div
      layout="stack"
      data-dir={dir}
      className={clsx(
        "flex",
        dir === "row" ? "flex-row" : "flex-col",
        align && ALIGN[align],
        justify && JUSTIFY[justify],
        wrap && "flex-wrap",
        size && SIZE[size],
        className,
      )}
      // gap / padding are structural, not visual — arbitrary values kept inline
      // so the primitive stays fully configurable without dynamic Tailwind.
      style={{ gap, padding: pad, ...style }}
      {...props}
    />
  );
}
