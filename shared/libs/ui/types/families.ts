import type {
  ColorRef,
  SpacingToken,
  RadiusToken,
  EffectToken,
  EffectLayer,
  TextEffectLayer,
  BorderWidthToken,
  BorderStyleToken,
  TypographyTypeKey,
  TransitionDurationToken,
  TransitionTimingToken,
  BlurToken,
} from './primitives';
// the tokens only the web has; a mobile theme cannot author them (platform/mobile.ts → MobileTokens)
import type { CursorToken, OutlineTokens, ScrollbarTokens } from './platform/web';
import type { Emphasis, Status, State, Sibling, Scale } from './axes';

// ============================================================
// PRIMITIVE DIMENSIONAL TYPES
// ============================================================

export type SeparatorDimension = 'fill' | 'none' | `${number}px`;

// ============================================================
// FOUNDATIONAL TYPES
// ============================================================

// ── Animation ───────────────────────────────────────────────

export type AnimationTokens = {
  name?: string;
  duration?: string;
  timing?: string;
  iterationCount?: string;
  direction?: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse';
};

// ── Border Side ─────────────────────────────────────────────

export type BorderSideTokens = {
  width?: BorderWidthToken;
  style?: BorderStyleToken;
  color?: ColorRef;
};

// ── Border ──────────────────────────────────────────────────

export type BorderTokens = {
  width?: BorderWidthToken;
  style?: BorderStyleToken;
  color?: ColorRef;
  top?: BorderSideTokens;
  right?: BorderSideTokens;
  bottom?: BorderSideTokens;
  left?: BorderSideTokens;
};

// ── Radius ──────────────────────────────────────────────────

export type RadiusTokens = {
  all?: RadiusToken;
  topLeft?: RadiusToken;
  topRight?: RadiusToken;
  bottomRight?: RadiusToken;
  bottomLeft?: RadiusToken;
};

// ── Boundary (outer capsule) ────────────────────────────────

export type MarginTokens = {
  all?: SpacingToken | 'auto';
  x?: SpacingToken | 'auto';
  y?: SpacingToken | 'auto';
  top?: SpacingToken | 'auto';
  right?: SpacingToken | 'auto';
  bottom?: SpacingToken | 'auto';
  left?: SpacingToken | 'auto';
};

export type BoundaryTokens = {
  border?: BorderTokens;
  radius?: RadiusTokens;
  effect?: EffectToken | EffectLayer[];
  outline?: OutlineTokens;
  margin?: MarginTokens;
};

// ── Padding ─────────────────────────────────────────────────

export type PaddingTokens = {
  all?: SpacingToken;
  x?: SpacingToken;
  y?: SpacingToken;
  top?: SpacingToken;
  right?: SpacingToken;
  bottom?: SpacingToken;
  left?: SpacingToken;
};

// ── Gap ─────────────────────────────────────────────────────

export type GapTokens = {
  all?: SpacingToken;
  h?: SpacingToken;
  v?: SpacingToken;
};

// ── Interior ────────────────────────────────────────────────

// ── Gradients ────────────────────────────────────────────────

export type GradientStop = {
  color: ColorRef | 'transparent';
  position?: string;
};

// A single CSS gradient function (linear, radial, or conic).
export type GradientLayer =
  | { type: 'linear'; angle: number | string; stops: GradientStop[] }
  | { type: 'radial'; shape?: 'circle' | 'ellipse'; position?: string; stops: GradientStop[] }
  | { type: 'conic'; angle?: number; position?: string; stops: GradientStop[] };

// A gradient definition is either a single layer or a stack of layers.
// Stacked layers are emitted as comma-separated CSS background values —
// the standard technique for mesh/blob effects using multiple radial-gradients.
export type GradientDef = GradientLayer | GradientLayer[];

// ── Interior ────────────────────────────────────────────────

export type InteriorSelfTokens = {
  background?: ColorRef | GradientDef;
  backgroundAlpha?: number;
  foreground?: ColorRef;
  padding?: PaddingTokens;
  opacity?: number;
  scrollbar?: ScrollbarTokens;
};

// ── Child Align ──────────────────────────────────────────────
// Works for both flex containers (justify-content / align-items)
// and block text (text-align / vertical-align).
// Values match CSS logical keywords intentionally.

export type ChildAlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type ChildAlignTokens = {
  /** Horizontal axis: text-align for block, justify-content for flex-row, align-items for flex-col */
  horizontal?: ChildAlignValue;
  /** Vertical axis: align-items for flex-row, justify-content for flex-col */
  vertical?: ChildAlignValue;
};

export type InteriorChildrenTokens = {
  gap?: GapTokens;
  separator?: 'none' | SeparatorTokens;
  childAlign?: ChildAlignTokens;
};

export type InteriorTokens = InteriorSelfTokens & InteriorChildrenTokens;

// ── Default Typography ──────────────────────────────────────
// The typography a surface uses for its own text content.
// Sets a pointer to a root type scale and/or text treatments.
// Does NOT own color — color comes from interior.foreground.

export type TypographyTokens = {
  typographyType?: TypographyTypeKey;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'baseline';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'line-through';
  textEffect?: TextEffectLayer[];
};

// ── Transition ──────────────────────────────────────────────

export type TransitionTokens = {
  duration?: TransitionDurationToken;
  timing?: TransitionTimingToken;
};

// ============================================================
// SURFACE CONTAINER — THE UNIVERSAL BASE
// ============================================================

export type DimensionPositionTokens = {
  width?: string;
  height?: string;
  translateX?: string;
  translateY?: string;
};

export type SurfaceContainerTokens = {
  boundary?: BoundaryTokens;
  interior?: InteriorTokens;
  dimensionPosition?: DimensionPositionTokens;
  defaultTypography?: TypographyTokens;
  tint?: ColorRef;
  cursor?: CursorToken;
  smartBleed?: 'normal' | 'rounded' | 'border' | 'border-rounded' | false;
  transition?: TransitionTokens;
  combined?: CombinedEntry[];
};

// ============================================================
// COMBINED AXIS OVERRIDES
// ============================================================

export type PartialSurfaceTokens = Omit<SurfaceContainerTokens, 'combined'>;

export type StateKey = 'default' | State;
export type StatusKey = Status;
export type EmphasisKey = Emphasis;

/** the theme key stays `position` (authored in themes); the type is the sibling order */
export type PositionKey = Sibling;

export type CombinedWhere = {
  state?: StateKey;
  status?: StatusKey;
  emphasis?: EmphasisKey;
  position?: PositionKey;
};

export type CombinedEntry = {
  where: CombinedWhere;
  partialSurface?: PartialSurfaceTokens;
  transition?: TransitionTokens;
  animation?: AnimationTokens;
};

// ============================================================
// SEPARATOR — Surface + dimensions
// ============================================================

export type SeparatorTokens = {
  surface?: SurfaceContainerTokens;
  height?: SeparatorDimension;
  width?: SeparatorDimension;
};

// ============================================================
// MORPHOLOGICAL FAMILIES — Surface Container + Delta
// ============================================================

// ── Overlay ─────────────────────────────────────────────────

export type OverlayTokens = {
  scrimColor?: ColorRef;
  scrimOpacity?: number;
  scrimBlur?: string;
  entranceAnimation?: AnimationTokens;
  exitAnimation?: AnimationTokens;
};

// ── 1. Elevated Overlay ─────────────────────────────────────

export type ElevatedOverlayTokens = {
  surface?: SurfaceContainerTokens;
  overlay?: OverlayTokens;
};

// ── 2. List Container ───────────────────────────────────────

export type ListContainerTokens = {
  surface?: SurfaceContainerTokens;
  row?: SurfaceContainerTokens;
  cell?: SurfaceContainerTokens;
  separator?: SeparatorTokens;
  alternating?: SurfaceContainerTokens;
};

// ── 3. Interactive Control ──────────────────────────────────

export type InteractiveControlTokens = {
  surface?: SurfaceContainerTokens;
  startIcon?: SurfaceContainerTokens;
  endIcon?: SurfaceContainerTokens;
};

// ── 3b. Switch (two-surface: track + thumb) ─────────────────

export type SwitchTokens = {
  track?: SurfaceContainerTokens;  // the pill — changes on checked/unchecked
  thumb?: SurfaceContainerTokens;  // the sliding circle
};

// ── 4. Interactive Control Group ────────────────────────────

export type InteractiveControlGroupTokens = {
  surface?: SurfaceContainerTokens;
};

// ── 5. Field ────────────────────────────────────────────────

export type FieldTokens = {
  surface?: SurfaceContainerTokens;
  startIcon?: SurfaceContainerTokens;
  endIcon?: SurfaceContainerTokens;
  placeholderColor?: ColorRef;
  placeholderOpacity?: number;
  obfuscation?: {
    character?: string;
    letterSpacing?: string;
    fontSize?: string;
  };
  caretColor?: ColorRef;
};

// ── 6. Inline Surface ───────────────────────────────────────
// badge, avatar, spinner, skeleton, progress
// Same surface: wrapper pattern as all other families.

export type InlineSurfaceTokens = {
  surface?: SurfaceContainerTokens;
};

// ── 7. Shape ────────────────────────────────────────────────

export type ShapeTokens = {
  surface?: SurfaceContainerTokens;
};

// ── 7. Media ────────────────────────────────────────────────

export type MediaTokens = {
  surface?: SurfaceContainerTokens;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;   // e.g. "center", "top", "50% 20%"
  aspectRatio?: string;      // e.g. "16/9", "1/1", "4/3"
  overlay?: {
    color?: ColorRef;
    opacity?: number;        // 0–1
    blur?: string;           // e.g. "4px"
  };
  filter?: {
    grayscale?: number;      // 0–1
    brightness?: number;     // e.g. 0.8, 1.2
    contrast?: number;       // e.g. 0.9, 1.1
    blur?: string;           // e.g. "2px"
  };
};

// ============================================================
// SIZE VARIANTS
// ============================================================

export type SizeToken = Scale;

export type IconSizeRef = SizeToken | 'inherit';

export type SizeEntry = {
  partialSurface?: PartialSurfaceTokens;
  icon?: { size?: IconSizeRef; weight?: number };
};

export type SizeTokens = Partial<Record<SizeToken, SizeEntry>>;

// ============================================================
// COLLECTED L2 DEFAULTS
// ============================================================

// A family may author a `sizes` block — per-scale defaults every element in the
// family inherits (padding, typography, icon size…). Elements override with
// their own `sizes` on more specific selectors.
export type FamilySizes = { sizes?: SizeTokens };

export type MorphologicalFamilies = {
  surfaceContainer?: SurfaceContainerTokens & FamilySizes;
  elevatedOverlay?: ElevatedOverlayTokens & FamilySizes;
  listContainer?: ListContainerTokens & FamilySizes;
  interactiveControl?: InteractiveControlTokens & FamilySizes;
  interactiveControlGroup?: InteractiveControlGroupTokens & FamilySizes;
  field?: FieldTokens & FamilySizes;
  shape?: ShapeTokens & FamilySizes;
  media?: MediaTokens & FamilySizes;
};
