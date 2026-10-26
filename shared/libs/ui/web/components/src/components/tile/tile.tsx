import * as React from "react";

import { cn } from "../../lib/utils";
import type { TileProps } from "./types";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";

/**
 * Tile — a plain surface cell, the child of a Stack in a grid of tiles.
 * Emits surface--tile with every axis. It says nothing about how it looks:
 * fill, seam, padding and radius are the theme's decision. Whatever structure
 * sits inside it is the consumer's own Stack.
 */
function Tile({ position, className, emphasis, status, state, scale, concept, ...props }: TileProps) {
  return (
    <div
      element="surface--tile"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })}
      className={cn("flex flex-col min-w-0", className, positionClasses(position))}
      {...props}
    />
  );
}

export { Tile };
