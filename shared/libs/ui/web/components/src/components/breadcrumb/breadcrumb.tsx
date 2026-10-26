import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { BreadcrumbProps, BreadcrumbLinkProps, BreadcrumbPageProps } from "./types";

// =============================================================================
// Breadcrumb — the <nav> root
// =============================================================================

function Breadcrumb({ position, className, emphasis, state, scale = "md", concept, ...props }: BreadcrumbProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control-group--breadcrumb",
    ...axisAttrs({ emphasis, scale, concept, state, position }),
  };
  return <nav aria-label="breadcrumb" {...themeAttrs} className={cn(className, positionClasses(position))} {...props} />;
}

// =============================================================================
// BreadcrumbList — the <ol>
// =============================================================================

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-part="list"
      className={cn("flex flex-wrap items-center", className)}
      {...props}
    />
  );
}

// =============================================================================
// BreadcrumbItem — wraps a single crumb
// =============================================================================

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-part="item"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  );
}

// =============================================================================
// BreadcrumbLink — clickable crumb (accepts asChild for router integration)
// =============================================================================

function BreadcrumbLink({ position,
  asChild,
  className,
  state,
  concept,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-part="link"
      element="control--breadcrumb-item"
      {...axisAttrs({ concept, state, position })}
      className={cn("inline-flex items-center", className, positionClasses(position))}
      {...props}
    />
  );
}

// =============================================================================
// BreadcrumbPage — current-page crumb (non-interactive)
// =============================================================================

function BreadcrumbPage({ position, className, state, concept, ...props }: BreadcrumbPageProps) {
  return (
    <span
      data-part="page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      element="control--breadcrumb-item"
      {...axisAttrs({ concept, state: state ?? "selected", position })}
      className={cn("inline-flex items-center", className, positionClasses(position))}
      {...props}
    />
  );
}

// =============================================================================
// BreadcrumbSeparator — chevron between crumbs
// =============================================================================

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-part="separator"
      element="surface--breadcrumb-separator"
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {children ?? <ChevronRight className="size-3.5" />}
    </li>
  );
}

// =============================================================================
// BreadcrumbEllipsis — truncate collapsed paths
// =============================================================================

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      data-part="ellipsis"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
