import type { ColorRef, FontStyle, FontWeight, ThemeTypography } from '../primitives';
import type { MobileState } from '../axes';
import type { MobileElementKey } from '../elements';
import type {
  CombinedWhere,
  SurfaceContainerTokens,
  ElevatedOverlayTokens,
  ListContainerTokens,
  InteractiveControlTokens,
  InteractiveControlGroupTokens,
  FieldTokens,
  ShapeTokens,
  MediaTokens,
  FamilySizes,
} from '../families';
import type { ChainSegment, TokensOf } from '../cascade';
import type { WebOnlyTokenKey, HeightScaleEntry, DialogScaleTokens, SheetScaleTokens } from './web';

// ============================================================
// THE MOBILE PART OF THE THEME
// A mobile theme authors the same shapes as a web theme — the same
// primitives, families, elements and cascade — with three differences:
//   · the tokens only the web has are not there (cursor, scrollbar, outline)
//   · its states are mobile's (no `hover`; `long-pressed`, `swiped`)
//   · its elements are the ones the ELEMENTS table gives to mobile
// and it adds what only a phone has: its own layout regions, press
// feedback, safe areas, and fonts as bundled files.
// ============================================================

/** where a combined override applies, on mobile: mobile's states in place of the web's */
export type MobileCombinedWhere = Omit<CombinedWhere, 'state'> & { state?: 'default' | MobileState };

/** A shared token shape as a mobile theme may author it: the web-only keys removed at every depth,
 *  and every `where` taking mobile's states. The shape is derived, never written twice. */
export type MobileTokens<T> =
  T extends readonly (infer U)[] ? MobileTokens<U>[]
  : T extends object ? {
      [K in keyof T as K extends WebOnlyTokenKey ? never : K]:
        K extends 'where' ? MobileCombinedWhere : MobileTokens<T[K]>;
    }
  : T;

// ── L2 — the families, for mobile ───────────────────────────
export type MobileFamilies = {
  surfaceContainer?: MobileTokens<SurfaceContainerTokens & FamilySizes>;
  elevatedOverlay?: MobileTokens<ElevatedOverlayTokens & FamilySizes>;
  listContainer?: MobileTokens<ListContainerTokens & FamilySizes>;
  interactiveControl?: MobileTokens<InteractiveControlTokens & FamilySizes>;
  interactiveControlGroup?: MobileTokens<InteractiveControlGroupTokens & FamilySizes>;
  field?: MobileTokens<FieldTokens & FamilySizes>;
  shape?: MobileTokens<ShapeTokens & FamilySizes>;
  media?: MobileTokens<MediaTokens & FamilySizes>;
};

// ── L3 — the elements mobile has (ELEMENTS, platform column) ─
export type MobileElementTypes = { [K in MobileElementKey]?: MobileTokens<TokensOf<K>> };

// ── L4 · L5 · L6 — the cascade, for mobile ───────────────────
export type MobileConceptOverrides = {
  [conceptName: string]: {
    [familyOrElementName: string]: MobileTokens<SurfaceContainerTokens> & {
      accent?: ColorRef;
      contextual?: Partial<MobileElementTypes>;
    };
  };
};
export type MobileContextualOverrides = { [parentType: string]: Partial<MobileElementTypes> };
export type MobileThemeRule = {
  chain: readonly [ChainSegment, ...ChainSegment[]];
  tokens: MobileTokens<SurfaceContainerTokens>;
};

// ── Layout regions ───────────────────────────────────────────
// A screen's own regions. They are not the web's: an app bar is not a page header.

/** the edges of the device a region keeps clear of (the status bar, the home indicator, the notch) */
export type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right';

export type MobileRegionTokens = {
  surface?: MobileTokens<SurfaceContainerTokens>;
  safeArea?: readonly SafeAreaEdge[];
};
export type MobileBarTokens = MobileRegionTokens & {
  /** Default height (no scale attr). */
  height?: string;
  sm?: HeightScaleEntry;
  md?: HeightScaleEntry;
  lg?: HeightScaleEntry;
};

export type MobileLayouts = {
  // Family-level default — applies to all regions
  surface?: MobileTokens<SurfaceContainerTokens>;

  /** the whole screen */
  screen?: MobileRegionTokens;
  /** the bar at the top: a title with its actions, a back button, or cancel and save */
  appBar?: MobileBarTokens;
  /** the content, the one region that scrolls */
  body?: MobileRegionTokens;
  /** a bar fixed above the tab bar, for the screen's main action */
  actionBar?: MobileBarTokens;
  /** the navigation at the bottom */
  tabBar?: MobileBarTokens;
  /** the panel that slides in from the side */
  drawer?: MobileRegionTokens & { width?: string };

  // Overlay dimensions (visual tokens live in elements.dialog / elements.sheet)
  dialog?: DialogScaleTokens;
  sheet?: SheetScaleTokens;
};

// ── Press feedback ───────────────────────────────────────────
// What a touch shows beside the `active` state: iOS dims, Android ripples.

export type MobilePress = {
  /** the opacity of a pressed element (iOS) */
  opacityDim?: number;
  /** the ripple of a pressed element (Android) */
  ripple?: { color?: ColorRef; borderless?: boolean };
};

// ── Fonts ────────────────────────────────────────────────────
// A phone loads no font by URL: the files ship in the app.

export type FontSourceBundled = {
  type: 'bundled';
  faces: Array<{
    weight: FontWeight;
    style?: FontStyle;
    /** the font file in the app's assets */
    asset: string;
  }>;
};

export type MobileTypography = Omit<ThemeTypography, 'fontSources'> & {
  fontSources?: Record<string, FontSourceBundled>;
};
