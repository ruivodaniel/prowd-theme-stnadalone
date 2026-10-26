import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import type { CheckboxProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Checkbox({ 
  state,
  concept,
  className,
  emphasis = "primary",
  status,
  scale = "md",
  checked = false,
  disabled = false,
  disabledReason = "",
  ...props
}: CheckboxProps) {
  const themeState = disabled ? "disabled" : checked ? "selected" : undefined;
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--checkbox",
    ...axisAttrs({ emphasis, status, scale, concept, state: themeState ?? state }),
  };

  const checkboxElement = (
    <CheckboxPrimitive.Root
      {...themeAttrs}
      className={cn("peer shrink-0 disabled:pointer-events-none disabled:cursor-not-allowed", className)}
      checked={checked}
      disabled={disabled}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        element="surface--checkbox-inner"
        state="selected"
        className="flex items-center justify-center"
      >
        <Icon name="check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (disabled && disabledReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block cursor-not-allowed">
              {checkboxElement}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return checkboxElement;
}

export { Checkbox };
