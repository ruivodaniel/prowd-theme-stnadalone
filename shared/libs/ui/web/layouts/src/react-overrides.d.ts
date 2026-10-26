/**
 * Declare layout-system custom HTML attributes so TypeScript accepts them on
 * plain divs without requiring `data-*` prefixes or explicit casts.
 *
 * `layout`   — structural region identity (e.g. "shell", "main", "left-sidebar")
 * `width`    — container width variant (e.g. "sm" | "md" | "lg" | "full")
 * `align`    — container horizontal alignment ("left" | "center")
 * `state`    — collapsed state forwarded from layout primitives ("collapsed")
 * `emphasis` — a region's shade/weight in the layout ("primary" | "secondary")
 * `position` — where the region stands in its parent: POSITION words (types/axes.ts), one or several; mapped to classes by src/position.ts
 */
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    layout?: string;
    width?: string;
    align?: string;
    state?: string;
    emphasis?: string;
    position?: string;
  }
}
