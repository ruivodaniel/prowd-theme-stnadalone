import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange, type DayButtonProps } from "react-day-picker";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import type { DatePickerProps } from "./types";

// =============================================================================
// Component
// =============================================================================

// =============================================================================
// Helpers
// =============================================================================

const defaultSingleFormat = (d: Date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);

const defaultRangeFormat = (r: DateRange | undefined) => {
  if (!r?.from) return "";
  const f = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
  return r.to ? `${f.format(r.from)} – ${f.format(r.to)}` : f.format(r.from);
};

// Each day is its own control; react-day-picker exposes it only through a custom DayButton.
function CalendarDayButton({  day, modifiers, ...props }: DayButtonProps) {
  void day;
  const state = modifiers.disabled ? "disabled"
    : modifiers.selected || modifiers.range_start || modifiers.range_end || modifiers.range_middle ? "selected"
    : modifiers.focused ? "focus"
    : undefined;
  return <button element="control--calendar-day" {...axisAttrs({ state })} {...props} />;
}

function DatePicker(props: DatePickerProps) {
  const {
    position,
    mode = "single",
    value,
    defaultValue,
    onChange,
    placeholder = "Pick a date",
    disabled,
    fromDate,
    toDate,
    disabledDates,
    formatDate = defaultSingleFormat,
    formatRange = defaultRangeFormat,
    emphasis,
    status,
    state,
    scale = "md",
    concept,
    className,
  } = props as DatePickerProps & {
    // Discriminated union indexed access — narrow through the generic BaseProps.
    defaultValue?: Date | DateRange | null;
    value?: Date | DateRange | null;
    onChange?: (v: Date | DateRange | null) => void;
  };

  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<Date | DateRange | null>(
    (defaultValue ?? null) as Date | DateRange | null,
  );
  const current = isControlled ? (value as Date | DateRange | null) : internal;

  const [open, setOpen] = React.useState(false);

  const commit = (next: Date | DateRange | null) => {
    if (!isControlled) setInternal(next);
    onChange?.(next as never);
  };

  const label =
    current == null
      ? placeholder
      : mode === "range"
        ? formatRange(current as DateRange)
        : formatDate(current as Date);

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--date-picker",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  return (
    <Popover open={open} onOpenChange={disabled ? () => {} : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          {...themeAttrs}
          className={cn(
            "flex w-full items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed",
            className,
          )}
        >
          <span
            data-part="value"
            element={current == null ? "type--body-small" : undefined}
            emphasis={current == null ? "quiet" : undefined}
            className="truncate"
          >
            {label}
          </span>
          <CalendarIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <div element="surface--calendar" {...axisAttrs({ scale, concept, state: disabled ? "disabled" : undefined })}>
        {mode === "range" ? (
          <DayPicker
            mode="range"
            selected={(current ?? undefined) as DateRange | undefined}
            onSelect={(range) => commit(range ?? null)}
            components={{ DayButton: CalendarDayButton }}
            disabled={disabledDates}
            startMonth={fromDate}
            endMonth={toDate}
          />
        ) : (
          <DayPicker
            mode="single"
            selected={(current ?? undefined) as Date | undefined}
            onSelect={(d) => {
              commit(d ?? null);
              if (d) setOpen(false);
            }}
            components={{ DayButton: CalendarDayButton }}
            disabled={disabledDates}
            startMonth={fromDate}
            endMonth={toDate}
          />
        )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
