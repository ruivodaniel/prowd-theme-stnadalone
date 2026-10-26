/// <reference path="../react-overrides.d.ts" />
import * as React from "react";
import { clsx } from "clsx";
import { positionClasses } from "../position";

// Outer row shell — ShellNav + Page sit side by side
export function ShellSideNav({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="shell-side-nav" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// Nav slot inside ShellSideNav — width comes from its content (surface--sidebar)
export function ShellNav({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="shell-nav" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// Outer column shell — top bar stacks above Page
export function ShellTopNav({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="shell-top-nav" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}

// Outer column shell — no navigation chrome
export function ShellNone({ className, position, ...props }: React.ComponentProps<"div">) {
  return <div layout="shell-none" position={position} className={clsx(className, positionClasses(position))} {...props} />;
}
