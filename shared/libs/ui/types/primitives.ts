// ============================================================
// PRIMITIVE TOKEN TYPES
// Colors, Typography, Spacing, Radius, Effects, Transitions, Border Widths
// ============================================================

import type { Scale } from './axes';

// ── Colors ───────────────────────────────────────────────────

export type RawColor = string;

// ── Primitive Color References ────────────────────────────────

import type { DerivedColorRef } from './derivations';
import type { SemanticColorRef } from './semantics';

export type PrimitiveColorRef =
  | `main-${'white' | 'black'}`
  | `brand-${BrandSlot}`
  | `status-${StatusColor}`
  | `flat-${FlatColor | 'white' | 'black'}`;

export type ColorRef =
  | PrimitiveColorRef
  | DerivedColorRef
  | SemanticColorRef
  | 'transparent'
  | 'currentColor'
  | 'inherit';

export type Color = ColorRef | RawColor;

export const BrandSlotE = {
  One: '1',
  Two: '2',
  Three: '3',
  Four: '4',
} as const;
export type BrandSlot = (typeof BrandSlotE)[keyof typeof BrandSlotE];

export const StatusColorE = {
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
} as const;
export type StatusColor = (typeof StatusColorE)[keyof typeof StatusColorE];

export const FlatColorE = {
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Lime: 'lime',
  Green: 'green',
  Mint: 'mint',
  Turquoise: 'turquoise',
  Blue: 'blue',
  Violet: 'violet',
  Purple: 'purple',
  Pink: 'pink',
} as const;
export type FlatColor = (typeof FlatColorE)[keyof typeof FlatColorE];

export type ThemeColorsDerivation = {
  brandLightAmount: number;
  brandDarkAmount: number;
  statusLightAmount: number;
  statusDarkAmount: number;
  grayColorMixPercentage: string;
  flatSaturationAdjust: number;
};

export type ThemeSemanticTokens = {
  primary: ColorRef;
  secondary: ColorRef;
  accent: ColorRef;
  muted: ColorRef;
};

export type ThemeColors = {
  main: { white: RawColor; black: RawColor };
  brand: Record<BrandSlot, RawColor>;
  status: Record<StatusColor, ColorRef | RawColor>;
  flat: Record<FlatColor, RawColor>;
  semanticTokens: ThemeSemanticTokens;
};

// ── Typography ───────────────────────────────────────────────

export type FontWeight = 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500 | 550 | 600 | 650 | 700 | 750 | 800 | 850 | 900;   // steps of 50 — variable fonts and Plex ship 450-style intermediate weights
export type FontStyle = 'normal' | 'italic';

export const FontFamilyTokenE = {
  Primary: 'primary',
  Secondary: 'secondary',
  Quote: 'quote',
  MonoPrimary: 'monoPrimary',
  MonoSecondary: 'monoSecondary',
} as const;
export type FontFamilyToken = (typeof FontFamilyTokenE)[keyof typeof FontFamilyTokenE];

export type TypographyLevel = {
  fontFamily: FontFamilyToken;
  fontStyle: FontStyle;
  fontSizeMobile: number;
  fontSizeDesktop: number;
  fontWeight: FontWeight;
  lineHeight: number;
  letterSpacing?: string;
};

export const TypographyTypeKeyE = {
  Heading1: 'heading1',
  Heading2: 'heading2',
  Heading3: 'heading3',
  Heading4: 'heading4',
  BodyExtraLarge: 'bodyExtraLarge',
  BodyLarge: 'bodyLarge',
  Body: 'body',
  BodySmall: 'bodySmall',
  BodyExtraSmall: 'bodyExtraSmall',
  QuoteLarge: 'quoteLarge',
  Quote: 'quote',
  QuoteSmall: 'quoteSmall',
  Code: 'code',
  NumbersExtraLarge: 'numbersExtraLarge',
  NumbersLarge: 'numbersLarge',
  Numbers: 'numbers',
  NumbersSmall: 'numbersSmall',
  NumbersExtraSmall: 'numbersExtraSmall',
  Link: 'link',
} as const;
export type TypographyTypeKey = (typeof TypographyTypeKeyE)[keyof typeof TypographyTypeKeyE];

// ── Font Sources ─────────────────────────────────────────────

export type FontSourceGoogle = {
  type: 'google';
  /** Full Google Fonts CSS URL (includes weights/styles needed) */
  url: string;
};

export type FontSourceLocal = {
  type: 'local';
  faces: Array<{
    weight: FontWeight;
    style?: FontStyle;
    /** Path to woff/woff2 file, relative to generated CSS output */
    src: string;
  }>;
};

export type FontSource = FontSourceGoogle | FontSourceLocal;

export type ThemeTypography = {
  fonts: Record<FontFamilyToken, string>;
  /**
   * Font loading config keyed by font family name (e.g. "Inter").
   * The engine emits @import for Google fonts, @font-face for local fonts.
   * Fonts not listed here are assumed to be system fonts or already loaded.
   */
  fontSources?: Record<string, FontSource>;
  types: Record<TypographyTypeKey, TypographyLevel>;
};

// ── Spacing ──────────────────────────────────────────────────
// One vocabulary for anything on the size axis: 'none' + the 9 SCALE steps.
// 'xxs' and 'xxl' are kept as deprecated aliases so the app's theme-editor
// keeps compiling until it is migrated; new authoring uses '2xs' / '2xl'.

export type SpacingToken = 'none' | Scale | 'xxs' | 'xxl';
export const SpacingTokenE = {
  None: 'none',
  _3xs: '3xs', _2xs: '2xs',
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
  _2xl: '2xl', _3xl: '3xl',
  /** @deprecated use '2xs' */ Xxs: 'xxs',
  /** @deprecated use '2xl' */ Xxl: 'xxl',
} as const;

export type ThemeSpacing = { unit: number };

// ── Radius ───────────────────────────────────────────────────
// Same size axis + 'full' (semantically distinct: as round as possible).

export type RadiusToken = 'none' | 'full' | Scale;
export const RadiusTokenE = {
  None: 'none',
  _3xs: '3xs', _2xs: '2xs',
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
  _2xl: '2xl', _3xl: '3xl',
  Full: 'full',
} as const;

// Themes may author only the tokens they use; missing ones just don't emit a css var.
export type ThemeRadius = Partial<Record<RadiusToken, string>>;

// ── Effects ──────────────────────────────────────────────────

export type EffectToken = string;

export type DropShadowEffect = {
  type: 'drop-shadow';
  x: number;
  y: number;
  blur: number;
  spread?: number;
  color: Color;
  opacity?: number;
};

export type InnerShadowEffect = {
  type: 'inner-shadow';
  x: number;
  y: number;
  blur: number;
  spread?: number;
  color: Color;
  opacity?: number;
};

export type BackdropBlurEffect = {
  type: 'backdrop-blur';
  blur: string;
  saturation?: string;
  brightness?: string;
  contrast?: string;
};

export type LayerBlurEffect = {
  type: 'layer-blur';
  blur: string;
};

export type NoiseEffect = {
  type: 'noise';
  opacity?: number;
  density?: number;
  blend?: string;
};

export type GlassEffect = {
  type: 'glass';
  blur: string;
  saturation?: string;
  tint?: ColorRef;
  tintOpacity?: number;
};

export type EffectLayer =
  | DropShadowEffect
  | InnerShadowEffect
  | BackdropBlurEffect
  | LayerBlurEffect
  | NoiseEffect
  | GlassEffect;

export type EffectLayerType = EffectLayer['type'];

export type ThemeEffects = Record<string, EffectLayer[]>;

export type TextEffectLayer = {
  type: 'text-shadow';
  x: number;
  y: number;
  blur: number;
  color: Color;
  opacity?: number;
};

// ── Blur ─────────────────────────────────────────────────────

export type BlurToken = 'none' | Scale;

// ── Transitions ──────────────────────────────────────────────

export type TransitionDurationToken = 'extraFast' | 'fast' | 'average' | 'slow' | 'extraSlow';
export type TransitionTimingToken = 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';

export type ThemeTransitions = {
  duration: Record<TransitionDurationToken, string>;
  timing: Record<TransitionTimingToken, string>;
};

// ── Border Widths ────────────────────────────────────────────

export const BorderWidthTokenE = {
  None: 'none',
  ExtraThin: 'extraThin',
  Thin: 'thin',
  Default: 'default',
  Thick: 'thick',
  ExtraThick: 'extraThick',
} as const;
export type BorderWidthToken = (typeof BorderWidthTokenE)[keyof typeof BorderWidthTokenE];

export type ThemeBorderWidths = Record<BorderWidthToken, string>;

export type BorderStyleToken = 'solid' | 'dashed' | 'dotted' | 'none';

// ── Icons ────────────────────────────────────────────────────

export type IconSetId = 'lucide' | 'heroicons' | 'phosphor' | 'custom';

export type ThemeIcons = {
  set: IconSetId;
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  weight: number;
};
