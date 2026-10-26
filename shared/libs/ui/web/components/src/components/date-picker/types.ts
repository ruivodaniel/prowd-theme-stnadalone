import type * as React from "react";
import type { DayPicker, DateRange } from "react-day-picker";
import { type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";

// Re-export the range type because consumers typing mode="range" need it
export type { DateRange };

/** Named aliases kept for consumers. */
export type DatePickerScale = Scale;
export type DatePickerStatus = Status;

export interface DatePickerOwnProps extends ElementProps<"datePicker"> {
  placeholder?: string;
  disabled?: boolean;
  /** Minimum selectable date */
  fromDate?: Date;
  /** Maximum selectable date */
  toDate?: Date;
  /** Custom disabled-date predicate (passes through to DayPicker) */
  disabledDates?: React.ComponentProps<typeof DayPicker>["disabled"];
  /** Locale formatter — falls back to Intl with the browser default */
  formatDate?: (d: Date) => string;
  /** Locale formatter for ranges */
  formatRange?: (r: DateRange | undefined) => string;
  className?: string;
}

export type DatePickerProps = DatePickerOwnProps &
  (
    | { mode?: "single"; value?: Date | null; defaultValue?: Date | null; onChange?: (value: Date | null) => void }
    | { mode: "range"; value?: DateRange | null; defaultValue?: DateRange | null; onChange?: (value: DateRange | null) => void }
  );

export const datePickerSchema = defineProps<DatePickerOwnProps>("DatePicker", {
  ...axesSchema("datePicker"),
  placeholder: { kind: "string" },
  disabled: { kind: "boolean", default: false },
  fromDate: { kind: "other", doc: "Minimum selectable date" },
  toDate: { kind: "other", doc: "Maximum selectable date" },
  disabledDates: { kind: "other", doc: "DayPicker disabled matcher" },
  formatDate: { kind: "function", doc: "Locale formatter" },
  formatRange: { kind: "function", doc: "Locale formatter for ranges" },
  className: { kind: "string" },
});
