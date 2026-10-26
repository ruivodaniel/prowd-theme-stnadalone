import type * as React from "react";
import type { ElementProps, EmphasisOf, StatusOf, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named aliases kept for consumers; the values come from the alert row. */
export type AlertEmphasis = EmphasisOf<"alert">;
export type AlertStatus = StatusOf<"alert">;
export type AlertScale = ScaleOf<"alert">;

// surface--alert. Its axes come from the alert row.
export interface AlertOwnProps extends ElementProps<"alert"> {
  /** Optional leading icon slot */
  icon?: React.ReactNode;
}
export type AlertProps = AlertOwnProps & Omit<React.ComponentProps<"div">, keyof AlertOwnProps | AxisName>;
export type AlertTitleProps = React.ComponentProps<"div">;
export type AlertDescriptionProps = React.ComponentProps<"div">;

export const alertSchema = defineProps<AlertOwnProps>("Alert", {
  ...axesSchema("alert"),
  icon: { kind: "node", doc: "Leading icon slot" },
});

// the parts without props of their own
export const alertDescriptionSchema = defineProps<Record<never, never>>("AlertDescription", {});
export const alertTitleSchema = defineProps<Record<never, never>>("AlertTitle", {});
