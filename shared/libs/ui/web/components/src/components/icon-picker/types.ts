import type * as React from "react";
import { type Emphasis, type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";

/** IconPicker takes the field axes. Named aliases kept for consumers. */
export type IconPickerEmphasis = Emphasis;
export type IconPickerStatus = Status;
export type IconPickerScale = Scale;

/** one icon to offer: its name in its library, how it is drawn, and words a search finds it by */
export interface IconOption { name: string; render: (props: { size?: number; className?: string }) => React.ReactNode; keywords?: string[] }
/** a library of icons: the component's own registry is one; a consumer may bring others, and they grow without the component knowing */
export interface IconLibrary { id: string; name: string; icons: IconOption[] }
/** a chosen icon: which library, which name */
export interface IconRef { library: string; name: string }

export interface IconPickerOwnProps extends ElementProps<"iconPicker"> {
  /** the libraries offered, each with the icons it offers (all of it, or a subset: build one with `libraryIcons(names)`); default: the component library's own registry, whole */
  libraries?: IconLibrary[];
  /** a search box over the names and keywords (default: true) */
  search?: boolean;
  /** the field's text while nothing is chosen */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: IconRef | null;
  defaultValue?: IconRef | null;
  onChange?: (value: IconRef | null) => void;
}

export type IconPickerProps = IconPickerOwnProps & Omit<React.ComponentProps<"button">, keyof IconPickerOwnProps | "value" | "defaultValue" | "onChange">;

export const iconPickerSchema = defineProps<IconPickerOwnProps>("IconPicker", {
  ...axesSchema("iconPicker"),
  libraries: { kind: "other", doc: "IconLibrary[]: the libraries offered, each with its icons (default: the library's own registry)" },
  search: { kind: "boolean", default: true, doc: "A search box over names and keywords" },
  placeholder: { kind: "string", default: "Pick an icon" },
  disabled: { kind: "boolean", default: false },
  className: { kind: "string" },
  value: { kind: "other", doc: "{ library, name } | null" },
  defaultValue: { kind: "other", doc: "{ library, name } | null" },
  onChange: { kind: "function", doc: "(value) — the chosen icon, or null" },
});
