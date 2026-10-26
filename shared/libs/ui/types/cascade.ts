import type { ColorRef } from './primitives';
import type { ElementKey, WebElementKey, ElementFamilyKey, ElementHasSizes } from './elements';
import type {
  SurfaceContainerTokens,
  ElevatedOverlayTokens,
  ListContainerTokens,
  InteractiveControlTokens,
  InteractiveControlGroupTokens,
  SwitchTokens,
  FieldTokens,
  InlineSurfaceTokens,
  ShapeTokens,
  MediaTokens,
  SeparatorTokens,
  SizeTokens,
} from './families';

// Table row extends surface with an optional alternating-row override
export type TableRowTokens = SurfaceContainerTokens & {
  alternating?: SurfaceContainerTokens;
};

// ============================================================
// SIZED ELEMENT WRAPPERS — kept for consumers; ElementTypes no longer uses it
// ============================================================

export type WithSizes<T> = T & { sizes?: SizeTokens };

// ============================================================
// L3 — ELEMENT TYPES — derived from the ELEMENTS table (elements.ts)
// Family decides the token shape, `sizes` adds the scale entries,
// four elements keep a shape of their own.
// ============================================================

type FamilyTokens = {
  surfaceContainer: SurfaceContainerTokens | InlineSurfaceTokens;   // bare, or wrapped in `surface`
  elevatedOverlay: ElevatedOverlayTokens;
  interactiveControl: InteractiveControlTokens;
  interactiveControlGroup: InteractiveControlGroupTokens;
  field: FieldTokens;
  listContainer: ListContainerTokens;
  tableElement: SurfaceContainerTokens;
  shape: ShapeTokens;
  media: MediaTokens;
};

type SpecialTokens = {
  switch: SwitchTokens;
  separator: SeparatorTokens;
  tableRow: TableRowTokens;
  tableFooterCell: TableRowTokens;
};

/** The engine reads these on any element: width when expanded, width when [collapsed]. */
type CollapsedWidths = { widthExpanded?: string; widthCollapsed?: string };

/** the token shape of one element, from its family (and its sizes). platform/mobile.ts derives mobile's from it. */
export type TokensOf<K extends ElementKey> =
  (K extends keyof SpecialTokens ? SpecialTokens[K] : FamilyTokens[ElementFamilyKey<K>])
  & (ElementHasSizes<K> extends true ? { sizes?: SizeTokens } : Record<never, never>)
  & CollapsedWidths;

/** what a WEB theme may author: the elements the table gives to the web (a mobile theme's are MobileElementTypes) */
export type ElementTypes = { [K in WebElementKey]?: TokensOf<K> };

// ============================================================
// L4 — CONCEPT OVERRIDES (product-specific)
// Keys can be family names (e.g. "surfaceContainer") or
// element names (e.g. "card"). Family-level concept overrides
// apply to all elements of that family; element-level overrides
// apply to that specific element only.
// ============================================================

export type ConceptOverrides = {
  [conceptName: string]: {
    [familyOrElementName: string]: SurfaceContainerTokens & {
      accent?: ColorRef;
      contextual?: Partial<ElementTypes>;
    };
  };
};

// ============================================================
// L5 — CONTEXTUAL OVERRIDES (parent → child, implicit DOM nesting)
// e.g. sidebar → header, dialog → button
// Child keys map to the same types as ElementTypes — each child
// is typed as its actual family shape, not a generic surface.
// ============================================================

export type ContextualOverrides = {
  [parentType: string]: Partial<ElementTypes>;
};

// ============================================================
// THEME RULES — arbitrary-depth cascade chains
// Expresses overrides that require more than 2 levels of
// ancestry, or concepts on multiple nodes in the chain.
// e.g. special page > knowledge card > header
// ============================================================

export type ChainSegment = {
  key: string;       // element name, layout name, or family name
  concept?: string;  // concept="X" present on this node
};

export type ThemeRule = {
  chain: readonly [ChainSegment, ...ChainSegment[]];
  tokens: SurfaceContainerTokens;
};
