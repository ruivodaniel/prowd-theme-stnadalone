import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// list--list holds list--item rows; the parts inside an item carry no identity.
export interface ListOwnProps extends ElementProps<"list"> {}
export interface ListItemOwnProps extends ElementProps<"listItem"> {}
export type ListProps = ListOwnProps & Omit<React.ComponentProps<"ul">, keyof ListOwnProps | AxisName>;
export type ListItemProps = ListItemOwnProps & Omit<React.ComponentProps<"li">, keyof ListItemOwnProps | AxisName>;
export type ListItemPartProps = React.ComponentProps<"div">;


export const listSchema = defineProps<ListOwnProps>("List", axesSchema("list"));
export const listItemSchema = defineProps<ListItemOwnProps>("ListItem", axesSchema("listItem"));

// the parts without props of their own
export const listItemIconSchema = defineProps<Record<never, never>>("ListItemIcon", {});
export const listItemContentSchema = defineProps<Record<never, never>>("ListItemContent", {});
export const listItemActionSchema = defineProps<Record<never, never>>("ListItemAction", {});
export const listItemTitleSchema = defineProps<Record<never, never>>("ListItemTitle", {});
export const listItemDescriptionSchema = defineProps<Record<never, never>>("ListItemDescription", {});
