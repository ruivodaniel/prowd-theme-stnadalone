import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { PopoverContentProps } from "./types";

// =============================================================================
// Root + primitives
// =============================================================================

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger {...props} />;
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor {...props} />;
}

// =============================================================================
// Content
// =============================================================================

function PopoverContent({ position,
  className,
  align = "center",
  sideOffset = 4,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  ...props
}: PopoverContentProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "overlay--popover",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...themeAttrs}
        align={align}
        sideOffset={sideOffset}
        className={cn("z-50 outline-hidden", className, positionClasses(position))}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

// =============================================================================
// Optional semantic children
// =============================================================================

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="header"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="title"
      element="type--body"
      className={cn(className)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="description"
      element="type--body-small"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
