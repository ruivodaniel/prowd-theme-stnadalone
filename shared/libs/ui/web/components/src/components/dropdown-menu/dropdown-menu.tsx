"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import type { DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuCheckboxItemProps, DropdownMenuRadioItemProps, DropdownMenuSubTriggerProps, DropdownMenuSubContentProps } from "./types";

// =============================================================================
// Behavioral wrappers (no visual identity)
// =============================================================================

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group element="surface--group" {...props} />;
}

function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup {...props} />;
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub {...props} />;
}

// =============================================================================
// Visual components
// =============================================================================

// Two nodes, like command.tsx: the floating shell is the overlay, the list
// inside it is the menu (listContainer family) — each themed by its own role.
function DropdownMenuContent({ position,
  className,
  sideOffset = 4,
  children,
  emphasis,
  state,
  scale,
  concept,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        element="overlay--dropdown-menu"
        {...axisAttrs({ emphasis, scale, concept, state, position })}
        sideOffset={sideOffset}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto",
          className, positionClasses(position),
        )}
        {...props}
      >
        <div element="list--menu">{children}</div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ position,
  className,
  inset,
  keepOpen = false,
  variant = "default",
  status,
  state,
  concept,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--menu-item",
    ...axisAttrs({ status: variant === "destructive" ? "destructive" : status, concept, state, position }),
  };
  return (
    <DropdownMenuPrimitive.Item
      data-inset={inset}
      onSelect={(e) => { if (keepOpen) e.preventDefault(); onSelect?.(e); }}
      {...themeAttrs}
      className={cn(
        "relative flex cursor-default items-center select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({ position,
  className,
  children,
  checked,
  keepOpen = false,
  status,
  state,
  concept,
  onSelect,
  ...props
}: DropdownMenuCheckboxItemProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--menu-item",
    ...axisAttrs({ status, concept, state: checked === true ? "selected" : state, position }),
  };
  return (
    <DropdownMenuPrimitive.CheckboxItem
      onSelect={(e) => { if (keepOpen) e.preventDefault(); onSelect?.(e); }}
      {...themeAttrs}
      className={cn(
        "relative flex cursor-default items-center select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className, positionClasses(position),
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="check" size="sm" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({ position,
  className,
  children,
  status,
  state,
  concept,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      element="control--menu-item"
      {...axisAttrs({ status, concept, state, position })}
      className={cn(
        "relative flex cursor-default items-center select-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className, positionClasses(position),
      )}
      {...props}>
      <span className="pointer-events-none absolute flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="circle" className="fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  /** Whether the label is inset (extra left padding for alignment) */
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      element="type--body-extra-small"
      data-inset={inset}
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      element="surface--separator"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      element="type--body-extra-small"
      className={cn(className)}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({ position,
  className,
  inset,
  children,
  status,
  state,
  concept,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      element="control--menu-item"
      {...axisAttrs({ status, concept, state, position })}
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center select-none",
        className, positionClasses(position),
      )}
      {...props}>
      {children}
      <Icon name="chevronRight" size="sm" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({ position,
  className,
  children,
  emphasis,
  state,
  scale,
  concept,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      element="overlay--dropdown-menu"
      {...axisAttrs({ emphasis, scale, concept, state, position })}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden",
        className, positionClasses(position),
      )}
      {...props}
    >
      <div element="list--menu">{children}</div>
    </DropdownMenuPrimitive.SubContent>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
