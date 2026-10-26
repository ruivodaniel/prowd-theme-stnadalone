import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

// =============================================================================
// Constants — aligned with markup dictionary
// =============================================================================

const COMBOBOX_SCALES = ["xs", "sm", "md", "lg", "xl"] as const;
const COMBOBOX_STATUS = ["neutral", "info", "success", "warning", "error", "destructive"] as const;

export type ComboboxScale = typeof COMBOBOX_SCALES[number];
export type ComboboxStatus = typeof COMBOBOX_STATUS[number];

const toTypeString = (arr: readonly string[]) => arr.map((v) => `"${v}"`).join(" | ");

// =============================================================================
// Types
// =============================================================================

export interface ComboboxOption {
  value: string;
  label: string;
  disable?: boolean;
  group?: string;
  [key: string]: string | boolean | undefined;
}

export interface ComboboxProps {
  /** Controlled selected value */
  value?: string | null;
  /** Uncontrolled default */
  defaultValue?: string | null;
  /** Static options list */
  options?: ComboboxOption[];

  onChange?: (value: string | null) => void;

  /** Async search — debounced by `delay` */
  onSearch?: (query: string) => Promise<ComboboxOption[]>;
  /** Sync search — no loading indicator */
  onSearchSync?: (query: string) => ComboboxOption[];

  /** Debounce ms (default: 300) */
  delay?: number;

  /** Group options by this ComboboxOption[key] */
  groupBy?: string;

  /** Allow clearing the selection */
  clearable?: boolean;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyIndicator?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
  disabled?: boolean;

  scale?: ComboboxScale;
  status?: ComboboxStatus;

  className?: string;
}

// =============================================================================
// Component
// =============================================================================

/** @deprecated Use InputSelect with search="as-input". Kept until the app has migrated. */
function Combobox({
  value,
  defaultValue = null,
  options,
  onChange,
  onSearch,
  onSearchSync,
  delay = 300,
  groupBy,
  clearable = true,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyIndicator,
  loadingIndicator,
  disabled,
  scale = "md",
  status,
  className,
}: ComboboxProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string | null>(defaultValue);
  const current = isControlled ? (value as string | null) : internal;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [displayed, setDisplayed] = React.useState<ComboboxOption[]>(options ?? []);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (onSearchSync) {
      setDisplayed(onSearchSync(query));
      return;
    }
    if (!onSearch) {
      const pool = options ?? [];
      const q = query.trim().toLowerCase();
      setDisplayed(q === "" ? pool : pool.filter((o) => o.label.toLowerCase().includes(q)));
      return;
    }
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
  }, [query, onSearch, onSearchSync, options, delay]);

  const commit = (next: string | null) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const selectedOption = React.useMemo(
    () =>
      current == null
        ? null
        : (options?.find((o) => o.value === current) ??
            displayed.find((o) => o.value === current) ??
            null),
    [current, options, displayed],
  );

  const groups = React.useMemo(() => {
    if (!groupBy) return { "": displayed };
    const map: Record<string, ComboboxOption[]> = {};
    for (const o of displayed) {
      const key = (o[groupBy] as string) ?? "";
      (map[key] ??= []).push(o);
    }
    return map;
  }, [displayed, groupBy]);

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--combobox",
    scale,
    ...(status && { status }),
    ...(disabled && { state: "disabled" }),
  };

  return (
    <Popover open={open} onOpenChange={disabled ? () => {} : setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          {...themeAttrs}
          className={cn(
            "flex w-full items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed",
            className,
          )}
        >
          <span data-part="value" className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span data-part="indicators" className="flex items-center">
            {clearable && current != null && !disabled && (
              <span
                role="button"
                aria-label="Clear"
                onClick={(e) => {
                  e.stopPropagation();
                  commit(null);
                }}
                className="inline-flex items-center"
              >
                <X className="size-4" />
              </span>
            )}
            <ChevronsUpDown className="size-4" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        avoidCollisions={false}
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command concept="combobox-dropdown" shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={searchPlaceholder}
          />
          <CommandList className="max-h-60 overflow-y-auto">
            {loading && (
              <div role="status" className="flex items-center justify-center px-2 py-4">
                {loadingIndicator ?? (
                  <span element="type--body-small" emphasis="quiet">Loading…</span>
                )}
              </div>
            )}
            {!loading && displayed.length === 0 && (
              <CommandEmpty>{emptyIndicator ?? "No options"}</CommandEmpty>
            )}
            {Object.entries(groups).map(([group, items]) => (
              <CommandGroup key={group || "__ungrouped__"} heading={group || undefined}>
                {items.map((opt) => {
                  const isSelected = current === opt.value;
                  return (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disable}
                      data-state={isSelected ? "selected" : undefined}
                      onSelect={() => {
                        commit(isSelected && clearable ? null : opt.value);
                        setOpen(false);
                      }}
                    >
                      {isSelected && <Check className="size-4" />}
                      {opt.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

(Combobox as { propsSchema?: unknown }).propsSchema = {
  componentName: "Combobox",
  interfaceName: "ComboboxProps",
  props: [
    {
      name: "scale",
      type: "union",
      required: false,
      defaultValue: "md",
      unionValues: COMBOBOX_SCALES,
      typeString: toTypeString(COMBOBOX_SCALES),
      description: "Structural size",
    },
    {
      name: "status",
      type: "union",
      required: false,
      defaultValue: undefined,
      unionValues: COMBOBOX_STATUS,
      typeString: toTypeString(COMBOBOX_STATUS),
      description: "Semantic condition",
    },
    {
      name: "clearable",
      type: "boolean",
      required: false,
      defaultValue: true,
      typeString: "boolean",
      description: "Show an X to clear the selection",
    },
    {
      name: "groupBy",
      type: "string",
      required: false,
      defaultValue: undefined,
      typeString: "string",
      description: "Group options by this ComboboxOption[key]",
    },
  ],
};

export { Combobox };
