import type * as React from "react";
import type * as SwitchPrimitive from "@radix-ui/react-switch";
import { type Emphasis, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Switch takes emphasis and scale from the global axes. Named aliases kept for consumers. */
export type SwitchEmphasis = Emphasis;
export type SwitchScale = Scale;

export interface SwitchOwnProps extends ElementProps<"switch"> {
  /** Controlled checked state (default: false) */
  checked?: boolean;
  /** Whether the switch is disabled (default: false) */
  disabled?: boolean;
  /** Tooltip text shown when hovering a disabled switch */
  disabledReason?: string;
}

export type SwitchProps = SwitchOwnProps & Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, keyof SwitchOwnProps | AxisName>;

export const switchSchema = defineProps<SwitchOwnProps>("Switch", {
  ...axesSchema("switch"),
  checked: { kind: "boolean", default: false, doc: "Controlled checked state" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  disabledReason: { kind: "string", doc: "Tooltip shown on hover while disabled" },
});
