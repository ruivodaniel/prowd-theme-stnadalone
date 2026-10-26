import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// Every table part is an element of the table family: table--root, header, body, footer, row, header-cell, cell.
export interface TableOwnProps extends ElementProps<"tableRoot"> {}
export interface TableHeaderOwnProps extends ElementProps<"tableHeader"> {}
export interface TableBodyOwnProps extends ElementProps<"tableBody"> {}
export interface TableFooterOwnProps extends ElementProps<"tableFooter"> {}
export interface TableRowOwnProps extends ElementProps<"tableRow"> {}
export interface TableHeadOwnProps extends ElementProps<"tableHeaderCell"> {}
export interface TableCellOwnProps extends ElementProps<"tableCell"> {}

export type TableProps = TableOwnProps & Omit<React.ComponentProps<"table">, keyof TableOwnProps | AxisName>;
export type TableHeaderProps = TableHeaderOwnProps & Omit<React.ComponentProps<"thead">, keyof TableHeaderOwnProps | AxisName>;
export type TableBodyProps = TableBodyOwnProps & Omit<React.ComponentProps<"tbody">, keyof TableBodyOwnProps | AxisName>;
export type TableFooterProps = TableFooterOwnProps & Omit<React.ComponentProps<"tfoot">, keyof TableFooterOwnProps | AxisName>;
export type TableRowProps = TableRowOwnProps & Omit<React.ComponentProps<"tr">, keyof TableRowOwnProps | AxisName>;
export type TableHeadProps = TableHeadOwnProps & Omit<React.ComponentProps<"th">, keyof TableHeadOwnProps | AxisName>;
export type TableCellProps = TableCellOwnProps & Omit<React.ComponentProps<"td">, keyof TableCellOwnProps | AxisName>;
export type TableCaptionProps = React.ComponentProps<"caption">;


export const tableSchema = defineProps<TableOwnProps>("Table", axesSchema("tableRoot"));
export const tableRowSchema = defineProps<TableRowOwnProps>("TableRow", axesSchema("tableRow"));
export const tableCellSchema = defineProps<TableCellOwnProps>("TableCell", axesSchema("tableCell"));

// the parts without props of their own
export const tableHeaderSchema = defineProps<Record<never, never>>("TableHeader", {});
export const tableBodySchema = defineProps<Record<never, never>>("TableBody", {});
export const tableHeadSchema = defineProps<Record<never, never>>("TableHead", {});
