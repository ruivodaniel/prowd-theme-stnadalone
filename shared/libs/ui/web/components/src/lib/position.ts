import type { Position } from "../../../../types/axes";

// position → the structural classes behind it. One value, one fixed set; the theme never reads `position`.
// The enum is types/axes.ts POSITION; this table is kept in step with it by the type below (a missing key is a compile error).
const CLASSES: Record<Position, string> = {
  fill: "flex-1 min-w-0 min-h-0",
  hug: "flex-none",
  start: "self-start",
  center: "self-center",
  end: "self-end",
  stretch: "self-stretch",
  clip: "min-w-0 truncate",
  "w-xs": "w-40", "w-sm": "w-48", "w-md": "w-60", "w-lg": "w-72", "w-xl": "w-96",
  "cols-2": "grid grid-cols-2", "cols-3": "grid grid-cols-3", "cols-4": "grid grid-cols-4", "cols-6": "grid grid-cols-6", "cols-12": "grid grid-cols-12",
  "span-2": "col-span-2", "span-3": "col-span-3", "span-4": "col-span-4", "span-5": "col-span-5", "span-6": "col-span-6",
  "span-7": "col-span-7", "span-8": "col-span-8", "span-9": "col-span-9", "span-10": "col-span-10", "span-11": "col-span-11", "span-12": "col-span-12",
};
const KNOWN = new Set<string>(Object.keys(CLASSES));
/** the classes for a `position` attribute ("fill", or several: "fill center"); an unknown word is ignored and reported in dev */
export function positionClasses(position?: string): string | undefined {
  if (!position) return undefined;
  const out: string[] = [];
  for (const w of position.split(/\s+/).filter(Boolean)) {
    if (KNOWN.has(w)) out.push(CLASSES[w as Position]);
    else if (process.env.NODE_ENV !== "production") console.warn(`position: "${w}" is not a position value (${[...KNOWN].join(", ")})`);
  }
  return out.length ? out.join(" ") : undefined;
}
