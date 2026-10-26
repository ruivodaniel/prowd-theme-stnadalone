// ============================================================
// THEME PROCESS — L1 Primitives + L1b Modes & Derivations
// ============================================================

import type { WebTheme as Theme } from '../../types';   // this engine emits CSS: it processes web themes
import { resolveColorRef, resolveGradient } from './emit';
import { camelToKebab, flattenToCssVars, typographyClamp } from './process-utils';
import type { CssVarValue } from './process-utils';

// ============================================================
// L1 — PRIMITIVES
// ============================================================

export function processColors(colors: Theme['colors']): Record<string, CssVarValue> {
  const main = flattenToCssVars(colors.main, 'color-main');
  const brand = flattenToCssVars(colors.brand, 'color-brand');
  const status: Record<string, CssVarValue> = {};
  for (const [key, value] of Object.entries(colors.status)) status[`color-status-${key}`] = resolveColorRef(String(value));
  const flat = flattenToCssVars(colors.flat, 'color-flat');
  const semantic: Record<string, CssVarValue> = {};
  for (const [key, value] of Object.entries(colors.semanticTokens)) semantic[key] = resolveColorRef(String(value));
  return { ...main, ...brand, ...status, ...flat, ...semantic };
}

export function processTypography(theme: Theme): Record<string, CssVarValue> {
  const { fonts, types } = theme.typography;
  const vars: Record<string, CssVarValue> = {
    'typography-font-family-primary': fonts.primary,
    'typography-font-family-secondary': fonts.secondary,
    'typography-font-family-quote': fonts.quote,
    'typography-font-family-mono-primary': fonts.monoPrimary,
    'typography-font-family-mono-secondary': fonts.monoSecondary,
  };
  for (const [key, level] of Object.entries(types)) {
    const p = `typography-${key}`;
    vars[`${p}-font-family`] = `var(--typography-font-family-${camelToKebab(level.fontFamily)})`;
    vars[`${p}-font-style`] = level.fontStyle;
    vars[`${p}-font-size`] = typographyClamp(level.fontSizeMobile, level.fontSizeDesktop);
    vars[`${p}-font-weight`] = String(level.fontWeight);
    vars[`${p}-line-height`] = String(level.lineHeight);
    if (level.letterSpacing) vars[`${p}-letter-spacing`] = level.letterSpacing;
  }
  return vars;
}

export function generateTypographyElementRules(theme: Theme): string[] {
  const { types } = theme.typography;
  const rules: string[] = [];
  for (const key of Object.keys(types)) {
    const kebab = camelToKebab(key);
    const p = `typography-${key}`;
    const sel = `[element="type--${kebab}"]`;
    rules.push(
      `${sel} {\n` +
      `  font-family: var(--${p}-font-family);\n` +
      `  font-size: var(--${p}-font-size);\n` +
      `  font-weight: var(--${p}-font-weight);\n` +
      `  line-height: var(--${p}-line-height);\n` +
      `  font-style: var(--${p}-font-style);\n` +
      `}`,
    );
  }
  return rules;
}

// 9 SCALE steps + 'none'. 'xxs' / 'xxl' are deprecated aliases emitted alongside
// so the app's theme-editor keeps compiling until it is migrated.
export function processSpacing(spacing: Theme['spacing']): Record<string, CssVarValue> {
  const u = spacing.unit;
  const value = (mul: number) => `${u * mul}rem`;
  const scale = {
    '3xs': value(0.0625), '2xs': value(0.125),
    xs: value(0.25),      sm: value(0.5),
    md: value(1),         lg: value(1.5),
    xl: value(2),         '2xl': value(3), '3xl': value(4),
  };
  return {
    'spacing-unit': `${u}rem`,
    'spacing-none': '0',
    'spacing-3xs': scale['3xs'], 'spacing-2xs': scale['2xs'],
    'spacing-xs':  scale.xs,     'spacing-sm':  scale.sm,
    'spacing-md':  scale.md,     'spacing-lg':  scale.lg,
    'spacing-xl':  scale.xl,     'spacing-2xl': scale['2xl'], 'spacing-3xl': scale['3xl'],
    // deprecated aliases → same values as their SCALE names
    'spacing-xxs': scale['2xs'], 'spacing-xxl': scale['2xl'],
  };
}

export function processRadius(radius: Theme['radius']): Record<string, CssVarValue> {
  const vars: Record<string, CssVarValue> = {};
  for (const [key, value] of Object.entries(radius)) vars[`radius-${key}`] = value;
  return vars;
}

export function processEffects(theme: Theme): Record<string, CssVarValue> {
  const vars: Record<string, CssVarValue> = {};
  for (const [name, layers] of Object.entries(theme.effects)) {
    if (!layers || layers.length === 0) { vars[`shadow-${name}`] = 'none'; continue; }
    const shadowLayers = layers.filter((l: { type: string }) => l.type === 'drop-shadow' || l.type === 'inner-shadow');
    vars[`shadow-${name}`] = shadowLayers.length > 0
      ? shadowLayers.map((l: Record<string, unknown>) => {
          const inset = l.type === 'inner-shadow' ? 'inset ' : '';
          const resolved = resolveColorRef(String(l.color));
          const color = l.opacity != null ? `color-mix(in srgb, ${resolved} ${Math.round(Number(l.opacity) * 100)}%, transparent)` : resolved;
          return `${inset}${l.x}px ${l.y}px ${l.blur}px ${(l.spread as number) ?? 0}px ${color}`;
        }).join(', ')
      : 'none';
  }
  return vars;
}

export function processTransitions(tr: Theme['transitions']): Record<string, CssVarValue> {
  return {
    'transition-duration-extra-fast': tr.duration.extraFast,
    'transition-duration-fast': tr.duration.fast,
    'transition-duration-average': tr.duration.average,
    'transition-duration-slow': tr.duration.slow,
    'transition-duration-extra-slow': tr.duration.extraSlow,
    'transition-timing-ease': tr.timing.ease,
    'transition-timing-ease-in': tr.timing.easeIn,
    'transition-timing-ease-out': tr.timing.easeOut,
    'transition-timing-ease-in-out': tr.timing.easeInOut,
    'transition-timing-linear': tr.timing.linear,
  };
}

export function processBorderWidths(bw: Theme['borderWidths']): Record<string, CssVarValue> {
  const vars: Record<string, CssVarValue> = {};
  for (const [key, value] of Object.entries(bw)) vars[`border-width-${camelToKebab(key)}`] = value;
  return vars;
}

export function processIcons(icons: Theme['icons']): Record<string, CssVarValue> {
  if (!icons) return {};
  // icon-set is config (library name), not a CSS token — not emitted
  const vars: Record<string, CssVarValue> = { 'icon-weight': String(icons.weight) };
  for (const [size, value] of Object.entries(icons.sizes)) vars[`icon-size-${size}`] = `${value}px`;
  return vars;
}

// ============================================================
// L1b — MODES + DERIVATIONS
// ============================================================

const GRAY_STEPS: [string, number][] = [
  ['50', 2], ['100', 5], ['150', 7], ['200', 10], ['250', 14], ['300', 18], ['400', 35],
  ['500', 50], ['600', 65], ['700', 76], ['800', 86], ['900', 93], ['950', 96],
];

const GRAY_PURE_HEX: Record<string, string> = {
  '50': '#FAFAFA', '100': '#F2F2F2', '150': '#ECECEC', '200': '#E6E6E6',
  '250': '#DBDBDB', '300': '#D1D1D1', '400': '#A3A3A3', '500': '#737373',
  '600': '#545454', '700': '#3D3D3D', '800': '#242424', '900': '#121212', '950': '#0A0A0A',
};

function resolveAnchorToHex(anchor: string, colors: Theme['colors']): string {
  if (anchor.startsWith('#')) return anchor;
  if (anchor.startsWith('gray-pure-')) return GRAY_PURE_HEX[anchor.slice(10)] ?? '#000000';
  if (anchor.startsWith('main-')) return (colors.main as Record<string, string>)[anchor.slice(5)] ?? '#000000';
  if (anchor.startsWith('brand-')) return colors.brand[anchor.slice(6) as keyof typeof colors.brand] ?? '#000000';
  if (anchor.startsWith('flat-')) return (colors.flat as Record<string, string>)[anchor.slice(5)] ?? '#000000';
  if (anchor.startsWith('status-')) {
    const ref = String(colors.status[anchor.slice(7) as keyof typeof colors.status]);
    return resolveAnchorToHex(ref, colors);
  }
  return '#000000';
}

export function processModeVars(mode: string, preset: { background: string; foreground: string; derivation: Record<string, unknown> }, colors: Theme['colors']): Record<string, CssVarValue> {
  const vars: Record<string, CssVarValue> = {};
  const bg = resolveAnchorToHex(String(preset.background), colors);
  const fg = resolveAnchorToHex(String(preset.foreground), colors);

  vars['background'] = bg;
  vars['foreground'] = fg;

  for (const [step, pct] of GRAY_STEPS) vars[`color-gray-${step}`] = `color-mix(in srgb, ${fg} ${pct}%, ${bg})`;
  for (const [step, hex] of Object.entries(GRAY_PURE_HEX)) vars[`color-gray-pure-${step}`] = hex;

  const d = preset.derivation;
  const brandTint = parseInt(String(d.grayColorMixPercentage)) || 10;
  for (const brand of Object.keys(colors.brand)) {
    for (const [step] of GRAY_STEPS) vars[`color-brand-${brand}-gray-${step}`] = `color-mix(in srgb, var(--color-brand-${brand}) ${brandTint}%, var(--color-gray-${step}))`;
    vars[`color-brand-${brand}-light`] = `color-mix(in srgb, var(--color-brand-${brand}) ${d.brandLightAmount}%, ${bg})`;
    vars[`color-brand-${brand}-dark`] = `color-mix(in srgb, var(--color-brand-${brand}) ${d.brandDarkAmount}%, ${fg})`;
  }
  for (const statusKey of Object.keys(colors.status)) {
    vars[`color-status-${statusKey}-light`] = `color-mix(in srgb, var(--color-status-${statusKey}) ${d.statusLightAmount}%, ${bg})`;
    vars[`color-status-${statusKey}-dark`] = `color-mix(in srgb, var(--color-status-${statusKey}) ${d.statusDarkAmount}%, ${fg})`;
  }

  vars['colors-brand-light-amount'] = String(d.brandLightAmount);
  vars['colors-brand-dark-amount'] = String(d.brandDarkAmount);
  vars['colors-status-light-amount'] = String(d.statusLightAmount);
  vars['colors-status-dark-amount'] = String(d.statusDarkAmount);
  vars['colors-gray-color-mix-percentage'] = String(d.grayColorMixPercentage);
  vars['colors-flat-saturation-adjust'] = String(d.flatSaturationAdjust);
  vars['mode-active-color-mode'] = mode;

  return vars;
}

// ============================================================
// GRADIENTS
// ============================================================

export function processGradients(theme: Theme): Record<string, CssVarValue> {
  if (!theme.gradients) return {};
  const vars: Record<string, CssVarValue> = {};
  for (const [name, def] of Object.entries(theme.gradients)) {
    vars[`gradient-${name}`] = resolveGradient(def);
  }
  return vars;
}

// ============================================================
// PROPERTY APPLICATION (composition plumbing)
// ============================================================

export function generatePropertyApplication(): string {
  return `/* Reset composition vars at UI node boundaries */
[element], [layout], [data-part] {
  --bg: initial;
  --fg: initial;
  --tint: initial;
  --bg-alpha: initial;
  --bg-gradient: initial;
  --border-color: initial;
}

/* Composition formula — scoped to UI nodes only, never bleeds into children */
[element], [layout], [data-part] {
  background: var(--bg-gradient, color-mix(in srgb,
    color-mix(in srgb, var(--tint, var(--bg, transparent)) 20%, var(--bg, transparent))
    var(--bg-alpha, 100%),
    transparent
  ));
  color: var(--fg, inherit);
  border-color: color-mix(in srgb, var(--tint, var(--border-color, transparent)) 30%, var(--border-color, transparent));
  transition-property: background, border-color, box-shadow, opacity, color, outline-color;
}`;
}
