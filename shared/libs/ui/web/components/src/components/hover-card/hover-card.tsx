import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { HoverCardContentProps } from "./types";

// =============================================================================
// Root + Trigger
// =============================================================================

function HoverCard(props: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root {...props} />;
}

function HoverCardTrigger(props: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger {...props} />;
}

// =============================================================================
// Content
// =============================================================================

function HoverCardContent({ position,
  className,
  align = "center",
  sideOffset = 4,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  ...props
}: HoverCardContentProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "overlay--hover-card",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        {...themeAttrs}
        align={align}
        sideOffset={sideOffset}
        className={cn("z-50 outline-hidden", className, positionClasses(position))}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
