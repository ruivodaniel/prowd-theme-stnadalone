#!/usr/bin/env tsx
// ============================================================
// BUILD — Compile theme objects into static CSS
// ============================================================
//
// Usage:
//   npx tsx shared/libs/ui/web/theme-engine/build.ts [--themes <dir>]
//
// A theme collection is a folder of <theme>/v<n>/theme.ts. Every theme@version
// compiles to its own <theme>/v<n>/generated/<theme>.css (+ <theme>-fonts.css),
// beside its source — the versioned CSS the consumers point at (the app through
// configs/theme, a slice-design project through its active.json). Defaults to
// shared/libs/ui/themes/; a caller may point --themes at another collection.
// One theme@version → one CSS file. All modes included, scoped by selector.
// No runtime JS. No duplication.
//

import { writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { themeToCSS, themeToFontsCSS } from './theme-process';
import type { Theme } from '../../types';

const ENGINE_DIR = dirname(new URL(import.meta.url).pathname);
const argOf = (flag: string): string | undefined => {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const THEMES_DIR = resolve(process.cwd(), argOf('--themes') ?? resolve(ENGINE_DIR, '../../themes'));
const ONLY = argOf('--only');   // regenerate a single theme (all its versions)

// Discover every <theme>/v<n>/theme.ts
const dirs = (p: string) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_')).map((d) => d.name) : []);
const versions: { theme: string; v: string; file: string }[] = [];
for (const theme of dirs(THEMES_DIR)) {
  if (ONLY && theme !== ONLY) continue;
  for (const v of dirs(join(THEMES_DIR, theme)).filter((x) => /^v\d+$/.test(x))) {
    const file = join(THEMES_DIR, theme, v, 'theme.ts');
    if (existsSync(file)) versions.push({ theme, v, file });
  }
}

if (!versions.length) console.warn(`  ⚠ no <theme>/v<n>/theme.ts under ${THEMES_DIR}`);

for (const { theme: dir, v, file } of versions) {
  const mod = await import(file);
  const theme = Object.values(mod).find((t): t is Theme =>
    t !== null && typeof t === 'object' && 'id' in t && 'families' in t
  );
  if (!theme) { console.warn(`  ⚠ ${dir}/${v}: no Theme export found, skipping`); continue; }
  // this engine emits CSS: a mobile theme is not its to build
  if (theme.platform === 'mobile') { console.log(`  ${dir}/${v}: a mobile theme — no CSS`); continue; }
  if (theme.id !== dir) console.warn(`  ⚠ ${dir}/${v}: theme.id is "${theme.id}" — the folder name is the id the consumers use`);

  const outDir = join(THEMES_DIR, dir, v, 'generated');
  mkdirSync(outDir, { recursive: true });
  const css = themeToCSS(theme);
  const fontsCSS = themeToFontsCSS(theme);
  writeFileSync(join(outDir, `${dir}.css`), css, 'utf-8');
  writeFileSync(join(outDir, `${dir}-fonts.css`), fontsCSS, 'utf-8');

  console.log(`  ${dir}/${v}/generated/${dir}.css: ${(css.length / 1024).toFixed(1)} KB, ${css.split('\n').length} lines · fonts ${(fontsCSS.length / 1024).toFixed(1)} KB`);
}
