import type * as React from "react";
import { type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Input takes scale and status from the global axes. Named aliases kept for consumers. */
export type InputScale = Scale;
export type InputStatus = Status;

export interface InputOwnProps extends ElementProps<"input"> {
  /** Icon rendered on the left inside the field boundary (the component then renders a wrapper with element="field--input") */
  startIcon?: React.ReactNode;
  /** Node rendered on the right inside the field boundary (copy button, unit suffix). Caller wins over the auto end slot. */
  endSlot?: React.ReactNode;
  /** When type="password", auto-render an eye toggle on the right. Set false to opt out. */
  showPasswordToggle?: boolean;
  /** When type="search", auto-render a clear button on the right. */
  showClear?: boolean;
  /** The value the user typed. The field hands back the value, not the browser event. */
  onChange?: (value: string) => void;
}

export type InputProps = InputOwnProps & Omit<React.ComponentProps<"input">, keyof InputOwnProps | AxisName | "onChange">;

export const inputSchema = defineProps<InputOwnProps>("Input", {
  ...axesSchema("input"),
  startIcon: { kind: "node", doc: "Icon inside the field, on the left" },
  endSlot: { kind: "node", doc: "Node inside the field, on the right" },
  showPasswordToggle: { kind: "boolean", doc: "Eye toggle when type=password (opt out with false)" },
  showClear: { kind: "boolean", doc: "Clear button when type=search" },
  onChange: { kind: "function", doc: "(value) — the value the user typed" },
});
