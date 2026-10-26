/// <reference path="../../react-overrides.d.ts" />
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon, type IconName } from "../icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import type { ButtonProps, ButtonType } from "./types";

// =============================================================================
// Component
// =============================================================================

function Button({ position,
  state,
  concept,
  className,
  emphasis = "primary",
  status,
  scale = "md",
  buttonType: buttonTypeProp = "text",
  asChild = false,
  disabled = false,
  disabledReason,
  startIcon: startIconProp,
  endIcon: endIconProp,
  iconBackground = "none",
  iconBleed = false,
  fill = false,
  loading = false,
  loadingText,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const buttonType = buttonTypeProp;
  // While loading, force the start icon to the spinner so the button
  // keeps its structural layout (the icon zone stays the same width).
  const startIcon = loading ? ("loading" as IconName) : (startIconProp ?? "arrowRight");
  const endIcon = endIconProp ?? "arrowRight";

  const isIconOnly = buttonType === "icon";
  const effectiveDisabled = disabled || loading;

  // If the caller's buttonType has no start-icon zone, still render one
  // while loading — otherwise there's nowhere to put the spinner.
  const effectiveButtonType: ButtonType =
    loading && (buttonType === "text" || buttonType === "text-icon")
      ? "icon-text"
      : buttonType;

  // Semantic attributes for the theme engine
  const themeAttrs: Record<string, string | undefined> = {
    element: "control--button",
    ...axisAttrs({ emphasis, status, scale, concept, state: effectiveDisabled ? (loading ? "loading" : "disabled") : state, position }),
    ...(fill && { fill: "" }),
  };

  // Icon rendering helper
  // Icon-only buttons don't get data-part — the icon IS the button content, no separate zone.
  // Mixed buttons (icon-text, text-icon, icon-text-icon) get data-part so theme can target the zone.
  const renderIcon = (name: IconName, position: "start" | "end") => {
    const icon = <Icon name={name} className="shrink-0" />;
    const needsZone = !isIconOnly;
    return (
      <span
        {...(needsZone && { "data-part": `${position}-icon` })}
        {...(iconBackground !== "none" && { "icon-bg": iconBackground })}
        {...(iconBleed && { "icon-bleed": "", "icon-bleed-position": position })}
      >
        {icon}
      </span>
    );
  };

  // Radix Slot requires a single child element
  if (asChild) {
    return (
      <Comp
        {...themeAttrs}
        className={cn(className, positionClasses(position))}
        disabled={effectiveDisabled}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  const label = <span>{loading && loadingText ? loadingText : children}</span>;

  // Determine button content based on (effective) buttonType
  let content: React.ReactNode;
  switch (effectiveButtonType) {
    case "icon":
      content = renderIcon(startIcon, "start");
      break;
    case "icon-text":
      content = (
        <>
          {renderIcon(startIcon, "start")}
          {label}
        </>
      );
      break;
    case "text-icon":
      content = (
        <>
          {label}
          {renderIcon(endIcon, "end")}
        </>
      );
      break;
    case "icon-text-icon":
      content = (
        <>
          {renderIcon(startIcon, "start")}
          {label}
          {renderIcon(endIcon, "end")}
        </>
      );
      break;
    default:
      content = label;
  }

  const buttonElement = (
    <Comp
      {...themeAttrs}
      className={cn(className)}
      disabled={effectiveDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </Comp>
  );

  // When disabled with a reason, wrap in tooltip
  if (disabled && disabledReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block cursor-not-allowed">
              {buttonElement}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonElement;
}

export { Button };
