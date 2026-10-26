import type * as React from "react";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Checkbox takes the full global axes. Named aliases kept for consumers. */
export type CheckboxEmphasis = Emphasis;
export type CheckboxStatus = Status;
export type CheckboxScale = Scale;

export interface CheckboxOwnProps extends ElementProps<"checkbox"> {
  /** Controlled checked state (default: false) */
  checked?: boolean;
  /** Whether the checkbox is disabled (default: false) */
  disabled?: boolean;
  /** Tooltip text shown when hovering a disabled checkbox */
  disabledReason?: string;
}

export type CheckboxProps = CheckboxOwnProps & Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, keyof CheckboxOwnProps | AxisName>;

export const checkboxSchema = defineProps<CheckboxOwnProps>("Checkbox", {
  ...axesSchema("checkbox"),
  checked: { kind: "boolean", default: false, doc: "Controlled checked state" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  disabledReason: { kind: "string", doc: "Tooltip shown on hover while disabled" },
});
