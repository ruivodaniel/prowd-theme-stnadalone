import type * as React from "react";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { iconRegistry, type IconName } from "../icons";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// =============================================================================
// Button-specific vocabularies (the axes are global — see ui/types/axes)
// =============================================================================

export const BUTTON_TYPES = ["text", "icon", "icon-text", "text-icon", "icon-text-icon"] as const;
export const BUTTON_ICON_BG = ["none", "light", "dark"] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];
export type ButtonIconBg = (typeof BUTTON_ICON_BG)[number];

/** Button takes the full global axes. Named aliases kept for consumers. */
export type ButtonEmphasis = Emphasis;
export type ButtonStatus = Status;
export type ButtonScale = Scale;

// =============================================================================
// Props
// =============================================================================

export interface ButtonOwnProps extends ElementProps<"button"> {
  /** Render the button as a Radix Slot (for composing onto an existing element). */
  asChild?: boolean;
  /** Button type: text only, icon only, or combinations (default: "text") */
  buttonType?: ButtonType;
  /** Whether the button is disabled (default: false) */
  disabled?: boolean;
  /** Reason why the button is disabled. Shows tooltip on hover when disabled. */
  disabledReason?: string;
  /** Start (leading) icon — used when buttonType includes a start icon */
  startIcon?: IconName;
  /** End (trailing) icon — used when buttonType includes an end icon */
  endIcon?: IconName;
  /** Icon background style (default: "none") */
  iconBackground?: ButtonIconBg;
  /** Full-bleed icon zone — stretches to the button edge (default: false) */
  iconBleed?: boolean;
  /** Fill container width (default: false) */
  fill?: boolean;
  /** Show a spinner in place of the start icon and disable the button (default: false) */
  loading?: boolean;
  /** Optional label override while loading (e.g. "Saving..."). Falls back to children. */
  loadingText?: string;
}

export type ButtonProps = ButtonOwnProps & Omit<React.ComponentProps<"button">, keyof ButtonOwnProps | AxisName>;

// =============================================================================
// Schema — the same props, readable by tools. Typed against ButtonOwnProps.
// =============================================================================

const ICON_NAMES = Object.keys(iconRegistry) as IconName[];

export const buttonSchema = defineProps<ButtonOwnProps>("Button", {
  ...axesSchema("button"),
  asChild: { kind: "boolean", default: false, doc: "Render as a Radix Slot onto an existing element" },
  buttonType: { kind: "enum", values: BUTTON_TYPES, default: "text", doc: "Text only, icon only, or combinations" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  disabledReason: { kind: "string", doc: "Tooltip shown on hover while disabled" },
  startIcon: { kind: "enum", values: ICON_NAMES, doc: "Leading icon — when buttonType includes a start icon" },
  endIcon: { kind: "enum", values: ICON_NAMES, doc: "Trailing icon — when buttonType includes an end icon" },
  iconBackground: { kind: "enum", values: BUTTON_ICON_BG, default: "none", doc: "Icon background style" },
  iconBleed: { kind: "boolean", default: false, doc: "Icon zone stretches to the button edge" },
  fill: { kind: "boolean", default: false, doc: "Fill container width" },
  loading: { kind: "boolean", default: false, doc: "Spinner in place of the start icon; disables the button" },
  loadingText: { kind: "string", doc: "Label override while loading; falls back to children" },
});
