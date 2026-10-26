// Colour arithmetic the picker needs: hex ↔ hsv, and a reading of what the browser says a CSS colour is.

export type Hsv = { h: number; s: number; v: number };

export const isHex = (s: string) => /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s.trim());
export const normalizeHex = (s: string): string | null => {
  const t = s.trim().replace(/^#?/, "#").toLowerCase();
  if (!isHex(t)) return null;
  return t.length === 4 ? "#" + [...t.slice(1)].map((c) => c + c).join("") : t.slice(0, 7);
};

export function hexToHsv(hex: string): Hsv {
  const n = normalizeHex(hex) ?? "#000000";
  const r = parseInt(n.slice(1, 3), 16) / 255, g = parseInt(n.slice(3, 5), 16) / 255, b = parseInt(n.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) { h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h = Math.round(h * 60); if (h < 0) h += 360; }
  return { h, s: max ? d / max : 0, v: max };
}

export function hsvToHex({ h, s, v }: Hsv): string {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  const to = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** any CSS colour (a token's oklch, a var(), a name) as the browser resolves it on this page: a hex, or null when it cannot */
export function resolveToHex(css: string): string | null {
  const direct = normalizeHex(css); if (direct) return direct;
  if (typeof document === "undefined") return null;
  const el = document.createElement("span"); el.style.color = css; document.body.appendChild(el);
  const rgb = getComputedStyle(el).color; el.remove();
  const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb); if (!m) return null;
  return "#" + [m[1], m[2], m[3]].map((x) => Number(x).toString(16).padStart(2, "0")).join("");
}
