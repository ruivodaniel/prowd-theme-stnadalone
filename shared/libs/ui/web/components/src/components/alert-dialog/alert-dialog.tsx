import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { AlertDialogContentProps, AlertDialogButtonProps } from "./types";
import { Button } from "../button";

// =============================================================================
// Root + primitives
// =============================================================================

function AlertDialog(props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogTrigger(props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}

function AlertDialogPortal(props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal {...props} />;
}

// =============================================================================
// Overlay + Content
// =============================================================================

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-part="scrim"
      className={cn("fixed inset-0 z-50", className)}
      {...props}
    />
  );
}

function AlertDialogContent({ position,
  className,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  children,
  ...props
}: AlertDialogContentProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "overlay--alert-dialog",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        {...themeAttrs}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4",
          className, positionClasses(position),
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

// =============================================================================
// Header / Title / Description / Footer
// =============================================================================

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-part="footer"
      className={cn("flex items-center justify-end gap-3", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      element="type--heading3"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      element="type--body-small"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  emphasis = "primary",
  status,
  scale,
  state,
  concept,
  disabled,
  disabledReason,
  loading,
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Action asChild {...props}>
      <Button
        emphasis={emphasis}
        status={status}
        scale={scale}
        state={state}
        concept={concept}
        disabled={disabled}
        disabledReason={disabledReason}
        loading={loading}
      >
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  );
}

function AlertDialogCancel({
  emphasis = "tertiary",
  status,
  scale,
  state,
  concept,
  disabled,
  disabledReason,
  loading,
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <AlertDialogPrimitive.Cancel asChild {...props}>
      <Button
        emphasis={emphasis}
        status={status}
        scale={scale}
        state={state}
        concept={concept}
        disabled={disabled}
        disabledReason={disabledReason}
        loading={loading}
      >
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
