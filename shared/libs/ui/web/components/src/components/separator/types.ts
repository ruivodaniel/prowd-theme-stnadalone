import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import type * as SeparatorPrimitive from "@radix-ui/react-separator";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// ── Separator-specific vocabulary ───────────────────────────────────────────

export const SEPARATOR_ORIENTATIONS = ["horizontal", "vertical"] as const;
export type SeparatorOrientation = (typeof SEPARATOR_ORIENTATIONS)[number];

export interface SeparatorOwnProps extends ElementProps<"separator"> {
  /** Direction of the separator line (default: "horizontal") */
  orientation?: SeparatorOrientation;
  /** Whether the separator is purely decorative (default: true) */
  decorative?: boolean;
}

export type SeparatorProps = SeparatorOwnProps & Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, keyof SeparatorOwnProps | AxisName>;

export const separatorSchema = defineProps<SeparatorOwnProps>("Separator", {
  ...axesSchema("separator"),
  orientation: { kind: "enum", values: SEPARATOR_ORIENTATIONS, default: "horizontal", doc: "Direction of the line" },
  decorative: { kind: "boolean", default: true, doc: "Purely decorative (no separator role)" },
});
