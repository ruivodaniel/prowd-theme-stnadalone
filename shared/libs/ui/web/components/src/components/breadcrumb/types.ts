import type * as React from "react";
import { type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Breadcrumb takes scale from the global axes. Named alias kept for consumers. */
export type BreadcrumbScale = Scale;

export interface BreadcrumbOwnProps extends ElementProps<"breadcrumb"> {

}

export type BreadcrumbProps = BreadcrumbOwnProps & Omit<React.ComponentProps<"nav">, keyof BreadcrumbOwnProps | AxisName>;

export const breadcrumbSchema = defineProps<BreadcrumbOwnProps>("Breadcrumb", {
  ...axesSchema("breadcrumb"),

});

// One crumb is control--breadcrumb-item whether it links (BreadcrumbLink) or is the current page (BreadcrumbPage, selected).
export interface BreadcrumbLinkOwnProps extends ElementProps<"breadcrumbItem"> {
  /** Render onto an existing element (router link) */
  asChild?: boolean;
}

export type BreadcrumbLinkProps = BreadcrumbLinkOwnProps & Omit<React.ComponentProps<"a">, keyof BreadcrumbLinkOwnProps | AxisName>;

export const breadcrumbLinkSchema = defineProps<BreadcrumbLinkOwnProps>("BreadcrumbLink", {
  ...axesSchema("breadcrumbItem"),
  asChild: { kind: "boolean", default: false, doc: "Render onto an existing element, e.g. a router link" },
});

export interface BreadcrumbPageOwnProps extends ElementProps<"breadcrumbItem"> {}
export type BreadcrumbPageProps = BreadcrumbPageOwnProps & Omit<React.ComponentProps<"span">, keyof BreadcrumbPageOwnProps | AxisName>;
export const breadcrumbPageSchema = defineProps<BreadcrumbPageOwnProps>("BreadcrumbPage", axesSchema("breadcrumbItem"));
