import type * as React from "react";
import type * as TogglePrimitive from "@radix-ui/react-toggle";
import type * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Toggle takes the full global axes. Named aliases kept for consumers. */
export type ToggleEmphasis = Emphasis;
export type ToggleStatus = Status;
export type ToggleScale = Scale;

// ── Toggle ──────────────────────────────────────────────────────────────────

export interface ToggleOwnProps extends ElementProps<"toggle"> {

}

export type ToggleProps = ToggleOwnProps & Omit<React.ComponentProps<typeof TogglePrimitive.Root>, keyof ToggleOwnProps | AxisName>;

export const toggleSchema = defineProps<ToggleOwnProps>("Toggle", {
  ...axesSchema("toggle"),

});

// ── ToggleGroup (single / multiple) ─────────────────────────────────────────

export type ToggleGroupRootProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root>;

export interface ToggleGroupOwnProps extends ElementProps<"choiceGroup"> {
  /** Selection mode (default: "single") */
  type?: ToggleGroupRootProps["type"];
}

export type ToggleGroupProps = ToggleGroupOwnProps & Omit<ToggleGroupRootProps, keyof ToggleGroupOwnProps | AxisName>;

export const toggleGroupSchema = defineProps<ToggleGroupOwnProps>("ToggleGroup", {
  ...axesSchema("choiceGroup"),
  type: { kind: "enum", values: ["single", "multiple"], default: "single", doc: "Selection mode" },
});

// ── ToggleGroupItem ─────────────────────────────────────────────────────────

export interface ToggleGroupItemOwnProps extends ElementProps<"toggle"> {

}

export type ToggleGroupItemProps = ToggleGroupItemOwnProps & Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Item>, keyof ToggleGroupItemOwnProps | AxisName>;

export const toggleGroupItemSchema = defineProps<ToggleGroupItemOwnProps>("ToggleGroupItem", {
  ...axesSchema("toggle"),

});
