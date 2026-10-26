import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { EmptyStateProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function EmptyState({ position,
  className,
  icon,
  title,
  description,
  action,
  emphasis,
  status,
  state,
  scale = "md",
  concept,
  children,
  ...props
}: EmptyStateProps) {
  const themeAttrs: Record<string, string | undefined> = {
    element: "surface--empty-state",
    ...axisAttrs({ emphasis, status, scale, concept, state, position }),
  };

  return (
    <div
      role="status"
      {...themeAttrs}
      className={cn("flex flex-col items-center justify-center", className, positionClasses(position))}
      {...props}
    >
      {icon && (
        <span data-part="icon" className="flex items-center justify-center">
          {icon}
        </span>
      )}
      {title && (
        <div data-part="title" element="type--heading4">
          {title}
        </div>
      )}
      {description && (
        <div data-part="description" element="type--body-small">
          {description}
        </div>
      )}
      {children}
      {action && (
        <div data-part="action" className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}

export { EmptyState };
