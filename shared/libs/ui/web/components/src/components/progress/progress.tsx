import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { ProgressProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Progress({ 
  className,
  value,
  max = 100,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  indeterminate,
  ...props
}: ProgressProps) {
  const isIndeterminate = indeterminate || value == null;
  const clamped = value == null ? 0 : Math.max(0, Math.min(max, value));
  const pct = max === 0 ? 0 : (clamped / max) * 100;

  const themeAttrs: Record<string, string | undefined> = {
    element: "surface--progress",
    ...axisAttrs({ emphasis, status, scale, concept, state: isIndeterminate ? "loading" : state }),
  };

  return (
    <ProgressPrimitive.Root
      {...themeAttrs}
      className={cn("relative w-full overflow-hidden", className)}
      value={isIndeterminate ? null : clamped}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-part="indicator"
        element="surface--progress-inner"
        className={cn(
          "h-full w-full flex-1 transition-transform",
          isIndeterminate && "animate-pulse",
        )}
        style={
          isIndeterminate
            ? undefined
            : { transform: `translateX(-${100 - pct}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
