import type * as React from "react";
import type * as SelectPrimitive from "@radix-ui/react-select";
import { STATUS, SCALE, type Status, type Scale } from "../../../../../../types/axes";
import { defineProps } from "../../../lib/define-props";

/** Select takes scale and status from the global axes. Named aliases kept for consumers. */
export type SelectScale = Scale;
export type SelectStatus = Status;

// The trigger is the field; Root, Group, Value, Content, Item… carry no props of their own.

export interface SelectTriggerOwnProps {
  /** Structural size (default: "md") */
  scale?: Scale;
  /** Semantic condition — validation state */
  status?: Status;
}

export type SelectTriggerProps = SelectTriggerOwnProps & Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, keyof SelectTriggerOwnProps>;

export const selectTriggerSchema = defineProps<SelectTriggerOwnProps>("SelectTrigger", {
  scale: { kind: "enum", values: SCALE, default: "md", doc: "Structural size" },
  status: { kind: "enum", values: STATUS, doc: "Semantic condition — validation state" },
});
