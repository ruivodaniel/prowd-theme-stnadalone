import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import type { LabelProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Label({ position,
  className,
  showIcon = false,
  iconName = "info",
  iconPosition = "left",
  emphasis,
  status,
  state,
  scale,
  concept,
  children,
  ...props
}: LabelProps) {
  const icon = showIcon && iconName ? <Icon name={iconName} size="sm" className="shrink-0" /> : null;

  return (
    <LabelPrimitive.Root
      element="surface--label"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })}
      className={cn(
        "flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className, positionClasses(position),
      )}
      {...props}
    >
      {iconPosition === "left" ? icon : null}
      {children}
      {iconPosition === "right" ? icon : null}
    </LabelPrimitive.Root>
  );
}

export { Label };
