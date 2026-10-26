/// <reference path="../react-overrides.d.ts" />
import * as React from "react";
import { clsx } from "clsx";
import { positionClasses } from "../position";

export interface LeftSidebarProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
  collapsed?: boolean;
}

export function LeftSidebar({ className, position, scale = "md", collapsed = false, ...props }: LeftSidebarProps) {
  return (
    <div
      layout="left-sidebar"
      position={position}
      scale={scale}
      {...(collapsed && { state: "collapsed" })}
      className={clsx(className, positionClasses(position))}
      {...props}
    />
  );
}

export interface RightSidebarProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
}

export function RightSidebar({ className, position, scale = "md", ...props }: RightSidebarProps) {
  return <div layout="right-sidebar" position={position} scale={scale} className={clsx(className, positionClasses(position))} {...props} />;
}

export interface ContextPanelProps extends React.ComponentProps<"div"> {
  scale?: "sm" | "md" | "lg";
}

export function ContextPanel({ className, position, scale = "md", ...props }: ContextPanelProps) {
  return <div layout="context-panel" position={position} scale={scale} className={clsx(className, positionClasses(position))} {...props} />;
}
