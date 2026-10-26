// ============================================================
// THEME PROCESS — Smart Bleed (build-time parent resolution)
// ============================================================

import type { WebTheme as Theme } from '../../types';   // this engine emits CSS: it processes web themes
import { ELEMENT_FAMILIES } from './conventions';
import { resolveTokenRef } from './emit';
import { extractFamilySurface } from './process-utils';

// ── Types ──────────────────────────────────────────────────

export type ResolvedParentGeometry = {
  px: string;  // resolved padding-x
  py: string;  // resolved padding-y
  radius: string;        // resolved border-radius (all)
  radiusTL: string;
  radiusTR: string;
  radiusBR: string;
  radiusBL: string;
  borderWidth: string;   // resolved border-width (for inner radius calc + border mode)
};

// ── Parent geometry resolution ─────────────────────────────

/**
 * Resolves a parent element's padding and radius by walking the cascade:
 * L2 family → L3 element → L4 concept overrides.
 * Returns concrete CSS values (e.g. "var(--spacing-lg)").
 */
export function resolveParentGeometry(
  theme: Theme,
  parentName: string,
  conceptName?: string,
): ResolvedParentGeometry {
  const result: ResolvedParentGeometry = {
    px: '0px', py: '0px',
    radius: '0px', radiusTL: '', radiusTR: '', radiusBR: '', radiusBL: '',
    borderWidth: '0px',
  };

  const extract = (tokens: Record<string, unknown>) => {
    const interior = tokens.interior as Record<string, unknown> | undefined;
    if (interior) {
      const p = interior.padding as Record<string, unknown> | undefined;
      if (p) {
        if (p.all != null) { const v = resolveTokenRef(String(p.all), 'spacing'); result.px = v; result.py = v; }
        if (p.x != null) result.px = resolveTokenRef(String(p.x), 'spacing');
        if (p.y != null) result.py = resolveTokenRef(String(p.y), 'spacing');
      }
    }
    const boundary = tokens.boundary as Record<string, unknown> | undefined;
    if (boundary) {
      const border = boundary.border as Record<string, unknown> | undefined;
      if (border?.width != null) {
        result.borderWidth = resolveTokenRef(String(border.width), 'border-width');
      }
      const r = boundary.radius as Record<string, unknown> | undefined;
      if (r) {
        if (r.all != null) {
          const v = resolveTokenRef(String(r.all), 'radius');
          result.radius = v;
          result.radiusTL = v; result.radiusTR = v;
          result.radiusBR = v; result.radiusBL = v;
        }
        if (r.topLeft != null) result.radiusTL = resolveTokenRef(String(r.topLeft), 'radius');
        if (r.topRight != null) result.radiusTR = resolveTokenRef(String(r.topRight), 'radius');
        if (r.bottomRight != null) result.radiusBR = resolveTokenRef(String(r.bottomRight), 'radius');
        if (r.bottomLeft != null) result.radiusBL = resolveTokenRef(String(r.bottomLeft), 'radius');
      }
    }
  };

  const familyKey = ELEMENT_FAMILIES[parentName];
  if (familyKey && theme.families) {
    const familyTokens = (theme.families as Record<string, unknown>)[familyKey] as Record<string, unknown> | undefined;
    if (familyTokens) {
      const surface = extractFamilySurface(familyKey, familyTokens);
      if (surface) extract(surface);
    }
  }

  if (theme.elements) {
    const elementTokens = (theme.elements as Record<string, unknown>)[parentName] as Record<string, unknown> | undefined;
    if (elementTokens) {
      const surface = familyKey ? extractFamilySurface(familyKey, elementTokens) : elementTokens;
      if (surface) extract(surface);
    }
  }

  if (conceptName && theme.concepts) {
    const conceptTargets = (theme.concepts as Record<string, Record<string, unknown>>)[conceptName];
    if (conceptTargets) {
      const conceptTokens = conceptTargets[parentName] as Record<string, unknown> | undefined;
      if (conceptTokens) {
        const surface = (conceptTokens.surface as Record<string, unknown> | undefined) ?? conceptTokens;
        extract(surface);
      }
    }
  }

  if (!result.radiusTL) result.radiusTL = result.radius;
  if (!result.radiusTR) result.radiusTR = result.radius;
  if (!result.radiusBR) result.radiusBR = result.radius;
  if (!result.radiusBL) result.radiusBL = result.radius;

  return result;
}

// ── Smart bleed emission ───────────────────────────────────
// Only stamps border-radius on the child so its corners match
// the parent's inner radius. Padding/margin are the child's
// own responsibility — they are NOT touched here.

export function emitSmartBleed(
  parent: ResolvedParentGeometry,
  mode: 'normal' | 'rounded' | 'border' | 'border-rounded',
  childSelector: string,
): string[] {
  const rules: string[] = [];
  const bleedBorder = mode === 'border' || mode === 'border-rounded';
  const roundedInterior = mode === 'rounded' || mode === 'border-rounded';

  // Inner radius: for border modes the child sits on top of the border
  // so outer radius equals inner radius. Otherwise subtract border-width.
  const innerR = (outerR: string) => bleedBorder ? outerR : `calc(${outerR} - ${parent.borderWidth})`;

  rules.push([
    `${childSelector}:first-child {`,
    `  border-top-left-radius: ${innerR(parent.radiusTL)};`,
    `  border-top-right-radius: ${innerR(parent.radiusTR)};`,
    `  border-bottom-left-radius: ${roundedInterior ? innerR(parent.radiusBL) : '0'};`,
    `  border-bottom-right-radius: ${roundedInterior ? innerR(parent.radiusBR) : '0'};`,
    `}`,
  ].join('\n'));

  rules.push([
    `${childSelector}:last-child {`,
    `  border-top-left-radius: ${roundedInterior ? innerR(parent.radiusTL) : '0'};`,
    `  border-top-right-radius: ${roundedInterior ? innerR(parent.radiusTR) : '0'};`,
    `  border-bottom-left-radius: ${innerR(parent.radiusBL)};`,
    `  border-bottom-right-radius: ${innerR(parent.radiusBR)};`,
    `}`,
  ].join('\n'));

  rules.push([
    `${childSelector}:only-child {`,
    `  border-top-left-radius: ${innerR(parent.radiusTL)};`,
    `  border-top-right-radius: ${innerR(parent.radiusTR)};`,
    `  border-bottom-right-radius: ${innerR(parent.radiusBR)};`,
    `  border-bottom-left-radius: ${innerR(parent.radiusBL)};`,
    `}`,
  ].join('\n'));

  return rules;
}

// ── Icon zone bleed ────────────────────────────────────────

export function emitIconZoneBleed(
  parent: ResolvedParentGeometry,
  zone: 'start' | 'end',
  childSelector: string,
): string[] {
  const innerR = (outerR: string) => `calc(${outerR} - ${parent.borderWidth})`;

  if (zone === 'start') {
    return [[
      `${childSelector} {`,
      `  align-self: stretch;`,
      `  display: flex;`,
      `  align-items: center;`,
      `  margin-left: calc(-1 * ${parent.px});`,
      `  margin-top: calc(-1 * ${parent.py});`,
      `  margin-bottom: calc(-1 * ${parent.py});`,
      `  padding-left: ${parent.px};`,
      `  padding-top: ${parent.py};`,
      `  padding-bottom: ${parent.py};`,
      `  border-top-left-radius: ${innerR(parent.radiusTL)};`,
      `  border-bottom-left-radius: ${innerR(parent.radiusBL)};`,
      `  border-top-right-radius: 0;`,
      `  border-bottom-right-radius: 0;`,
      `}`,
    ].join('\n')];
  }

  return [[
    `${childSelector} {`,
    `  align-self: stretch;`,
    `  display: flex;`,
    `  align-items: center;`,
    `  margin-right: calc(-1 * ${parent.px});`,
    `  margin-top: calc(-1 * ${parent.py});`,
    `  margin-bottom: calc(-1 * ${parent.py});`,
    `  padding-right: ${parent.px};`,
    `  padding-top: ${parent.py};`,
    `  padding-bottom: ${parent.py};`,
    `  border-top-right-radius: ${innerR(parent.radiusTR)};`,
    `  border-bottom-right-radius: ${innerR(parent.radiusBR)};`,
    `  border-top-left-radius: 0;`,
    `  border-bottom-left-radius: 0;`,
    `}`,
  ].join('\n')];
}
