import type {
  ThemeColors,
  ThemeTypography,
  ThemeSpacing,
  ThemeRadius,
  ThemeEffects,
  ThemeTransitions,
  ThemeBorderWidths,
  ThemeIcons,
} from './primitives';
import type { GradientDef } from './families';
import type { MorphologicalFamilies } from './families';
import type {
  ElementTypes,
  ConceptOverrides,
  ContextualOverrides,
  ThemeRule,
} from './cascade';
import type { ThemeModes } from './modes';
import type { ThemeLayouts } from './platform/web';
import type {
  MobileFamilies,
  MobileElementTypes,
  MobileConceptOverrides,
  MobileContextualOverrides,
  MobileThemeRule,
  MobileLayouts,
  MobilePress,
  MobileTypography,
} from './platform/mobile';

// ============================================================
// THE THEME TYPE
// One type for the repo. A theme is for one platform and says which:
// a web theme and a mobile theme share the core and the shapes of
// every level, and each adds its own part (platform/web.ts, platform/mobile.ts).
// Two apps of one product wear two themes; they may share values by importing them.
// ============================================================

/** What every theme has, whatever its platform. */
export type ThemeCore = {
  id: string;
  name: string;
  /** version + fidelity live on the theme; the folder <name>/v<version> mirrors them */
  version?: number;
  type?: "wireframe" | "high-fidelity";
  kind?: "seed" | "product";

  // Named gradients (referenced as "gradient-NAME" in background tokens)
  gradients?: Record<string, GradientDef>;

  // Primitives
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  effects: ThemeEffects;
  transitions: ThemeTransitions;
  borderWidths: ThemeBorderWidths;
  icons?: ThemeIcons;

  // Modes (cross-cutting baseline)
  modes: ThemeModes;
};

/** A theme for the web. `platform` absent means web. */
export type WebTheme = ThemeCore & {
  platform?: "web";

  typography: ThemeTypography;

  // L2 — Morphological family defaults
  families: MorphologicalFamilies;

  // L3 — Element type overrides (only deltas)
  elements: ElementTypes;

  // L4 — Concept overrides (product-specific)
  concepts?: ConceptOverrides;

  // L5 — Contextual overrides (parent → child)
  contextual?: ContextualOverrides;

  // L6 — Arbitrary-depth chain rules (concepts on multiple levels)
  rules?: ThemeRule[];

  // Layout regions — surface tokens + dimension tokens
  layouts?: ThemeLayouts;
};

/** A theme for mobile: the same levels, in mobile's shapes, plus what only a phone has. */
export type MobileTheme = ThemeCore & {
  platform: "mobile";

  typography: MobileTypography;

  families: MobileFamilies;
  elements: MobileElementTypes;
  concepts?: MobileConceptOverrides;
  contextual?: MobileContextualOverrides;
  rules?: MobileThemeRule[];

  // A screen's regions — surface tokens + dimension tokens
  layouts?: MobileLayouts;

  // What a touch shows
  press?: MobilePress;
};

export type Theme = WebTheme | MobileTheme;
