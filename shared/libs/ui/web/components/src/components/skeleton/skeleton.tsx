import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { SkeletonProps } from "./types";

function Skeleton({ position, className, emphasis, scale, concept, ...props }: SkeletonProps) {
  return <div element="surface--skeleton" {...axisAttrs({ emphasis, scale, concept, position })} className={cn("animate-pulse", className, positionClasses(position))} {...props} />;
}

export { Skeleton };
