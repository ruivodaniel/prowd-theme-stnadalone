/// <reference path="../../react-overrides.d.ts" />
/**
 * Pagination — shadcn primitive
 */

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { PaginationProps, PaginationLinkProps } from "./types";

const Pagination = ({ position, className, emphasis, state, scale, concept = "pagination", ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    element="control-group--pagination-bar"
    {...axisAttrs({ emphasis, scale, concept, state, position })}
    className={cn("flex justify-center", className, positionClasses(position))}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({ position,
  className,
  isActive,
  emphasis,
  status,
  state,
  scale,
  concept,
  ...props
}: PaginationLinkProps) => (
  <button
    type="button"
    element="control--button"
    {...axisAttrs({ emphasis, status, scale, concept, state: isActive ? "selected" : state, position })}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed",
      className, positionClasses(position),
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    type="button"
    element="control--button"
    aria-label="Go to previous page"
    className={cn("inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed", className)}
    {...props}
  >
    <ChevronLeft className="shrink-0" />
    <span>Previous</span>
  </button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<"button">) => (
  <button
    type="button"
    element="control--button"
    aria-label="Go to next page"
    className={cn("inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="shrink-0" />
  </button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
