import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// Tile is a surface: surface--tile — a plain cell to put things inside, every axis.
// The child of a Stack in a grid of tiles; the theme decides its fill and its seams.
export interface TileOwnProps extends ElementProps<"tile"> {}

type Div = React.ComponentProps<"div">;
export type TileProps = TileOwnProps & Omit<Div, keyof TileOwnProps | AxisName>;

export const tileSchema = defineProps<TileOwnProps>("Tile", axesSchema("tile"));
