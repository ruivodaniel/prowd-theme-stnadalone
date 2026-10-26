"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { SeparatorProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Separator({ position,
  className,
  orientation = "horizontal",
  decorative = true,
  emphasis,
  scale,
  concept,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      element="surface--separator"
      {...axisAttrs({ emphasis, scale, concept, position })}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

export { Separator };
