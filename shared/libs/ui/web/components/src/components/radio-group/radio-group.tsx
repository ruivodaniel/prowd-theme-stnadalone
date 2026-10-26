import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { RadioGroupProps, RadioGroupItemProps } from "./types";

// =============================================================================
// RadioGroup — the container
// =============================================================================

function RadioGroup({ position,
  emphasis,
  status,
  state,
  concept,
  className,
  scale = "md",
  orientation,
  ...props
}: RadioGroupProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control-group--choice-group",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
    ...(orientation && { orientation }),
  };

  return (
    <RadioGroupPrimitive.Root
      {...themeAttrs}
      className={cn("flex flex-col", className, positionClasses(position))}
      orientation={orientation}
      {...props}
    />
  );
}

// =============================================================================
// RadioGroupItem — one radio button
// =============================================================================

function RadioGroupItem({ 
  state,
  concept,
  className,
  emphasis = "primary",
  status,
  scale = "md",
  checked,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--radio",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : checked ? "selected" : state }),
  };

  return (
    <RadioGroupPrimitive.Item
      {...themeAttrs}
      className={cn(
        "peer shrink-0 inline-flex items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {/* The inner is always rendered so the outer's size does not depend on
          whether a dot is inside. Radix's Indicator inside it paints only when
          this item is the current value in the RadioGroup context. */}
      <span
        element="surface--radio-inner"
        style={{
          display: "block",
          width: "var(--radio-indicator-size, 0.4rem)",
          height: "var(--radio-indicator-size, 0.4rem)",
          flexShrink: 0,
        }}
      >
        <RadioGroupPrimitive.Indicator
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--fg, var(--primary))",
          }}
        />
      </span>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
