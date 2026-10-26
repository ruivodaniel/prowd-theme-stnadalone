import type { ColorRef, BorderWidthToken, BorderStyleToken } from '../primitives';
import type { SurfaceContainerTokens } from '../families';

// ============================================================
// THE WEB PART OF THE THEME
// What only a browser has: the cursor, the scrollbar, the focus outline,
// and the web's layout regions. Everything else a web theme authors is
// shared with mobile (primitives, families, elements, cascade).
// `hover`, the web-only state, is in axes.ts with the other states.
// ============================================================

/** the token keys only the web has, wherever they appear in a surface */
export const WEB_ONLY_TOKEN_KEYS = ["cursor", "scrollbar", "outline"] as const;
export type WebOnlyTokenKey = (typeof WEB_ONLY_TOKEN_KEYS)[number];

// ── Cursor ───────────────────────────────────────────────────

export type CursorToken =
  | 'auto' | 'default' | 'none' | 'pointer' | 'wait' | 'text'
  | 'move' | 'not-allowed' | 'crosshair' | 'grab' | 'grabbing'
  | 'help' | 'progress' | 'cell' | 'copy' | 'alias'
  | 'context-menu' | 'vertical-text' | 'no-drop' | 'all-scroll'
  | 'col-resize' | 'row-resize'
  | 'n-resize' | 's-resize' | 'e-resize' | 'w-resize'
  | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize'
  | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize'
  | 'zoom-in' | 'zoom-out';

// ── Outline ─────────────────────────────────────────────────

export type OutlineTokens = {
  width?: BorderWidthToken;
  style?: BorderStyleToken;
  color?: ColorRef;
  offset?: string;
};

// ── Scrollbar ───────────────────────────────────────────────

export type ScrollbarTokens = {
  thumbColor?: ColorRef;
  trackColor?: ColorRef;
  width?: string;
};

// ============================================================
// LAYOUT TYPES
// Theme tokens for structural layout regions.
//
// Layout regions carry layout="..." in the DOM. The theme
// engine styles them the same way it styles element surfaces.
// Dimension tokens (widths, heights, max-widths) are also
// owned here — not in components.
//
// Keyed in camelCase to match the rest of the theme DSL.
// The engine maps camelCase keys to kebab-case attributes:
//   pageHeader → [layout="page-header"]
// ============================================================

// ── Shared base ─────────────────────────────────────────────
// Every layout region can carry surface tokens.

type LayoutSurface = {
  surface?: SurfaceContainerTokens;
};

// ── Scale entries ─────────────────────────────────────────────

export type HeightScaleEntry = { height: string };
export type WidthScaleEntry = { width: string };

// ── Headers ───────────────────────────────────────────────────

export type HeaderScaleTokens = LayoutSurface & {
  /** Default height (no scale attr). */
  height?: string;
  sm?: HeightScaleEntry;
  md?: HeightScaleEntry;
  lg?: HeightScaleEntry;
};

// ── Sidebars ─────────────────────────────────────────────────

export type LeftSidebarTokens = LayoutSurface & {
  /** Default width (no scale attr). */
  width?: string;
  /** Width when collapsed. Omit to hide entirely on collapse. */
  widthCollapsed?: string;
  /** Surface override applied when state="collapsed". */
  collapsed?: LayoutSurface;
  sm?: WidthScaleEntry;
  md?: WidthScaleEntry;
  lg?: WidthScaleEntry;
};

export type SidebarTokens = LayoutSurface & {
  /** Default width (no scale attr). */
  width?: string;
  sm?: WidthScaleEntry;
  md?: WidthScaleEntry;
  lg?: WidthScaleEntry;
};

// ── Container ────────────────────────────────────────────────
// Defines the max-width for each named scale.
// `full` = no constraint (no token needed — layout component sets width: 100%).

export type ContainerScaleEntry = {
  maxWidth: string;
};

export type ContainerTokens = {
  xs?: ContainerScaleEntry;
  sm?: ContainerScaleEntry;
  md?: ContainerScaleEntry;
  lg?: ContainerScaleEntry;
  xl?: ContainerScaleEntry;
};

// ── Overlay sizes ─────────────────────────────────────────────
// Physical dimensions for elevated overlays.
// Surface/visual tokens stay in ElementTypes (dialog, drawer).

export type DialogScaleEntry = {
  maxWidth: string;
};

export type SheetScaleEntry = {
  /** Width for side sheets, height for bottom sheets. */
  size: string;
};

export type DialogScaleTokens = {
  sm?: DialogScaleEntry;
  md?: DialogScaleEntry;
  lg?: DialogScaleEntry;
};

export type SheetScaleTokens = {
  sm?: SheetScaleEntry;
  md?: SheetScaleEntry;
  lg?: SheetScaleEntry;
  full?: SheetScaleEntry;
};

// ============================================================
// THEME LAYOUTS — assembled map
// All fields optional: omit any region to inherit family
// defaults without dimension overrides.
// ============================================================

export type ThemeLayouts = {
  // Family-level default — applies to all layout regions (same as L2 for elements)
  surface?: SurfaceContainerTokens;

  // Emphasis variants — a region's shade over its own base (fills + text),
  // applied to any region carrying emphasis="…". The region's own rule keeps
  // its border edge; default (no attr) is the region as defined.
  emphasis?: {
    primary?: LayoutSurface;
    secondary?: LayoutSurface;
  };

  // Shell variants
  shell?: LayoutSurface;
  shellTopNav?: LayoutSurface;
  shellSideNav?: LayoutSurface;
  shellNone?: LayoutSurface;
  shellNav?: SidebarTokens;       // the nav col child inside shell-side-nav

  // Page structure
  page?: LayoutSurface;
  pageHeader?: HeaderScaleTokens;
  secondPageHeader?: HeaderScaleTokens;   // a second full-width row under the page header (e.g. the tabs)
  pageBody?: LayoutSurface;

  // Main column
  main?: LayoutSurface;
  mainHeader?: HeaderScaleTokens;
  secondMainHeader?: HeaderScaleTokens;   // a second row under the main header
  mainContent?: LayoutSurface;    // invisible row holding main-body + context-panel
  mainBody?: LayoutSurface;
  mainFooter?: HeaderScaleTokens;

  // Sidebars and panels
  leftSidebar?: LeftSidebarTokens;
  rightSidebar?: SidebarTokens;
  contextPanel?: SidebarTokens;

  // Container (width-constrained wrapper)
  container?: ContainerTokens;

  // Scroll area — scrollbar appearance only (structure is in the component)
  scrollArea?: {
    scrollbar?: ScrollbarTokens;
  };

  // Content organisation
  section?: LayoutSurface;
  rowSection?: LayoutSurface;
  colSection?: LayoutSurface;

  // Overlay dimensions (visual tokens live in elements.dialog / elements.drawer)
  dialog?: DialogScaleTokens;
  sheet?: SheetScaleTokens;
};
