import type * as React from "react";
import type * as RadixCollapsible from "@radix-ui/react-collapsible";
import { defineProps } from "../../lib/define-props";

// Behavior only, no visual identity of its own. The styled components on top of it:
// Accordion, ExpandableCard, SidebarExpandableSection.
export type CollapsibleProps = React.ComponentProps<typeof RadixCollapsible.Root>;
export type CollapsibleTriggerProps = React.ComponentProps<typeof RadixCollapsible.CollapsibleTrigger>;
export type CollapsibleContentProps = React.ComponentProps<typeof RadixCollapsible.CollapsibleContent>;

export const collapsibleSchema = defineProps<Record<never, never>>("Collapsible", {});
