"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import type { SwitchProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Switch({ 
  position,
  status,
  state,
  concept,
  className,
  emphasis = "primary",
  scale = "md",
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  disabledReason = "",
  onCheckedChange,
  ...props
}: SwitchProps) {
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const checked = isControlled ? checkedProp : internalChecked;

  const handleCheckedChange = React.useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalChecked(val);
      onCheckedChange?.(val);
    },
    [isControlled, onCheckedChange],
  );

  const themeAttrs: Record<string, string | undefined> = {
    element: "control--switch",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : checked ? "selected" : state }),
  };

  const switchElement = (
    <SwitchPrimitive.Root
      {...themeAttrs}
      className={cn(
        "peer inline-flex shrink-0 items-center transition-all disabled:pointer-events-none disabled:cursor-not-allowed",
        className, positionClasses(position),
      )}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      {...props}>
      <SwitchPrimitive.Thumb
        data-part="thumb"
        element="surface--switch-inner"
        {...axisAttrs({ state: checked ? "selected" : undefined })}
        className="pointer-events-none block transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  );

  if (disabled && disabledReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block cursor-not-allowed">
              {switchElement}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return switchElement;
}

export { Switch };
