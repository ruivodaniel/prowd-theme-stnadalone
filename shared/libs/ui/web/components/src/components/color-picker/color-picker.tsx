import * as React from "react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import { Icon } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { hexToHsv, hsvToHex, normalizeHex, resolveToHex, type Hsv } from "./color";
import { themePalettes } from "./theme-palettes";
import type { ColorPalette, ColorPickerProps } from "./types";

// =============================================================================
// ColorPicker — a field that holds one colour, or a combination of colours, and the ways to change it:
//   picker      free choice: a saturation/value square, a hue slider, a hex field
//   eyedropper  a colour of the page's pixels (the browser's EyeDropper, where it exists)
//   palettes    named sets of colours to choose from: the active theme's tokens, or the consumer's own
// Each way is on or off by a prop; the value and the change event keep one shape: a CSS colour, or a list of them when `multiple`.
// =============================================================================

type Value = string | string[] | null;
const asList = (v: Value): string[] => (Array.isArray(v) ? v : v ? [v] : []);
const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

/** the swatch's structural size per scale (the theme colours it; the box is the component's) */
const SWATCH: Record<string, string> = { "3xs": "size-3", "2xs": "size-3.5", xs: "size-4", sm: "size-5", md: "size-6", lg: "size-7", xl: "size-8", "2xl": "size-9", "3xl": "size-10" };
/** one colour to choose: in a palette, or among the chosen ones */
function Swatch({ color, name, selected, disabled, scale, onClick, onRemove }: { color: string; name?: string; selected?: boolean; disabled?: boolean; scale?: string; onClick?: () => void; onRemove?: () => void }) {
  return (
    <button
      type="button"
      element="control--swatch"
      {...axisAttrs({ scale: scale as never, state: disabled ? "disabled" : selected ? "selected" : undefined })}
      title={name ?? color}
      aria-label={name ?? color}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn("relative shrink-0 overflow-hidden rounded-sm", SWATCH[scale ?? "md"] ?? SWATCH.md)}
    >
      <span data-part="color" className="absolute inset-0" style={{ background: color }} />
      {onRemove && (
        <span data-part="remove" role="button" aria-label="remove" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
          <Icon name="close" size="xs" />
        </span>
      )}
    </button>
  );
}

/** the free picker: a saturation/value square, a hue slider, a hex field — and the eyedropper when asked and offered */
function FreePicker({ color, onPick, eyedropper }: { color: string | null; onPick: (hex: string) => void; eyedropper: boolean }) {
  const [hsv, setHsv] = React.useState<Hsv>(() => hexToHsv(color ?? "#808080"));
  const [hex, setHex] = React.useState<string>(() => color ?? "#808080");
  React.useEffect(() => { if (color) { const h = resolveToHex(color); if (h) { setHsv(hexToHsv(h)); setHex(h); } } }, [color]);
  const commit = (next: Hsv) => { setHsv(next); const h = hsvToHex(next); setHex(h); onPick(h); };
  const square = React.useRef<HTMLDivElement>(null);
  const drag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = square.current; if (!el) return;
    const move = (ev: PointerEvent) => { const r = el.getBoundingClientRect(); const s = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)), v = 1 - Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)); commit({ ...hsv, s, v }); };
    move(e.nativeEvent); el.setPointerCapture(e.pointerId);
    const up = () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); };
    el.addEventListener("pointermove", move); el.addEventListener("pointerup", up);
  };
  const dropper = typeof window !== "undefined" && "EyeDropper" in window;
  const pickFromPage = async () => {
    try { const r = await new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper().open(); commit(hexToHsv(r.sRGBHex)); } catch { /* dismissed */ }
  };
  return (
    <div data-part="picker" className="flex flex-col gap-2" style={{ width: 220 }}>
      <div ref={square} data-part="square" onPointerDown={drag} className="relative w-full cursor-crosshair select-none touch-none" style={{ height: 140, background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hsvToHex({ h: hsv.h, s: 1, v: 1 })})` }}>
        <span data-part="thumb" className="absolute pointer-events-none size-3 rounded-full border-2 border-white shadow" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, transform: "translate(-50%, -50%)" }} />
      </div>
      <input data-part="hue" type="range" min={0} max={360} value={hsv.h} aria-label="hue" onChange={(e) => commit({ ...hsv, h: Number(e.target.value) })} className="w-full h-3 rounded-full appearance-none"
        style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }} />
      <div className="flex items-center gap-2">
        <span data-part="preview" className="shrink-0 size-6 rounded-sm" style={{ background: hex }} />
        <input data-part="hex" element="field--input" scale="sm" value={hex} aria-label="hex" onChange={(e) => { setHex(e.target.value); const n = normalizeHex(e.target.value); if (n) { setHsv(hexToHsv(n)); onPick(n); } }} className="min-w-0 flex-1" spellCheck={false} />
        {eyedropper && dropper && (
          <button type="button" data-part="eyedropper" aria-label="pick a colour from the page" title="pick a colour from the page" onClick={() => void pickFromPage()} className="shrink-0"><Icon name="palette" size="sm" /></button>
        )}
      </div>
    </div>
  );
}

function Palettes({ palettes, chosen, onToggle, disabled, scale }: { palettes: ColorPalette[]; chosen: string[]; onToggle: (c: string) => void; disabled?: (c: string) => boolean; scale?: string }) {
  if (!palettes.length) return <p element="type--body-extra-small" emphasis="quiet">no palette</p>;
  return (
    <div data-part="palettes" className="flex flex-col gap-3" style={{ maxWidth: 260 }}>
      {palettes.map((p) => (
        <div key={p.id} data-part="palette" className="flex flex-col gap-1">
          <p element="type--body-extra-small" emphasis="quiet">{p.name}</p>
          <div className="flex flex-wrap gap-1">
            {p.colors.map((c) => <Swatch key={c.value} color={c.value} name={c.name} scale={scale} selected={chosen.some((x) => same(x, c.value))} disabled={disabled?.(c.value)} onClick={() => onToggle(c.value)} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ColorPicker(props: ColorPickerProps) {
  const {
    position, emphasis, status, state, concept, scale = "md", className,
    multiple = false, max, picker = true, eyedropper = false, palettes = "theme", placeholder = "Pick a colour", disabled = false,
    value, defaultValue, onChange, ...rest
  } = props as ColorPickerProps & { value?: Value; defaultValue?: Value; onChange?: (v: never) => void };
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<Value>(defaultValue ?? (multiple ? [] : null));
  const chosen = asList(isControlled ? (value as Value) : internal);
  const commit = (next: string[]) => { const v: Value = multiple ? next : next[0] ?? null; if (!isControlled) setInternal(v); onChange?.(v as never); };
  const toggle = (c: string) => {
    if (!multiple) return commit([c]);
    const has = chosen.some((x) => same(x, c));
    if (has) return commit(chosen.filter((x) => !same(x, c)));
    if (max !== undefined && chosen.length >= max) return;
    commit([...chosen, c]);
  };
  const [open, setOpen] = React.useState(false);
  const [sets, setSets] = React.useState<ColorPalette[]>(() => (Array.isArray(palettes) ? palettes : []));
  React.useEffect(() => { if (palettes === "theme") setSets(themePalettes()); else setSets(Array.isArray(palettes) ? palettes : []); }, [palettes, open]);
  const hasPalettes = palettes !== false;
  const themeAttrs = { element: "field--color-picker", ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }) };
  const full = multiple && max !== undefined && chosen.length >= max;
  const label = chosen.length === 0 ? placeholder : multiple ? `${chosen.length} colour${chosen.length === 1 ? "" : "s"}` : chosen[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" {...themeAttrs} disabled={disabled} className={cn("inline-flex items-center gap-2 disabled:pointer-events-none disabled:cursor-not-allowed", className, positionClasses(position))} {...(rest as object)}>
          <span data-part="chosen" className="flex items-center gap-1">
            {chosen.length === 0
              ? <span data-part="empty" className="shrink-0 size-4 rounded-sm border border-dashed border-current opacity-50" />
              : chosen.map((c) => <Swatch key={c} color={c} scale="xs" selected={false} onRemove={multiple ? () => commit(chosen.filter((x) => !same(x, c))) : undefined} />)}
          </span>
          <span data-part="label" className="min-w-0 flex-1 truncate text-left">{label}</span>
          <Icon name="chevronDown" size="xs" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start">
        {picker && hasPalettes ? (
          <Tabs defaultValue="palette">
            <TabsList>
              <TabsTrigger value="palette">palette</TabsTrigger>
              <TabsTrigger value="picker">picker</TabsTrigger>
            </TabsList>
            <TabsContent value="palette"><Palettes palettes={sets} chosen={chosen} onToggle={toggle} disabled={(c) => full && !chosen.some((x) => same(x, c))} scale={scale} /></TabsContent>
            <TabsContent value="picker"><FreePicker color={chosen[chosen.length - 1] ?? null} onPick={(hex) => (multiple ? (chosen.length && !full ? commit([...chosen.slice(0, -1), hex]) : toggle(hex)) : commit([hex]))} eyedropper={eyedropper} /></TabsContent>
          </Tabs>
        ) : picker ? (
          <FreePicker color={chosen[chosen.length - 1] ?? null} onPick={(hex) => (multiple ? (chosen.length && !full ? commit([...chosen.slice(0, -1), hex]) : toggle(hex)) : commit([hex]))} eyedropper={eyedropper} />
        ) : (
          <Palettes palettes={sets} chosen={chosen} onToggle={toggle} disabled={(c) => full && !chosen.some((x) => same(x, c))} scale={scale} />
        )}
      </PopoverContent>
    </Popover>
  );
}

export { ColorPicker, Swatch };
