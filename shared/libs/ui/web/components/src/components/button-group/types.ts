import type * as React from "react";
import { type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// ── Button-group-specific vocabulary ────────────────────────────────────────

export const BUTTON_GROUP_ORIENTATIONS = ["horizontal", "vertical"] as const;
export type ButtonGroupOrientation = (typeof BUTTON_GROUP_ORIENTATIONS)[number];

/** ButtonGroup takes scale from the global axes. Named alias kept for consumers. */
export type ButtonGroupScale = Scale;

export interface ButtonGroupOwnProps extends ElementProps<"buttonGroup"> {
  /** Lay out children horizontally (default) or vertically */
  orientation?: ButtonGroupOrientation;
}

export type ButtonGroupProps = ButtonGroupOwnProps & Omit<React.ComponentProps<"div">, keyof ButtonGroupOwnProps | AxisName>;

export const buttonGroupSchema = defineProps<ButtonGroupOwnProps>("ButtonGroup", {
  ...axesSchema("buttonGroup"),
  orientation: { kind: "enum", values: BUTTON_GROUP_ORIENTATIONS, default: "horizontal", doc: "Row or column" },
});
