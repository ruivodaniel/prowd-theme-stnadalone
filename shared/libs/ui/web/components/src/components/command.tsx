import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

// =============================================================================
// Props
// =============================================================================

export interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  /** Dialog title for accessibility (default: "Command Palette") */
  title?: string;

  /** Dialog description for accessibility (default: "Search for a command to run...") */
  description?: string;

  /** Additional className */
  className?: string;

  /** Whether to show the close button (default: true) */
  showCloseButton?: boolean;
}

// =============================================================================
// Components
// =============================================================================

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      element="list--menu"
      className={cn(
        "flex flex-col overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn(className)} showCloseButton={showCloseButton}>
        <Command>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div element="field--input" className="flex items-center">
      <Icon name="search" size="sm" className="shrink-0" />
      <CommandPrimitive.Input
        className={cn(
          "flex disabled:pointer-events-none disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn("overflow-x-hidden overflow-y-auto", className)}
      {...props}
    />
  );
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty {...props} />;
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      element="surface--separator"
      className={cn(className)}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      element="control--menu-item"
      className={cn(
        "relative flex cursor-default items-center select-none data-[disabled=true]:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      element="type--body-extra-small"
      className={cn(className)}
      {...props}
    />
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

(CommandDialog as { propsSchema?: unknown }).propsSchema = {
  componentName: "CommandDialog",
  interfaceName: "CommandDialogProps",
  props: [
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: "Command Palette",
      typeString: "string",
      description: "Dialog title for accessibility",
    },
    {
      name: "description",
      type: "string",
      required: false,
      defaultValue: "Search for a command to run...",
      typeString: "string",
      description: "Dialog description for accessibility",
    },
    {
      name: "showCloseButton",
      type: "boolean",
      required: false,
      defaultValue: true,
      typeString: "boolean",
      description: "Whether to show the close button",
    },
  ],
};

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
