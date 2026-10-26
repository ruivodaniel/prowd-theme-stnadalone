import * as React from "react";
import { Eye, EyeOff, X } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { InputProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Input({ position,
  emphasis,
  state,
  concept,
  className,
  type,
  disabled,
  scale = "md",
  status,
  startIcon,
  endSlot,
  showPasswordToggle = true,
  showClear,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const [reveal, setReveal] = React.useState(false);
  const isPassword = type === "password";
  // the end buttons take the input's test id with a suffix, so a test or a play can click them by the one selector law
  const testId = (props as Record<string, unknown>)["data-testid"] as string | undefined;
  const effectiveType = isPassword && reveal ? "text" : type;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState<string>(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const currentValue = isControlled ? String(value ?? "") : uncontrolled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolled(e.target.value);
    onChange?.(e.target.value);
  };

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--input",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  // Build the end slot: explicit prop wins over auto-generated.
  const autoEnd =
    endSlot ??
    (isPassword && showPasswordToggle ? (
      <button
        type="button"
        data-part="end-icon"
        aria-label={reveal ? "Hide password" : "Show password"}
        data-testid={testId ? `${testId}-toggle` : undefined}
        onClick={() => setReveal((v) => !v)}
        disabled={disabled}
        className="inline-flex items-center"
      >
        {reveal ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    ) : showClear && currentValue.length > 0 ? (
      <button
        type="button"
        data-part="end-icon"
        aria-label="Clear"
        data-testid={testId ? `${testId}-clear` : undefined}
        disabled={disabled}
        onClick={() => {
          // Fire a synthetic change event so controlled callers get notified.
          const input = inputRef.current;
          if (!input) return;
          const nativeSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;
          nativeSetter?.call(input, "");
          input.dispatchEvent(new Event("input", { bubbles: true }));
          if (!isControlled) setUncontrolled("");
        }}
        className="inline-flex items-center"
      >
        <X className="size-4" />
      </button>
    ) : null);

  // Compound form: wrapper IS the field surface; <input> is a plain child.
  if (startIcon || autoEnd) {
    return (
      <div
        {...themeAttrs}
        className={cn("flex items-center", className, positionClasses(position))}
      >
        {startIcon && <span data-part="start-icon">{startIcon}</span>}
        <input
          ref={inputRef}
          type={effectiveType}
          disabled={disabled}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          className="min-w-0 flex-1"
          {...props}
        />
        {autoEnd}
      </div>
    );
  }

  // Simple form: native input is the root.
  return (
    <input
      ref={inputRef}
      type={effectiveType}
      {...themeAttrs}
      className={cn(
        "flex disabled:pointer-events-none disabled:cursor-not-allowed",
        className, positionClasses(position),
      )}
      disabled={disabled}
      value={isControlled ? value : undefined}
      defaultValue={!isControlled ? defaultValue : undefined}
      onChange={handleChange}
      {...props}
    />
  );
}

export { Input };
