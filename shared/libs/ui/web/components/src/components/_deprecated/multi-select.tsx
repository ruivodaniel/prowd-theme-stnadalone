import * as React from "react";
import { X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../../lib/utils";
import { Chip } from "../chip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

// =============================================================================
// Constants — aligned with markup dictionary
// =============================================================================

const MULTI_SELECT_SCALES = ["xs", "sm", "md", "lg", "xl"] as const;
const MULTI_SELECT_STATUS = ["neutral", "info", "success", "warning", "error", "destructive"] as const;

export type MultiSelectScale = typeof MULTI_SELECT_SCALES[number];
export type MultiSelectStatus = typeof MULTI_SELECT_STATUS[number];

const toTypeString = (arr: readonly string[]) => arr.map((v) => `"${v}"`).join(" | ");

// =============================================================================
// Types
// =============================================================================

export interface MultiSelectOption {
  value: string;
  label: string;
  disable?: boolean;
  /** Cannot be deselected when true */
  fixed?: boolean;
  /** Key to group options under when `groupBy` is used */
  group?: string;
  [key: string]: string | boolean | undefined;
}

export interface MultiSelectProps {
  /** Controlled selected values */
  value?: MultiSelectOption[];
  /** Uncontrolled default selected values */
  defaultValue?: MultiSelectOption[];
  /** Static options (ignored if `onSearch` / `onSearchSync` are provided) */
  options?: MultiSelectOption[];
  /** Options shown before the user types (async mode) */
  defaultOptions?: MultiSelectOption[];

  onChange?: (value: MultiSelectOption[]) => void;

  /** Async search. Debounced by `delay`. */
  onSearch?: (query: string) => Promise<MultiSelectOption[]>;
  /** Sync search. Not debounced, no loading indicator. */
  onSearchSync?: (query: string) => MultiSelectOption[];

  /** Debounce ms for `onSearch` (default: 500) */
  delay?: number;
  /** Trigger search on focus (default: false) */
  triggerSearchOnFocus?: boolean;

  /** Limit selected count */
  maxSelected?: number;
  onMaxSelected?: (maxLimit: number) => void;

  /** Group options by this MultiSelectOption[key] */
  groupBy?: string;

  /** Allow creating new options from the current query */
  creatable?: boolean;

  /** Hide placeholder when any value is selected */
  hidePlaceholderWhenSelected?: boolean;
  placeholder?: string;
  disabled?: boolean;

  /** Custom indicators */
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;

  /** Hide the clear-all X when there are selections */
  hideClearAllButton?: boolean;

  scale?: MultiSelectScale;
  status?: MultiSelectStatus;

  className?: string;
  inputClassName?: string;
}

// =============================================================================
// Component
// =============================================================================

/** @deprecated Use InputSelect with multiple and search="as-input". Kept until the app has migrated. */
function MultiSelect({
  value,
  defaultValue,
  options,
  defaultOptions,
  onChange,
  onSearch,
  onSearchSync,
  delay = 500,
  triggerSearchOnFocus = false,
  maxSelected,
  onMaxSelected,
  groupBy,
  creatable,
  hidePlaceholderWhenSelected,
  placeholder = "Select…",
  disabled,
  loadingIndicator,
  emptyIndicator,
  hideClearAllButton,
  scale = "md",
  status,
  className,
  inputClassName,
}: MultiSelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<MultiSelectOption[]>(defaultValue ?? []);
  const selected = isControlled ? (value as MultiSelectOption[]) : internal;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [displayed, setDisplayed] = React.useState<MultiSelectOption[]>(
    defaultOptions ?? options ?? [],
  );
  const [loading, setLoading] = React.useState(false);

  // --- Selection helpers ---

  const selectedValues = React.useMemo(
    () => new Set(selected.map((s) => s.value)),
    [selected],
  );

  const commit = React.useCallback(
    (next: MultiSelectOption[]) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const toggleOption = React.useCallback(
    (opt: MultiSelectOption) => {
      if (opt.disable) return;
      const has = selectedValues.has(opt.value);
      if (has) {
        if (opt.fixed) return;
        commit(selected.filter((s) => s.value !== opt.value));
        return;
      }
      if (maxSelected !== undefined && selected.length >= maxSelected) {
        onMaxSelected?.(maxSelected);
        return;
      }
      commit([...selected, opt]);
    },
    [selectedValues, selected, commit, maxSelected, onMaxSelected],
  );

  const removeOption = (opt: MultiSelectOption) => {
    if (opt.fixed) return;
    commit(selected.filter((s) => s.value !== opt.value));
  };

  const clearAll = () => {
    const next = selected.filter((s) => s.fixed);
    commit(next);
  };

  // --- Search ---

  React.useEffect(() => {
    if (onSearchSync) {
      setDisplayed(onSearchSync(query));
      return;
    }
    if (!onSearch) {
      // Static-mode filter
      const pool = options ?? defaultOptions ?? [];
      const q = query.trim().toLowerCase();
      setDisplayed(
        q === ""
          ? pool
          : pool.filter((o) => o.label.toLowerCase().includes(q)),
      );
      return;
    }
    // Async search: debounce
    let active = true;
    setLoading(true);
    const h = setTimeout(async () => {
      const res = await onSearch(query);
      if (!active) return;
      setDisplayed(res);
      setLoading(false);
    }, delay);
    return () => {
      active = false;
      clearTimeout(h);
    };
  }, [query, onSearch, onSearchSync, options, defaultOptions, delay]);

  // --- Creatable ---

  const canCreate =
    !!creatable &&
    query.trim() !== "" &&
    !displayed.some((o) => o.label === query) &&
    !selected.some((o) => o.label === query);

  const createOption = () => {
    const opt: MultiSelectOption = { value: query, label: query };
    toggleOption(opt);
    setQuery("");
  };

  // --- Grouping ---

  const groups = React.useMemo(() => {
    if (!groupBy) return { "": displayed };
    const map: Record<string, MultiSelectOption[]> = {};
    for (const o of displayed) {
      const key = (o[groupBy] as string) ?? "";
      (map[key] ??= []).push(o);
    }
    return map;
  }, [displayed, groupBy]);

  // --- Render ---

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--multi-select",
    scale,
    ...(status && { status }),
    ...(disabled && { state: "disabled" }),
  };

  return (
    <Popover open={open} onOpenChange={disabled ? () => {} : setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          {...themeAttrs}
          className={cn(
            "flex w-full flex-wrap items-center",
            disabled && "pointer-events-none",
            className,
          )}
        >
          {selected.map((s) => (
            <Chip key={s.value} data-part="chip">
              {s.label}
              {!s.fixed && (
                <button
                  type="button"
                  aria-label={`Remove ${s.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(s);
                  }}
                  className="inline-flex items-center"
                >
                  <X className="size-3" />
                </button>
              )}
            </Chip>
          ))}
          <CommandPrimitive.Input
            data-part="control"
            value={query}
            onValueChange={setQuery}
            onFocus={() => {
              if (triggerSearchOnFocus) setQuery(query);
              setOpen(true);
            }}
            placeholder={
              hidePlaceholderWhenSelected && selected.length > 0
                ? ""
                : placeholder
            }
            disabled={disabled}
            className={cn(
              "min-w-[4rem] flex-1 bg-transparent outline-hidden",
              inputClassName,
            )}
          />
          {!hideClearAllButton && selected.some((s) => !s.fixed) && (
            <button
              type="button"
              aria-label="Clear all"
              data-part="clear"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="inline-flex items-center"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={!onSearch && !onSearchSync}>
          <CommandList>
            {loading && (
              <div role="status" className="flex items-center justify-center px-2 py-4">
                {loadingIndicator ?? (
                  <span element="type--body-small" emphasis="quiet">Loading…</span>
                )}
              </div>
            )}
            {!loading && displayed.length === 0 && !canCreate && (
              <CommandEmpty>
                {emptyIndicator ?? "No options"}
              </CommandEmpty>
            )}
            {Object.entries(groups).map(([group, items]) => (
              <CommandGroup key={group || "__ungrouped__"} heading={group || undefined}>
                {items.map((opt) => {
                  const isSelected = selectedValues.has(opt.value);
                  return (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disable}
                      data-state={isSelected ? "selected" : undefined}
                      onSelect={() => toggleOption(opt)}
                    >
                      {opt.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
            {canCreate && (
              <CommandGroup>
                <CommandItem value={query} onSelect={createOption}>
                  Create "{query}"
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

(MultiSelect as { propsSchema?: unknown }).propsSchema = {
  componentName: "MultiSelect",
  interfaceName: "MultiSelectProps",
  props: [
    {
      name: "scale",
      type: "union",
      required: false,
      defaultValue: "md",
      unionValues: MULTI_SELECT_SCALES,
      typeString: toTypeString(MULTI_SELECT_SCALES),
      description: "Structural size",
    },
    {
      name: "status",
      type: "union",
      required: false,
      defaultValue: undefined,
      unionValues: MULTI_SELECT_STATUS,
      typeString: toTypeString(MULTI_SELECT_STATUS),
      description: "Semantic condition (validation state)",
    },
    {
      name: "maxSelected",
      type: "number",
      required: false,
      defaultValue: undefined,
      typeString: "number",
      description: "Limit selected count",
    },
    {
      name: "creatable",
      type: "boolean",
      required: false,
      defaultValue: false,
      typeString: "boolean",
      description: "Allow creating options on the fly",
    },
    {
      name: "groupBy",
      type: "string",
      required: false,
      defaultValue: undefined,
      typeString: "string",
      description: "Group options by this MultiSelectOption[key]",
    },
  ],
};

export { MultiSelect };
