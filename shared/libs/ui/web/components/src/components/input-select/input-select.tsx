/// <reference path="../../react-overrides.d.ts" />
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import { Chip } from "../chip";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../command";
import { Popover, PopoverAnchor, PopoverContent } from "../popover";
import type { InputSelectOption, InputSelectProps } from "./types";

// =============================================================================
// InputSelect — one field, two switches: multiple, search ("in-list" | "as-input")
// Trigger = field--select · surface = overlay--popover · list--menu · control--menu-item
// =============================================================================

const toArray = (v: string | string[] | null | undefined): string[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

const matches = (o: InputSelectOption, q: string) =>
  o.label.toLowerCase().includes(q) || (o.keywords ?? []).some((k) => k.toLowerCase().includes(q));

function InputSelect(props: InputSelectProps) {
  const {
    position,
    multiple = false,
    options,
    search,
    onSearch,
    onSearchSync,
    delay = 300,
    defaultOptions,
    triggerSearchOnFocus = false,
    clearable = true,
    creatable = false,
    maxSelected,
    onMaxSelected,
    placeholder = "Select…",
    searchPlaceholder = "Search…",
    emptyIndicator,
    loadingIndicator,
    renderOption,
    renderValue,
    open: openProp,
    onOpenChange,
    name,
    required,
    disabled = false,
    emphasis,
    status,
    state,
    scale = "md",
    concept,
    className,
    id,
    multiple: _multiple,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    ...rest
  } = props as InputSelectProps & { multiple?: boolean; value?: unknown; defaultValue?: unknown; onChange?: unknown };
  void _multiple; void _value; void _defaultValue; void _onChange;

  // ── value (one or many, controlled or not) ────────────────────────────────
  const isControlled = props.value !== undefined;
  const [internal, setInternal] = React.useState<string[]>(() => toArray(props.defaultValue));
  const selected = isControlled ? toArray(props.value) : internal;
  const commit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    if (props.multiple) props.onChange?.(next);
    else props.onChange?.(next[0] ?? null);
  };

  // ── open ──────────────────────────────────────────────────────────────────
  const [openInternal, setOpenInternal] = React.useState(false);
  const open = openProp ?? openInternal;
  const setOpen = (o: boolean) => {
    if (disabled && o) return;
    setOpenInternal(o);
    onOpenChange?.(o);
  };

  // ── options: what is displayed, what is known (labels for picked values) ──
  const searching = search !== undefined || !!onSearch || !!onSearchSync;
  const [query, setQuery] = React.useState("");
  const [displayed, setDisplayed] = React.useState<InputSelectOption[]>(options ?? defaultOptions ?? []);
  const [loading, setLoading] = React.useState(false);
  const known = React.useRef(new Map<string, InputSelectOption>());
  const remember = (list: InputSelectOption[]) => list.forEach((o) => known.current.set(o.value, o));
  remember(options ?? []);
  remember(defaultOptions ?? []);
  remember(displayed);

  React.useEffect(() => {
    if (!searching) { setDisplayed(options ?? []); return; }
    if (onSearchSync) { setDisplayed(onSearchSync(query)); return; }
    if (!onSearch) {
      const pool = options ?? defaultOptions ?? [];
      const q = query.trim().toLowerCase();
      setDisplayed(q === "" ? pool : pool.filter((o) => matches(o, q)));
      return;
    }
    if (query === "" && defaultOptions && !triggerSearchOnFocus) { setDisplayed(defaultOptions); return; }
    let active = true;
    setLoading(true);
    const h = setTimeout(async () => {
      const res = await onSearch(query);
      if (!active) return;
      setDisplayed(res);
      setLoading(false);
    }, delay);
    return () => { active = false; clearTimeout(h); };
  }, [query, searching, onSearch, onSearchSync, options, defaultOptions, delay, triggerSearchOnFocus]);

  const selectedOptions = selected.map((v) => known.current.get(v) ?? { value: v, label: v });

  // ── selection ─────────────────────────────────────────────────────────────
  const toggle = (opt: InputSelectOption) => {
    if (opt.disabled) return;
    known.current.set(opt.value, opt);
    const has = selected.includes(opt.value);
    if (multiple) {
      if (has) { if (!opt.fixed) commit(selected.filter((v) => v !== opt.value)); return; }
      if (maxSelected !== undefined && selected.length >= maxSelected) { onMaxSelected?.(maxSelected); return; }
      commit([...selected, opt.value]);
      setQuery("");
      return;
    }
    commit(has && clearable ? [] : [opt.value]);
    setQuery("");
    setOpen(false);
  };
  const remove = (opt: InputSelectOption) => { if (!opt.fixed) commit(selected.filter((v) => v !== opt.value)); };
  const clear = () => commit(selectedOptions.filter((o) => o.fixed).map((o) => o.value));

  const trimmed = query.trim();
  const canCreate = creatable && trimmed !== "" &&
    !displayed.some((o) => o.label.toLowerCase() === trimmed.toLowerCase()) &&
    !selectedOptions.some((o) => o.label.toLowerCase() === trimmed.toLowerCase());

  const groups = React.useMemo(() => {
    const map = new Map<string, InputSelectOption[]>();
    for (const o of displayed) {
      const key = o.group ?? "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(o);
    }
    return [...map.entries()];
  }, [displayed]);

  // ── trigger ───────────────────────────────────────────────────────────────
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const asInput = search === "as-input";
  const hasSelection = selected.length > 0;
  const themeAttrs: Record<string, string | undefined> = {
    element: "field--input-select",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };
  const singleLabel = !multiple && hasSelection ? selectedOptions[0].label : "";
  const inputValue = open ? query : singleLabel;

  const chips = multiple && hasSelection && (
    renderValue ? renderValue(selectedOptions) : selectedOptions.map((o) => (
      <Chip key={o.value} scale={scale} closable={!o.fixed && !disabled} onClose={(e) => { e.stopPropagation(); remove(o); }}>
        {o.label}
      </Chip>
    ))
  );

  const clearControl = clearable && hasSelection && !disabled && selectedOptions.some((o) => !o.fixed) && (
    <span role="button" aria-label="Clear" data-part="clear" className="inline-flex items-center" onClick={(e) => { e.stopPropagation(); clear(); }}>
      <Icon name="close" size="sm" />
    </span>
  );

  return (
    <CommandPrimitive shouldFilter={false} loop className={cn("contents", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            ref={triggerRef}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-required={required || undefined}
            aria-disabled={disabled || undefined}
            tabIndex={asInput || disabled ? -1 : 0}
            {...rest}
            {...themeAttrs}
            className={cn("flex items-center flex-wrap", positionClasses(position) ?? "w-full")}
            onClick={() => { if (disabled) return; if (asInput) inputRef.current?.focus(); setOpen(!open || asInput); }}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === "Escape") { setOpen(false); return; }
              if (!asInput && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") && !open) { e.preventDefault(); setOpen(true); }
            }}
          >
            {(chips || !asInput) && (
              <span data-part="value" className="flex flex-wrap items-center min-w-0">
                {chips}
                {!asInput && !multiple && (renderValue && hasSelection ? renderValue(selectedOptions) : <span className="truncate">{singleLabel || placeholder}</span>)}
                {!asInput && multiple && !hasSelection && <span data-part="placeholder">{placeholder}</span>}
              </span>
            )}
            {asInput && (
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                disabled={disabled}
                placeholder={hasSelection && multiple ? undefined : placeholder}
                onValueChange={(v) => { setQuery(v); if (!open) setOpen(true); }}
                onFocus={() => setOpen(true)}
                className="min-w-[4ch] flex-1"
              />
            )}
            <span data-part="indicators" className="ml-auto flex items-center">
              {clearControl}
              <Icon name="chevronsUpDown" size="sm" />
            </span>
            {name && selected.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          side="bottom"
          avoidCollisions={false}
          className="w-[var(--radix-popover-trigger-width)] p-0"
          onOpenAutoFocus={(e) => { if (asInput) e.preventDefault(); }}
          onInteractOutside={(e) => { if (triggerRef.current?.contains(e.target as Node)) e.preventDefault(); }}
        >
          {search === "in-list" && <CommandInput value={query} onValueChange={setQuery} placeholder={searchPlaceholder} />}
          <div element="list--menu" className="flex flex-col">
            <CommandList className="max-h-60">
              {loading && (
                <CommandGroup>
                  <CommandItem className="w-full" value="__loading__" disabled>
                    {loadingIndicator ?? <span element="type--body-small" emphasis="quiet">Loading…</span>}
                  </CommandItem>
                </CommandGroup>
              )}
              {!loading && displayed.length === 0 && !canCreate && <CommandEmpty>{emptyIndicator ?? "No options"}</CommandEmpty>}
              {groups.map(([group, items], gi) => (
                <React.Fragment key={group || "__ungrouped__"}>
                  {gi > 0 && <CommandSeparator />}
                  <CommandGroup heading={group || undefined}>
                    {items.map((o) => {
                      const isSelected = selected.includes(o.value);
                      return (
                        <CommandItem
                          key={o.value}
                          value={o.value}
                          disabled={o.disabled}
                          className="w-full"
                          {...(isSelected && { state: "selected" })}
                          onSelect={() => toggle(o)}
                        >
                          {renderOption ? renderOption(o, { selected: isSelected }) : (
                            <>
                              {o.icon && <Icon name={o.icon} size="sm" />}
                              <span data-part="label" className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate">{o.label}</span>
                                {o.description && <span element="type--body-extra-small" emphasis="quiet">{o.description}</span>}
                              </span>
                              {isSelected && <Icon name="check" size="sm" />}
                            </>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </React.Fragment>
              ))}
              {canCreate && (
                <CommandGroup>
                  <CommandItem className="w-full" value={`__create__:${trimmed}`} onSelect={() => toggle({ value: trimmed, label: trimmed })}>
                    <Icon name="add" size="sm" />
                    <span>Create “{trimmed}”</span>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </div>
        </PopoverContent>
      </Popover>
    </CommandPrimitive>
  );
}

export { InputSelect };
