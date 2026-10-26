import type * as React from "react";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named alias kept for consumers; the values come from the emptyState row. */
export type EmptyStateScale = ScaleOf<"emptyState">;

// surface--empty-state. Its axes come from the emptyState row.
export interface EmptyStateOwnProps extends ElementProps<"emptyState"> {
  /** Optional icon slot above the title */
  icon?: React.ReactNode;
  /** Primary message */
  title?: React.ReactNode;
  /** Supporting description */
  description?: React.ReactNode;
  /** Action slot (Button, link) */
  action?: React.ReactNode;
}
export type EmptyStateProps = EmptyStateOwnProps & Omit<React.ComponentProps<"div">, keyof EmptyStateOwnProps | AxisName>;

export const emptyStateSchema = defineProps<EmptyStateOwnProps>("EmptyState", {
  ...axesSchema("emptyState"),
  icon: { kind: "node", doc: "Icon above the title" },
  title: { kind: "node", doc: "Primary message" },
  description: { kind: "node", doc: "Supporting description" },
  action: { kind: "node", doc: "Action slot: Button, link" },
});
