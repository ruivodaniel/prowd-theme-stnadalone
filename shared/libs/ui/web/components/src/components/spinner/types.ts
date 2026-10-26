import type * as React from "react";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";

/** Named alias kept for consumers; the values come from the spinner row. */
export type SpinnerScale = ScaleOf<"spinner">;

// surface--spinner. Its axes come from the spinner row.
export interface SpinnerProps extends ElementProps<"spinner"> {
  /** Additional class for the spinning element */
  spinnerClassName?: string;
  /** Additional class for the outer container */
  outerClassName?: string;
}

export const spinnerSchema = defineProps<SpinnerProps>("Spinner", {
  ...axesSchema("spinner"),
  spinnerClassName: { kind: "string", doc: "Class on the spinning element" },
  outerClassName: { kind: "string", doc: "Class on the outer container" },
});

export interface SpinnerOverlayProps {
  /** Content to display inside the overlay (typically a Spinner) */
  children?: React.ReactNode;
  /** Additional class for the overlay container */
  className?: string;
  /** Whether the overlay is visible (default: true) */
  show?: boolean;
  /** Delay in ms before showing (default: 300) */
  delay?: number;
  /** Whether to debounce the render (default: true) */
  debouncedRender?: boolean;
}

export const spinnerOverlaySchema = defineProps<SpinnerOverlayProps>("SpinnerOverlay", {
  children: { kind: "node", doc: "Overlay content, typically a Spinner" },
  className: { kind: "string", doc: "Class on the overlay container" },
  show: { kind: "boolean", default: true, doc: "Visible" },
  delay: { kind: "number", default: 300, doc: "Delay in ms before showing" },
  debouncedRender: { kind: "boolean", default: true, doc: "Debounce the render" },
});
