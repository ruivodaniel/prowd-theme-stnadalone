import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// Card and its regions are surfaces: surface--card, surface--header, surface--content, surface--footer.
export interface CardOwnProps extends ElementProps<"card"> {}
export interface CardHeaderOwnProps extends ElementProps<"header"> {}
export interface CardContentOwnProps extends ElementProps<"content"> {}
export interface CardFooterOwnProps extends ElementProps<"footer"> {}

type Div = React.ComponentProps<"div">;
export type CardProps = CardOwnProps & Omit<Div, keyof CardOwnProps | AxisName>;
export type CardHeaderProps = CardHeaderOwnProps & Omit<Div, keyof CardHeaderOwnProps | AxisName>;
export type CardContentProps = CardContentOwnProps & Omit<Div, keyof CardContentOwnProps | AxisName>;
export type CardFooterProps = CardFooterOwnProps & Omit<Div, keyof CardFooterOwnProps | AxisName>;
export type CardTitleProps = Div;
export type CardDescriptionProps = Div;
export type CardActionProps = Div;


export const cardSchema = defineProps<CardOwnProps>("Card", axesSchema("card"));
export const cardHeaderSchema = defineProps<CardHeaderOwnProps>("CardHeader", axesSchema("header"));
export const cardContentSchema = defineProps<CardContentOwnProps>("CardContent", axesSchema("content"));
export const cardFooterSchema = defineProps<CardFooterOwnProps>("CardFooter", axesSchema("footer"));
