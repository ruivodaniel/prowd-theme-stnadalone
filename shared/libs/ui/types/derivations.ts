// ============================================================
// DERIVED COLOR REFERENCES
// Colors derived from primitives: gray scales, brand light/dark,
// status light/dark variants.
// ============================================================

import type { BrandSlot, StatusColor } from './primitives';

export type GrayStep = '50' | '100' | '150' | '200' | '250' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

export type DerivedColorRef =
  | 'smart-bw'
  | 'tint'
  | `brand-${BrandSlot}-${'light' | 'dark'}`
  | `brand-${BrandSlot}-gray-${GrayStep}`
  | `gray-${GrayStep}`
  | `gray-pure-${GrayStep}`
  | `status-${StatusColor}-${'light' | 'dark'}`;
