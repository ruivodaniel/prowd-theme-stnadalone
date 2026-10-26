import type * as React from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ElementProps, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named alias kept for consumers; the values come from the dialog row. */
export type DialogScale = ScaleOf<"dialog">;

// overlay--dialog: the floating panel. Its axes come from the dialog row.
export interface DialogContentOwnProps extends ElementProps<"dialog"> {
  /** Whether to show the close button (default: true) */
  showCloseButton?: boolean;
}
export type DialogContentProps = DialogContentOwnProps & Omit<React.ComponentProps<typeof DialogPrimitive.Content>, keyof DialogContentOwnProps | AxisName>;

export const dialogContentSchema = defineProps<DialogContentOwnProps>("DialogContent", {
  ...axesSchema("dialog"),
  showCloseButton: { kind: "boolean", default: true, doc: "Close button in the corner" },
});
