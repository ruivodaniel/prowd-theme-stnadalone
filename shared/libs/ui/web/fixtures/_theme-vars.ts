import { useEffect, useState } from "react";

/**
 * The active theme's custom properties, read from the stylesheets the page
 * loaded: `:root` declarations are the base (light) values, every
 * `[data-mode="X"]` block is a mode. Declaration order is kept — it is the
 * theme author's order. Re-read whenever vite swaps a style tag (HMR).
 */
export interface ThemeVars {
  base: Record<string, string>;
  modes: Record<string, Record<string, string>>;
}

const MODE_RE = /\[data-mode="([a-zA-Z-]+)"\]/;
const EMPTY: ThemeVars = { base: {}, modes: {} };

function read(): ThemeVars {
  const base: Record<string, string> = {};
  const modes: Record<string, Record<string, string>> = {};
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      const sel = rule.selectorText;
      const mode = MODE_RE.exec(sel)?.[1];
      const isRoot = sel === ":root" || sel === "html" || sel.startsWith(":root,") || sel.startsWith(":root ,");
      if (!mode && !isRoot) continue;
      const target = mode ? (modes[mode] ??= {}) : base;
      const st = rule.style;
      for (let i = 0; i < st.length; i++) {
        const p = st[i];
        if (p.startsWith("--")) target[p.slice(2)] = st.getPropertyValue(p).trim();
      }
    }
  }
  return { base, modes };
}

export function useThemeVars(): ThemeVars {
  const [vars, setVars] = useState<ThemeVars>(EMPTY);
  useEffect(() => {
    setVars(read());
    const mo = new MutationObserver(() => setVars(read()));
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, []);
  return vars;
}

/** Variable names starting with `prefix`, declaration order. */
export const withPrefix = (vars: Record<string, string>, prefix: string): string[] =>
  Object.keys(vars).filter((k) => k.startsWith(prefix));

/** Names matching a regex, declaration order. */
export const matching = (vars: Record<string, string>, re: RegExp): string[] =>
  Object.keys(vars).filter((k) => re.test(k));

/** Every mode column: base first (no data-mode), then each `[data-mode]` the css declares. */
export const modeColumns = (vars: ThemeVars): { mode?: string; label: string }[] => [
  { label: "light (base)" },
  ...Object.keys(vars.modes).map((m) => ({ mode: m, label: m })),
];
