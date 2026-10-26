import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { AlertProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function Alert({ position,
  className,
  emphasis,
  status = "neutral",
  scale = "md",
  concept,
  icon,
  children,
  ...props
}: AlertProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "surface--alert",
    ...axisAttrs({ emphasis, status, scale, concept, position }),
  };

  return (
    <div
      role="alert"
      {...themeAttrs}
      className={cn("flex items-start", className, positionClasses(position))}
      {...props}
    >
      {icon && <span data-part="icon" className="flex shrink-0 items-center">{icon}</span>}
      <div data-part="body" className="flex min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="title"
      element="type--body"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="description"
      element="type--body-small"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
