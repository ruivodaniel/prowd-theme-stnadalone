import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import type { BadgeProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Badge({ position,
  className,
  emphasis = "primary",
  status,
  state,
  scale = "sm",
  concept,
  asChild = false,
  showIcon = false,
  iconName = "check",
  iconPosition = "left",
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  const themeAttrs: Record<string, string | undefined> = {
    element: "surface--badge",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  if (asChild) {
    return (
      <Comp {...themeAttrs} className={cn(className, positionClasses(position))} {...props}>
        {children}
      </Comp>
    );
  }

  const icon = showIcon && iconName ? (
    <Icon name={iconName} size="xs" className="shrink-0" />
  ) : null;

  return (
    <Comp {...themeAttrs} className={cn("inline-flex items-center justify-center whitespace-nowrap shrink-0 [&>svg]:pointer-events-none overflow-hidden", className, positionClasses(position))} {...props}>
      {iconPosition === "left" ? icon : null}
      {children}
      {iconPosition === "right" ? icon : null}
    </Comp>
  );
}

export { Badge };
