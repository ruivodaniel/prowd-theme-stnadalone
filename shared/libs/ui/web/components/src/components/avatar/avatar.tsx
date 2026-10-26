import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { AvatarProps } from "./types";

// =============================================================================
// Components
// =============================================================================

function Avatar({ position, className, emphasis, status, state, scale = "md", concept, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      element="surface--avatar"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })}
      className={cn("relative flex shrink-0 overflow-hidden", className, positionClasses(position))}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("absolute inset-0 h-full w-full object-cover object-top", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
