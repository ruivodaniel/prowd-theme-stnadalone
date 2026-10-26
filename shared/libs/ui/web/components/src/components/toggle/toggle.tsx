import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { ToggleProps, ToggleGroupRootProps, ToggleGroupProps, ToggleGroupItemProps } from "./types";

// =============================================================================
// Toggle
// =============================================================================

function Toggle({ position,
  state,
  concept,
  className,
  emphasis = "secondary",
  status,
  scale = "md",
  pressed,
  disabled,
  ...props
}: ToggleProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--toggle",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : pressed ? "selected" : state, position }),
  };

  return (
    <TogglePrimitive.Root
      {...themeAttrs}
      pressed={pressed}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

// =============================================================================
// ToggleGroup (single / multiple)
// =============================================================================

function ToggleGroup({ position,
  emphasis,
  status,
  state,
  concept,
  className,
  type = "single",
  scale = "md",
  orientation,
  ...props
}: ToggleGroupProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control-group--choice-group",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
    ...(orientation && { orientation }),
  };

  return (
    <ToggleGroupPrimitive.Root
      {...themeAttrs}
      {...(props as ToggleGroupRootProps)}
      type={type as never}
      orientation={orientation}
      className={cn("inline-flex items-center", className, positionClasses(position))}
    />
  );
}

function ToggleGroupItem({ position,
  state,
  concept,
  className,
  emphasis = "secondary",
  status,
  scale = "md",
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--toggle",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  return (
    <ToggleGroupPrimitive.Item
      {...themeAttrs}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

export { Toggle, ToggleGroup, ToggleGroupItem };
