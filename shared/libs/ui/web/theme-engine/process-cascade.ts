// ============================================================
// THEME PROCESS — Cascade Processor (L2–L5) + Family Extras
// ============================================================

import type { WebTheme as Theme } from '../../types';   // this engine emits CSS: it processes web themes
import { SCALE } from '../../types/axes';
import {
  FAMILY_PREFIXES,
  ELEMENT_FAMILIES,
  FAMILY_DEFAULTS,
  ELEMENT_DEFAULTS,
  familySelector,
  elementSelector,
  resolveSelector,
  PSEUDO_STATES,
} from './conventions';
import type { EmittedDeclarations } from './emit';
import {
  resolveColorRef,
  emitSurface,
  emitPartialSurface,
  emitOverlayExtras,
  emitFieldExtras,
  emitMediaExtras,
} from './emit';
import { formatRule, extractFamilySurface } from './process-utils';
import { resolveParentGeometry, emitSmartBleed, emitIconZoneBleed } from './process-smart-bleed';

// ── Constants ──────────────────────────────────────────────


// ── Surface processing ─────────────────────────────────────

export function processSurfaceForSelector(
  tokens: Record<string, unknown>,
  selector: string,
): { decls: EmittedDeclarations; compoundRules: string[] } {
  const decls: EmittedDeclarations = { vars: {}, props: {} };
  const compoundRules: string[] = [];

  emitSurface(tokens, decls);

  const POSITION_PSEUDO: Record<string, string> = {
    first:  ':first-child',
    last:   ':last-child',
    only:   ':only-child',
    middle: ':not(:first-child):not(:last-child)',
    even:   ':nth-child(even)',
    odd:    ':nth-child(odd)',
  };

  const combined = tokens.combined as Array<{ where: { state?: string; status?: string; emphasis?: string; position?: string }; partialSurface?: Record<string, unknown> }> | undefined;
  if (combined) {
    for (const entry of combined) {
      if (!entry?.where) continue;
      const d: EmittedDeclarations = { vars: {}, props: {} };
      emitPartialSurface(entry, d);
      if (Object.keys(d.vars).length + Object.keys(d.props).length === 0) continue;

      const { state, status, emphasis, position } = entry.where;
      let suffix = '';
      if (state) {
        suffix += (PSEUDO_STATES as readonly string[]).includes(state)
          ? `:${state === 'focus' ? 'focus-visible' : state}`
          : `[state="${state}"]`;
      }
      if (status) suffix += `[status="${status}"]`;
      if (emphasis) suffix += `[emphasis="${emphasis}"]`;
      if (position && POSITION_PSEUDO[position]) suffix += POSITION_PSEUDO[position];
      if (!suffix) continue;
      compoundRules.push(formatRule(`${selector}${suffix}`, d));
    }
  }

  return { decls, compoundRules };
}

// ── Family extras ──────────────────────────────────────────

function emitFamilyExtras(
  familyKey: string,
  tokens: Record<string, unknown>,
  out: EmittedDeclarations,
): void {
  if (familyKey === 'elevatedOverlay') emitOverlayExtras(tokens, out);
  if (familyKey === 'field') emitFieldExtras(tokens, out);
  if (familyKey === 'media') emitMediaExtras(tokens, out);
  const defaults = FAMILY_DEFAULTS[familyKey];
  if (defaults) {
    for (const [key, value] of Object.entries(defaults)) {
      if (!(key in out.props)) out.props[key] = value;
    }
  }
}

// ── List children ──────────────────────────────────────────

function emitListChildren(
  tokens: Record<string, unknown>,
  parentSelector: string,
  rules: string[],
): void {
  const rowSel = 'li';
  const cellSel = '> * > *';
  const alternatingSel = 'li:nth-child(even)';
  const separatorSel = 'li:not(:last-child)';

  const childMap: [string, string][] = [
    ['row', rowSel],
    ['cell', cellSel],
    ['alternating', alternatingSel],
  ];

  for (const [childKey, childSel] of childMap) {
    const child = tokens[childKey] as Record<string, unknown> | undefined;
    if (child) {
      const sel = `${parentSelector} ${childSel}`;
      const result = processSurfaceForSelector(child, sel);
      const rule = formatRule(sel, result.decls);
      if (rule) rules.push(rule);
      rules.push(...result.compoundRules);
    }
  }

  const separator = tokens.separator as Record<string, unknown> | undefined;
  if (separator?.surface) {
    const d: EmittedDeclarations = { vars: {}, props: {} };
    emitSurface(separator.surface as Record<string, unknown>, d);
    const rule = formatRule(`${parentSelector} ${separatorSel}`, d);
    if (rule) rules.push(rule);
  }
}

// ── Main cascade processor ─────────────────────────────────

export function processCascadeRules(theme: Theme): string[] {
  const rules: string[] = [];

  // ── L2: Families ──────────────────────────────────────────
  for (const [familyKey, tokens] of Object.entries(theme.families ?? {})) {
    if (!tokens) continue;
    const selector = familySelector(familyKey);
    if (!selector) continue;

    const raw = tokens as Record<string, unknown>;
    const surface = extractFamilySurface(familyKey, raw);
    if (surface) {
      const result = processSurfaceForSelector(surface, selector);
      emitFamilyExtras(familyKey, raw, result.decls);
      const rule = formatRule(selector, result.decls);
      if (rule) rules.push(rule);
      rules.push(...result.compoundRules);
    }
    if (familyKey === 'listContainer') emitListChildren(raw, selector, rules);

    // Family-level per-scale defaults. Same authoring shape as element sizes,
    // emitted at the family selector so every element in the family (whether
    // or not it appears in theme.elements) scales by default. `:where()` keeps
    // the rule at family specificity: an element's own base rule (a switch's
    // `padding: none` + fixed width) beats it, as it beats the family base —
    // otherwise `[family][scale]` outranked every `[element]` rule. Element
    // sizes still override on their more specific selector.
    const famSizes = raw.sizes as Record<string, Record<string, unknown>> | undefined;
    if (famSizes) {
      for (const [sizeName, sizeEntry] of Object.entries(famSizes)) {
        if (!sizeEntry) continue;
        const d: EmittedDeclarations = { vars: {}, props: {} };
        const ps = sizeEntry.partialSurface as Record<string, unknown> | undefined;
        if (ps) emitSurface(ps, d);
        const icon = sizeEntry.icon as { size?: string; weight?: number } | undefined;
        if (icon) {
          if (icon.size != null) d.vars['icon-size'] = icon.size === 'inherit' ? 'var(--icon-size)' : `var(--icon-size-${icon.size})`;
          if (icon.weight != null) d.vars['icon-weight'] = String(icon.weight);
        }
        const rule = formatRule(`${selector}:where([scale="${sizeName}"])`, d);
        if (rule) rules.push(rule);
      }
    }

    for (const zone of ['startIcon', 'endIcon'] as const) {
      const zoneTokens = raw[zone] as Record<string, unknown> | undefined;
      if (!zoneTokens) continue;
      const direction = zone === 'startIcon' ? 'start' : 'end';
      const zoneSel = `${selector} [data-part="${direction}-icon"]`;
      const result = processSurfaceForSelector(zoneTokens, zoneSel);
      const rule = formatRule(zoneSel, result.decls);
      if (rule) rules.push(rule);
      rules.push(...result.compoundRules);
    }
  }

  // ── L3: Elements ──────────────────────────────────────────
  if (theme.elements) {
    for (const [key, tokens] of Object.entries(theme.elements)) {
      if (!tokens) continue;
      const elSel = elementSelector(key);
      if (!elSel) continue;

      const familyKey = ELEMENT_FAMILIES[key];
      const raw = tokens as Record<string, unknown>;

      // Switch: two-surface element (track + thumb)
      if (key === 'switch') {
        const track = raw.track as Record<string, unknown> | undefined;
        const thumb = raw.thumb as Record<string, unknown> | undefined;
        if (track) {
          const result = processSurfaceForSelector(track, elSel);
          emitFamilyExtras(familyKey, raw, result.decls);
          const rule = formatRule(elSel, result.decls);
          if (rule) rules.push(rule);
          rules.push(...result.compoundRules);
        }
        if (thumb) {
          const thumbSel = `${elSel} [data-part="thumb"]`;
          const result = processSurfaceForSelector(thumb, thumbSel);
          const rule = formatRule(thumbSel, result.decls);
          if (rule) rules.push(rule);
          rules.push(...result.compoundRules);
        }
        continue;
      }

      const surface = extractFamilySurface(familyKey, raw);
      if (surface) {
        const result = processSurfaceForSelector(surface, elSel);
        emitFamilyExtras(familyKey, raw, result.decls);
        const elDefaults = ELEMENT_DEFAULTS[key];
        if (elDefaults) {
          for (const [k, v] of Object.entries(elDefaults)) {
            if (!(k in result.decls.props)) result.decls.props[k] = v;
          }
        }
        const rule = formatRule(elSel, result.decls);
        if (rule) rules.push(rule);
        rules.push(...result.compoundRules);
      } else {
        // No surface sub-object but family may still have extras to emit
        // (e.g. media: objectFit, overlay, filter without a full surface).
        const extraDecls: EmittedDeclarations = { vars: {}, props: {} };
        emitFamilyExtras(familyKey, raw, extraDecls);
        const rule = formatRule(elSel, extraDecls);
        if (rule) rules.push(rule);
      }
      if (familyKey === 'listContainer') emitListChildren(raw, elSel, rules);

      // Table row alternating — emitted as :nth-child(even) compound rule
      if (familyKey === 'tableElement' && raw.alternating) {
        const altSel = `${elSel}:nth-child(even)`;
        const result = processSurfaceForSelector(raw.alternating as Record<string, unknown>, altSel);
        const rule = formatRule(altSel, result.decls);
        if (rule) rules.push(rule);
        rules.push(...result.compoundRules);
      }

      for (const zone of ['startIcon', 'endIcon'] as const) {
        const zoneTokens = raw[zone] as Record<string, unknown> | undefined;
        if (!zoneTokens) continue;
        const direction = zone === 'startIcon' ? 'start' : 'end';
        const zoneSel = `${elSel} [data-part="${direction}-icon"]`;
        const result = processSurfaceForSelector(zoneTokens, zoneSel);
        const rule = formatRule(zoneSel, result.decls);
        if (rule) rules.push(rule);
        rules.push(...result.compoundRules);
        if (zoneTokens.smartBleed !== false) {
          const parentGeometry = resolveParentGeometry(theme, key);
          rules.push(...emitIconZoneBleed(parentGeometry, direction, zoneSel));
        }
      }

      // Sizes — per-scale rules for this element. Element sizes win over the
      // family sizes emitted at the family selector because the element
      // selector is more specific.
      const sizes = raw.sizes as Record<string, Record<string, unknown>> | undefined;
      if (sizes) {
        for (const [sizeName, sizeEntry] of Object.entries(sizes)) {
          if (!sizeEntry) continue;
          const d: EmittedDeclarations = { vars: {}, props: {} };
          const ps = sizeEntry.partialSurface as Record<string, unknown> | undefined;
          if (ps) emitSurface(ps, d);
          const icon = sizeEntry.icon as { size?: string; weight?: number } | undefined;
          if (icon) {
            if (icon.size != null) d.vars['icon-size'] = icon.size === 'inherit' ? 'var(--icon-size)' : `var(--icon-size-${icon.size})`;
            if (icon.weight != null) d.vars['icon-weight'] = String(icon.weight);
          }
          const rule = formatRule(`${elSel}[scale="${sizeName}"]`, d);
          if (rule) rules.push(rule);
        }
      }

      // Collapsible dimensions — widthExpanded / widthCollapsed
      if (raw.widthExpanded != null) {
        const wd: EmittedDeclarations = { vars: {}, props: { width: String(raw.widthExpanded) } };
        const widthRule = formatRule(elSel, wd);
        if (widthRule) rules.push(widthRule);
      }
      if (raw.widthCollapsed != null) {
        const cd: EmittedDeclarations = { vars: {}, props: { width: String(raw.widthCollapsed) } };
        const collapsedRule = formatRule(`${elSel}[collapsed]`, cd);
        if (collapsedRule) rules.push(collapsedRule);
      }
    }
  }

  // ── L4: Concepts ──────────────────────────────────────────
  if (theme.concepts) {
    for (const [conceptName, targets] of Object.entries(theme.concepts)) {
      if (!targets) continue;
      for (const [targetName, tokens] of Object.entries(targets)) {
        if (!tokens) continue;
        const targetSel = resolveSelector(targetName);
        if (!targetSel) continue;

        const conceptSel = `[concept~="${conceptName}"] ${targetSel}`;
        const raw = tokens as Record<string, unknown>;
        const surface = (raw.surface as Record<string, unknown> | undefined) ?? raw;
        const result = processSurfaceForSelector(surface, conceptSel);
        if (raw.accent != null) result.decls.vars['tint'] = resolveColorRef(String(raw.accent));

        const familyKey = ELEMENT_FAMILIES[targetName] ?? targetName;
        emitFamilyExtras(familyKey, raw, result.decls);

        const rule = formatRule(conceptSel, result.decls);
        if (rule) rules.push(rule);
        rules.push(...result.compoundRules);

        if (familyKey === 'listContainer') emitListChildren(raw, conceptSel, rules);

        const ctx = raw.contextual as Record<string, Record<string, unknown>> | undefined;
        if (ctx) {
          for (const [childName, childTokens] of Object.entries(ctx)) {
            if (!childTokens) continue;
            const childSel = resolveSelector(childName);
            if (!childSel) continue;
            const compoundSel = `${conceptSel} ${childSel}`;
            const childResult = processSurfaceForSelector(childTokens, compoundSel);
            const childRule = formatRule(compoundSel, childResult.decls);
            if (childRule) rules.push(childRule);
            rules.push(...childResult.compoundRules);

            const bleedMode = childTokens.smartBleed as string | false | undefined;
            if (bleedMode && bleedMode !== 'false') {
              const parentGeometry = resolveParentGeometry(theme, targetName, conceptName);
              rules.push(...emitSmartBleed(
                parentGeometry,
                bleedMode as 'normal' | 'rounded' | 'border' | 'border-rounded',
                compoundSel,
              ));
            }
          }
        }
      }
    }
  }

  // ── L5: Contextual ────────────────────────────────────────
  if (theme.contextual) {
    for (const [parentName, children] of Object.entries(theme.contextual)) {
      if (!children) continue;
      const parentSel = resolveSelector(parentName);
      if (!parentSel) continue;
      for (const [childName, tokens] of Object.entries(children)) {
        if (!tokens) continue;
        const childSel = resolveSelector(childName);
        if (!childSel) continue;
        const compoundSel = `${parentSel} ${childSel}`;
        const raw = tokens as Record<string, unknown>;
        const result = processSurfaceForSelector(raw, compoundSel);
        const rule = formatRule(compoundSel, result.decls);
        if (rule) rules.push(rule);
        rules.push(...result.compoundRules);

        const bleedMode = raw.smartBleed as string | false | undefined;
        if (bleedMode && bleedMode !== 'false') {
          const parentGeometry = resolveParentGeometry(theme, parentName);
          rules.push(...emitSmartBleed(
            parentGeometry,
            bleedMode as 'normal' | 'rounded' | 'border' | 'border-rounded',
            compoundSel,
          ));
        }
      }
    }
  }

  // ── L6: Rules (arbitrary-depth chains) ────────────────────
  if (theme.rules) {
    for (const rule of theme.rules) {
      if (!rule?.chain?.length) continue;

      // Build compound selector: each segment resolves to its base selector,
      // optionally prefixed with [concept="X"] when concept is set.
      const parts: string[] = [];
      for (const seg of rule.chain) {
        const baseSel = resolveSelector(seg.key);
        if (!baseSel) { parts.length = 0; break; } // unknown key — skip rule
        parts.push(seg.concept ? `[concept~="${seg.concept}"]${baseSel}` : baseSel);
      }
      if (parts.length < 1) continue;

      const compoundSel = parts.join(' ');
      const tokens = rule.tokens as Record<string, unknown>;
      const result = processSurfaceForSelector(tokens, compoundSel);
      const cssRule = formatRule(compoundSel, result.decls);
      if (cssRule) rules.push(cssRule);
      rules.push(...result.compoundRules);

      const bleedMode = tokens.smartBleed as string | false | undefined;
      if (bleedMode && bleedMode !== 'false') {
        const lastParent = rule.chain[rule.chain.length - 2];
        const parentGeometry = resolveParentGeometry(theme, lastParent.key, lastParent.concept);
        rules.push(...emitSmartBleed(
          parentGeometry,
          bleedMode as 'normal' | 'rounded' | 'border' | 'border-rounded',
          compoundSel,
        ));
      }
    }
  }

  return rules;
}

// ============================================================
// FAMILY-SPECIFIC CSS (scrim, placeholder, scrollbar, icons)
// ============================================================

export function generateFamilyExtrasCSS(theme: Theme): string[] {
  const rules: string[] = [];
  const overlayPfx = FAMILY_PREFIXES.elevatedOverlay;
  const fieldPfx = FAMILY_PREFIXES.field;

  if (theme.families?.elevatedOverlay || Object.keys(theme.elements ?? {}).some(k => ELEMENT_FAMILIES[k] === 'elevatedOverlay')) {
    const scrimDecls = [
      'background: color-mix(in srgb, var(--scrim-color, var(--foreground)) var(--scrim-opacity-pct, 50%), transparent);',
      'backdrop-filter: blur(var(--scrim-blur, 0px));',
      '-webkit-backdrop-filter: blur(var(--scrim-blur, 0px));',
    ].map(d => `  ${d}`).join('\n');
    rules.push(`[element^="${overlayPfx}--"][data-part="scrim"] {\n${scrimDecls}\n}`);
  }

  if (theme.families?.field || Object.keys(theme.elements ?? {}).some(k => ELEMENT_FAMILIES[k] === 'field')) {
    rules.push(`:where([element^="${fieldPfx}--"])::placeholder {\n  color: var(--placeholder-color, var(--color-gray-400));\n  opacity: var(--placeholder-opacity, 1);\n}`);
    rules.push(`:where([element^="${fieldPfx}--"]) input,\n:where([element^="${fieldPfx}--"]) textarea {\n  caret-color: var(--caret-color, currentColor);\n}`);
    rules.push(`:where([element^="${fieldPfx}--"]) > input,\n:where([element^="${fieldPfx}--"]) > textarea {\n  background: transparent;\n  border: none;\n  outline: none;\n  color: inherit;\n}`);
  }

  rules.push(`[element]::-webkit-scrollbar { width: var(--scrollbar-width, auto); }`);
  rules.push(`[element]::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb, var(--color-gray-300)); }`);
  rules.push(`[element]::-webkit-scrollbar-track { background: var(--scrollbar-track, transparent); }`);

  rules.push(`:where([element])[state="disabled"] { pointer-events: none; cursor: not-allowed; }`);
  rules.push(`:where([element]):disabled, :where([element])[aria-disabled="true"] { pointer-events: none; cursor: not-allowed; }`);

  if (theme.elements?.button) rules.push(`[element="control--button"] { white-space: nowrap; user-select: none; }`);

  if (theme.elements?.icon || theme.families?.shape) {
    rules.push(`[element="shape--icon"] { display: inline-flex; width: var(--icon-size, var(--icon-size-md, 24px)); height: var(--icon-size, var(--icon-size-md, 24px)); color: currentColor; }`);
    for (const s of SCALE) rules.push(`[element="shape--icon"][scale="${s}"] { width: var(--icon-size-${s}); height: var(--icon-size-${s}); }`);
    rules.push(`[element="shape--icon"] > svg { width: 100%; height: 100%; stroke-width: var(--icon-weight, 2); }`);
  }

  rules.push(`.icon-left, .icon-right { display: inline-flex; align-items: center; justify-content: center; }`);
  rules.push(`.icon-left svg, .icon-right svg { width: var(--icon-size, 1em); height: var(--icon-size, 1em); stroke-width: var(--icon-weight, 2); }`);

  // ── Media family structural rules ─────────────────────────
  // The [element^="media--"] wrapper is a relative container; the inner
  // img/video fills it via object-fit. The ::after pseudo-element renders
  // the optional color overlay on top without touching the markup.
  const mediaPfx = FAMILY_PREFIXES.media;
  rules.push(`[element^="${mediaPfx}--"] { position: relative; overflow: hidden; }`);
  rules.push(`[element^="${mediaPfx}--"] img,\n[element^="${mediaPfx}--"] video {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: var(--media-object-fit, cover);\n  object-position: var(--media-object-position, center);\n}`);
  rules.push(`[element^="${mediaPfx}--"]::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: color-mix(in srgb, var(--media-overlay-color, transparent) var(--media-overlay-opacity, 0%), transparent);\n  backdrop-filter: blur(var(--media-overlay-blur, 0px));\n  pointer-events: none;\n}`);

  return rules;
}
