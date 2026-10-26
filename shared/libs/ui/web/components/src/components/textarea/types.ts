import type * as React from "react";
import { type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Textarea takes scale and status from the global axes. Named aliases kept for consumers. */
export type TextareaScale = Scale;
export type TextareaStatus = Status;

export interface TextareaOwnProps extends ElementProps<"textarea"> {
  /** Grow vertically with content between minRows and maxRows; the rows attribute is ignored while on */
  autoSize?: boolean;
  /** Minimum visible rows when autoSize (default: 2) */
  minRows?: number;
  /** Maximum visible rows when autoSize (default: no cap) */
  maxRows?: number;
  /** The value the user typed. The field hands back the value, not the browser event. */
  onChange?: (value: string) => void;
}

export type TextareaProps = TextareaOwnProps & Omit<React.ComponentProps<"textarea">, keyof TextareaOwnProps | AxisName | "onChange">;

export const textareaSchema = defineProps<TextareaOwnProps>("Textarea", {
  ...axesSchema("textarea"),
  autoSize: { kind: "boolean", default: false, doc: "Grow with content" },
  minRows: { kind: "number", default: 2, doc: "Minimum rows while autoSize" },
  maxRows: { kind: "number", doc: "Maximum rows while autoSize" },
  onChange: { kind: "function", doc: "(value) — the value the user typed" },
});
