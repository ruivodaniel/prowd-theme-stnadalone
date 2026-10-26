import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

export interface SkeletonOwnProps extends ElementProps<"skeleton"> {}
export type SkeletonProps = SkeletonOwnProps & Omit<React.ComponentProps<"div">, keyof SkeletonOwnProps | AxisName>;

export const skeletonSchema = defineProps<SkeletonOwnProps>("Skeleton", {
  ...axesSchema("skeleton"),

});
