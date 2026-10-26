import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "../../../lib/utils";
import type { SelectTriggerProps } from "./types";

// =============================================================================
// Root + primitives (no element — structural only)
// =============================================================================

/** @deprecated Use InputSelect. Kept until the app has migrated. */
function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />;
}

// =============================================================================
// Trigger — the visible field control
// =============================================================================

function SelectTrigger({
  className,
  scale = "md",
  status,
  disabled,
  children,
  ...props
}: SelectTriggerProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "field--select",
    scale,
    ...(status && { status }),
    ...(disabled && { state: "disabled" }),
  };

  return (
    <SelectPrimitive.Trigger
      {...themeAttrs}
      className={cn(
        "flex w-full items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed [&>span]:line-clamp-1",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// =============================================================================
// Scroll buttons
// =============================================================================

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

// =============================================================================
// Content — the dropdown overlay
// =============================================================================

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        element="overlay--popover"
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// =============================================================================
// Label
// =============================================================================

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      element="type--body-extra-small"
      className={cn("py-1.5 pe-2 ps-8", className)}
      {...props}
    />
  );
}

// =============================================================================
// Item
// =============================================================================

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      element="control--chip"
      className={cn(
        "relative flex w-full cursor-default select-none items-center whitespace-nowrap py-1.5 pe-2 ps-8 outline-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="absolute start-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// =============================================================================
// Separator
// =============================================================================

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

// =============================================================================
// Loading / Empty helpers
// =============================================================================

/**
 * Render inside `<SelectContent>` while options are being fetched.
 * Non-selectable; carries `element="type--body-small"` for theme control.
 */
function SelectLoading({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-part="select-loading"
      element="type--body-small"
      className={cn("flex items-center justify-center px-2 py-4", className)}
      {...props}
    >
      {children ?? "Loading…"}
    </div>
  );
}

/**
 * Render inside `<SelectContent>` when there are no items to show.
 * Non-selectable; carries `element="type--body-small"`.
 */
function SelectEmpty({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      data-part="select-empty"
      element="type--body-small"
      emphasis="quiet"
      className={cn("flex items-center justify-center px-2 py-4", className)}
      {...props}
    >
      {children ?? "No options"}
    </div>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectLoading,
  SelectEmpty,
};
