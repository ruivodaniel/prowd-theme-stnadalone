// ============================================================
// THEME PROCESS — Shared utilities
// ============================================================

import type { EmittedDeclarations } from './emit';

// ── String conversion ──────────────────────────────────────

export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// ── CSS var helpers ────────────────────────────────────────

export type CssVarValue = string;

export function flattenToCssVars(
  obj: Record<string, unknown>,
  prefix: string,
): Record<string, CssVarValue> {
  const result: Record<string, CssVarValue> = {};
  const visit = (value: unknown, p: string) => {
    if (value === null || value === undefined) return;
    if (typeof value === 'string' || typeof value === 'number') { if (p) result[p] = String(value); return; }
    if (typeof value === 'boolean') { if (p) result[p] = value ? '1' : '0'; return; }
    if (Array.isArray(value)) return;
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) visit(v, p ? `${p}-${k}` : k);
    }
  };
  for (const [k, v] of Object.entries(obj)) visit(v, prefix ? `${prefix}-${k}` : k);
  return result;
}

export function typographyClamp(mobile: number, desktop: number): string {
  return `clamp(${mobile}px, calc(${mobile}px + 3vw), ${desktop}px)`;
}

// ── CSS Rule Formatting ────────────────────────────────────

export function formatRule(selector: string, decls: EmittedDeclarations): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(decls.vars)) lines.push(`  --${k}: ${v};`);
  for (const [k, v] of Object.entries(decls.props)) lines.push(`  ${k}: ${v};`);
  if (lines.length === 0) return '';
  return `${selector} {\n${lines.join('\n')}\n}`;
}

export function formatVarsRule(selector: string, vars: Record<string, CssVarValue>): string {
  const entries = Object.entries(vars);
  if (entries.length === 0) return '';
  return `${selector} {\n${entries.map(([p, v]) => `  --${p}: ${v};`).join('\n')}\n}`;
}

// ── Family surface extraction ──────────────────────────────
// Shared by cascade and smart-bleed (avoids circular dependency).

export function extractFamilySurface(familyKey: string, tokens: Record<string, unknown>): Record<string, unknown> | undefined {
  if (familyKey === 'surfaceContainer' || familyKey === 'tableElement') return (tokens.surface as Record<string, unknown> | undefined) ?? tokens;
  return tokens.surface as Record<string, unknown> | undefined;
}
