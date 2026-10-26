import * as React from "react";

import { cn } from "../../lib/utils";
import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from "./types";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";

function Card({ position, className, emphasis, status, state, scale, concept, ...props }: CardProps) {
  return (
    <div
      element="surface--card"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })}
      className={cn("flex flex-col overflow-hidden", className, positionClasses(position))}
      {...props}
    />
  );
}

function CardHeader({ position, className, emphasis, status, scale, concept, ...props }: CardHeaderProps) {
  return (
    <div
      element="surface--header"
      {...axisAttrs({ emphasis, status, scale, concept, position })}
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ position, className, state, scale, concept, ...props }: CardContentProps) {
  return (
    <div
      element="surface--content"
      {...axisAttrs({ scale, concept, state, position })}
      className={cn(className, positionClasses(position))}
      {...props}
    />
  );
}

function CardFooter({ position, className, emphasis, status, scale, concept, ...props }: CardFooterProps) {
  return (
    <div
      element="surface--footer"
      {...axisAttrs({ emphasis, status, scale, concept, position })}
      className={cn("flex items-center", className, positionClasses(position))}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
