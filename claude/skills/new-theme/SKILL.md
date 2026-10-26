---
name: new-theme
description: Author or change a theme of the ui library (shared/libs/ui/themes/<id>/v<n>/theme.ts), for the web or for mobile, from a target design — HTML+CSS preferred, images second. Start from a copy of Wireframe Stroke, declare from the most abstract layer to the most concrete, verify each layer in the design system before the next. Use when a product needs its own look, or a theme changes.
---

# New theme — abstract first, deltas only

Text law: `skills/artifact-text/SKILL.md` governs every word written here.

## The mindset

A theme is the **minimal set of declarations** that makes the library look like
the target. The engine cascades: L1 primitives → L2 families → L3 elements →
L4 concepts → L5 contextual → L6 rules. Each level declares only what it
changes from the one above. Almost everything a designer decides is **how a
surface looks** — background, border, radius, shadow, padding — so the
`surfaceContainer` family is where a theme is mostly written, and the element
level is where it is mostly *not*. A theme that names every element has been
authored at the wrong level.

## Read first — in this order

The UI docs are the docs database, read in the viewer:
`http://localhost:8901/docs/engine/viewer.html?e=doc%2F<id>` (the files are `docs/db/doc/<id>.json`).

- `ui-architecture` — families, the universal surface shape, tint, smart bleed, modes.
- `ui-cascade-spec` — what each level emits and in which order it wins.
- `ui-theme-authoring` — the object: the levels, the surface tokens, the axes
  (`combined` entries, their order), the families and their extras, the layouts,
  contextual and rules, mobile, build.
- `ui-markup-dictionary` — the element and axis names the markup carries.
- `shared/libs/ui/types/elements.ts` — **the law**: every element the theme may
  address, its family, its axes. Nothing outside this table can be themed.
- `shared/libs/ui/themes/wireframe-stroke/v<latest>/theme.ts` — the starting
  point for a web theme; `wireframe-stroke-mobile/v<latest>/theme.ts` for a
  mobile theme.
- `shared/libs/ui/themes/bounx/v1/theme.ts` and `bounx-mobile/v1/theme.ts` — a
  product's pair, authored from one target.

## One type, two platforms

A theme is for one platform: `platform: "mobile"`, or the web when absent. The
type is one (`ui/types/theme.ts`): both share the primitives, the modes, the
families, the elements and the cascade.

- A mobile theme has no `hover`, `cursor`, `scrollbar` or `outline`; it has
  the states `long-pressed` and `swiped`, the regions of a screen (`screen`,
  `appBar`, `body`, `actionBar`, `tabBar`, `drawer`) and `press`.
- A mobile theme addresses only the elements the table gives to mobile
  (`ui/types/elements.ts`, column `platform`). Writing a web-only key, state
  or element in a mobile theme does not compile.
- A product's web app and its mobile app each wear their own theme. To share
  values, the mobile theme imports them from the web theme
  (`colors: webTheme.colors`).

## The starting point: a copy of Wireframe Stroke

A new theme starts as a copy of the latest Wireframe Stroke of its platform.
A product with a web app and a mobile app copies both: `wireframe-stroke` to
`<id>` and `wireframe-stroke-mobile` to `<id>-mobile`.
Every surface there is `background` with a hairline, square corners and almost
no shadow. `families.surfaceContainer` is the first block a new theme rewrites;
everything below inherits.

## Inputs

- **The target** — HTML with its CSS (best: values are literal), else images.
- **A name** — the `id`; the folder is `themes/<id>/v1/`.

## Method — one layer at a time, verified before the next

Each step ends with a look at the design system: activate the theme for a
scratch project in **UX/UI → theme**, then walk **UX/UI → design system**
(foundations → components → patterns → layouts → check mode: whole pages, the
real test of a theme). `pnpm theme:watch` regenerates
on save; the live viewer re-reads the active theme without a reload.

0. **Scaffold.** Copy the latest `wireframe-stroke` (web) or
   `wireframe-stroke-mobile` (mobile) `theme.ts` to `themes/<id>/v1/theme.ts`.
   Set `id` (= the folder name), `name`, `version: 1`, `type: "high-fidelity"`,
   `kind: "product"`. Build once. Activate it. It looks like Wireframe Stroke —
   that is correct.
1. **Read the target.** Before touching the theme, write a table of what the
   target *is*: background and foreground anchors; brand colors; status
   colors; font family and the type scale it actually uses; spacing unit;
   radius scale; border widths; shadows; transition feel. Then map every
   visual pattern in the target's CSS to a row of `elements.ts`. A pattern
   with no row is a composition a slice builds, not a theme concern — say so
   and move on.
2. **L1 primitives + modes.** `colors`, `typography`, `spacing.unit`,
   `radius`, `borderWidths`, `effects`, `transitions`, `icons`; `modes` anchors
   and derivation amounts. Raw hex lives here and nowhere else. Check:
   foundations.
3. **L2 families — `surfaceContainer` first.** Replace the wireframe fill with
   the target's default surface: background, border, radius, effect, padding,
   gap, default typography, the `disabled` state. Then the family deltas, each
   only where it differs from `surfaceContainer`: `field` (placeholder, caret,
   states, status), `interactiveControl` (emphasis as a **pattern** with
   `tint`; status overrides `tint` only; states), `elevatedOverlay` (scrim,
   elevation), `listContainer` (row, cell, separator, alternating), `shape`,
   `media`. Scale belongs here as family `sizes`. Check: components, family
   by family — most fixtures should already be right.
4. **Layouts.** `layouts.surface` first, then only the regions the target
   sizes or paints differently (`pageHeader` height, `leftSidebar` width and
   surface, `container` max widths, `dialog` widths). Check: layouts.
5. **L3 elements.** Only what still differs from its family after step 3, one
   element at a time against its fixture. Never repeat a family value. An
   element block with more than a few lines means step 3 missed something —
   go back up.
6. **L4–L6 — concepts, contextual, rules.** Only for a product meaning the
   target shows (a `knowledge` card, a header that bleeds). Never to repair
   what a family should have set.
7. **Dark mode.** Anchors and derivation for `dark`; walk the catalog in dark.
   A theme that needs per-element dark overrides has its L1 wrong. The theme
   is not done before this walk.

Stop at any step when the target does not decide a value. Write no guess; note
what the target leaves open and ask.

## Colour

- A surface's fill is `background`; its text is `foreground`. The two swap in
  dark. A surface never names `main-white` or `main-black`.
- Text on a coloured fill (a brand, a status) is `smart-bw`: white or black,
  read from the fill.
- `main-white` and `main-black` are written only where the colour must not
  swap: the mode anchors and the shadows.
- A tinted ground (a warm paper, a cool gray) is a brand-tinted gray:
  `brand-<n>-gray-<step>`, with the amount in the mode's
  `grayColorMixPercentage`. It is not a raw colour and not the anchor, so it
  follows the mode.
- The soft fills are derived: `brand-<n>-light`, `status-<x>-light`, with the
  amounts in the mode's derivation.

## Build and activate

- `pnpm theme:build` builds every theme: a web theme to
  `generated/<id>.css`, a mobile theme to `generated/<id>.native.json`.
- A project names one theme per platform in `shared/themes/active.json`: the
  web theme at the top, the mobile theme under `mobile`. **UX/UI → theme**
  lists the two platforms side by side and sets each.
- The mobile engine does not emit concepts, contextual overrides, rules or
  gradients. It prints what it skipped and lists it in the output's
  `unsupported`.

## Changing a theme

- A small change is made in the theme's current version.
- For a larger change, ask the user whether it is a new version
  (`v<n+1>`, a new folder) before making it.

## Laws

- **Deltas only.** A value equal to the level above is not written.
- **Tint carries color; emphasis carries pattern.** `filled / outlined / ghost`
  are emphasis; `error / success / …` only re-tint them.
- **No pins.** A design never names a theme; the product's
  `shared/themes/active.json` is the one pointer.
- **`theme.id` is the folder name.**
- **Verify per layer**, not at the end. The catalog is the test.

## Output

`themes/<id>/v<n>/theme.ts`, compiled by `pnpm theme:build` to
`themes/<id>/v<n>/generated/` beside it; the L1 table from step 1 as a comment
at the top of the file. Activate it from **UX/UI → theme**.
