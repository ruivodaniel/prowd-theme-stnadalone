import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { ButtonGroupProps } from "./types";

// =============================================================================
// ButtonGroup — a joined row/column of buttons sharing a single outline
// =============================================================================

function ButtonGroup({ position,
  emphasis,
  status,
  state,
  concept,
  className,
  orientation = "horizontal",
  scale = "md",
  ...props
}: ButtonGroupProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control-group--button-group",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
    orientation,
  };

  return (
    <div
      role="group"
      {...themeAttrs}
      className={cn(
        "inline-flex items-stretch",
        orientation === "vertical" && "flex-col",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

// =============================================================================
// ButtonGroupSeparator — optional inline divider between items
// =============================================================================

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-part="separator"
      element="surface--separator"
      className={cn("self-stretch", className)}
      {...props}
    />
  );
}

// =============================================================================
// ButtonGroupText — a non-interactive text slot inside the joined group
// =============================================================================

function ButtonGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="text"
      element="surface--button-group-text"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
