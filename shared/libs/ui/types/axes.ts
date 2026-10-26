// ============================================================
// AXES — the attribute vocabularies, one source of truth
// ============================================================
//
// The theme authors against these sets, the engine emits and validates
// against them, every component types its axis props from them.
// Nothing narrows or extends them anywhere else.

export const EMPHASIS = ["hero", "primary", "secondary", "tertiary", "quiet"] as const;
export const STATUS = ["neutral", "info", "success", "warning", "error", "destructive"] as const;

/** The platforms a theme, an element or a state exists on. One type for the repo; a theme is for one platform. */
export const PLATFORM = ["web", "mobile"] as const;
export type Platform = (typeof PLATFORM)[number];

// States, in three parts: what both platforms have, what only the web has, what only mobile has.
// `active` is the element being pressed, on both. `long-pressed` is mobile's equivalent of `hover`:
// held down, the element reveals more. `swiped` is a row slid sideways, showing its actions.
export const STATE_SHARED = ["active", "focus", "selected", "disabled", "loading"] as const;
export const STATE_WEB_ONLY = ["hover"] as const;
export const STATE_MOBILE_ONLY = ["long-pressed", "swiped"] as const;

/** The web's states, in the order the web engine emits them. */
export const STATE = ["hover", "active", "focus", "selected", "disabled", "loading"] as const;
/** Mobile's states. */
export const STATE_MOBILE = [...STATE_SHARED, ...STATE_MOBILE_ONLY] as const;

export const SCALE = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;

/** Sibling order; the engine emits it as :first-child, :last-child, :nth-child(…). Never written in markup. Was POSITION; `position` is now the markup axis below. */
export const SIBLING = ["first", "last", "only", "middle", "even", "odd"] as const;

export type Emphasis = (typeof EMPHASIS)[number];
export type Status = (typeof STATUS)[number];
/** A web state. */
export type State = (typeof STATE)[number];
export type SharedState = (typeof STATE_SHARED)[number];
export type WebOnlyState = (typeof STATE_WEB_ONLY)[number];
export type MobileOnlyState = (typeof STATE_MOBILE_ONLY)[number];
export type MobileState = (typeof STATE_MOBILE)[number];
export type StateFor<P extends Platform> = P extends "mobile" ? MobileState : State;

// STATE is exactly the shared states plus the web-only ones: a mismatch is a compile error here.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;
const _webStatesAreSharedPlusWebOnly: Same<State, SharedState | WebOnlyState> = true;
void _webStatesAreSharedPlusWebOnly;
export type Sibling = (typeof SIBLING)[number];
export type Scale = (typeof SCALE)[number];


// ── position — where a surface stands in its parent and how much of it it takes ──
// Markup positions; the theme sizes. Every value is ONE fixed set of structural
// classes, mapped in web/components/src/lib/position.ts. Nothing else gets in: the
// list is the law. Compositions use Stack; a single surface uses `position`.
// `cols-N` is the only value about children (it turns the surface into N equal
// tracks); `span-N` is what a child inside it takes.
// Sunset: `className` on a library component is deprecated in favour of `position`. Documented, not enforced yet.
export const POSITION = [
  "fill", "hug",                                            // how much of the parent's main axis
  "start", "center", "end", "stretch",                      // where on the cross axis
  "clip",                                                   // may shrink below content and truncate
  "w-xs", "w-sm", "w-md", "w-lg", "w-xl",                   // one of five widths: a field, a column; which one is the page's choice, how wide each is is the library's
  "cols-2", "cols-3", "cols-4", "cols-6", "cols-12",        // this surface is N equal tracks
  "span-2", "span-3", "span-4", "span-5", "span-6", "span-7", "span-8", "span-9", "span-10", "span-11", "span-12",
] as const;
export type Position = (typeof POSITION)[number];
