import type { WebTheme } from "../../../types";

// dAInta v1 — authored from "dAInta Core Screens v9.dc.html" (skills/new-theme).
//
// L1 read of the target
//   anchors     bg #faf9fc (canvas #eceaf1) · fg #1a1823
//   surfaces    card #ffffff · raised #faf9fc · tinted #f5f2fb · dark band #241a3d
//   brand       1 #4a2d8f (hover #2f1b63, dark #3c2a6b, light #c3aef0) · 2 #241a3d
//   status      error #a83232 · success #2f6d4f · warning #c99b2a · info = brand
//   text grays  #4a4658 body · #6b6779 muted · #8b8698 label · #b3aec0 faint
//   line grays  #efedf4 row rule · #e6e3ec · #e0dce8 · #d8d4e0 · #cfc7e2
//   fonts       IBM Plex Sans 400/450/500/600 · IBM Plex Mono 400/500 (the label voice)
//   scale       10 · 10.5 · 11 · 11.5 · 12 · 12.5 · 13 · 13.5 · 14 · 15 · 16 · 19 · 21 · 27 · 46
//   rhythm      7 / 14 / 22 (unit 0.875rem: sm 7 · md 14 · lg 21 · xl 28)
//   radius      none; full only on avatars and dots
//   borders     1px hairlines · 3px brand accent bar · 2px dashed drop zone
//   effects     card 0 1 2 @.05 · sheet 0 1 3 @.10 + 0 12 40 @.08 · drawer -20 0 44 @.16
//   open        focus rings, disabled, dark mode — not drawn in the target
//
// Colour, the rule: a surface is `background`, its text `foreground` — the two swap in dark. Text on a
// coloured fill is `smart-bw`: white or black, read from the fill. A fixed black is named only in the shadows.

export const daintaTheme: WebTheme = {
  id: "wireframe-stroke",
  name: "Wireframe Stroke",
  version: 1,
  type: "wireframe",
  kind: "seed",

  colors: {
    main: { white: "#ffffff", black: "#1a1823" },
    brand: { "1": "#4a2d8f", "2": "#241a3d", "3": "#a495c7", "4": "#6b6779" },
    status: { success: "#2f6d4f", info: "#4a2d8f", warning: "#c99b2a", error: "#a83232" },
    flat: {
      red: "#a83232", orange: "#c99b2a", yellow: "#f0c877", lime: "#93b8a3", green: "#2f6d4f", mint: "#cbdcd2",
      turquoise: "#93b8a3", blue: "#4a2d8f", violet: "#4a2d8f", purple: "#241a3d", pink: "#c3aef0",
    },
    semanticTokens: { primary: "brand-1", secondary: "brand-2", accent: "brand-3", muted: "brand-4" },
  },

  typography: {
    fonts: {
      primary: "IBM Plex Sans", secondary: "IBM Plex Sans", quote: "IBM Plex Sans",
      monoPrimary: "IBM Plex Mono", monoSecondary: "IBM Plex Mono",
    },
    fontSources: {
      "IBM Plex Sans": { type: "google", url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;450;500;600&display=swap" },
      "IBM Plex Mono": { type: "google", url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" },
    },
    types: {
      heading1: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 24, fontSizeDesktop: 27, fontWeight: 450, lineHeight: 1.35, letterSpacing: "-0.02em" },
      heading2: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 19, fontSizeDesktop: 21, fontWeight: 450, lineHeight: 1.35, letterSpacing: "-0.015em" },
      heading3: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 17, fontSizeDesktop: 19, fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.01em" },
      heading4: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 15, fontSizeDesktop: 16, fontWeight: 600, lineHeight: 1.4 },
      bodyExtraLarge: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 15, fontSizeDesktop: 16, fontWeight: 400, lineHeight: 1.6 },
      bodyLarge: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 14, fontSizeDesktop: 15, fontWeight: 400, lineHeight: 1.55 },
      body: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 13, fontSizeDesktop: 13.5, fontWeight: 400, lineHeight: 1.5 },
      bodySmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 12, fontSizeDesktop: 12.5, fontWeight: 400, lineHeight: 1.45 },
      bodyExtraSmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 11, fontSizeDesktop: 11.5, fontWeight: 400, lineHeight: 1.4 },
      quoteLarge: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 15, fontSizeDesktop: 16, fontWeight: 400, lineHeight: 1.6 },
      quote: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 13, fontSizeDesktop: 13.5, fontWeight: 400, lineHeight: 1.55 },
      quoteSmall: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 12, fontSizeDesktop: 12.5, fontWeight: 400, lineHeight: 1.5 },
      code: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 12, fontSizeDesktop: 12.5, fontWeight: 400, lineHeight: 1.5 },
      numbersExtraLarge: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 34, fontSizeDesktop: 46, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em" },
      numbersLarge: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 21, fontSizeDesktop: 27, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" },
      numbers: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 13, fontSizeDesktop: 13, fontWeight: 400, lineHeight: 1.5 },
      numbersSmall: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 11.5, fontSizeDesktop: 11.5, fontWeight: 400, lineHeight: 1.45 },
      // the label voice: mono, small, tracked, uppercase (transform is set where used)
      numbersExtraSmall: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 10.5, fontSizeDesktop: 10.5, fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.1em" },
      link: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 13, fontSizeDesktop: 13.5, fontWeight: 500, lineHeight: 1.5 },
    },
  },

  spacing: { unit: 0.875 },
  radius: { none: "0px", "3xs": "0px", "2xs": "0px", xs: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px", "2xl": "0px", "3xl": "0px", full: "9999px" },
  effects: {
    card: [{ type: "drop-shadow", x: 0, y: 1, blur: 2, color: "main-black", opacity: 0.05 }],
    sheet: [
      { type: "drop-shadow", x: 0, y: 1, blur: 3, color: "main-black", opacity: 0.10 },
      { type: "drop-shadow", x: 0, y: 12, blur: 40, color: "main-black", opacity: 0.08 },
    ],
    drawer: [{ type: "drop-shadow", x: -20, y: 0, blur: 44, color: "main-black", opacity: 0.16 }],
    popover: [{ type: "drop-shadow", x: 0, y: 8, blur: 24, color: "main-black", opacity: 0.3 }],
  },
  transitions: {
    duration: { extraFast: "50ms", fast: "100ms", average: "160ms", slow: "300ms", extraSlow: "500ms" },
    timing: { ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", linear: "linear" },
  },
  borderWidths: { none: "0px", extraThin: "0.5px", thin: "1px", default: "1px", thick: "3px", extraThick: "4px" },

  modes: {
    colorScheme: {
      light: {
        background: "#faf9fc",
        foreground: "#1a1823",
        // brand-1-light ≈ #f5f2fb (chip fill) · brand-1-dark ≈ #3c2a6b · status-x-light ≈ the pale status fills
        derivation: { brandLightAmount: 6, brandDarkAmount: 75, statusLightAmount: 6, statusDarkAmount: 75, grayColorMixPercentage: "6%", flatSaturationAdjust: 0 },
      },
      dark: {
        background: "#1a1823",
        foreground: "#faf9fc",
        derivation: { brandLightAmount: 18, brandDarkAmount: 70, statusLightAmount: 18, statusDarkAmount: 70, grayColorMixPercentage: "6%", flatSaturationAdjust: 0 },
      },
    },
  },

  icons: { set: "lucide", sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 }, weight: 1.75 },

  layouts: {
    // regions are the canvas: no fill of their own; surfaces inside them are the white boxes
    surface: { interior: { background: "background", padding: {}, gap: {} } },
    page: { surface: { interior: { padding: { all: "none" }, gap: { all: "none" } } } },
    // the dark band: page header on brand-2, light text
    pageHeader: {
      height: "56px", sm: { height: "48px" }, md: { height: "56px" }, lg: { height: "72px" },
      surface: { interior: { background: "brand-2", foreground: "smart-bw", padding: { x: "xl" } } },
    },
    secondPageHeader: {
      height: "56px", sm: { height: "48px" }, md: { height: "56px" }, lg: { height: "72px" },
      surface: { interior: { background: "brand-2", foreground: "smart-bw", padding: { x: "xl" } } },
    },
    // a light toolbar strip under the page band — canvas, a thin rule below.
    // (Not a second dark band; a page that wants one sets emphasis="primary".)
    mainHeader: {
      height: "48px", sm: { height: "40px" }, md: { height: "48px" }, lg: { height: "64px" },
      surface: { boundary: { border: { bottom: { width: "thin", style: "solid", color: "gray-200" } } }, interior: { padding: { x: "lg" }, background: "background", foreground: "foreground" } },
    },
    secondMainHeader: {
      height: "48px", sm: { height: "40px" }, md: { height: "48px" }, lg: { height: "64px" },
      surface: { boundary: { border: { bottom: { width: "thin", style: "solid", color: "gray-200" } } }, interior: { padding: { x: "lg" }, background: "background", foreground: "foreground" } },
    },
    leftSidebar: {
      width: "240px", sm: { width: "200px" }, md: { width: "240px" }, lg: { width: "300px" },
      surface: { boundary: { border: { right: { width: "thin", style: "solid", color: "gray-200" } } } },
    },
    rightSidebar: {
      width: "320px", sm: { width: "280px" }, md: { width: "320px" }, lg: { width: "420px" },
      surface: { boundary: { border: { left: { width: "thin", style: "solid", color: "gray-200" } } } },
    },
    contextPanel: {
      width: "320px", sm: { width: "260px" }, md: { width: "320px" }, lg: { width: "420px" },
      surface: { interior: { background: "background" }, boundary: { border: { left: { width: "thin", style: "solid", color: "gray-200" } } } },
    },
    // emphasis — a region's shade in the layout, over its own base. default =
    // the region as defined (canvas, or the page band); primary = a strong
    // brand band with light text; secondary = a soft branded-gray panel. The
    // base rule still owns which edge the region's border sits on.
    emphasis: {
      primary: { surface: { interior: { background: "brand-2", foreground: "smart-bw" } } },
      secondary: { surface: { interior: { background: "gray-100", foreground: "foreground" } } },
    },
    container: { sm: { maxWidth: "640px" }, md: { maxWidth: "940px" }, lg: { maxWidth: "1340px" } },
    dialog: { sm: { maxWidth: "480px" }, md: { maxWidth: "640px" }, lg: { maxWidth: "940px" } },
    sheet: { sm: { size: "320px" }, md: { size: "420px" }, lg: { size: "640px" } },
    section: { surface: { interior: { gap: { all: "lg" } } } },
    // the ground: a shade of gray so content surfaces (cards = `background`) read
    // as raised against it. Both are mode tokens, so the figure/ground survives dark.
    mainBody: { surface: { interior: { background: "gray-100", padding: { x: "xl", y: "lg" } } } },
    scrollArea: { scrollbar: { thumbColor: "gray-300", trackColor: "transparent", width: "8px" } },
  },

  families: {
    // THE surface: a white box, a hairline, no radius, a whisper of shadow
    surfaceContainer: {
      interior: { background: "background", foreground: "foreground", gap: { all: "md" }, padding: {} },
      boundary: { border: { width: "thin", style: "solid", color: "gray-200" }, radius: { all: "none" } },
      defaultTypography: { typographyType: "body" },
      transition: { duration: "fast", timing: "easeOut" },
      combined: [
        { where: { state: "disabled" }, partialSurface: { interior: { opacity: 0.45 }, cursor: "not-allowed" } },
        // status on a surface: a pale fill of its color, text in the color
        { where: { status: "error" }, partialSurface: { tint: "status-error", interior: { background: "status-error-light", foreground: "status-error" }, boundary: { border: { color: "status-error-light" } } } },
        { where: { status: "success" }, partialSurface: { tint: "status-success", interior: { background: "status-success-light", foreground: "status-success" }, boundary: { border: { color: "status-success-light" } } } },
        { where: { status: "warning" }, partialSurface: { tint: "status-warning", interior: { background: "status-warning-light", foreground: "status-warning-dark" }, boundary: { border: { color: "status-warning-light" } } } },
        { where: { status: "info" }, partialSurface: { tint: "brand-1", interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1-light" } } } },
        // hero: the dark band
        { where: { emphasis: "hero" }, partialSurface: { interior: { background: "brand-2", foreground: "smart-bw" }, boundary: { border: { color: "brand-2" } } } },
        { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "transparent", foreground: "gray-600" }, boundary: { border: { color: "transparent" } } } },
      ],
    },

    field: {
      sizes: {
        "3xs": { partialSurface: { interior: { padding: { x: "2xs", y: "3xs" } }, defaultTypography: { typographyType: "bodyExtraSmall" } } },
        "2xs": { partialSurface: { interior: { padding: { x: "xs", y: "2xs" } }, defaultTypography: { typographyType: "bodyExtraSmall" } } },
        xs: { partialSurface: { interior: { padding: { x: "xs", y: "xs" } }, defaultTypography: { typographyType: "bodySmall" } } },
        sm: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "bodySmall" } } },
        md: { partialSurface: { interior: { padding: { x: "sm", y: "sm" } }, defaultTypography: { typographyType: "body" } } },
        lg: { partialSurface: { interior: { padding: { x: "md", y: "sm" } }, defaultTypography: { typographyType: "bodyLarge" } } },
        xl: { partialSurface: { interior: { padding: { x: "lg", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } } },
        "2xl": { partialSurface: { interior: { padding: { x: "lg", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } } },
        "3xl": { partialSurface: { interior: { padding: { x: "lg", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } } },
      },
      surface: {
        interior: { background: "background", foreground: "foreground", padding: { x: "sm", y: "sm" }, gap: { all: "sm" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-300" } },
        cursor: "text",
        combined: [
          { where: { state: "hover" }, partialSurface: { boundary: { border: { color: "gray-500" } } } },
          { where: { state: "focus" }, partialSurface: { boundary: { border: { color: "brand-1" }, outline: { width: "thin", style: "solid", color: "brand-1", offset: "0px" } } } },
          { where: { status: "error" }, partialSurface: { tint: "status-error", boundary: { border: { color: "status-error" } } } },
          { where: { status: "success" }, partialSurface: { tint: "status-success", boundary: { border: { color: "status-success" } } } },
          { where: { status: "warning" }, partialSurface: { tint: "status-warning", boundary: { border: { color: "status-warning" } } } },
          { where: { state: "disabled" }, partialSurface: { interior: { background: "background", opacity: 0.6 }, cursor: "not-allowed" } },
        ],
      },
      placeholderColor: "gray-500",
      placeholderOpacity: 1,
      caretColor: "brand-1",
    },

    elevatedOverlay: {
      surface: { interior: { background: "background" }, boundary: { effect: "sheet", border: { width: "thin", style: "solid", color: "gray-200" } } },
      overlay: { scrimColor: "brand-2", scrimOpacity: 0.45, scrimBlur: "xs" },
    },

    listContainer: {
      surface: { interior: { gap: { all: "none" }, padding: {} } },
      row: {
        interior: { padding: { y: "sm" } },
        boundary: { border: { bottom: { width: "thin", style: "solid", color: "gray-100" } } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light" } } },
        ],
      },
      // no `cell`: it compiles to `[list] > * > *` — every grandchild of a list — and in a
      // menu (list--menu > menu-item > icon · label · badge) it padded the icon to zero
      // width and pushed the label. Row padding is the item's; part spacing is its gap.
      separator: { height: "1px", surface: { interior: { background: "gray-100" } } },
    },

    interactiveControlGroup: {
      surface: { interior: { background: "transparent", gap: { all: "none" }, padding: {} }, boundary: { border: { width: "none" } } },
    },

    interactiveControl: {
      sizes: {
        "3xs": { partialSurface: { interior: { padding: { x: "2xs", y: "3xs" } }, defaultTypography: { typographyType: "bodyExtraSmall" } }, icon: { size: "3xs" } },
        "2xs": { partialSurface: { interior: { padding: { x: "xs", y: "2xs" } }, defaultTypography: { typographyType: "bodyExtraSmall" } }, icon: { size: "2xs" } },
        xs: { partialSurface: { interior: { padding: { x: "xs", y: "xs" } }, defaultTypography: { typographyType: "bodyExtraSmall" } }, icon: { size: "xs" } },
        sm: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "bodySmall" } }, icon: { size: "xs" } },
        md: { partialSurface: { interior: { padding: { x: "md", y: "sm" } }, defaultTypography: { typographyType: "body" } }, icon: { size: "sm" } },
        lg: { partialSurface: { interior: { padding: { x: "lg", y: "sm" } }, defaultTypography: { typographyType: "bodyLarge" } }, icon: { size: "md" } },
        xl: { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } }, icon: { size: "lg" } },
        "2xl": { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } }, icon: { size: "lg" } },
        "3xl": { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "bodyExtraLarge" } }, icon: { size: "lg" } },
      },
      surface: {
        // the plain control: white, hairline — the target's default button
        interior: { background: "background", foreground: "foreground", padding: { x: "md", y: "sm" }, gap: { all: "sm" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-300" }, radius: { all: "none" } },
        defaultTypography: { typographyType: "body" },
        cursor: "pointer",
        combined: [
          // emphasis = the pattern; tint = the color (status re-tints below)
          { where: { emphasis: "hero" }, partialSurface: { tint: "brand-2", interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary" }, partialSurface: { tint: "primary", interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "secondary" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { color: "gray-300" } } } },
          { where: { emphasis: "tertiary" }, partialSurface: { interior: { background: "transparent", foreground: "brand-1" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "transparent", foreground: "gray-600" }, boundary: { border: { color: "transparent" } } } },
          { where: { status: "error" }, partialSurface: { tint: "status-error", interior: { foreground: "status-error" }, boundary: { border: { color: "status-error" } } } },
          { where: { status: "destructive" }, partialSurface: { tint: "status-error", interior: { foreground: "status-error" }, boundary: { border: { color: "status-error" } } } },
          { where: { status: "success" }, partialSurface: { tint: "status-success", interior: { foreground: "status-success" }, boundary: { border: { color: "status-success" } } } },
          { where: { status: "warning" }, partialSurface: { tint: "status-warning", interior: { foreground: "status-warning-dark" }, boundary: { border: { color: "status-warning" } } } },
          { where: { status: "info" }, partialSurface: { tint: "brand-1", interior: { foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1" } } } },
          // filled + status: the fill takes the status color
          { where: { emphasis: "primary", status: "error" }, partialSurface: { interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", status: "destructive" }, partialSurface: { interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", status: "success" }, partialSurface: { interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", status: "warning" }, partialSurface: { interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", status: "info" }, partialSurface: { interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          // states
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" }, boundary: { border: { color: "gray-500" } } } },
          { where: { emphasis: "primary", state: "hover" }, partialSurface: { interior: { background: "brand-1-dark", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "hero", state: "hover" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "tertiary", state: "hover" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "quiet", state: "hover" }, partialSurface: { interior: { background: "gray-100", foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { state: "active" }, partialSurface: { interior: { background: "gray-100" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1" } } } },
          // selected + status: keep the status colour, don't fall back to the generic brand selection tint
          { where: { state: "selected", status: "error" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { state: "selected", status: "destructive" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { state: "selected", status: "success" }, partialSurface: { interior: { background: "status-success", foreground: "smart-bw" }, boundary: { border: { color: "status-success" } } } },
          { where: { state: "selected", status: "warning" }, partialSurface: { interior: { background: "status-warning", foreground: "smart-bw" }, boundary: { border: { color: "status-warning" } } } },
          { where: { state: "selected", status: "info" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "brand-1" } } } },
          { where: { state: "focus" }, partialSurface: { boundary: { outline: { width: "thin", style: "solid", color: "brand-1", offset: "1px" } } } },
          { where: { state: "disabled" }, partialSurface: { interior: { opacity: 0.45 }, cursor: "not-allowed" } },
          { where: { state: "loading" }, partialSurface: { cursor: "progress", interior: { opacity: 0.7 } } },
        ],
      },
    },

    shape: { surface: { interior: { foreground: "currentColor", background: "transparent", padding: {} }, boundary: { border: { width: "none" } } } },
    media: { surface: { interior: { background: "gray-100", padding: {} }, boundary: { border: { width: "thin", style: "solid", color: "gray-200" } } }, objectFit: "cover" },
  },

  elements: {
    // ── the label voice: mono, small, tracked, uppercase, gray ──
    label: {
      surface: {
        interior: { background: "transparent", foreground: "gray-500", padding: {} },
        boundary: { border: { width: "none" } },
        defaultTypography: { typographyType: "numbersExtraSmall", textTransform: "uppercase" },
      },
    },
    fieldDescription: { surface: { interior: { background: "transparent", foreground: "gray-600", padding: {} }, boundary: { border: { width: "none" } }, defaultTypography: { typographyType: "bodySmall" } } },
    fieldMessage: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "none" } }, defaultTypography: { typographyType: "bodySmall" } } },
    tableHeaderCell: {
      interior: { padding: { x: "lg", y: "xs" }, foreground: "gray-500", background: "transparent" },
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "gray-200" } } },
      defaultTypography: { typographyType: "numbersExtraSmall", textTransform: "uppercase", textAlign: "left" },
    },
    tableRoot: { boundary: { border: { width: "none" } }, interior: { background: "transparent", padding: {} } },
    tableRow: {
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "gray-100" } } },
      interior: { background: "transparent" },
      combined: [
        { where: { state: "hover" }, partialSurface: { interior: { background: "background" } } },
        { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light" } } },
      ],
    },
    tableCell: { interior: { padding: { x: "lg", y: "sm" } }, boundary: { border: { width: "none" } }, defaultTypography: { typographyType: "body" } },

    // ── plain containers: the card is THE surface; content regions are transparent inside it ──
    card: { interior: { padding: { x: "lg", y: "md" }, gap: { all: "md" } }, boundary: { effect: "card" } },
    header: {
      interior: { background: "transparent", padding: { x: "lg", y: "md" }, gap: { all: "sm" } },
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "gray-100" } } },
      defaultTypography: { typographyType: "heading4" },
    },
    content: { interior: { background: "transparent", padding: { x: "lg", y: "md" } }, boundary: { border: { width: "none" } } },
    footer: {
      interior: { background: "background", padding: { x: "lg", y: "sm" }, gap: { all: "sm" } },
      boundary: { border: { width: "none", top: { width: "thin", style: "solid", color: "gray-100" } } },
    },
    panel: { interior: { padding: { all: "lg" } } },
    // ═══════════════════════════════════════════════════════════════════════
    // TILE — the cell of a Stack of tiles (pattern: card-with-tiles)
    // The markup only says surface--tile (+ emphasis / status). Everything
    // visual about a tile is decided HERE: its fill, its seam, its padding.
    // dainta: a white cell, a hairline all round, no radius — the seam between
    // two tiles is their hairlines, with the Stack's gap between them.
    // hero = the dark band · quiet = sinks into the page ground, no line.
    // A gap-reveal seam (the stack's ground showing through a 1px gap) needs
    // layouts.stack in the engine — the next step, not here.
    // ═══════════════════════════════════════════════════════════════════════
    tile: {
      interior: { background: "background", foreground: "foreground", padding: { all: "md" }, gap: { all: "xs" } },
      boundary: { border: { width: "thin", style: "solid", color: "gray-200" }, radius: { all: "none" } },
      combined: [
        { where: { emphasis: "hero" }, partialSurface: { interior: { background: "brand-2", foreground: "smart-bw" }, boundary: { border: { color: "brand-2" } } } },
        { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "background" }, boundary: { border: { color: "transparent" } } } },
      ],
    },
    separator: { surface: { interior: { background: "gray-100", padding: {} }, boundary: { border: { width: "none" } } }, height: "1px" },
    emptyState: {
      surface: {
        interior: { background: "transparent", foreground: "gray-600", padding: { all: "xl" }, childAlign: { horizontal: "center", vertical: "center" } },
        boundary: { border: { width: "thin", style: "dashed", color: "gray-300" } },
      },
    },
    alert: { surface: { interior: { padding: { x: "md", y: "sm" }, gap: { all: "sm" } }, boundary: { border: { width: "thin", style: "solid", color: "gray-200" } } } },

    // ── badge: the mono data label; quiet by default, filled by status ──
    badge: {
      surface: {
        interior: { background: "background", foreground: "foreground", padding: { x: "xs", y: "3xs" }, gap: { all: "2xs" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-300" } },
        defaultTypography: { typographyType: "numbersSmall" },
        combined: [
          { where: { status: "error" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { status: "destructive" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { status: "success" }, partialSurface: { interior: { background: "status-success-light", foreground: "status-success" }, boundary: { border: { color: "status-success-light" } } } },
          { where: { status: "warning" }, partialSurface: { interior: { background: "status-warning-light", foreground: "status-warning-dark" }, boundary: { border: { color: "status-warning-light" } } } },
          { where: { status: "info" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1-light" } } } },
          { where: { emphasis: "primary" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "brand-1" } } } },
          // emphasis="primary" is the component default — without these, the
          // plain-emphasis rule above (unconditional) clobbers every status
          // colour on a badge that never opted into a different emphasis.
          { where: { emphasis: "primary", status: "error" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { emphasis: "primary", status: "destructive" }, partialSurface: { interior: { background: "status-error", foreground: "smart-bw" }, boundary: { border: { color: "status-error" } } } },
          { where: { emphasis: "primary", status: "success" }, partialSurface: { interior: { background: "status-success-light", foreground: "status-success" }, boundary: { border: { color: "status-success-light" } } } },
          { where: { emphasis: "primary", status: "warning" }, partialSurface: { interior: { background: "status-warning-light", foreground: "status-warning-dark" }, boundary: { border: { color: "status-warning-light" } } } },
          { where: { emphasis: "primary", status: "info" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1-light" } } } },
          { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "transparent", foreground: "gray-500" }, boundary: { border: { color: "transparent" } } } },
        ],
      },
      sizes: {
        "3xs": { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "8px", height: "8px" } } },
        "2xs": { partialSurface: { interior: { padding: { x: "2xs", y: "none" } }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        xs: { partialSurface: { interior: { padding: { x: "xs", y: "3xs" } }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        sm: { partialSurface: { interior: { padding: { x: "xs", y: "3xs" } }, defaultTypography: { typographyType: "numbersSmall" } } },
        md: { partialSurface: { interior: { padding: { x: "xs", y: "2xs" } }, defaultTypography: { typographyType: "numbersSmall" } } },
        lg: { partialSurface: { interior: { padding: { x: "sm", y: "2xs" } }, defaultTypography: { typographyType: "numbers" } } },
        xl: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "numbers" } } },
      },
    },
    // ── chip: the tinted tag ──
    chip: {
      surface: {
        interior: { background: "brand-3", foreground: "brand-1-dark", padding: { x: "xs", y: "3xs" }, gap: { all: "2xs" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-300" } },
        defaultTypography: { typographyType: "numbersExtraSmall", textTransform: "uppercase" },
        combined: [
          { where: { state: "hover" }, partialSurface: { boundary: { border: { color: "brand-1" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "brand-1" } } } },
        ],
      },
      sizes: {
        xs: { partialSurface: { interior: { padding: { x: "xs", y: "3xs" } } } },
        sm: { partialSurface: { interior: { padding: { x: "xs", y: "3xs" } } } },
        md: { partialSurface: { interior: { padding: { x: "sm", y: "2xs" } } } },
        lg: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "numbersSmall" } } },
        xl: { partialSurface: { interior: { padding: { x: "md", y: "xs" } }, defaultTypography: { typographyType: "numbers" } } },
      },
    },
    // ── avatar: the one round thing ──
    avatar: {
      surface: {
        interior: { background: "brand-1", foreground: "smart-bw", padding: { all: "none" }, childAlign: { horizontal: "center", vertical: "center" } },
        boundary: { radius: { all: "full" }, border: { width: "none" } },
        defaultTypography: { typographyType: "numbersSmall" },
      },
      // A fixed square per scale; the initials step up with it.
      sizes: {
        "2xs": { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "20px", height: "20px" }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        xs: { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "24px", height: "24px" }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        sm: { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "32px", height: "32px" }, defaultTypography: { typographyType: "numbersSmall" } } },
        md: { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "40px", height: "40px" }, defaultTypography: { typographyType: "numbersSmall" } } },
        lg: { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "48px", height: "48px" }, defaultTypography: { typographyType: "numbers" } } },
        xl: { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "64px", height: "64px" }, defaultTypography: { typographyType: "numbers" } } },
      },
    },
    icon: {},
    // ── progress: thin track, brand fill ──
    progress: { surface: { interior: { background: "gray-100", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "4px" } } },
    progressInner: { interior: { background: "brand-1" } },
    skeleton: { surface: { interior: { background: "gray-100" }, boundary: { border: { width: "none" } } } },
    spinner: { surface: { interior: { foreground: "brand-1", background: "transparent" }, boundary: { border: { width: "none" } } } },

    // ── controls ──
    button: { surface: { interior: { gap: { all: "sm" } }, defaultTypography: { typographyType: "body" } } },
    switch: {
      track: {
        dimensionPosition: { width: "30px", height: "17px" },
        interior: { background: "gray-300", padding: { all: "none" } },
        boundary: { radius: { all: "none" }, border: { width: "none" } },
        combined: [{ where: { state: "selected" }, partialSurface: { interior: { background: "brand-1" } } }],
      },
      thumb: {
        dimensionPosition: { width: "13px", height: "13px", translateX: "2px", translateY: "2px" },
        interior: { background: "background" },
        boundary: { radius: { all: "none" }, border: { width: "none" } },
        combined: [{ where: { state: "selected" }, partialSurface: { dimensionPosition: { translateX: "15px" } } }],
      },
    },
    checkbox: {
      surface: {
        interior: { background: "background", padding: { all: "none" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-500" }, radius: { all: "none" } },
        dimensionPosition: { width: "15px", height: "15px" },
        combined: [{ where: { state: "selected" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "brand-1" } } } }],
      },
    },
    radio: {
      surface: {
        interior: { background: "background", padding: { all: "none" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-500" }, radius: { all: "full" } },
        dimensionPosition: { width: "15px", height: "15px" },
        combined: [{ where: { state: "selected" }, partialSurface: { boundary: { border: { width: "extraThick", color: "brand-1" } } } }],
      },
    },
    // ── tabs: text, a 3px brand bar when selected ──
    tabBar: { surface: { boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "gray-200" } } }, interior: { gap: { all: "lg" } } } },
    tabTrigger: {
      surface: {
        interior: { background: "transparent", foreground: "gray-600", padding: { x: "none", y: "sm" } },
        boundary: { border: { width: "none", bottom: { width: "thick", style: "solid", color: "transparent" } } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "transparent", foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "transparent", foreground: "foreground" }, boundary: { border: { bottom: { color: "brand-1" } } } } },
        ],
      },
    },
    // ── sidebar: a light column; the current item is white with a brand bar on its left ──
    // ═══════════════════════════════════════════════════════════════════════
    // SIDEBAR — the rail (control-group--sidebar) and its items (control--sidebar-item)
    // The markup says only: a sidebar, an item, emphasis="primary" for the main
    // nav (tertiary for a section nav), state="selected" for the current one.
    // Here is what that looks like: a white rail; calm ink rows; the current
    // main-nav row is the ONE filled brand-2 band. Without the primary entries
    // below, the control family's primary fill paints every main-nav row a slab.
    // ═══════════════════════════════════════════════════════════════════════
    sidebar: { widthExpanded: "240px", widthCollapsed: "56px", surface: {
       interior: { background: "background", padding: { y: "sm" }, gap: { all: "2xs" } }, 
      boundary: { border: { right: { width: "thin", style: "solid", color: "gray-200" } } }  
       } },
    sidebarItem: {
      surface: {
        interior: { background: "transparent", foreground: "gray-600", padding: { x: "lg", y: "sm" }, gap: { all: "sm" }, childAlign: { horizontal: "start", vertical: "center" } },
        boundary: { border: { width: "none", left: { width: "thick", style: "solid", color: "transparent" } }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { left: { color: "brand-1" } } } } },
          // main nav (emphasis="primary") looks exactly like the section nav: the same quiet rows,
          // the same selected row — light ground and the brand bar. The entries exist only to
          // cancel the control family's primary fill (tint and alpha reset: the fill formula mixes --tint in).
          { where: { emphasis: "primary" }, partialSurface: { tint: "transparent", interior: { background: "transparent", backgroundAlpha: 1, foreground: "gray-600" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", state: "hover" }, partialSurface: { tint: "transparent", interior: { background: "background", backgroundAlpha: 1, foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", state: "selected" }, partialSurface: { tint: "transparent", interior: { background: "background", backgroundAlpha: 1, foreground: "foreground" }, boundary: { border: { color: "transparent", left: { color: "brand-1" } } } } },
        ],
      },
    },
    // ── lists and menus ──
    list: { surface: { interior: { gap: { all: "none" } } } },
    // ── list draggable: a to-do row is a hairline box; the drag shows a dashed ghost, a brand line, a brand outline ──
    listDraggable: { surface: { interior: { gap: { all: "xs" } } } },
    listDraggableGroup: { interior: { background: "transparent", padding: { left: "xl" }, gap: { all: "xs" } }, boundary: { border: { width: "none" } } },
    listDraggableRow: {
      surface: {
        interior: { background: "background", foreground: "foreground", padding: { x: "md", y: "sm" } },
        boundary: { border: { width: "thin", style: "solid", color: "gray-200" }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { boundary: { border: { color: "gray-300" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light" }, boundary: { border: { color: "brand-1" } } } },
        ],
      },
    },
    listDraggableHandle: {
      surface: {
        interior: { background: "transparent", foreground: "gray-400", padding: { all: "2xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        cursor: "grab",
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { foreground: "gray-700" } } },
          { where: { state: "active" }, partialSurface: { interior: { foreground: "brand-1" }, cursor: "grabbing" } },
          { where: { state: "focus" }, partialSurface: { interior: { foreground: "brand-1" } } },
        ],
      },
    },
    listDraggableGhost: { interior: { background: "gray-100", padding: {} }, boundary: { border: { width: "thin", style: "dashed", color: "gray-300" }, radius: { all: "none" } } },
    listDraggableOverlay: { surface: { interior: { background: "background" }, boundary: { effect: "sheet", border: { width: "thin", style: "solid", color: "brand-1" } } } },
    listDraggableDropLine: { surface: { interior: { background: "brand-1", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "3px" } } },
    listDraggableDropInto: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thin", style: "solid", color: "brand-1" }, radius: { all: "none" } } } },
    // ── list tree: ONE tree list — a row is plain until hovered or chosen; the connector lines are hairlines; the drag shows a dashed ghost, a brand line, a brand outline ──
    listTree: { surface: { interior: { gap: { all: "none" } } } },
    listTreeRow: {
      surface: {
        interior: { background: "transparent", foreground: "foreground", padding: { x: "xs", y: "2xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "gray-100" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light" } } },
        ],
      },
    },
    listTreeToggle: {
      surface: {
        interior: { background: "transparent", foreground: "gray-400", padding: { all: "2xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        cursor: "pointer",
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { foreground: "gray-700" } } },
          { where: { state: "focus" }, partialSurface: { interior: { foreground: "brand-1" } } },
        ],
      },
    },
    listTreeLine: { surface: { interior: { background: "gray-300", padding: {} }, boundary: { border: { width: "none" } } } },
    listTreeHandle: {
      surface: {
        interior: { background: "transparent", foreground: "gray-400", padding: { all: "2xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        cursor: "grab",
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { foreground: "gray-700" } } },
          { where: { state: "active" }, partialSurface: { interior: { foreground: "brand-1" }, cursor: "grabbing" } },
          { where: { state: "focus" }, partialSurface: { interior: { foreground: "brand-1" } } },
        ],
      },
    },
    listTreeGhost: { interior: { background: "gray-100", padding: {} }, boundary: { border: { width: "thin", style: "dashed", color: "gray-300" }, radius: { all: "none" } } },
    listTreeOverlay: { surface: { interior: { background: "background" }, boundary: { effect: "sheet", border: { width: "thin", style: "solid", color: "brand-1" } } } },
    listTreeDropLine: { surface: { interior: { background: "brand-1", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "3px" } } },
    listTreeDropInto: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thin", style: "solid", color: "brand-1" }, radius: { all: "none" } } } },
    listItem: {
      surface: {
        interior: { background: "transparent", padding: { x: "lg", y: "sm" }, gap: { all: "sm" } },
        boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "gray-100" } }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" }, boundary: { border: { color: "gray-100" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" }, boundary: { border: { color: "gray-100" } } } },
        ],
      },
    },
    menuItem: {
      surface: {
        interior: { background: "transparent", padding: { x: "md", y: "xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background", foreground: "foreground" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-3", foreground: "brand-1-dark" } } },
          { where: { status: "destructive" }, partialSurface: { interior: { foreground: "status-error" } } },
        ],
      },
    },
    accordionTrigger: {
      surface: {
        interior: { background: "transparent", padding: { x: "none", y: "sm" } },
        boundary: { border: { width: "none" } },
        defaultTypography: { typographyType: "heading4" },
      },
    },
    // ── fields with a distinct look ──
    fileUpload: {
      surface: {
        interior: { background: "background", foreground: "gray-600", padding: { all: "xl" }, childAlign: { horizontal: "center", vertical: "center" } },
        boundary: { border: { width: "default", style: "dashed", color: "gray-300" } },
        cursor: "pointer",
        combined: [{ where: { state: "selected" }, partialSurface: { boundary: { border: { color: "brand-1" } }, interior: { background: "brand-1-light" } } }],
      },
    },
    select: { surface: { cursor: "pointer" } },
    // ── overlays ──
    dialog: { surface: { interior: { padding: { all: "none" }, gap: { all: "none" } } } },
    sheet: { surface: { boundary: { effect: "drawer", border: { width: "none" } }, interior: { padding: { all: "none" } } } },
    popover: { surface: { boundary: { effect: "popover" }, interior: { padding: { all: "sm" } } } },
    tooltip: {
      surface: {
        interior: { background: "brand-2", foreground: "smart-bw", padding: { x: "sm", y: "xs" } },
        boundary: { border: { width: "none" }, effect: "card" },
        defaultTypography: { typographyType: "bodySmall" },
      },
    },
    toast: { surface: { interior: { padding: { x: "md", y: "sm" } }, boundary: { effect: "sheet" } } },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTEXTUAL — parent → child (L5), as LLC's theme did it. Inside the sidebar
  // the header, content and footer regions and the items wear sidebar paddings,
  // not a card's: the generic content padding (x: lg) inside a 56px rail left
  // no room for an icon. This — with widthExpanded/widthCollapsed on `sidebar`
  // above — is the whole collapse: the component only flips [collapsed].
  // ═══════════════════════════════════════════════════════════════════════════
  contextual: {
    sidebar: {
      header: { interior: { padding: { x: "md", y: "md" } } },
      content: { interior: { padding: { x: "sm", y: "sm" } } },
      // the sidebar's own footer belongs to the rail, not the page — inherit the
      // rail's fill instead of painting `background` (which reads as the main body).
      footer: { interior: { padding: { x: "md", y: "sm" }, background: "transparent" } },
      sidebarItem: { interior: { padding: { x: "md", y: "sm" }, gap: { all: "md" } } },
    },
  },

  // The persona previewer (concept on its wrapper): its card and its tiles have no padding and no gap, its card has a thick left border (the persona's colour is set on it by the previewer), and its tiles no border, so the band, the portrait and the content run to the edge.
  concepts: {
    "persona-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "extraThick", style: "solid", color: "gray-200" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { width: "none" } } },
    },
    "persona-previewer-stacked": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { top: { width: "extraThick", style: "solid", color: "gray-200" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { width: "none" } } },
    },
    "organization-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "extraThick", style: "solid", color: "gray-200" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { width: "none" } } },
    },
    "organization-previewer-stacked": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { top: { width: "extraThick", style: "solid", color: "gray-200" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { width: "none" } } },
    },
    "goal-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "none" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" }, background: "brand-3", foreground: "smart-bw" }, boundary: { border: { width: "none" } } },
    },
    "goal-group-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "none" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" }, background: "brand-1", foreground: "smart-bw" }, boundary: { border: { width: "none" } } },
    },
    "exploration-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "none" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" }, background: "status-success", foreground: "smart-bw" }, boundary: { border: { width: "none" } } },
    },
    "canvas-card": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } } },
    },
    "canvas-note": {
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } } },
    },
    "live-play-player": {
      button: { boundary: { radius: { all: "full" } } },
    },
    "erd-node-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { width: "none" } } },
    },
    "use-case-previewer": {
      card: { interior: { padding: { all: "none" }, gap: { all: "none" } }, boundary: { border: { left: { width: "none" } } } },
      tile: { interior: { padding: { all: "none" }, gap: { all: "none" }, background: "brand-1-light", foreground: "smart-bw" }, boundary: { border: { width: "none" } } },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RULES — the collapsed rail. Nav icons already sit centred in 56px; the
  // header's and footer's items lead with a 32px avatar, which the expanded
  // insets (region md + item md) push half out of the rail — tighten them.
  // ═══════════════════════════════════════════════════════════════════════════
  rules: [
    // TEMPORARY (UI as data migration): a card wearing concept="red-border" is a 4px red frame with no padding, wrapped around the shells that are
    // UI as data so they can be told from the hosted ones. Remove with the RedBorder component once the shells' sidebar is UI as data too.
    { chain: [{ key: "card", concept: "red-border" }], tokens: { boundary: { border: { width: "extraThick", style: "solid", color: "status-error" } }, interior: { padding: { all: "none" }, background: "transparent" } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "header" }], tokens: { interior: { padding: { x: "sm" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "footer" }], tokens: { interior: { padding: { x: "sm" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "header" }, { key: "sidebarItem" }], tokens: { interior: { padding: { x: "xs" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "footer" }, { key: "sidebarItem" }], tokens: { interior: { padding: { x: "xs" } } } },
  ],
};
