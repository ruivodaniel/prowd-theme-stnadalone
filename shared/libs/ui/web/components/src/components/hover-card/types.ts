import type * as React from "react";
import type * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named alias kept for consumers; the values come from the hoverCard row. */
export type HoverCardScale = ScaleOf<"hoverCard">;

// overlay--hover-card: the preview panel. Its axes come from the hoverCard row.
export interface HoverCardContentOwnProps extends ElementProps<"hoverCard"> {}
export type HoverCardContentProps = HoverCardContentOwnProps & Omit<React.ComponentProps<typeof HoverCardPrimitive.Content>, keyof HoverCardContentOwnProps | AxisName>;

export const hoverCardContentSchema = defineProps<HoverCardContentOwnProps>("HoverCardContent", axesSchema("hoverCard"));
