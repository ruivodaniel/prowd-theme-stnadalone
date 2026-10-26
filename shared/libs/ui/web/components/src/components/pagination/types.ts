import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

export interface PaginationOwnProps extends ElementProps<"paginationBar"> {}
export type PaginationProps = PaginationOwnProps & Omit<React.ComponentProps<"nav">, keyof PaginationOwnProps | AxisName>;

export interface PaginationLinkOwnProps extends ElementProps<"button"> {
  /** The current page — rendered with state="selected" and aria-current */
  isActive?: boolean;
}

export type PaginationLinkProps = PaginationLinkOwnProps & Omit<React.ComponentProps<"button">, keyof PaginationLinkOwnProps | AxisName>;

export const paginationSchema = defineProps<PaginationOwnProps>("Pagination", {
  ...axesSchema("paginationBar"),

});
export const paginationLinkSchema = defineProps<PaginationLinkOwnProps>("PaginationLink", {
  ...axesSchema("button"),
  isActive: { kind: "boolean", default: false, doc: "The current page" },
});
