import type * as React from "react";
import type * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named alias kept for consumers; the values come from the popover row. */
export type PopoverScale = ScaleOf<"popover">;

// overlay--popover: the floating panel. Its axes come from the popover row.
export interface PopoverContentOwnProps extends ElementProps<"popover"> {}
export type PopoverContentProps = PopoverContentOwnProps & Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, keyof PopoverContentOwnProps | AxisName>;

export const popoverContentSchema = defineProps<PopoverContentOwnProps>("PopoverContent", axesSchema("popover"));
