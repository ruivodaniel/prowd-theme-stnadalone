// ============================================================
// ELEMENTS — the law. One entry per element the theme must address:
// its family, the axes a designer needs on it (with the allowed values), and why.
// ============================================================
//
// Everything derives from this table, downward only:
//   theme types     what a theme may author for the element   (cascade.ts → ElementTypes)
//   engine          the selector and the family extras         (conventions.ts → ELEMENT_FAMILIES)
//   components      the axis props the component may carry     (ElementProps<key>)
//   dictionary      the list people read
//
// Reasoning applied:
//   parent    emphasis, scale, and what happens to it as a whole (loading, disabled)
//   child     its own states; status where it can carry a condition
//   outer     a control that has a moving or appearing inner: the ring, the track, the box
//   inner     the dot, the thumb, the check, the fill: a surface of its own, follows the outer,
//             `selected` is where it appears or moves to (translate under selected)
//   part      separators, structure: nothing
//   standalone everything
//   not here  a nav or a top bar: compositions a slice builds from these rows inside a layout region
// Status goes to fields, controls, and containers that highlight a child in error.
// `platform` says where the element exists: both, the web only, or mobile only. On mobile an element takes its
// states minus `hover`; where it has `hover`, mobile has `long-pressed` in its place; `mobileState` adds the rest.
// `none` means the axis does not apply. `concept` is on every element and never listed.
// `position` (types/axes.ts POSITION) says where the element stands in its parent and how much it takes: a markup axis,
// one value = one fixed set of structural classes (web/components/src/lib/position.ts); the theme never reads it.

import {
  EMPHASIS, STATUS, STATE, SCALE, PLATFORM, POSITION,
  type Emphasis, type Status, type State, type Scale, type Platform, type Position, type WebOnlyState, type MobileOnlyState,
} from './axes';

export type Family = "surface" | "overlay" | "control" | "control-group" | "field" | "list" | "table" | "shape" | "media";
const none = [] as const;
/** the platforms an element exists on */
const BOTH = PLATFORM;
const WEB = ["web"] as const;
const MOBILE = ["mobile"] as const;

export type ElementRow = {
  family: Family;
  /** where the element exists. A theme of a platform may only address the elements of that platform. */
  platform: readonly Platform[];
  /** the mobile-only states the element takes, beside the ones it shares with the web */
  mobileState?: readonly MobileOnlyState[];
  emphasis: readonly Emphasis[];
  status: readonly Status[];
  state: readonly State[];
  scale: readonly Scale[];
  /** where the element may stand in its parent (POSITION). `none` on inner parts, separators, lines and shapes: they are placed by their parent */
  position: readonly Position[];
  why: string;
};

export const ELEMENTS = {
  // ── button ──
  button: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "standalone control: competes, carries meaning, every interaction state",
  },

  // ── chip ──
  chip: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "standalone control; chosen, removable",
  },

  // ── choice group: any set of options, whatever they look like ──
  choiceGroup: {
    family: "control-group",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: prominence, a validated choice, orientation and gap, sizes its options; replaces radioGroup and toggleGroup",
  },

  // ── checkbox: outer + inner ──
  checkbox: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "outer: standalone or in a choice group; validation on it",
  },
  checkboxInner: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["selected"],
    scale: none,
    position: none,
    why: "inner: the check mark, follows the outer; appears on selected",
  },

  // ── switch: outer (track) + inner (thumb) ──
  switch: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "outer: the track; standalone or in a choice group; async switch waits",
  },
  switchInner: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["selected"],
    scale: none,
    position: none,
    why: "inner: the thumb, follows the outer; moves with translateX on selected",
  },

  // ── radio: outer + inner ──
  radio: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "outer: the ring; in a choice group the group's axes win",
  },
  radioInner: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["selected"],
    scale: none,
    position: none,
    why: "inner: the dot, follows the outer; appears on selected",
  },

  // ── toggle ──
  toggle: {
    family: "control",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "standalone control; in a choice group the group's axes win",
  },

  // ── button group ──
  buttonGroup: {
    family: "control-group",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: joined look, a group with an error, whole group disabled, sizes its buttons",
  },
  buttonGroupText: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: a text cell inside the group",
  },

  // ── tabs ──
  tabBar: {
    family: "control-group",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "parent: pill or underline bar, sizes its tabs; no condition of its own",
  },
  tabTrigger: {
    family: "control",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: current tab, a tab carrying an error, every state",
  },
  tabPanel: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["loading"],
    scale: none,
    position: none,
    why: "part: waits for content",
  },

  // ── breadcrumb ──
  breadcrumb: {
    family: "control-group",
    platform: WEB,
    emphasis: EMPHASIS,
    status: none,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "parent: prominence of the trail, sizes crumbs, gap and separator",
  },
  breadcrumbItem: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: current crumb, plain crumb, clickable",
  },
  breadcrumbSeparator: {
    family: "surface",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part",
  },

  // ── pagination ──
  paginationBar: {
    family: "control-group",
    platform: WEB,
    emphasis: EMPHASIS,
    status: none,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: prominence, sizes its links; links are buttons",
  },


  // ── sidebar: a column of items, agnostic to what it is for ──
  sidebar: {
    family: "control-group",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: a column of items, main nav or anything else; collapsed is [collapsed], not a state; sizes its items",
  },
  sidebarItem: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: current, disabled, waiting, clickable; an item carrying a status",
  },
  // ── nav item: mobile's navigation entry — an item of the tab bar, an entry of the drawer ──
  navItem: {
    family: "control",
    platform: MOBILE,
    emphasis: none,
    status: STATUS,
    state: ["active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child of a mobile navigation region: the current destination is selected; an entry carrying a status",
  },

  // ── input ──
  input: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "filled, outlined, ghost; validation; waits",
  },

  // ── textarea ──
  textarea: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "same as input",
  },

  // ── input select (and the deprecated select, combobox, multiSelect) ──
  inputSelect: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field; async search waits",
  },
  select: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field; async search waits",
  },
  combobox: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field; async search waits",
  },
  multiSelect: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field; async search waits",
  },

  // ── phone input ──
  phoneInput: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field",
  },

  // ── address autocomplete ──
  addressAutocomplete: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "a field; lookup waits",
  },

  // ── otp ──
  otp: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "parent: the field, sizes its slots",
  },
  otpSlot: {
    family: "field",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: the active slot",
  },
  otpSeparator: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part",
  },

  // ── input group ──
  inputGroup: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "parent: one field surface, sizes input and addons",
  },
  inputGroupAddon: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: prefix, suffix, embedded button",
  },

  // ── file upload ──
  fileUpload: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "drop zone: drag-over is selected, uploading waits",
  },

  // ── date picker ──
  datePicker: {
    family: "field",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "the field",
  },
  // ── colour picker ──
  colorPicker: {
    family: "field",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "the field: the chosen colour(s) and a way to change them",
  },
  swatch: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "focus", "selected", "disabled"],
    scale: SCALE,
    position: none,
    why: "child: one colour to choose, in a palette or among the chosen ones",
  },
  // ── icon picker ──
  iconPicker: {
    family: "field",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "focus", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "the field: the chosen icon and a way to change it",
  },
  iconTile: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "focus", "selected", "disabled"],
    scale: SCALE,
    position: none,
    why: "child: one icon to choose, in a library",
  },
  calendar: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: the grid, sizes its days",
  },
  calendarDay: {
    family: "control",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: today, picked, in range, a day with a status",
  },

  // ── label and form feedback ──
  label: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["disabled"],
    scale: SCALE,
    position: POSITION,
    why: "quiet or strong, error label, sized with its field",
  },
  fieldDescription: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: ["disabled"],
    scale: none,
    position: POSITION,
    why: "hint under a field, informative",
  },
  fieldMessage: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: none,
    scale: none,
    position: POSITION,
    why: "the message is its status",
  },

  // ── card and its regions (header, content, footer are shared by dialog, sheet, sidebar) ──
  card: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "everything: competes, a card in error, selectable, clickable, waits",
  },
  header: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "a colored or hero band, an error header, its own height",
  },
  content: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "neutral region; waits; its own padding",
  },
  footer: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "an action bar, like header",
  },

  // ── panel, tile: plain surfaces, a div to put things inside, every axis ──
  panel: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "a plain surface with everything",
  },
  tile: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: STATE,
    scale: SCALE,
    position: POSITION,
    why: "a plain surface with everything, used in grids",
  },

  // ── alert ──
  alert: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "banner or inline; status is what it is",
  },

  // ── empty state ──
  emptyState: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "prominent or subtle; empty because of an error; empty while loading",
  },

  // ── separator ──
  separator: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "standalone divider: strong or subtle, thickness",
  },

  // ── badge ──
  badge: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "status is what a badge is for; filter badges get chosen",
  },

  // ── avatar ──
  avatar: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "framed or plain; presence by status; picked, clickable",
  },

  // ── progress: outer + inner ──
  progress: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "outer: the track; thin or prominent; success/warning/error; indeterminate waits",
  },
  progressInner: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "inner: the fill, follows the outer; its width is the value",
  },

  // ── spinner ──
  spinner: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "subtle or prominent, a colored spinner",
  },

  // ── skeleton ──
  skeleton: {
    family: "surface",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "placeholder; line heights",
  },

  // ── dialog ──
  dialog: {
    family: "overlay",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "hero or plain modal, error and destructive confirms, waits",
  },

  // ── alert dialog ──
  alertDialog: {
    family: "overlay",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "destructive and warning confirms, waits",
  },

  // ── sheet ──
  sheet: {
    family: "overlay",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "dialog from an edge",
  },

  // ── popover ──
  popover: {
    family: "overlay",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "filled or plain, informative, waits for content",
  },

  // ── tooltip ──
  tooltip: {
    family: "overlay",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: none,
    scale: SCALE,
    position: POSITION,
    why: "dark or light, a warning tooltip",
  },

  // ── hover card ──
  hoverCard: {
    family: "overlay",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "preview card, waits for data",
  },

  // ── dropdown menu (menu and menuItem are shared with input select and command) ──
  dropdownMenu: {
    family: "overlay",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: ["loading"],
    scale: SCALE,
    position: POSITION,
    why: "the shell: filled or plain, waits for items, sizes its menu",
  },
  menu: {
    family: "list",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: ["loading"],
    scale: none,
    position: POSITION,
    why: "child of the shell: the rows container, a menu with an error inside",
  },
  menuItem: {
    family: "control",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: chosen, destructive, waits, every state",
  },
  group: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: a titled section of a list",
  },

  // ── toast ──
  toast: {
    family: "overlay",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["hover", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "status is what a toast is for; a progress toast; pauses on hover",
  },

  // ── list ──
  list: {
    family: "list",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: bordered or plain, a list with an error inside, waits, sizes its items",
  },
  listItem: {
    family: "control",
    platform: BOTH,
    mobileState: ["swiped"],
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: chosen, unavailable, waiting, clickable, a row with a status",
  },

  // ── accordion ──
  accordion: {
    family: "list",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: sizes its items",
  },
  accordionItem: {
    family: "surface",
    platform: BOTH,
    emphasis: none,
    status: STATUS,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: a section, open or not, with a status",
  },
  accordionTrigger: {
    family: "control",
    platform: BOTH,
    emphasis: none,
    status: none,
    state: ["hover", "active", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: the section header, open, hovered, disabled",
  },

  // ── tree view ──
  treeView: {
    family: "list",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: sizes its items",
  },
  treeViewGroup: {
    family: "surface",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["disabled"],
    scale: none,
    position: POSITION,
    why: "child: a branch, indent authored once",
  },
  treeViewItem: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: chosen, unavailable, waiting, clickable",
  },

  // ── list draggable: a list whose rows nest and are dragged into order and into nesting ──
  listDraggable: {
    family: "list",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: sizes its rows, waits, is unavailable as a whole",
  },
  listDraggableGroup: {
    family: "surface",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["disabled"],
    scale: none,
    position: POSITION,
    why: "child: the rows nested under a row, indent authored once",
  },
  listDraggableRow: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: a row, chosen, unavailable, with a status",
  },
  listDraggableHandle: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "active", "focus", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: the grip that starts a drag, hovered, held, focused, unavailable",
  },
  listDraggableGhost: {
    family: "surface",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the place a row left while it is dragged",
  },
  listDraggableOverlay: {
    family: "overlay",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the copy of the dragged row that follows the pointer",
  },
  listDraggableDropLine: {
    family: "shape",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the line that shows the drop lands before or after a row",
  },
  listDraggableDropInto: {
    family: "shape",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the outline that shows the drop lands inside a row",
  },

  // ── list tree: ONE list for every tree of rows — reorderable or not, collapsible or not, indented or not, with connector lines or not ──
  listTree: {
    family: "list",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: sizes its rows, waits, is unavailable as a whole",
  },
  listTreeRow: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: a row, chosen, unavailable, with a status",
  },
  listTreeToggle: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "focus", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: the chevron that opens and closes a row, hovered, focused, unavailable",
  },
  listTreeLine: {
    family: "shape",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: a connector line, the stem down a level and the elbow into a row",
  },
  listTreeHandle: {
    family: "control",
    platform: WEB,
    emphasis: none,
    status: none,
    state: ["hover", "active", "focus", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: the grip that starts a drag, hovered, held, focused, unavailable",
  },
  listTreeGhost: {
    family: "surface",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the place a row left while it is dragged",
  },
  listTreeOverlay: {
    family: "overlay",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the copy of the dragged row that follows the pointer",
  },
  listTreeDropLine: {
    family: "shape",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the line that shows the drop lands before or after a row",
  },
  listTreeDropInto: {
    family: "shape",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: the outline that shows the drop lands inside a row",
  },

  // ── table ──
  tableRoot: {
    family: "table",
    platform: WEB,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["loading", "disabled"],
    scale: SCALE,
    position: POSITION,
    why: "parent: bordered or plain, a table with errors inside, waits, sizes rows and cells",
  },
  tableHeader: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: POSITION,
    why: "section: structure only",
  },
  tableHeaderRow: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: POSITION,
    why: "section: structure only",
  },
  tableBody: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: POSITION,
    why: "section: structure only",
  },
  tableFooter: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: POSITION,
    why: "section: structure only",
  },
  tableFooterRow: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: POSITION,
    why: "section: structure only",
  },
  tableHeaderCell: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: sorted column, a column with a status",
  },
  tableRow: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: STATE,
    scale: none,
    position: POSITION,
    why: "child: chosen, unavailable, waiting, clickable, a row with a status",
  },
  tableCell: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: selected or editable cell, a cell with a status",
  },
  tableFooterCell: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: STATUS,
    state: ["hover", "focus", "selected", "disabled"],
    scale: none,
    position: POSITION,
    why: "child: like a cell",
  },
  tableCellContent: {
    family: "table",
    platform: WEB,
    emphasis: none,
    status: none,
    state: none,
    scale: none,
    position: none,
    why: "part: internal layout",
  },

  // ── icon ──
  icon: {
    family: "shape",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: STATUS,
    state: ["disabled"],
    scale: SCALE,
    position: none,
    why: "prominence and status color, sized",
  },

  // ── qr code ──
  svg: {
    family: "shape",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: none,
    scale: SCALE,
    position: none,
    why: "prominence, sized",
  },

  // ── remote image ──
  image: {
    family: "media",
    platform: BOTH,
    emphasis: EMPHASIS,
    status: none,
    state: ["hover", "focus", "selected", "disabled", "loading"],
    scale: SCALE,
    position: POSITION,
    why: "framed or plain, picked in a gallery, waits, clickable",
  },
} as const satisfies Record<string, ElementRow>;

export type ElementKey = keyof typeof ELEMENTS;
/** the elements that exist on a platform, read from the table */
export type ElementKeyFor<P extends Platform> = { [K in ElementKey]: P extends (typeof ELEMENTS)[K]['platform'][number] ? K : never }[ElementKey];
export type WebElementKey = ElementKeyFor<"web">;
export type MobileElementKey = ElementKeyFor<"mobile">;

/** family as written in the markup prefix → the theme's family key */
export const FAMILY_KEY = {
  surface: 'surfaceContainer',
  overlay: 'elevatedOverlay',
  control: 'interactiveControl',
  'control-group': 'interactiveControlGroup',
  field: 'field',
  list: 'listContainer',
  table: 'tableElement',
  shape: 'shape',
  media: 'media',
} as const;
export type FamilyKey = (typeof FAMILY_KEY)[Family];

export type ElementFamily<K extends ElementKey> = (typeof ELEMENTS)[K]['family'];
export type ElementFamilyKey<K extends ElementKey> = (typeof FAMILY_KEY)[ElementFamily<K>];
export type ElementHasSizes<K extends ElementKey> = (typeof ELEMENTS)[K]['scale'] extends readonly [] ? false : true;

type ValuesOf<K extends ElementKey, A extends 'emphasis' | 'status' | 'state' | 'scale' | 'position'> = (typeof ELEMENTS)[K][A][number];
export type EmphasisOf<K extends ElementKey> = ValuesOf<K, 'emphasis'>;
export type StatusOf<K extends ElementKey> = ValuesOf<K, 'status'>;
export type StateOf<K extends ElementKey> = ValuesOf<K, 'state'>;
export type ScaleOf<K extends ElementKey> = ValuesOf<K, 'scale'>;
export type PositionOf<K extends ElementKey> = ValuesOf<K, 'position'>;
/** an element's states on mobile: its own minus the web-only ones, `long-pressed` where it has `hover`, plus its `mobileState` */
export type MobileStateOf<K extends ElementKey> =
  | Exclude<StateOf<K>, WebOnlyState>
  | ("hover" extends StateOf<K> ? "long-pressed" : never)
  | ((typeof ELEMENTS)[K] extends { mobileState: readonly (infer M)[] } ? M : never);

/** The axis props a component for element K may carry. Read by the component, never declared by it. */
export type ElementProps<K extends ElementKey> =
  { concept?: string }
  & ([EmphasisOf<K>] extends [never] ? Record<never, never> : { emphasis?: EmphasisOf<K> })
  & ([StatusOf<K>] extends [never] ? Record<never, never> : { status?: StatusOf<K> })
  & ([StateOf<K>] extends [never] ? Record<never, never> : { state?: StateOf<K> })
  & ([ScaleOf<K>] extends [never] ? Record<never, never> : { scale?: ScaleOf<K> })
  /** one position word, or several space-separated ("fill center") */
  & ([PositionOf<K>] extends [never] ? Record<never, never> : { position?: PositionOf<K> | `${PositionOf<K>} ${string}` });
