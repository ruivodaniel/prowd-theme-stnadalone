import type * as React from "react";
import { type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** InputGroup takes scale and status from the global axes. Named aliases kept for consumers. */
export type InputGroupScale = Scale;
export type InputGroupStatus = Status;

// ── Input-group-specific vocabulary ─────────────────────────────────────────

export const INPUT_GROUP_ADDON_ALIGNS = ["inline-start", "inline-end", "block-start", "block-end"] as const;
export type InputGroupAddonAlign = (typeof INPUT_GROUP_ADDON_ALIGNS)[number];

// ── InputGroup (wrapper) ────────────────────────────────────────────────────

export interface InputGroupOwnProps extends ElementProps<"inputGroup"> {
  /** Disabled state propagated to addon children */
  disabled?: boolean;
}

export type InputGroupProps = InputGroupOwnProps & Omit<React.ComponentProps<"div">, keyof InputGroupOwnProps | AxisName>;

export const inputGroupSchema = defineProps<InputGroupOwnProps>("InputGroup", {
  ...axesSchema("inputGroup"),
  disabled: { kind: "boolean", doc: "Propagates to the addons" },
});

// ── InputGroupAddon ─────────────────────────────────────────────────────────

export interface InputGroupAddonOwnProps extends ElementProps<"inputGroupAddon"> {
  /** Where the addon sits relative to the input (default: "inline-start") */
  align?: InputGroupAddonAlign;
}

export type InputGroupAddonProps = InputGroupAddonOwnProps & Omit<React.ComponentProps<"div">, keyof InputGroupAddonOwnProps | AxisName>;

export const inputGroupAddonSchema = defineProps<InputGroupAddonOwnProps>("InputGroupAddon", {
  ...axesSchema("inputGroupAddon"),
  align: { kind: "enum", values: INPUT_GROUP_ADDON_ALIGNS, default: "inline-start", doc: "Where the addon sits" },
});
