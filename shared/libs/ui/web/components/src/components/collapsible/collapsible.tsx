import * as RadixCollapsible from "@radix-ui/react-collapsible";

/**
 * CollapsiblePrimitive - Raw Radix wrapper
 * 
 * This is the low-level primitive. For styled components, use:
 * - Accordion (multiple collapsible sections)
 * - CollapsiblePanel (panel with collapse toggle)
 * - ExpandableCard (card with expandable content)
 * - SidebarExpandableSection (sidebar nav group)
 */

function CollapsiblePrimitive({ ...props }: React.ComponentProps<typeof RadixCollapsible.Root>) {
  return <RadixCollapsible.Root {...props} />;
}

function CollapsiblePrimitiveTrigger({ ...props }: React.ComponentProps<typeof RadixCollapsible.CollapsibleTrigger>) {
  return <RadixCollapsible.CollapsibleTrigger {...props} />;
}

function CollapsiblePrimitiveContent({ ...props }: React.ComponentProps<typeof RadixCollapsible.CollapsibleContent>) {
  return <RadixCollapsible.CollapsibleContent {...props} />;
}

// Export with Primitive suffix (recommended)
export { 
  CollapsiblePrimitive, 
  CollapsiblePrimitiveTrigger, 
  CollapsiblePrimitiveContent 
};

// Backward compatibility aliases
export { 
  CollapsiblePrimitive as Collapsible, 
  CollapsiblePrimitiveTrigger as CollapsibleTrigger, 
  CollapsiblePrimitiveContent as CollapsibleContent 
};
