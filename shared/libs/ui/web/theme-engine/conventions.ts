// ============================================================
// CONVENTIONS — The minimal hardcoded knowledge
// ============================================================
//
// This is the ONLY file that encodes structural knowledge about
// the design system. Everything else is derived from the theme
// object at compile time.
//

// ── Family prefixes ─────────────────────────────────────────
// Maps family keys (from MorphologicalFamilies) to the short
// prefix used in the element attribute value.
// e.g. surfaceContainer → "surface" → element="surface--card"

export const FAMILY_PREFIXES: Record<string, string> = {
  surfaceContainer: 'surface',
  inlineSurface: 'surface',
  elevatedOverlay: 'overlay',
  interactiveControl: 'control',
  interactiveControlGroup: 'control-group',
  field: 'field',
  listContainer: 'list',
  tableElement: 'table',
  shape: 'shape',
  media: 'media',
};

// Table element keys use a custom attribute name to avoid redundant prefixing
// (e.g. tableHeaderCell → "table--header-cell" not "table--table-header-cell")
export const TABLE_ELEMENT_NAMES: Record<string, string> = {
  tableRoot: 'root',
  tableHeader: 'header',
  tableHeaderRow: 'header-row',
  tableHeaderCell: 'header-cell',
  tableBody: 'body',
  tableRow: 'row',
  tableCell: 'cell',
  tableFooter: 'footer',
  tableFooterRow: 'footer-row',
  tableFooterCell: 'footer-cell',
  tableCellContent: 'cell-content',
};

// ── Element → family mapping ────────────────────────────────
// Derived from the ELEMENTS table (ui/types/elements.ts), the law.

export const ELEMENT_FAMILIES: Record<string, string> = Object.fromEntries(
  Object.entries(ELEMENTS).map(([key, row]) => [key, FAMILY_KEY[row.family]]),
);

// ── Pseudo-states ───────────────────────────────────────────
// States handled by CSS pseudo-classes (not by [state] attribute).
// Everything else in states is a data-state handled by [state="X"].

// States the engine emits as pseudo-classes instead of [state=…] attributes.
export const PSEUDO_STATES = ['hover', 'active', 'focus'] as const;

// ── Family-specific defaults ────────────────────────────────
// Sensible defaults applied to families when the theme doesn't
// explicitly set them.

export const FAMILY_DEFAULTS: Record<string, Record<string, string>> = {
  interactiveControl: {
    'display': 'inline-flex',
    'align-items': 'center',
    'cursor': 'pointer',
    'transition-duration': '150ms',
    'overflow': 'hidden',
  },
  field: {
    'cursor': 'text',
    'transition-duration': '100ms',
  },
  // A list container stacks its items — without this, items that are
  // inline-flex controls (menu-item) flow horizontally.
  listContainer: {
    'display': 'flex',
    'flex-direction': 'column',
  },
};

// ── Element-specific defaults ───────────────────────────────
// Applied to specific element keys (not families) in L3 processing.

export const ELEMENT_DEFAULTS: Record<string, Record<string, string>> = {
  tableCellContent: {
    'display': 'flex',
    'align-items': 'center',
    'width': '100%',
    'height': '100%',
  },
};

// ── Markup dictionary — programmatic source of truth ────────

import { TypographyTypeKeyE } from '../../types/primitives';
import { ELEMENTS, FAMILY_KEY } from '../../types/elements';
import { EMPHASIS, STATUS, STATE, SCALE } from '../../types/axes';

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export const VALID_ELEMENT_VALUES: Set<string> = new Set(
  Object.entries(ELEMENT_FAMILIES).map(([elementKey, familyKey]) => {
    const prefix = FAMILY_PREFIXES[familyKey];
    if (familyKey === 'tableElement') {
      const name = TABLE_ELEMENT_NAMES[elementKey];
      return `${prefix}--${name ?? camelToKebab(elementKey)}`;
    }
    return `${prefix}--${camelToKebab(elementKey)}`;
  })
);

// Typography elements — separate from morphological ELEMENT_FAMILIES.
// element="type--heading1" etc. are valid but not surface/control/field/etc.
export const VALID_TYPOGRAPHY_ELEMENT_VALUES: Set<string> = new Set(
  Object.values(TypographyTypeKeyE).map(key => `type--${camelToKebab(key)}`)
);

export const VALID_LAYOUT_VALUES: Set<string> = new Set([
  // Shell variants
  'shell',
  'shell-top-nav',
  'shell-side-nav',
  'shell-none',
  'shell-nav',       // the side-nav child inside shell-side-nav
  // Page structure
  'page',
  'page-header',
  'second-page-header',
  'page-body',
  // Main column
  'main',
  'main-header',
  'second-main-header',
  'main-content',    // invisible row: main-body + context-panel
  'main-body',
  'main-footer',
  // Sidebars & panels
  'left-sidebar',
  'right-sidebar',
  'context-panel',
  // Container
  'container',
  // Utilities
  'scroll-area',
  'stack',
  'section',
  'row-section',
  'col-section',
]);

export const VALID_AXIS_VALUES: Record<string, Set<string>> = {
  emphasis: new Set<string>(EMPHASIS),
  status: new Set<string>(STATUS),
  state: new Set<string>(STATE),
  scale: new Set<string>(SCALE),
  // concept values are product-defined — open set, no validation
};

// ── Selector generation ─────────────────────────────────────

/** Family selector: [element^="surface--"] */
export function familySelector(familyKey: string): string {
  const prefix = FAMILY_PREFIXES[familyKey];
  if (!prefix) return '';
  return `[element^="${prefix}--"]`;
}

/** Element selector: [element="surface--card"] */
export function elementSelector(elementKey: string): string {
  const familyKey = ELEMENT_FAMILIES[elementKey];
  if (!familyKey) return '';
  const prefix = FAMILY_PREFIXES[familyKey];
  if (!prefix) return '';
  if (familyKey === 'tableElement') {
    const name = TABLE_ELEMENT_NAMES[elementKey];
    if (!name) return '';
    return `[element="${prefix}--${name}"]`;
  }
  return `[element="${prefix}--${camelToKebab(elementKey)}"]`;
}

/** Resolve a name (element key, family key, or layout key) to a CSS selector */
export function resolveSelector(name: string): string | undefined {
  // Try as element first
  const elSel = elementSelector(name);
  if (elSel) return elSel;
  // Try as family
  const famSel = familySelector(name);
  if (famSel) return famSel;
  // Try as layout (camelCase → kebab-case, e.g. leftSidebar → left-sidebar)
  const layoutKey = camelToKebab(name);
  if (VALID_LAYOUT_VALUES.has(layoutKey)) return `[layout="${layoutKey}"]`;
  return undefined;
}
