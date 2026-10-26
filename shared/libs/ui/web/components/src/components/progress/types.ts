import type * as React from "react";
import type * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ElementProps, EmphasisOf, StatusOf, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named aliases kept for consumers; the values come from the progress row. */
export type ProgressEmphasis = EmphasisOf<"progress">;
export type ProgressStatus = StatusOf<"progress">;
export type ProgressScale = ScaleOf<"progress">;

// surface--progress is the track, surface--progress-inner the fill. Axes come from the progress row.
export interface ProgressOwnProps extends ElementProps<"progress"> {
  /** Progress value 0–max, or null/undefined for indeterminate */
  value?: number | null;
  /** Max value (default: 100) */
  max?: number;
  /** Indeterminate loading animation when true (or when value is null) */
  indeterminate?: boolean;
}
export type ProgressProps = ProgressOwnProps & Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, keyof ProgressOwnProps | AxisName>;

export const progressSchema = defineProps<ProgressOwnProps>("Progress", {
  ...axesSchema("progress"),
  value: { kind: "number", doc: "0 to max; null = indeterminate" },
  max: { kind: "number", default: 100, doc: "Max value" },
  indeterminate: { kind: "boolean", doc: "Loading animation" },
});
