// The active theme's colours as palettes: the custom properties the page's stylesheets declare on :root, grouped as the theme authors them
// (main, brand, status, flat, semantic). Read at runtime: the palettes follow whatever theme is active, no list kept by hand.
import type { ColorPalette } from "./types";

const GROUPS: { id: string; name: string; re: RegExp }[] = [
  { id: "main", name: "main", re: /^--color-main-/ },
  { id: "brand", name: "brand", re: /^--color-brand-\d+$/ },
  { id: "status", name: "status", re: /^--color-status-(success|info|warning|error)$/ },
  { id: "flat", name: "flat", re: /^--color-flat-/ },
  { id: "semantic", name: "semantic", re: /^--color-(primary|secondary|accent|muted|destructive|success|background|foreground|border|input|ring)(-foreground)?$/ },
];

export function themePalettes(): ColorPalette[] {
  if (typeof document === "undefined") return [];
  const vars = new Map<string, string>();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList; try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      const sel = rule.selectorText; if (!(sel === ":root" || sel === "html" || sel.startsWith(":root,") || sel.startsWith(":root ,"))) continue;
      for (let i = 0; i < rule.style.length; i++) { const p = rule.style[i]; if (p.startsWith("--color-")) vars.set(p, rule.style.getPropertyValue(p).trim()); }
    }
  }
  return GROUPS.map((g) => ({ id: g.id, name: g.name, colors: [...vars.keys()].filter((k) => g.re.test(k)).map((k) => ({ value: `var(${k})`, name: k.slice(8) })) })).filter((p) => p.colors.length);
}
