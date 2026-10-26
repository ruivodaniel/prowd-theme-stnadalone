import type * as React from "react";

import type { ElementProps } from "../../../../../types/elements";
import type { IconName } from "../icons";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

// ── Input-select-specific vocabulary ────────────────────────────────────────

/** Where the search box lives. Absent = no typing, the list is what it is. */
export const INPUT_SELECT_SEARCH = ["in-list", "as-input"] as const;
export type InputSelectSearch = (typeof INPUT_SELECT_SEARCH)[number];

/** One option. Rich enough for icon + description + groups; renderOption for anything else. */
export interface InputSelectOption {
  value: string;
  label: string;
  /** Second line under the label */
  description?: string;
  /** Leading icon */
  icon?: IconName;
  /** Extra terms the static filter matches on */
  keywords?: string[];
  disabled?: boolean;
  /** Cannot be deselected (multiple) */
  fixed?: boolean;
  /** Options with the same group render under one heading, groups are separated */
  group?: string;
}

export interface InputSelectRenderContext {
  selected: boolean;
}

/** The flat prop surface (schema and docs). Consumers get the typed union below. */
export interface InputSelectOwnProps extends ElementProps<"inputSelect"> {
  /** Many values as chips, or one */
  multiple?: boolean;
  /** One value (string | null) or many (string[]), by multiple */
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  /** Receives string | null, or string[] when multiple */
  onChange?: (value: never) => void;
  /** Static options; also the labels for values picked before */
  options?: InputSelectOption[];
  /** Where the search box lives; absent = no typing */
  search?: InputSelectSearch;
  /** Async search, debounced by delay; implies search */
  onSearch?: (query: string) => Promise<InputSelectOption[]>;
  /** Sync search, not debounced; implies search */
  onSearchSync?: (query: string) => InputSelectOption[];
  /** Debounce for onSearch in ms (default: 300) */
  delay?: number;
  /** Async mode: options shown before the user types */
  defaultOptions?: InputSelectOption[];
  /** Async mode: run the search on focus (default: false) */
  triggerSearchOnFocus?: boolean;
  /** Show a clear control when something is selected (default: true) */
  clearable?: boolean;
  /** Offer to create an option from the current query (default: false) */
  creatable?: boolean;
  /** Multiple: cap on selected values */
  maxSelected?: number;
  onMaxSelected?: (max: number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyIndicator?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
  /** Custom item body */
  renderOption?: (option: InputSelectOption, ctx: InputSelectRenderContext) => React.ReactNode;
  /** Custom trigger body for the selected value(s) */
  renderValue?: (selected: InputSelectOption[]) => React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Native form: hidden input(s) with this name */
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

type Shared = Omit<InputSelectOwnProps, "multiple" | "value" | "defaultValue" | "onChange"> &
  Omit<React.ComponentProps<"div">, keyof InputSelectOwnProps | AxisName | "onChange" | "defaultValue" | "value">;

export type InputSelectProps = Shared &
  (
    | { multiple?: false; value?: string | null; defaultValue?: string | null; onChange?: (value: string | null) => void }
    | { multiple: true; value?: string[]; defaultValue?: string[]; onChange?: (value: string[]) => void }
  );

export const inputSelectSchema = defineProps<InputSelectOwnProps>("InputSelect", {
  ...axesSchema("inputSelect"),
  multiple: { kind: "boolean", default: false, doc: "Many values as chips, or one" },
  value: { kind: "other", doc: "string | null, or string[] when multiple" },
  defaultValue: { kind: "other", doc: "Uncontrolled initial value" },
  onChange: { kind: "function", doc: "string | null, or string[] when multiple" },
  options: { kind: "other", doc: "InputSelectOption[]: value, label, description?, icon?, keywords?, disabled?, fixed?, group?" },
  search: { kind: "enum", values: INPUT_SELECT_SEARCH, doc: "Where the search box lives; absent = no typing" },
  onSearch: { kind: "function", doc: "Async search, debounced; implies search" },
  onSearchSync: { kind: "function", doc: "Sync search; implies search" },
  delay: { kind: "number", default: 300, doc: "Debounce for onSearch, ms" },
  defaultOptions: { kind: "other", doc: "Async: options before typing" },
  triggerSearchOnFocus: { kind: "boolean", default: false, doc: "Async: search on focus" },
  clearable: { kind: "boolean", default: true, doc: "Clear control when something is selected" },
  creatable: { kind: "boolean", default: false, doc: "Create an option from the query" },
  maxSelected: { kind: "number", doc: "Multiple: cap" },
  onMaxSelected: { kind: "function", doc: "Cap reached" },
  placeholder: { kind: "string", default: "Select…" },
  searchPlaceholder: { kind: "string", default: "Search…" },
  emptyIndicator: { kind: "node", doc: "Shown when the list is empty" },
  loadingIndicator: { kind: "node", doc: "Shown while searching" },
  renderOption: { kind: "function", doc: "Custom item body" },
  renderValue: { kind: "function", doc: "Custom trigger body" },
  open: { kind: "boolean", doc: "Controlled open state" },
  onOpenChange: { kind: "function" },
  name: { kind: "string", doc: "Native form: hidden input name" },
  required: { kind: "boolean", default: false },
  disabled: { kind: "boolean", default: false },
  className: { kind: "string" },
  id: { kind: "string" },
});
