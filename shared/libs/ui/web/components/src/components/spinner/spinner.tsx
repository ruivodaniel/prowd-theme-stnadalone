import { useDebouncedBoolean } from "../../hooks/use-debounced-boolean";
import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { SpinnerProps, SpinnerOverlayProps } from "./types";

// =============================================================================
// Component
// =============================================================================

export function Spinner({ position, emphasis, status, scale = "md", concept, spinnerClassName, outerClassName }: SpinnerProps) {
  return (
    <div element="surface--spinner" {...axisAttrs({ emphasis, status, scale, concept, position })} className={cn("flex items-center justify-center", outerClassName, positionClasses(position))}>
      <div
        className={cn(
          "animate-spin",
          spinnerClassName,
        )}
      />
    </div>
  );
}

export function SpinnerOverlay({
  show = true,
  children,
  className,
  delay = 300,
  debouncedRender = true,
}: SpinnerOverlayProps) {
  const debouncedShow = useDebouncedBoolean(show, delay);
  const isVisible = debouncedRender ? debouncedShow : show;

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center",
        !isVisible && "hidden",
        className,
      )}>
      {children}
    </div>
  );
}
