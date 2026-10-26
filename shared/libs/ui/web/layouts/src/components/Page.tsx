/// <reference path="../react-overrides.d.ts" />
import * as React from "react";
import { clsx } from "clsx";
import { positionClasses } from "../position";

export function Page({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="page" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

export interface PageHeaderProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
}

export function PageHeader({ className, position, scale = "md", ...props }: PageHeaderProps) {
  return <div layout="page-header" position={position} scale={scale} className={clsx(className, positionClasses(position))} {...props} />;
}

export interface SecondPageHeaderProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
}

// A second full-width row under the page header (tabs, a sub-bar). It sits between PageHeader and PageBody.
export function SecondPageHeader({ className, position, scale = "md", ...props }: SecondPageHeaderProps) {
  return <div layout="second-page-header" position={position} scale={scale} className={clsx(className, positionClasses(position))} {...props} />;
}

export function PageBody({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="page-body" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}
