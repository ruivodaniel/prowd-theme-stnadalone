import type * as React from "react";
import type * as TabsPrimitive from "@radix-ui/react-tabs";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// Tabs (root) is wiring: no box, no identity. The bar, the trigger and the content are elements.
export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

export interface TabsListOwnProps extends ElementProps<"tabBar"> {}
export type TabsListProps = TabsListOwnProps & Omit<React.ComponentProps<typeof TabsPrimitive.List>, keyof TabsListOwnProps | AxisName>;

export interface TabsTriggerOwnProps extends ElementProps<"tabTrigger"> {}
export type TabsTriggerProps = TabsTriggerOwnProps & Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, keyof TabsTriggerOwnProps | AxisName>;

export interface TabsContentOwnProps extends ElementProps<"tabPanel"> {}
export type TabsContentProps = TabsContentOwnProps & Omit<React.ComponentProps<typeof TabsPrimitive.Content>, keyof TabsContentOwnProps | AxisName>;


export type TabsOwnProps = Pick<TabsProps, "value" | "defaultValue" | "onValueChange">;
export const tabsSchema = defineProps<TabsOwnProps>("Tabs", {
  value: { kind: "string", doc: "The selected tab (controlled)" },
  defaultValue: { kind: "string", doc: "The selected tab at first (uncontrolled)" },
  onValueChange: { kind: "function", doc: "(value) — the tab the user selected" },
});
export const tabsListSchema = defineProps<TabsListOwnProps>("TabsList", axesSchema("tabBar"));
export const tabsTriggerSchema = defineProps<TabsTriggerOwnProps>("TabsTrigger", axesSchema("tabTrigger"));
export const tabsContentSchema = defineProps<TabsContentOwnProps>("TabsContent", axesSchema("tabPanel"));
