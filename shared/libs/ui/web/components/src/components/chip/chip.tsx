import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import type { ChipScale, ChipProps } from "./types";

// Map chip scale to icon size
const iconSizeMap: Record<ChipScale, "xs" | "sm"> = {
  "3xs": "xs",
  "2xs": "xs",
  xs: "xs",
  sm: "xs",
  md: "xs",
  lg: "sm",
  xl: "sm",
  "2xl": "sm",
  "3xl": "sm",
};

function Chip({ position,
  state,
  concept,
  className,
  emphasis = "primary",
  status,
  scale = "md",
  disabled = false,
  showIcon = false,
  iconName = "tag",
  closable = true,
  onClick,
  onClose,
  children,
  ...props
}: ChipProps) {
  const icon = showIcon && iconName ? (
    <Icon name={iconName} size={iconSizeMap[scale]} className="shrink-0" />
  ) : null;

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.(e);
  };

  const themeAttrs: Record<string, string | undefined> = {
    element: "control--chip",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  return (
    <span
      {...themeAttrs}
      className={cn(
        "inline-flex items-center justify-center shrink-0 overflow-hidden",
        onClick && "cursor-pointer",
        className, positionClasses(position)
      )}
      onClick={onClick}
      {...props}
    >
      {icon}
      {children}
      {closable && (
        <button
          type="button"
          onClick={handleCloseClick}
          aria-label="Remove"
        >
          <Icon name="close" size="xs" />
        </button>
      )}
    </span>
  );
}

export { Chip };
