import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

export interface PhoneCountryOption {
  /** ISO 3166-1 alpha-2 */
  code: string;
  /** Dialing code without leading "+" e.g. "351" */
  dialingCode: string;
  /** Regional indicator emoji e.g. "🇵🇹" */
  flag: string;
  /** English name e.g. "Portugal" */
  name: string;
}

export interface PhoneInputOwnProps extends ElementProps<"phoneInput"> {
  /** Controlled E.164 value e.g. "+351912345678" */
  value?: string;
  /** Called with a full E.164 string on every change */
  onChange?: (e164: string) => void;
  /** Full list of countries to show in the picker (default: every country of @libs/value-types) */
  countryOptions?: PhoneCountryOption[];
  /** Country used when the value has none and the browser gives no hint (default: "US") */
  defaultCountryCode?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  onBlur?: () => void;
}

export type PhoneInputProps = PhoneInputOwnProps & Omit<React.ComponentProps<"div">, keyof PhoneInputOwnProps | AxisName | "onChange" | "onBlur">;

export const phoneInputSchema = defineProps<PhoneInputOwnProps>("PhoneInput", {
  ...axesSchema("phoneInput"),
  value: { kind: "string", doc: "E.164" },
  onChange: { kind: "function", doc: "Full E.164 string on every change" },
  countryOptions: { kind: "other", doc: "PhoneCountryOption[] (default: every country)" },
  defaultCountryCode: { kind: "string", default: "US" },
  placeholder: { kind: "string", default: "Phone number" },
  disabled: { kind: "boolean", default: false },
  id: { kind: "string" },
  className: { kind: "string" },
  onBlur: { kind: "function" },
});
