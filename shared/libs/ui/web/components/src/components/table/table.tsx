import * as React from "react";

import { cn } from "../../lib/utils";
import type { TableProps, TableHeaderProps, TableBodyProps, TableFooterProps, TableRowProps, TableHeadProps, TableCellProps } from "./types";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";

type TableSection = "header" | "body" | "footer";
const TableSectionContext = React.createContext<TableSection>("body");

function Table({ position, className, emphasis, status, state, scale, concept, ...props }: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table element="table--root"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })} className={cn("w-full", className, positionClasses(position))} {...props} />
    </div>
  );
}

function TableHeader({ position, className, concept, ...props }: TableHeaderProps) {
  return (
    <TableSectionContext.Provider value="header">
      <thead element="table--header"
      {...axisAttrs({ concept, position })} className={cn(className, positionClasses(position))} {...props} />
    </TableSectionContext.Provider>
  );
}

function TableBody({ position, className, concept, ...props }: TableBodyProps) {
  return (
    <TableSectionContext.Provider value="body">
      <tbody element="table--body"
      {...axisAttrs({ concept, position })} className={cn(className, positionClasses(position))} {...props} />
    </TableSectionContext.Provider>
  );
}

function TableFooter({ position, className, concept, ...props }: TableFooterProps) {
  return (
    <TableSectionContext.Provider value="footer">
      <tfoot element="table--footer"
      {...axisAttrs({ concept, position })} className={cn(className, positionClasses(position))} {...props} />
    </TableSectionContext.Provider>
  );
}

function TableRow({ position, className, status, state, concept, ...props }: TableRowProps) {
  const section = React.useContext(TableSectionContext);
  const elementAttr =
    section === "header" ? "table--header-row"
    : section === "footer" ? "table--footer-row"
    : "table--row";
  return (
    <tr
      element={elementAttr}
      {...axisAttrs({ status, concept, state, position })}
      className={cn(className, positionClasses(position))}
      {...props}
    />
  );
}

function TableHead({ position, className, status, state, concept, ...props }: TableHeadProps) {
  return (
    <th
      element="table--header-cell"
      {...axisAttrs({ status, concept, state, position })}
      className={cn(
        "align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

function TableCell({ position, className, children, status, state, concept, ...props }: TableCellProps) {
  const section = React.useContext(TableSectionContext);
  const elementAttr = section === "footer" ? "table--footer-cell" : "table--cell";
  return (
    <td
      element={elementAttr}
      {...axisAttrs({ status, concept, state, position })}
      className={cn(
        "align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className, positionClasses(position),
      )}
      {...props}
    >
      <div element="table--cell-content" className="flex items-center">
        {children}
        </div>
    </td>
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption className={cn(className)} {...props} />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
