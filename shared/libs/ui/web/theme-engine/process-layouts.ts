// ============================================================
// THEME PROCESS — Layout Regions (surfaces + dimensions)
// ============================================================

import type { WebTheme as Theme } from '../../types';   // this engine emits CSS: it processes web themes
import type { EmittedDeclarations } from './emit';
import { resolveColorRef, emitSurface } from './emit';
import { camelToKebab, formatRule } from './process-utils';
import { processSurfaceForSelector } from './process-cascade';

// Keys in theme.layouts that are NOT layout regions with surfaces
const LAYOUT_NON_SURFACE_KEYS = new Set(['surface', 'container', 'dialog', 'sheet', 'scrollArea', 'emphasis']);

export function processLayouts(theme: Theme): string[] {
  const layouts = theme.layouts;
  if (!layouts) return [];

  const rules: string[] = [];
  const raw = layouts as Record<string, unknown>;

  // ── Family default: [layout] ──────────────────────────────
  // Every region wears the theme's canvas default — except the structure-only
  // layouts. A stack owns geometry (direction, gap, alignment) and never a
  // surface: painting it would put a box behind every row and column.
  const STRUCTURE_ONLY_LAYOUTS = ['stack'];
  const FAMILY_SELECTOR = `:where([layout]${STRUCTURE_ONLY_LAYOUTS.map((k) => `:not([layout="${k}"])`).join('')})`;   // :where() zeroes specificity so per-region --bg overrides win
  const familySurface = raw.surface as Record<string, unknown> | undefined;
  if (familySurface) {
    const result = processSurfaceForSelector(familySurface, FAMILY_SELECTOR);
    const rule = formatRule(FAMILY_SELECTOR, result.decls);
    if (rule) rules.push(rule);
    rules.push(...result.compoundRules);
  }

  // ── Per-region overrides: [layout="..."] ─────────────────
  for (const [key, tokens] of Object.entries(raw)) {
    if (LAYOUT_NON_SURFACE_KEYS.has(key) || !tokens) continue;

    const attrName = camelToKebab(key);
    const selector = `[layout="${attrName}"]`;
    const regionTokens = tokens as Record<string, unknown>;
    const regionSurface = regionTokens.surface as Record<string, unknown> | undefined;

    const d: EmittedDeclarations = { vars: {}, props: {} };
    if (regionSurface) {
      const result = processSurfaceForSelector(regionSurface, selector);
      const rule = formatRule(selector, result.decls);
      if (rule) rules.push(rule);
      rules.push(...result.compoundRules);
    }

    // Dimension tokens
    if (regionTokens.widthExpanded != null) d.props['width'] = String(regionTokens.widthExpanded);
    if (regionTokens.width != null) d.props['width'] = String(regionTokens.width);
    if (regionTokens.height != null) d.props['height'] = String(regionTokens.height);
    const dimRule = formatRule(selector, d);
    if (dimRule) rules.push(dimRule);

    // Scale entries
    for (const scale of ['sm', 'md', 'lg'] as const) {
      const entry = regionTokens[scale] as Record<string, string> | undefined;
      if (!entry) continue;
      const sd: EmittedDeclarations = { vars: {}, props: {} };
      if (entry.height != null) sd.props['height'] = entry.height;
      if (entry.width != null) sd.props['width'] = entry.width;
      const scaleRule = formatRule(`${selector}[scale="${scale}"]`, sd);
      if (scaleRule) rules.push(scaleRule);
    }

    // Collapsed width — must come after the scale rules: equal specificity,
    // and regions always carry a scale attr, so source order decides.
    if (regionTokens.widthCollapsed != null) {
      const cd: EmittedDeclarations = { vars: {}, props: { width: String(regionTokens.widthCollapsed) } };
      rules.push(formatRule(`${selector}[state="collapsed"]`, cd) ?? '');
    }

    // Collapsed surface override
    const collapsed = regionTokens.collapsed as Record<string, unknown> | undefined;
    if (collapsed) {
      const collapsedSurface = (collapsed.surface as Record<string, unknown> | undefined) ?? collapsed;
      const cd: EmittedDeclarations = { vars: {}, props: {} };
      emitSurface(collapsedSurface, cd);
      const collapsedRule = formatRule(`${selector}[state="collapsed"]`, cd);
      if (collapsedRule) rules.push(collapsedRule);
    }
  }

  // ── Emphasis variants: [layout][emphasis="..."] ───────────────────────
  // A region can wear an emphasis; the theme maps each to a surface (fills +
  // text). Generic across regions — the base region rule owns which edge a
  // border sits on; emphasis only re-shades. Emitted AFTER the per-region
  // rules so, at equal specificity, the emphasis wins.
  const emphasisMap = raw.emphasis as Record<string, unknown> | undefined;
  if (emphasisMap) {
    for (const [emph, entry] of Object.entries(emphasisMap)) {
      const surf = (entry as Record<string, unknown>)?.surface as Record<string, unknown> | undefined;
      if (!surf) continue;
      const sel = `:where([layout])[emphasis="${emph}"]`;
      const result = processSurfaceForSelector(surf, sel);
      const rule = formatRule(sel, result.decls);
      if (rule) rules.push(rule);
      rules.push(...result.compoundRules);
    }
  }

  // ── Structural defaults (engine-owned, not theme-overridable) ──────────
  // Shell roots — full viewport, flex direction determined by variant
  rules.push(
    `[layout="shell"],\n[layout="shell-top-nav"],\n[layout="shell-none"] {\n  display: flex;\n  flex-direction: column;\n  height: 100svh;\n  overflow: hidden;\n}`,
  );
  rules.push(
    `[layout="shell-side-nav"] {\n  display: flex;\n  flex-direction: row;\n  height: 100svh;\n  overflow: hidden;\n}`,
  );

  // Shell nav — fixed-width col, full height, scrollable
  rules.push(
    `[layout="shell-nav"] {\n  flex-shrink: 0;\n  align-self: stretch;\n  overflow-y: auto;\n}`,
  );

  // Page — fills remaining shell space, stacks header + body vertically
  rules.push(
    `[layout="page"] {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0;\n  min-width: 0;\n  overflow: hidden;\n}`,
  );
  rules.push(`[layout="page-header"],\n[layout="second-page-header"] {\n  display: flex;\n  flex-direction: row;\n  flex-shrink: 0;\n  width: 100%;\n  overflow: hidden;\n}`);
  rules.push(
    `[layout="page-body"] {\n  display: flex;\n  flex-direction: row;\n  flex: 1 1 0;\n  min-height: 0;\n  overflow: hidden;\n}`,
  );

  // Sidebars — fixed-width cols, full height, scrollable
  rules.push(
    `[layout="left-sidebar"],\n[layout="right-sidebar"] {\n  flex-shrink: 0;\n  align-self: stretch;\n  overflow-y: auto;\n}`,
  );

  // Main — fills page-body horizontally, stacks its children vertically
  rules.push(
    `[layout="main"] {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0;\n  min-width: 0;\n  overflow: hidden;\n}`,
  );
  rules.push(`[layout="main-header"],\n[layout="second-main-header"],\n[layout="main-footer"] {\n  display: flex;\n  flex-direction: row;\n  flex-shrink: 0;\n  width: 100%;\n  overflow: hidden;\n}`);

  // Main content — invisible row holding main-body + context-panel
  rules.push(
    `[layout="main-content"] {\n  display: flex;\n  flex-direction: row;\n  flex: 1 1 0;\n  min-height: 0;\n  overflow: hidden;\n}`,
  );

  // Context panel — fixed-width col inside main-content, scrollable
  rules.push(
    `[layout="context-panel"] {\n  flex-shrink: 0;\n  align-self: stretch;\n  overflow-y: auto;\n}`,
  );

  // Main body — fills main-content horizontally, scrollable vertically
  rules.push(
    `[layout="main-body"] {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0;\n  min-width: 0;\n  overflow-y: auto;\n}`,
  );

  // Container — centred, width capped by scale (max-width set below)
  rules.push(`[layout="container"] {\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}`);
  // `align` (layouts.md › Container): where the measure sits inside main-body — centered by default; `left` and `right` release the opposite margin
  rules.push(`[layout="container"][align="left"] {\n  margin-left: 0;\n}`);
  rules.push(`[layout="container"][align="right"] {\n  margin-right: 0;\n}`);

  // Content organisation
  rules.push(`[layout="row-section"] {\n  display: flex;\n  flex-direction: row;\n}`);
  rules.push(`[layout="col-section"] {\n  display: flex;\n  flex-direction: column;\n}`);

  // ── Container width scales ────────────────────────────────
  const container = layouts.container as Record<string, { maxWidth: string }> | undefined;
  if (container) {
    for (const [scale, entry] of Object.entries(container)) {
      if (!entry?.maxWidth) continue;
      rules.push(`[layout="container"][scale="${scale}"] {\n  max-width: ${entry.maxWidth};\n}`);
    }
  }

  // ── Scroll area scrollbar ─────────────────────────────────
  const scrollArea = raw.scrollArea as Record<string, unknown> | undefined;
  if (scrollArea) {
    const sb = scrollArea.scrollbar as Record<string, unknown> | undefined;
    if (sb) {
      if (sb.width) rules.push(`[layout="scroll-area"]::-webkit-scrollbar { width: ${sb.width}; }`);
      if (sb.thumbColor) rules.push(`[layout="scroll-area"]::-webkit-scrollbar-thumb { background: ${resolveColorRef(String(sb.thumbColor))}; }`);
      if (sb.trackColor) rules.push(`[layout="scroll-area"]::-webkit-scrollbar-track { background: ${resolveColorRef(String(sb.trackColor))}; }`);
    }
  }

  // ── Sidebar divider ───────────────────────────────────────
  // Structural defaults for the global sidebar-divider concept.
  // Color is theme-owned (wireframes chain rule); height + spacing are engine-owned.
  rules.push(
    `[concept~="sidebar-divider"][element="surface--separator"] {\n  height: 1px;\n  width: 100%;\n  margin-top: var(--space-xs);\n  margin-bottom: var(--space-xs);\n}`,
  );

  // ── Overlay dimensions ────────────────────────────────────
  const dialog = layouts.dialog as Record<string, { maxWidth: string }> | undefined;
  if (dialog) {
    for (const [scale, entry] of Object.entries(dialog)) {
      if (!entry?.maxWidth) continue;
      rules.push(`[element*="--dialog"][scale="${scale}"] {\n  max-width: ${entry.maxWidth};\n}`);
    }
  }

  const sheet = layouts.sheet as Record<string, { size: string }> | undefined;
  if (sheet) {
    for (const [scale, entry] of Object.entries(sheet)) {
      if (!entry?.size) continue;
      rules.push(`[element*="--sheet"][scale="${scale}"] {\n  --sheet-size: ${entry.size};\n}`);
    }
  }

  return rules;
}
