import type * as React from "react";
import { type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** InputOTP takes scale from the global axes. Named alias kept for consumers. */
export type InputOTPScale = Scale;

// OTPInputProps is a discriminated union (render vs children), which can't be
// extended by an interface. We pick the input-level props we forward and add ours.
export type OTPInputBaseProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "maxLength" | "children" | "render"> & {
  value?: string;
  onChange?: (newValue: string) => unknown;
  textAlign?: "left" | "center" | "right";
  onComplete?: (...args: unknown[]) => unknown;
  pushPasswordManagerStrategy?: "increase-width" | "none";
  pasteTransformer?: (pasted: string) => string;
  containerClassName?: string;
  noScriptCSSFallback?: string | null;
};

export interface InputOTPOwnProps extends ElementProps<"otp"> {
  /** Number of digits (default: 6) */
  length?: number;
  /** Alias for length — accepted for compatibility with react-hook-form spreads */
  maxLength?: number;
  /** Whether input is disabled (default: false) */
  disabled?: boolean;
  children?: React.ReactNode;
}

export type InputOTPProps = InputOTPOwnProps & Omit<OTPInputBaseProps, keyof InputOTPOwnProps | AxisName>;

export const inputOTPSchema = defineProps<InputOTPOwnProps>("InputOTP", {
  ...axesSchema("otp"),
  length: { kind: "number", default: 6, doc: "Number of digits" },
  maxLength: { kind: "number", doc: "Alias for length (react-hook-form spreads)" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  children: { kind: "node", doc: "Slots and separators" },
});
