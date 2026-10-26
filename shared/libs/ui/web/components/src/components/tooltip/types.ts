import type * as React from "react";
import type * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

export const TOOLTIP_SIDES = ["top", "right", "bottom", "left"] as const;
export const TOOLTIP_ALIGNS = ["start", "center", "end"] as const;
export type TooltipSide = (typeof TOOLTIP_SIDES)[number];
export type TooltipAlign = (typeof TOOLTIP_ALIGNS)[number];

// overlay--tooltip. Its axes come from the tooltip row.
export interface TooltipContentOwnProps extends ElementProps<"tooltip"> {
  /** Preferred side of the trigger to render on (default: "top") */
  side?: TooltipSide;
  /** Distance in pixels from the trigger (default: 0) */
  sideOffset?: number;
  /** Preferred alignment against the trigger (default: "center") */
  align?: TooltipAlign;
}
export type TooltipContentProps = TooltipContentOwnProps & Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, keyof TooltipContentOwnProps | AxisName>;

export const tooltipContentSchema = defineProps<TooltipContentOwnProps>("TooltipContent", {
  ...axesSchema("tooltip"),
  side: { kind: "enum", values: TOOLTIP_SIDES, default: "top", doc: "Preferred side of the trigger" },
  sideOffset: { kind: "number", default: 0, doc: "Distance in pixels from the trigger" },
  align: { kind: "enum", values: TOOLTIP_ALIGNS, default: "center", doc: "Alignment against the trigger" },
});
