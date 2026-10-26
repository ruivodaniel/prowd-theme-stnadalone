import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons/Icon";
import type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from "./types";

// =============================================================================
// Accordion Root
// =============================================================================

// The list itself: list--accordion (listContainer family)
export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ position, emphasis, status, state, scale, concept, ...props }, ref) => <AccordionPrimitive.Root ref={ref} element="list--accordion" {...axisAttrs({ emphasis, status, scale, concept, state, position })} {...props} />);
Accordion.displayName = "Accordion";

// =============================================================================
// Accordion Item
// =============================================================================

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ position, className, status, state, concept, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    element="surface--accordion-item"
    {...axisAttrs({ status, concept, state, position })}
    className={cn(className, positionClasses(position))}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// =============================================================================
// Accordion Trigger
// =============================================================================

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ position, className, children, state, concept, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      element="control--accordion-trigger"
      {...axisAttrs({ concept, state, position })}
      className={cn(
        "flex flex-1 items-center justify-between whitespace-nowrap transition-all [&[data-state=open]>svg]:rotate-180",
        className, positionClasses(position)
      )}
      {...props}
    >
      {children}
      <Icon
        name="chevronDown"
        size="sm"
        className="shrink-0 transition-transform duration-200"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

// =============================================================================
// Accordion Content
// =============================================================================

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ position, className, children, state, scale, concept, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    element="surface--content"
    {...axisAttrs({ scale, concept, state, position })}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn(className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
