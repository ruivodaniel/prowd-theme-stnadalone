import type * as React from "react";
import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Radio items take the full global axes. Named aliases kept for consumers. */
export type RadioGroupItemEmphasis = Emphasis;
export type RadioGroupItemStatus = Status;
export type RadioGroupItemScale = Scale;

// ── RadioGroup — the container ──────────────────────────────────────────────

export interface RadioGroupOwnProps extends ElementProps<"choiceGroup"> {

}

export type RadioGroupProps = RadioGroupOwnProps & Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, keyof RadioGroupOwnProps | AxisName>;

export const radioGroupSchema = defineProps<RadioGroupOwnProps>("RadioGroup", {
  ...axesSchema("choiceGroup"),

});

// ── RadioGroupItem ──────────────────────────────────────────────────────────

export interface RadioGroupItemOwnProps extends ElementProps<"radio"> {
  /** Controlled checked state — mirrors Radix `pressed` on Toggle */
  checked?: boolean;
}

export type RadioGroupItemProps = RadioGroupItemOwnProps & Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, keyof RadioGroupItemOwnProps | AxisName>;

export const radioGroupItemSchema = defineProps<RadioGroupItemOwnProps>("RadioGroupItem", {
  ...axesSchema("radio"),
  checked: { kind: "boolean", doc: "Controlled checked state" },
});
