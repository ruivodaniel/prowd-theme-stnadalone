import type * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ElementProps } from "../../../../../types/elements";
import { iconRegistry, type IconName } from "../icons";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

export const LABEL_ICON_POSITIONS = ["left", "right"] as const;
export type LabelIconPosition = (typeof LABEL_ICON_POSITIONS)[number];

// surface--label. Its axes come from the label row.
export interface LabelOwnProps extends ElementProps<"label"> {
  /** Show an icon next to the label text (default: false) */
  showIcon?: boolean;
  /** Which icon to show (default: "info") */
  iconName?: IconName;
  /** Icon position relative to text (default: "left") */
  iconPosition?: LabelIconPosition;
}
export type LabelProps = LabelOwnProps & Omit<React.ComponentProps<typeof LabelPrimitive.Root>, keyof LabelOwnProps | AxisName>;

const ICON_NAMES = Object.keys(iconRegistry) as IconName[];
export const labelSchema = defineProps<LabelOwnProps>("Label", {
  ...axesSchema("label"),
  showIcon: { kind: "boolean", default: false, doc: "Icon next to the text" },
  iconName: { kind: "enum", values: ICON_NAMES, default: "info", doc: "Which icon" },
  iconPosition: { kind: "enum", values: LABEL_ICON_POSITIONS, default: "left", doc: "Icon side" },
});
