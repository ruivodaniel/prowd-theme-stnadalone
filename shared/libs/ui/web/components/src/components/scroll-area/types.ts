import type * as React from "react";
import type * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";

// ── Scroll-area-specific vocabulary (Radix, surfaced for tooling) ───────────

export const SCROLL_AREA_TYPES = ["auto", "always", "scroll", "hover"] as const;
export const SCROLL_BAR_ORIENTATIONS = ["vertical", "horizontal"] as const;
export type ScrollAreaType = (typeof SCROLL_AREA_TYPES)[number];
export type ScrollBarOrientation = (typeof SCROLL_BAR_ORIENTATIONS)[number];

export interface ScrollAreaOwnProps {
  /** When the scrollbars show (default: "hover") */
  type?: ScrollAreaType;
}

export type ScrollAreaProps = ScrollAreaOwnProps & Omit<React.ComponentProps<typeof ScrollAreaPrimitive.Root>, keyof ScrollAreaOwnProps | AxisName>;

export interface ScrollBarOwnProps {
  /** Which axis this bar scrolls (default: "vertical") */
  orientation?: ScrollBarOrientation;
}

export type ScrollBarProps = ScrollBarOwnProps & Omit<React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, keyof ScrollBarOwnProps | AxisName>;

export const scrollAreaSchema = defineProps<ScrollAreaOwnProps>("ScrollArea", {
  type: { kind: "enum", values: SCROLL_AREA_TYPES, default: "hover", doc: "When the scrollbars show" },
});
export const scrollBarSchema = defineProps<ScrollBarOwnProps>("ScrollBar", {
  orientation: { kind: "enum", values: SCROLL_BAR_ORIENTATIONS, default: "vertical", doc: "Axis" },
});
