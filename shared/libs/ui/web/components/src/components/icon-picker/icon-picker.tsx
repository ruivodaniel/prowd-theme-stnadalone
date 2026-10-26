import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon, iconRegistry, type IconName } from "../icons";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import type { IconLibrary, IconOption, IconPickerProps, IconRef } from "./types";

// =============================================================================
// IconPicker — a field that holds one icon of one library and the way to change it: the libraries offered, each with the icons it offers,
// a search over their names and keywords. The component library's own registry is the default library; a consumer brings others.
// =============================================================================

/** the component library's registry as icons to offer: all of them, or the names given */
export function libraryIcons(names?: readonly IconName[]): IconOption[] {
  const all = Object.keys(iconRegistry) as IconName[];
  return (names ?? all).filter((n) => n in iconRegistry).map((name) => ({ name, render: ({ size, className }) => <Icon name={name} size={sizeOf(size)} className={className} /> }));
}
const sizeOf = (px?: number) => (px === undefined ? "md" : px <= 12 ? "xs" : px <= 16 ? "sm" : px <= 22 ? "md" : px <= 28 ? "lg" : "xl");
/** the default library: the component library's registry, whole */
export const LIBRARY_ICONS: IconLibrary = { id: "library", name: "library", icons: libraryIcons() };
/** the tile's structural size per scale (the theme colours it; the box is the component's) */
const TILE: Record<string, string> = { "3xs": "size-7", "2xs": "size-8", xs: "size-9", sm: "size-10", md: "size-11", lg: "size-12", xl: "size-14", "2xl": "size-16", "3xl": "size-20" };
/** the icon inside a tile, per scale: large enough to read */
const GLYPH: Record<string, number> = { "3xs": 14, "2xs": 16, xs: 18, sm: 20, md: 22, lg: 26, xl: 30, "2xl": 34, "3xl": 40 };

/** one icon to choose */
function IconTile({ icon, selected, scale, onClick }: { icon: IconOption; selected?: boolean; scale?: string; onClick: () => void }) {
  return (
    <button type="button" element="control--icon-tile" {...axisAttrs({ scale: scale as never, state: selected ? "selected" : undefined })} title={icon.name} aria-label={icon.name} aria-pressed={selected} onClick={onClick}
      className={cn("inline-flex items-center justify-center shrink-0 rounded-sm", TILE[scale ?? "md"] ?? TILE.md)}>
      {icon.render({ size: GLYPH[scale ?? "md"] ?? GLYPH.md })}
    </button>
  );
}

function Grid({ library, chosen, query, onPick, scale }: { library: IconLibrary; chosen: IconRef | null; query: string; onPick: (r: IconRef) => void; scale?: string }) {
  const q = query.trim().toLowerCase();
  const icons = q ? library.icons.filter((i) => i.name.toLowerCase().includes(q) || i.keywords?.some((k) => k.toLowerCase().includes(q))) : library.icons;
  if (!icons.length) return <p element="type--body-extra-small" emphasis="quiet">no icon</p>;
  return (
    <div data-part="grid" className="flex flex-wrap gap-1.5 overflow-y-auto" style={{ maxHeight: 300 }}>
      {icons.map((i) => <IconTile key={i.name} icon={i} scale={scale} selected={chosen?.library === library.id && chosen.name === i.name} onClick={() => onPick({ library: library.id, name: i.name })} />)}
    </div>
  );
}

function IconPicker(props: IconPickerProps) {
  const {
    position, emphasis, status, state, concept, scale = "md", className,
    libraries, search = true, placeholder = "Pick an icon", disabled = false, value, defaultValue, onChange, ...rest
  } = props;
  const libs = libraries?.length ? libraries : [LIBRARY_ICONS];
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<IconRef | null>(defaultValue ?? null);
  const chosen = isControlled ? (value ?? null) : internal;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const commit = (next: IconRef | null) => { if (!isControlled) setInternal(next); onChange?.(next); setOpen(false); };
  const chosenIcon = chosen ? libs.find((l) => l.id === chosen.library)?.icons.find((i) => i.name === chosen.name) : undefined;
  const themeAttrs = { element: "field--icon-picker", ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }) };
  const body = (
    <div data-part="picker" className="flex flex-col gap-2" style={{ width: 360 }}>
      {search && <Input element="field--input" scale="sm" data-part="search" placeholder="search" value={query} onChange={setQuery} type="search" showClear />}
      {libs.length > 1 ? (
        <Tabs defaultValue={chosen?.library ?? libs[0].id}>
          <TabsList>{libs.map((l) => <TabsTrigger key={l.id} value={l.id}>{l.name}</TabsTrigger>)}</TabsList>
          {libs.map((l) => <TabsContent key={l.id} value={l.id}><Grid library={l} chosen={chosen} query={query} onPick={commit} scale={scale} /></TabsContent>)}
        </Tabs>
      ) : <Grid library={libs[0]} chosen={chosen} query={query} onPick={commit} scale={scale} />}
    </div>
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" {...themeAttrs} disabled={disabled} className={cn("inline-flex items-center gap-2 disabled:pointer-events-none disabled:cursor-not-allowed", className, positionClasses(position))} {...(rest as object)}>
          <span data-part="chosen" className="inline-flex items-center shrink-0">{chosenIcon ? chosenIcon.render({ size: 20 }) : <span data-part="empty" className="size-4 rounded-sm border border-dashed border-current opacity-50" />}</span>
          <span data-part="label" className="min-w-0 flex-1 truncate text-left">{chosen ? (libs.length > 1 ? `${chosen.library} · ${chosen.name}` : chosen.name) : placeholder}</span>
          <Icon name="chevronDown" size="xs" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start">{body}</PopoverContent>
    </Popover>
  );
}

export { IconPicker, IconTile };
