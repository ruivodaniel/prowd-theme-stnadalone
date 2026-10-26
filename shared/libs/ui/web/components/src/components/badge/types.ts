import type * as React from "react";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { iconRegistry, type IconName } from "../icons";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Badge takes the full global axes. Named aliases kept for consumers. */
export type BadgeEmphasis = Emphasis;
export type BadgeStatus = Status;
export type BadgeScale = Scale;

// ── Badge-specific vocabulary ───────────────────────────────────────────────

export const BADGE_ICON_POSITIONS = ["left", "right"] as const;
export type BadgeIconPosition = (typeof BADGE_ICON_POSITIONS)[number];

export interface BadgeOwnProps extends ElementProps<"badge"> {
  /** Render the badge as a Radix Slot (for composing onto an existing element). */
  asChild?: boolean;
  /** Show an icon next to the badge text (default: false) */
  showIcon?: boolean;
  /** Which icon to show (default: "check") */
  iconName?: IconName;
  /** Icon position relative to text (default: "left") */
  iconPosition?: BadgeIconPosition;
}

export type BadgeProps = BadgeOwnProps & Omit<React.ComponentProps<"span">, keyof BadgeOwnProps | AxisName>;

const ICON_NAMES = Object.keys(iconRegistry) as IconName[];

export const badgeSchema = defineProps<BadgeOwnProps>("Badge", {
  ...axesSchema("badge"),
  asChild: { kind: "boolean", default: false, doc: "Render as a Radix Slot onto an existing element" },
  showIcon: { kind: "boolean", default: false, doc: "Icon next to the text" },
  iconName: { kind: "enum", values: ICON_NAMES, default: "check", doc: "Which icon" },
  iconPosition: { kind: "enum", values: BADGE_ICON_POSITIONS, default: "left", doc: "Icon side" },
});
