import type * as React from "react";
import type * as AccordionPrimitive from "@radix-ui/react-accordion";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// ── Accordion-specific vocabulary (Radix selection mode, surfaced for tooling) ──
export const ACCORDION_TYPES = ["single", "multiple"] as const;
export type AccordionType = (typeof ACCORDION_TYPES)[number];

// list--accordion holds list--item rows; each item has a trigger and a surface--content.
export interface AccordionOwnProps extends ElementProps<"accordion"> {}
export interface AccordionItemOwnProps extends ElementProps<"accordionItem"> {}
export interface AccordionTriggerOwnProps extends ElementProps<"accordionTrigger"> {}
export interface AccordionContentOwnProps extends ElementProps<"content"> {}

export type AccordionProps = AccordionOwnProps & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;
export type AccordionItemProps = AccordionItemOwnProps & Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, keyof AccordionItemOwnProps | AxisName>;
export type AccordionTriggerProps = AccordionTriggerOwnProps & Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>, keyof AccordionTriggerOwnProps | AxisName>;
export type AccordionContentProps = AccordionContentOwnProps & Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>, keyof AccordionContentOwnProps | AxisName>;


export const accordionSchema = defineProps<AccordionOwnProps>("Accordion", axesSchema("accordion"));
export const accordionItemSchema = defineProps<AccordionItemOwnProps>("AccordionItem", axesSchema("accordionItem"));
export const accordionTriggerSchema = defineProps<AccordionTriggerOwnProps>("AccordionTrigger", axesSchema("accordionTrigger"));
export const accordionContentSchema = defineProps<AccordionContentOwnProps>("AccordionContent", axesSchema("content"));
