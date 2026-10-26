// ============================================================
// MODES — cross-cutting modifiers
// Transform resolved values across all cascade levels.
// ============================================================

import type { PrimitiveColorRef, ThemeColorsDerivation } from './primitives';
import type { GrayStep } from './derivations';

/**
 * Only tokens that do NOT depend on --background/--foreground.
 * Derived grays (`gray-50`..`gray-950`) are excluded because they
 * are computed from these anchors — using them here would be circular.
 *
 * Raw hex values (e.g. `#1a1a1a`) are allowed for full control.
 */
export type ColorModeAnchorRef =
  | PrimitiveColorRef
  | `gray-pure-${GrayStep}`
  | `#${string}`;

export type ColorModePreset = {
  background: ColorModeAnchorRef;
  foreground: ColorModeAnchorRef;
  derivation: ThemeColorsDerivation;
};

export type ThemeColorScheme = Record<string, ColorModePreset>;
 
export const DensityE = {
  Compact: 'compact',
  Default: 'default',
  Spacious: 'spacious',
} as const;
export type Density = (typeof DensityE)[keyof typeof DensityE];

export const TextSizeE = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;
export type TextSize = (typeof TextSizeE)[keyof typeof TextSizeE];

export type ThemeModes = {
  colorScheme: ThemeColorScheme;
  density?: Density;
  textSize?: TextSize;
};
