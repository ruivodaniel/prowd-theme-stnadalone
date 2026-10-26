import type * as React from "react";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";

/** ColorPicker takes the field axes. Named aliases kept for consumers. */
export type ColorPickerEmphasis = Emphasis;
export type ColorPickerStatus = Status;
export type ColorPickerScale = Scale;

/** one colour to offer: a CSS colour (hex, rgb, oklch, a var()) and the name people see */
export interface PaletteColor { value: string; name?: string }
/** a named set of colours to offer */
export interface ColorPalette { id: string; name: string; colors: PaletteColor[] }

export interface ColorPickerOwnProps extends ElementProps<"colorPicker"> {
  /** several colours at once, a combination (default: false) */
  multiple?: boolean;
  /** at most this many, when multiple */
  max?: number;
  /** free choice: hue and saturation, and a hex field (default: true) */
  picker?: boolean;
  /** pick a colour from the page's pixels, where the browser offers it (default: false; needs `picker`) */
  eyedropper?: boolean;
  /** the palettes offered: a list of your own, "theme" for the active theme's colour tokens (default), or false for none */
  palettes?: ColorPalette[] | "theme" | false;
  /** the field's text while nothing is chosen */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export type ColorPickerProps = ColorPickerOwnProps &
  Omit<React.ComponentProps<"button">, keyof ColorPickerOwnProps | "value" | "defaultValue" | "onChange"> &
  (
    | { multiple?: false; value?: string | null; defaultValue?: string | null; onChange?: (value: string | null) => void }
    | { multiple: true; value?: string[]; defaultValue?: string[]; onChange?: (value: string[]) => void }
  );

export const colorPickerSchema = defineProps<ColorPickerOwnProps>("ColorPicker", {
  ...axesSchema("colorPicker"),
  multiple: { kind: "boolean", default: false, doc: "Several colours at once" },
  max: { kind: "number", doc: "At most this many, when multiple" },
  picker: { kind: "boolean", default: true, doc: "Free choice: hue, saturation, hex" },
  eyedropper: { kind: "boolean", default: false, doc: "Pick from the page's pixels (needs picker; where the browser offers it)" },
  palettes: { kind: "other", doc: "Your palettes, \"theme\" for the active theme's colours (default), or false" },
  placeholder: { kind: "string", default: "Pick a colour" },
  disabled: { kind: "boolean", default: false },
  className: { kind: "string" },
});
