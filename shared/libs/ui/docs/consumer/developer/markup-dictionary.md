# Markup Dictionary

The contract between components/pages and the theme engine. Every valid
attribute, every valid value, and what you must not do.

---

## Attributes

A DOM node carries **either** `element` or `layout`, never both.
Axis attributes (`emphasis`, `status`, `state`, `scale`, `concept`) can
be added to either. `position` can be added to either as well: it is the markup
axis, not a theme one (see below).

```html
<button element="control--button" emphasis="primary" scale="md">Submit</button>
<div layout="main-body" concept="dashboard">...</div>
```

---

## Position

`position` says where a surface stands in its parent and how much of it it takes.
Markup positions; the theme sizes. Every value is one fixed set of structural
classes (`web/components/src/lib/position.ts`); the theme never reads the attribute.
Several values are space-separated.

| Value | Means | Classes |
|---|---|---|
| `fill` | grows into the leftover space of the parent's main axis, may shrink | `flex-1 min-w-0 min-h-0` |
| `hug` | as big as its content | `flex-none` |
| `start` `center` `end` `stretch` | where on the cross axis | `self-*` |
| `clip` | may shrink below its content and truncates | `min-w-0 truncate` |
| `w-xs` `w-sm` `w-md` `w-lg` `w-xl` | one of five widths, for a field or a column whose width is the page's choice | `w-40` `w-48` `w-60` `w-72` `w-96` |
| `cols-2` `cols-3` `cols-4` `cols-6` `cols-12` | this surface is N equal tracks (its children take `span-N`) | `grid grid-cols-N` |
| `span-2` … `span-12` | how many of the parent's tracks this child takes | `col-span-N` |

```html
<div element="surface--card" position="fill">…</div>
<div element="surface--panel" position="cols-4">
  <div element="surface--tile">1 of 4</div>
  <div element="surface--tile" position="span-3">3 of 4</div>
</div>
```

Real dimensions (a sidebar's width, a field's width, an avatar's size, a container's
measure), paddings and gaps are the theme's: a value, per element, per breakpoint.
Markup never carries a number, with one exception: `Stack`'s `gap` and `pad`, the spacing
of a composition, which take a number or a CSS length (layouts.md § Stack). Compositions
(a header over two columns over a footer) use `Stack`; a single surface uses `position`.
`className` and inline `style` are deprecated and are not a place for spacing or sizes.

**Sunset.** `className` on a library component is deprecated in favour of `position`.
It is still accepted; nothing enforces this yet. The migration of the pages comes later.

## Element Values

Format: `element="{family}--{element}"`. Generated from `shared/libs/ui/types/elements.ts` by
`shared/libs/ui/scripts/markup-dictionary-elements.ts`; do not edit by hand. Each row lists the axes the
element carries: `all` is the full set from `types/axes.ts`, `–` means the axis does not apply, anything
else is the subset. `concept` is always allowed. Typography identities (`type--…`) are a separate vocabulary.

### Surface (`surface--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `surface--checkbox-inner` | – | – | selected | – | inner: the check mark, follows the outer; appears on selected |
| `surface--switch-inner` | – | – | selected | – | inner: the thumb, follows the outer; moves with translateX on selected |
| `surface--radio-inner` | – | – | selected | – | inner: the dot, follows the outer; appears on selected |
| `surface--button-group-text` | – | – | – | – | part: a text cell inside the group |
| `surface--tab-panel` | – | – | loading | – | part: waits for content |
| `surface--breadcrumb-separator` | – | – | – | – | part |
| `surface--otp-separator` | – | – | – | – | part |
| `surface--input-group-addon` | – | – | hover active focus selected disabled | – | child: prefix, suffix, embedded button |
| `surface--calendar` | all | – | loading disabled | all | parent: the grid, sizes its days |
| `surface--label` | all | all | disabled | all | quiet or strong, error label, sized with its field |
| `surface--field-description` | – | all | disabled | – | hint under a field, informative |
| `surface--field-message` | – | all | – | – | the message is its status |
| `surface--card` | all | all | all | all | everything: competes, a card in error, selectable, clickable, waits |
| `surface--header` | all | all | – | all | a colored or hero band, an error header, its own height |
| `surface--content` | – | – | loading | all | neutral region; waits; its own padding |
| `surface--footer` | all | all | – | all | an action bar, like header |
| `surface--panel` | all | all | all | all | a plain surface with everything |
| `surface--tile` | all | all | all | all | a plain surface with everything, used in grids |
| `surface--alert` | all | all | – | all | banner or inline; status is what it is |
| `surface--empty-state` | all | all | loading | all | prominent or subtle; empty because of an error; empty while loading |
| `surface--separator` | all | – | – | all | standalone divider: strong or subtle, thickness |
| `surface--badge` | all | all | hover active focus selected disabled | all | status is what a badge is for; filter badges get chosen |
| `surface--avatar` | all | all | hover active focus selected disabled | all | framed or plain; presence by status; picked, clickable |
| `surface--progress` | all | all | loading disabled | all | outer: the track; thin or prominent; success/warning/error; indeterminate waits |
| `surface--progress-inner` | – | – | – | – | inner: the fill, follows the outer; its width is the value |
| `surface--spinner` | all | all | – | all | subtle or prominent, a colored spinner |
| `surface--skeleton` | all | – | – | all | placeholder; line heights |
| `surface--group` | – | – | – | – | part: a titled section of a list |
| `surface--accordion-item` | – | all | hover active focus selected disabled | – | child: a section, open or not, with a status |
| `surface--tree-view-group` | – | – | disabled | – | child: a branch, indent authored once |
| `surface--list-draggable-group` | – | – | disabled | – | child: the rows nested under a row, indent authored once |
| `surface--list-draggable-ghost` | – | – | – | – | part: the place a row left while it is dragged |
| `surface--list-tree-ghost` | – | – | – | – | part: the place a row left while it is dragged |

### Overlay (`overlay--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `overlay--dialog` | all | all | loading | all | hero or plain modal, error and destructive confirms, waits |
| `overlay--alert-dialog` | all | all | loading | all | destructive and warning confirms, waits |
| `overlay--sheet` | all | all | loading | all | dialog from an edge |
| `overlay--popover` | all | all | loading | all | filled or plain, informative, waits for content |
| `overlay--tooltip` | all | all | – | all | dark or light, a warning tooltip |
| `overlay--hover-card` | all | all | loading | all | preview card, waits for data |
| `overlay--dropdown-menu` | all | – | loading | all | the shell: filled or plain, waits for items, sizes its menu |
| `overlay--toast` | all | all | hover loading | all | status is what a toast is for; a progress toast; pauses on hover |
| `overlay--list-draggable-overlay` | – | – | – | – | part: the copy of the dragged row that follows the pointer |
| `overlay--list-tree-overlay` | – | – | – | – | part: the copy of the dragged row that follows the pointer |

### Control (`control--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `control--button` | all | all | all | all | standalone control: competes, carries meaning, every interaction state |
| `control--chip` | all | all | hover active focus selected disabled | all | standalone control; chosen, removable |
| `control--checkbox` | all | all | all | all | outer: standalone or in a choice group; validation on it |
| `control--switch` | all | all | all | all | outer: the track; standalone or in a choice group; async switch waits |
| `control--radio` | all | all | all | all | outer: the ring; in a choice group the group's axes win |
| `control--toggle` | all | all | hover active focus selected disabled | all | standalone control; in a choice group the group's axes win |
| `control--tab-trigger` | – | all | all | – | child: current tab, a tab carrying an error, every state |
| `control--breadcrumb-item` | – | – | hover active focus selected disabled | – | child: current crumb, plain crumb, clickable |
| `control--sidebar-item` | – | all | all | – | child: current, disabled, waiting, clickable; an item carrying a status |
| `control--nav-item` | – | all | active focus selected disabled | – | child of a mobile navigation region: the current destination is selected; an entry carrying a status |
| `control--calendar-day` | – | all | hover active focus selected disabled | – | child: today, picked, in range, a day with a status |
| `control--menu-item` | – | all | all | – | child: chosen, destructive, waits, every state |
| `control--list-item` | – | all | all | – | child: chosen, unavailable, waiting, clickable, a row with a status |
| `control--accordion-trigger` | – | – | hover active focus selected disabled | – | child: the section header, open, hovered, disabled |
| `control--tree-view-item` | – | all | all | – | child: chosen, unavailable, waiting, clickable |
| `control--list-draggable-row` | – | all | hover focus selected disabled | – | child: a row, chosen, unavailable, with a status |
| `control--list-draggable-handle` | – | – | hover active focus disabled | – | child: the grip that starts a drag, hovered, held, focused, unavailable |
| `control--list-tree-row` | – | all | hover focus selected disabled | – | child: a row, chosen, unavailable, with a status |
| `control--list-tree-toggle` | – | – | hover focus disabled | – | child: the chevron that opens and closes a row, hovered, focused, unavailable |
| `control--list-tree-handle` | – | – | hover active focus disabled | – | child: the grip that starts a drag, hovered, held, focused, unavailable |

### Control group (`control-group--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `control-group--choice-group` | all | all | loading disabled | all | parent: prominence, a validated choice, orientation and gap, sizes its options; replaces radioGroup and toggleGroup |
| `control-group--button-group` | all | all | loading disabled | all | parent: joined look, a group with an error, whole group disabled, sizes its buttons |
| `control-group--tab-bar` | all | – | loading | all | parent: pill or underline bar, sizes its tabs; no condition of its own |
| `control-group--breadcrumb` | all | – | loading | all | parent: prominence of the trail, sizes crumbs, gap and separator |
| `control-group--pagination-bar` | all | – | loading disabled | all | parent: prominence, sizes its links; links are buttons |
| `control-group--sidebar` | all | all | loading disabled | all | parent: a column of items, main nav or anything else; collapsed is [collapsed], not a state; sizes its items |

### Field (`field--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `field--input` | all | all | hover focus disabled loading | all | filled, outlined, ghost; validation; waits |
| `field--textarea` | all | all | hover focus disabled loading | all | same as input |
| `field--input-select` | all | all | hover focus disabled loading | all | a field; async search waits |
| `field--select` | all | all | hover focus disabled loading | all | a field; async search waits |
| `field--combobox` | all | all | hover focus disabled loading | all | a field; async search waits |
| `field--multi-select` | all | all | hover focus disabled loading | all | a field; async search waits |
| `field--phone-input` | all | all | hover focus disabled loading | all | a field |
| `field--address-autocomplete` | all | all | hover focus disabled loading | all | a field; lookup waits |
| `field--otp` | all | all | hover focus disabled loading | all | parent: the field, sizes its slots |
| `field--otp-slot` | – | – | hover focus selected disabled | – | child: the active slot |
| `field--input-group` | all | all | hover focus disabled loading | all | parent: one field surface, sizes input and addons |
| `field--file-upload` | all | all | all | all | drop zone: drag-over is selected, uploading waits |
| `field--date-picker` | all | all | hover focus disabled loading | all | the field |

### List (`list--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `list--menu` | – | all | loading | – | child of the shell: the rows container, a menu with an error inside |
| `list--list` | all | all | loading disabled | all | parent: bordered or plain, a list with an error inside, waits, sizes its items |
| `list--accordion` | all | all | loading disabled | all | parent: sizes its items |
| `list--tree-view` | all | all | loading disabled | all | parent: sizes its items |
| `list--list-draggable` | all | all | loading disabled | all | parent: sizes its rows, waits, is unavailable as a whole |
| `list--list-tree` | all | all | loading disabled | all | parent: sizes its rows, waits, is unavailable as a whole |

### Table (`table--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `table--root` | all | all | loading disabled | all | parent: bordered or plain, a table with errors inside, waits, sizes rows and cells |
| `table--header` | – | – | – | – | section: structure only |
| `table--header-row` | – | – | – | – | section: structure only |
| `table--body` | – | – | – | – | section: structure only |
| `table--footer` | – | – | – | – | section: structure only |
| `table--footer-row` | – | – | – | – | section: structure only |
| `table--header-cell` | – | all | hover focus selected disabled | – | child: sorted column, a column with a status |
| `table--row` | – | all | all | – | child: chosen, unavailable, waiting, clickable, a row with a status |
| `table--cell` | – | all | hover focus selected disabled | – | child: selected or editable cell, a cell with a status |
| `table--footer-cell` | – | all | hover focus selected disabled | – | child: like a cell |
| `table--cell-content` | – | – | – | – | part: internal layout |

### Shape (`shape--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `shape--list-draggable-drop-line` | – | – | – | – | part: the line that shows the drop lands before or after a row |
| `shape--list-draggable-drop-into` | – | – | – | – | part: the outline that shows the drop lands inside a row |
| `shape--list-tree-line` | – | – | – | – | part: a connector line, the stem down a level and the elbow into a row |
| `shape--list-tree-drop-line` | – | – | – | – | part: the line that shows the drop lands before or after a row |
| `shape--list-tree-drop-into` | – | – | – | – | part: the outline that shows the drop lands inside a row |
| `shape--icon` | all | all | disabled | all | prominence and status color, sized |
| `shape--svg` | all | – | – | all | prominence, sized |

### Media (`media--…`)

| Value | Emphasis | Status | State | Scale | Why |
|---|---|---|---|---|---|
| `media--image` | all | – | hover focus selected disabled loading | all | framed or plain, picked in a gallery, waits, clickable |

### Typography (`type`)

| Value | Usage |
|-------|-------|
| `type--heading1` through `type--heading4` | Headings |
| `type--body-extra-large`, `type--body-large`, `type--body`, `type--body-small`, `type--body-extra-small` | Body text |
| `type--quote-large`, `type--quote`, `type--quote-small` | Quotes |
| `type--code` | Code |
| `type--numbers-extra-large`, `type--numbers-large`, `type--numbers`, `type--numbers-small`, `type--numbers-extra-small` | Numbers |

---

## Layout Values

Format: `layout="{name}"`. No family prefix.

| Value | Usage |
|-------|-------|
| `shell` | Outermost viewport frame |
| `shell-side-nav` | Shell variant: global sidebar (fixed, collapsible) |
| `shell-top-nav` | Shell variant: global top bar (sticky) |
| `shell-none` | Shell variant: no chrome (auth pages, standalone) |
| `page` | Everything inside the shell content area |
| `page-header` | Full-width page title / action bar |
| `second-page-header` | Optional second full-width row under the page header (e.g. the tabs) |
| `page-body` | Flex row: left-sidebar + main + right-sidebar |
| `left-sidebar` | Secondary sidebar (contextual, e.g. settings nav) |
| `main` | Primary column, fills remaining space |
| `main-header` | Full-width region spanning main column (sticky optional) |
| `second-main-header` | Optional second full-width row under the main header |
| `main-body` | Scrollable content below main-header |
| `container` | Width-constrained content wrapper |
| `context-panel` | Inline aside inside main (e.g. knowledge panel, properties) |
| `right-sidebar` | Full-height aside beside main (e.g. activity feed) |
| `scroll-area` | Canonical internal scroll container — use anywhere a region needs to scroll |
| `stack` | Auto-layout primitive, usable inside any region: a row or a column that owns gap, alignment and padding; each child hugs, fills or stays fixed. Nests freely. Structure only — no visuals |

Overlays (Dialog, Sheet) are component-library elements (`element="overlay--*"`), not layout regions.

---

## Axis Attributes

### `emphasis` — visual prominence

| Value | Meaning |
|-------|---------|
| `hero` | Maximum prominence |
| `primary` | Primary action/focus |
| `secondary` | Secondary/outlined |
| `tertiary` | Minimal/ghost |
| `quiet` | Subtle/text-only |

### `status` — semantic condition

| Value | Meaning |
|-------|---------|
| `neutral` | Default/neutral |
| `info` | Informational |
| `success` | Positive outcome |
| `warning` | Caution |
| `error` | Negative outcome |
| `destructive` | Dangerous action |

### `state` — interaction/availability

| Value | Meaning |
|-------|---------|
| `selected` | Currently selected |
| `disabled` | Not available |
| `loading` | In progress |

Transient states (`hover`, `active`, `focus`) are CSS pseudo-classes only —
never set as attributes.

### `scale` — structural size

| Value |
|-------|
| `xs`, `sm`, `md`, `lg`, `xl` |

Default when absent: `md`. Affects padding, typography, icon size. Never colors.

### `concept` — product-specific semantic identity

Values are product-defined: `"knowledge"`, `"dashboard"`, `"settings"`, etc.
Set on a wrapper element — descendants inherit the visual overrides.

---

## Rules

### What components MUST do

- Use `element="..."` for morphological identity
- Use axis attributes for visual variation
- Use Tailwind structural utilities for positioning (`flex`, `grid`, `gap-*`,
  `w-*`, `h-*`, `items-*`, `justify-*`, `overflow-*`)

### What components MUST NOT do

- No Tailwind aesthetic classes: `bg-*`, `rounded-*`, `shadow-*`, `border-*`,
  `text-color-*`, `ring-*`, `opacity-*`
- No inline styles for visual properties
- No inline CSS variables (`--bg`, `--tint`, `--border-color`)
- No `@apply` for visual properties
- No hardcoded colors, fonts, shadows, radii

### Component root rule

- **Simple components** (Button, Checkbox): native element is the root,
  receives all theme attributes directly.
- **Compound components** (input + toggle, input + icons): wrapper div is
  the root surface. Native elements are children styled via inheritance.

```html
<!-- Simple -->
<button element="control--button" scale="md" emphasis="primary">Submit</button>

<!-- Compound -->
<div element="field--input" scale="md" status="error">
  <input type="password" />
  <button>toggle visibility</button>
</div>
```
