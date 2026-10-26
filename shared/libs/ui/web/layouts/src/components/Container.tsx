/// <reference path="../react-overrides.d.ts" />
import * as React from "react";
import { clsx } from "clsx";
import { positionClasses } from "../position";

export type ContainerScale = "xs" | "sm" | "md" | "lg" | "xl";
export type ContainerAlign = "left" | "center" | "right";

export interface ContainerProps extends React.ComponentProps<"div"> {
  scale?: ContainerScale;
  align?: ContainerAlign;
}

export function Container({ className, position, scale = "lg", ...props }: ContainerProps) {
  return (
    <div
      layout="container"
      position={position}
      scale={scale}
      className={clsx(className, positionClasses(position))}
      {...props}
    />
  );
}
