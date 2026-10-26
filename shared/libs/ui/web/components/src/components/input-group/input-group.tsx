import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { InputGroupProps, InputGroupAddonProps } from "./types";

// =============================================================================
// InputGroup (wrapper)
// =============================================================================

function InputGroup({ position,
  emphasis,
  state,
  concept,
  className,
  scale = "md",
  status,
  disabled,
  ...props
}: InputGroupProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "field--input-group",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  return (
    <div
      role="group"
      {...themeAttrs}
      data-disabled={disabled || undefined}
      className={cn("flex w-full items-center", className, positionClasses(position))}
      {...props}
    />
  );
}

// =============================================================================
// InputGroupAddon — wraps a prefix/suffix slot (icon, unit label, button)
// =============================================================================

function InputGroupAddon({ position,
  className,
  align = "inline-start",
  onClick,
  state,
  concept,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-part="addon"
      element="surface--input-group-addon"
      {...axisAttrs({ concept, state, position })}
      data-align={align}
      className={cn("flex items-center", className, positionClasses(position))}
      onClick={(e) => {
        // Click on a plain addon focuses the input (native <label>-like
        // behavior). Ignore clicks that originate on an interactive element.
        if ((e.target as HTMLElement).closest("button, a, [role='button']")) {
          return;
        }
        e.currentTarget
          .closest("[role='group']")
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            "input, textarea",
          )
          ?.focus();
        onClick?.(e);
      }}
      {...props}
    />
  );
}

// =============================================================================
// InputGroupText — plain text suffix (units, currency)
// =============================================================================

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-part="text"
      element="type--body-small"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

// =============================================================================
// InputGroupInput / InputGroupTextarea — plain native elements styled via the
// group's `field--input-group` surface. We deliberately do NOT wrap the
// `Input` / `Textarea` primitives here — those render their own `element=`
// attributes which would collide with the group's.
// =============================================================================

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-part="control"
      className={cn(
        "min-w-0 flex-1 bg-transparent outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-part="control"
      className={cn(
        "min-w-0 flex-1 bg-transparent outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
