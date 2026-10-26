import type * as React from "react";
import type * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ElementProps, StatusOf, ScaleOf } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";
import type { AxisName } from "../../lib/axes";

/** Named aliases kept for consumers; the values come from the alertDialog row. */
export type AlertDialogStatus = StatusOf<"alertDialog">;
export type AlertDialogScale = ScaleOf<"alertDialog">;

// overlay--alert-dialog. Its axes come from the alertDialog row.
export interface AlertDialogContentOwnProps extends ElementProps<"alertDialog"> {}
export type AlertDialogContentProps = AlertDialogContentOwnProps & Omit<React.ComponentProps<typeof AlertDialogPrimitive.Content>, keyof AlertDialogContentOwnProps | AxisName>;

export const alertDialogContentSchema = defineProps<AlertDialogContentOwnProps>("AlertDialogContent", axesSchema("alertDialog"));

// Action and Cancel render a Button (control--button): the button row.
export interface AlertDialogButtonOwnProps extends ElementProps<"button"> {
  /** Reason shown as a tooltip while the button is disabled. */
  disabledReason?: string;
  loading?: boolean;
}
export type AlertDialogButtonProps = AlertDialogButtonOwnProps & Omit<React.ComponentProps<typeof AlertDialogPrimitive.Action>, keyof AlertDialogButtonOwnProps | AxisName>;

const button = {
  ...axesSchema("button"),
  disabledReason: { kind: "string", doc: "Tooltip shown while disabled" },
  loading: { kind: "boolean", doc: "Spinner and disabled" },
} as const;
export const alertDialogActionSchema = defineProps<AlertDialogButtonOwnProps>("AlertDialogAction", button);
export const alertDialogCancelSchema = defineProps<AlertDialogButtonOwnProps>("AlertDialogCancel", button);

// the root (open state) and the parts without props of their own
export const alertDialogSchema = defineProps<{ open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>("AlertDialog", { open: { kind: "boolean", doc: "Open (controlled)" }, defaultOpen: { kind: "boolean", doc: "Open at first" }, onOpenChange: { kind: "function", doc: "(open) — opened or dismissed" } });
export const alertDialogHeaderSchema = defineProps<Record<never, never>>("AlertDialogHeader", {});
export const alertDialogFooterSchema = defineProps<Record<never, never>>("AlertDialogFooter", {});
export const alertDialogTitleSchema = defineProps<Record<never, never>>("AlertDialogTitle", {});
export const alertDialogDescriptionSchema = defineProps<Record<never, never>>("AlertDialogDescription", {});
