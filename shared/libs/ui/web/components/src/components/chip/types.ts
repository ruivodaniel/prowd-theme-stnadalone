import type * as React from "react";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { iconRegistry, type IconName } from "../icons";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Chip takes the full global axes. Named aliases kept for consumers. */
export type ChipEmphasis = Emphasis;
export type ChipStatus = Status;
export type ChipScale = Scale;

export interface ChipOwnProps extends ElementProps<"chip"> {
  /** Show an icon next to the chip text (default: false) */
  showIcon?: boolean;
  /** Which icon to show (default: "tag") */
  iconName?: IconName;
  /** Whether the chip is disabled (default: false) */
  disabled?: boolean;
  /** Show close button (default: true) */
  closable?: boolean;
  /** Callback when chip is clicked (not the close button) */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** Callback when close button is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ChipProps = ChipOwnProps & Omit<React.ComponentProps<"span">, keyof ChipOwnProps | AxisName>;

const ICON_NAMES = Object.keys(iconRegistry) as IconName[];

export const chipSchema = defineProps<ChipOwnProps>("Chip", {
  ...axesSchema("chip"),
  showIcon: { kind: "boolean", default: false, doc: "Icon next to the text" },
  iconName: { kind: "enum", values: ICON_NAMES, default: "tag", doc: "Which icon" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  closable: { kind: "boolean", default: true, doc: "Close button" },
  onClick: { kind: "function", doc: "Chip clicked (not the close button)" },
  onClose: { kind: "function", doc: "Close button clicked" },
});
