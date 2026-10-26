/// <reference path="../react-overrides.d.ts" />
import * as React from "react";
import { clsx } from "clsx";
import { positionClasses } from "../position";

export function Main({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="main" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// =============================================================================
// MainHeader
// =============================================================================

export interface MainHeaderProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
  sticky?: boolean;
}

export function MainHeader({ className, position, scale = "md", sticky = false, ...props }: MainHeaderProps) {
  return (
    <div
      layout="main-header"
      position={position}
      scale={scale}
      {...(sticky && { sticky: "" })}
      className={clsx(className, positionClasses(position))}
      {...props}
    />
  );
}

// =============================================================================
// SecondMainHeader — a second full-width row under the main header
// =============================================================================

export interface SecondMainHeaderProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
  sticky?: boolean;
}

export function SecondMainHeader({ className, position, scale = "md", sticky = false, ...props }: SecondMainHeaderProps) {
  return (
    <div
      layout="second-main-header"
      position={position}
      scale={scale}
      {...(sticky && { sticky: "" })}
      className={clsx(className, positionClasses(position))}
      {...props}
    />
  );
}

// =============================================================================
// MainContent — invisible row holding MainBody + ContextPanel
// =============================================================================

export function MainContent({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="main-content" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// =============================================================================
// MainBody — col (in MainContent) + row (for its children)
// =============================================================================

export function MainBody({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="main-body" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// =============================================================================
// MainFooter
// =============================================================================

export interface MainFooterProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
}

export function MainFooter({ className, position, scale = "md", ...props }: MainFooterProps) {
  return <div layout="main-footer" position={position} scale={scale} className={clsx(className, positionClasses(position))} {...props} />;
}
