import type { WebTheme } from "../../../types";

// Bounx v1 — authored from the Bounx prototype ("Bounx latest proto.tsx", its own CSS) with skills/new-theme.
// The scaffold was wireframe-stroke v1; the primitives below are the prototype's.
//
// L1 read of the target
//   anchors     ground #F6F2EA (warm paper) · ink #1A1813
//   surfaces    card #FFFFFF on the ground · line #ECE5D7 · line2 #F3EEE3
//   brand       1 #1F9D5C green (deep #157043, soft #E5F3EA) · 2 #1A1813 ink (the coach's dark controls) · 3 #E2902B amber
//   status      up #1F9D5C · down #D6453B (soft #FBE3E1) · amber #E2902B (soft #FBEAD2) · gold #D8A53B (soft #FBF1D8)
//   text grays  #7C7666 soft · #A8A294 faint
//   fonts       Fraunces 600 (titles, big numbers) · Plus Jakarta Sans 400/500/600/700/800 (everything else)
//   scale       10 · 11 · 11.5 · 12 · 12.5 · 13 · 13.5 · 14 · 15 · 15.5 · 16 · 20 · 21 · 22 · 26 · 27
//   rhythm      4 / 8 / 16 / 24 (unit 1rem)
//   radius      9 · 12 · 13 · 14 · 16 · 18 · 22 · 24 · 28 · pills and avatars full
//   borders     1px lines · 1.5px on the signal buttons
//   effects     card 0 2 10 @.03 · button glow 0 8 20 brand @.25 · dark button 0 8 20 ink @.22 · float 0 14 40 @.08
//
// How the target maps onto the mode's colours (light: background = the white surface, foreground = the ink)
//   surface = background          text = foreground        — the two that swap in dark
//   ground  = brand-3-gray-50     the warm paper: a gray with the amber mixed in (#F8F2EA for the prototype's #F6F2EA)
//   line    = brand-3-gray-150    line2 = brand-3-gray-100
//   soft    = brand-3-gray-600    faint = brand-3-gray-400
//   brand deep = brand-1-dark     brand soft = brand-1-light (12% on the surface: the prototype's #E5F3EA)
//   the status softs = status-x-light (15% on the surface)
//   text on a coloured fill = smart-bw: white or black, read from the fill
//   a fixed white or black is named only where it must not swap: the anchors, the shadows
//
// Open: the prototype draws no dark mode, no focus ring, no disabled state, and no violet, purple or pink.
// Those keep values that fit; a real design decides them.

export const bounxTheme: WebTheme = {
  id: "bounx-test",
  name: "Bounx-test",
  version: 1,
  type: "high-fidelity",
  kind: "product",

  colors: {
    main: { white: "#FFFFFF", black: "#1A1813" },
    brand: { "1": "#ff0000", "2": "#1A1813", "3": "#E2902B", "4": "#7C7666" },
    status: { success: "#1F9D5C", info: "#1F9D5C", warning: "#E2902B", error: "#D6453B" },
    flat: {
      red: "#D6453B", orange: "#E2902B", yellow: "#D8A53B", lime: "#3FBE7C", green: "#1F9D5C", mint: "#E5F3EA",
      turquoise: "#1FA463", blue: "#3E8FD0", violet: "#7C7666", purple: "#1A1813", pink: "#FBE3E1",
    },
    semanticTokens: { primary: "brand-1", secondary: "brand-2", accent: "brand-3", muted: "brand-4" },
  },

  typography: {
    fonts: {
      primary: "Plus Jakarta Sans", secondary: "Fraunces", quote: "Fraunces",
      monoPrimary: "Plus Jakarta Sans", monoSecondary: "Plus Jakarta Sans",
    },
    fontSources: {
      "Plus Jakarta Sans": { type: "google", url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
      "Fraunces": { type: "google", url: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" },
    },
    types: {
      // titles: Fraunces
      heading1: { fontFamily: "secondary", fontStyle: "normal", fontSizeMobile: 27, fontSizeDesktop: 32, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.5px" },
      heading2: { fontFamily: "secondary", fontStyle: "normal", fontSizeMobile: 21, fontSizeDesktop: 24, fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.2px" },
      heading3: { fontFamily: "secondary", fontStyle: "normal", fontSizeMobile: 20, fontSizeDesktop: 20, fontWeight: 600, lineHeight: 1.25 },
      // a card's title: the UI face, bold
      heading4: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 16, fontSizeDesktop: 16, fontWeight: 700, lineHeight: 1.3 },
      bodyExtraLarge: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 15.5, fontSizeDesktop: 16, fontWeight: 400, lineHeight: 1.5 },
      bodyLarge: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 15, fontSizeDesktop: 15, fontWeight: 400, lineHeight: 1.5 },
      body: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 14, fontSizeDesktop: 14, fontWeight: 400, lineHeight: 1.5 },
      bodySmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 12.5, fontSizeDesktop: 13, fontWeight: 400, lineHeight: 1.45 },
      bodyExtraSmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 12, fontSizeDesktop: 12, fontWeight: 400, lineHeight: 1.4 },
      quoteLarge: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 20, fontSizeDesktop: 22, fontWeight: 500, lineHeight: 1.4 },
      quote: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 16, fontSizeDesktop: 17, fontWeight: 500, lineHeight: 1.45 },
      quoteSmall: { fontFamily: "quote", fontStyle: "normal", fontSizeMobile: 14, fontSizeDesktop: 14, fontWeight: 500, lineHeight: 1.45 },
      code: { fontFamily: "monoPrimary", fontStyle: "normal", fontSizeMobile: 12.5, fontSizeDesktop: 13, fontWeight: 500, lineHeight: 1.5 },
      // big numbers: Fraunces, as the prototype's scores
      numbersExtraLarge: { fontFamily: "secondary", fontStyle: "normal", fontSizeMobile: 32, fontSizeDesktop: 44, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.5px" },
      numbersLarge: { fontFamily: "secondary", fontStyle: "normal", fontSizeMobile: 22, fontSizeDesktop: 26, fontWeight: 600, lineHeight: 1.1 },
      // the strong UI voice, three sizes: a small button · a pill · the uppercase label
      numbers: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 13.5, fontSizeDesktop: 13.5, fontWeight: 700, lineHeight: 1.3 },
      numbersSmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 11.5, fontSizeDesktop: 11.5, fontWeight: 700, lineHeight: 1.3 },
      numbersExtraSmall: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 11, fontSizeDesktop: 11, fontWeight: 800, lineHeight: 1.4, letterSpacing: "0.7px" },
      // an action's text: a button, a link
      link: { fontFamily: "primary", fontStyle: "normal", fontSizeMobile: 15, fontSizeDesktop: 15, fontWeight: 700, lineHeight: 1.3 },
    },
  },

  spacing: { unit: 1 },
  radius: { none: "0px", "3xs": "4px", "2xs": "6px", xs: "9px", sm: "12px", md: "16px", lg: "18px", xl: "22px", "2xl": "24px", "3xl": "28px", full: "9999px" },
  effects: {
    card: [{ type: "drop-shadow", x: 0, y: 2, blur: 10, color: "#3C321E", opacity: 0.03 }],
    button: [{ type: "drop-shadow", x: 0, y: 8, blur: 20, color: "brand-1", opacity: 0.25 }],
    buttonDark: [{ type: "drop-shadow", x: 0, y: 8, blur: 20, color: "main-black", opacity: 0.22 }],
    sheet: [{ type: "drop-shadow", x: 0, y: 14, blur: 40, color: "#3C321E", opacity: 0.08 }],
    drawer: [{ type: "drop-shadow", x: -20, y: 0, blur: 44, color: "#3C321E", opacity: 0.16 }],
    popover: [{ type: "drop-shadow", x: 0, y: 6, blur: 22, color: "#3C321E", opacity: 0.08 }],
  },
  transitions: {
    duration: { extraFast: "50ms", fast: "140ms", average: "180ms", slow: "400ms", extraSlow: "900ms" },
    timing: { ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out", linear: "linear" },
  },
  borderWidths: { none: "0px", extraThin: "0.5px", thin: "1px", default: "1.5px", thick: "2px", extraThick: "4px" },

  modes: {
    colorScheme: {
      light: {
        // the anchors are the surface and the ink; they swap in dark. The warm paper is not an anchor: it is
        // a gray with the amber mixed in (brand-3-gray-*, at grayColorMixPercentage), so it follows the mode too.
        background: "main-white",
        foreground: "main-black",
        derivation: { brandLightAmount: 12, brandDarkAmount: 66, statusLightAmount: 15, statusDarkAmount: 66, grayColorMixPercentage: "8%", flatSaturationAdjust: 0 },
      },
      // not drawn in the prototype
      dark: {
        background: "#15140F",
        foreground: "#F6F2EA",
        derivation: { brandLightAmount: 18, brandDarkAmount: 70, statusLightAmount: 18, statusDarkAmount: 70, grayColorMixPercentage: "8%", flatSaturationAdjust: 0 },
      },
    },
  },

  icons: { set: "lucide", sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 22 }, weight: 2 },

  layouts: {
    // regions are the canvas: no fill of their own; surfaces inside them are the white boxes
    surface: { interior: { background: "brand-3-gray-50", padding: {}, gap: {} } },
    page: { surface: { interior: { padding: { all: "none" }, gap: { all: "none" } } } },
    // the page header: a white strip with a line under it, the brand in the title's face
    pageHeader: {
      height: "56px", sm: { height: "48px" }, md: { height: "56px" }, lg: { height: "72px" },
      surface: { interior: { background: "background", foreground: "foreground", padding: { x: "xl" } }, boundary: { border: { bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },
    },
    secondPageHeader: {
      height: "56px", sm: { height: "48px" }, md: { height: "56px" }, lg: { height: "72px" },
      surface: { interior: { background: "background", foreground: "foreground", padding: { x: "xl" } }, boundary: { border: { bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },
    },
    // a light toolbar strip under the page band — canvas, a thin rule below.
    // (Not a second dark band; a page that wants one sets emphasis="primary".)
    mainHeader: {
      height: "48px", sm: { height: "40px" }, md: { height: "48px" }, lg: { height: "64px" },
      surface: { boundary: { border: { bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } }, interior: { padding: { x: "lg" }, background: "brand-3-gray-50", foreground: "foreground" } },
    },
    secondMainHeader: {
      height: "48px", sm: { height: "40px" }, md: { height: "48px" }, lg: { height: "64px" },
      surface: { boundary: { border: { bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } }, interior: { padding: { x: "lg" }, background: "brand-3-gray-50", foreground: "foreground" } },
    },
    leftSidebar: {
      width: "240px", sm: { width: "200px" }, md: { width: "240px" }, lg: { width: "300px" },
      surface: { boundary: { border: { right: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },
    },
    rightSidebar: {
      width: "320px", sm: { width: "280px" }, md: { width: "320px" }, lg: { width: "420px" },
      surface: { boundary: { border: { left: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },
    },
    contextPanel: {
      width: "320px", sm: { width: "260px" }, md: { width: "320px" }, lg: { width: "420px" },
      surface: { interior: { background: "brand-3-gray-50" }, boundary: { border: { left: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },
    },
    // emphasis — a region's shade in the layout, over its own base. default =
    // the region as defined (canvas, or the page band); primary = a strong
    // brand band with light text; secondary = a soft branded-gray panel. The
    // base rule still owns which edge the region's border sits on.
    emphasis: {
      primary: { surface: { interior: { background: "brand-2", foreground: "smart-bw" } } },
      secondary: { surface: { interior: { background: "brand-3-gray-100", foreground: "foreground" } } },
    },
    container: { sm: { maxWidth: "640px" }, md: { maxWidth: "940px" }, lg: { maxWidth: "1340px" } },
    dialog: { sm: { maxWidth: "480px" }, md: { maxWidth: "640px" }, lg: { maxWidth: "940px" } },
    sheet: { sm: { size: "320px" }, md: { size: "420px" }, lg: { size: "640px" } },
    section: { surface: { interior: { gap: { all: "lg" } } } },
    // the ground: a shade of gray so content surfaces (cards = `background`) read
    // as raised against it. Both are mode tokens, so the figure/ground survives dark.
    mainBody: { surface: { interior: { background: "brand-3-gray-50", padding: { x: "xl", y: "lg" } } } },
    scrollArea: { scrollbar: { thumbColor: "brand-3-gray-200", trackColor: "transparent", width: "8px" } },
  },

  families: {
    // THE surface: a white box, a hairline, no radius, a whisper of shadow
    surfaceContainer: {
      interior: { background: "background", foreground: "foreground", gap: { all: "md" }, padding: {} },
      boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" }, radius: { all: "xl" } },
      defaultTypography: { typographyType: "body" },
      transition: { duration: "fast", timing: "easeOut" },
      combined: [
        { where: { state: "disabled" }, partialSurface: { interior: { opacity: 0.45 }, cursor: "not-allowed" } },
        // status on a surface: a pale fill of its color, text in the color
        { where: { status: "error" }, partialSurface: { tint: "status-error", interior: { background: "status-error-light", foreground: "status-error" }, boundary: { border: { color: "status-error-light" } } } },
        { where: { status: "success" }, partialSurface: { tint: "status-success", interior: { background: "status-success-light", foreground: "status-success" }, boundary: { border: { color: "status-success-light" } } } },
        { where: { status: "warning" }, partialSurface: { tint: "status-warning", interior: { background: "status-warning-light", foreground: "status-warning-dark" }, boundary: { border: { color: "status-warning-light" } } } },
        { where: { status: "info" }, partialSurface: { tint: "brand-1", interior: { background: "brand-1-light", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-1-light" } } } },
        // hero: the dark band
        { where: { emphasis: "hero" }, partialSurface: { interior: { background: "brand-2", foreground: "smart-bw" }, boundary: { border: { color: "brand-2" } } } },
        { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "transparent", foreground: "brand-3-gray-700" }, boundary: { border: { color: "transparent" } } } },
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
        boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" }, radius: { all: "md" } },
        cursor: "text",
        combined: [
          { where: { state: "hover" }, partialSurface: { boundary: { border: { color: "brand-3-gray-600" } } } },
          { where: { state: "focus" }, partialSurface: { boundary: { border: { color: "brand-1" }, outline: { width: "thin", style: "solid", color: "brand-1", offset: "0px" } } } },
          { where: { status: "error" }, partialSurface: { tint: "status-error", boundary: { border: { color: "status-error" } } } },
          { where: { status: "success" }, partialSurface: { tint: "status-success", boundary: { border: { color: "status-success" } } } },
          { where: { status: "warning" }, partialSurface: { tint: "status-warning", boundary: { border: { color: "status-warning" } } } },
          { where: { state: "disabled" }, partialSurface: { interior: { background: "background", opacity: 0.6 }, cursor: "not-allowed" } },
        ],
      },
      placeholderColor: "brand-3-gray-600",
      placeholderOpacity: 1,
      caretColor: "brand-1",
    },

    elevatedOverlay: {
      surface: { interior: { background: "background" }, boundary: { effect: "sheet", border: { width: "thin", style: "solid", color: "brand-3-gray-150" } } },
      overlay: { scrimColor: "brand-2", scrimOpacity: 0.45, scrimBlur: "none" },
    },

    listContainer: {
      surface: { interior: { gap: { all: "none" }, padding: {} } },
      row: {
        interior: { padding: { y: "sm" } },
        boundary: { border: { bottom: { width: "thin", style: "solid", color: "brand-3-gray-100" } } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light" } } },
        ],
      },
      // no `cell`: it compiles to `[list] > * > *` — every grandchild of a list — and in a
      // menu (list--menu > menu-item > icon · label · badge) it padded the icon to zero
      // width and pushed the label. Row padding is the item's; part spacing is its gap.
      separator: { height: "1px", surface: { interior: { background: "brand-3-gray-100" } } },
    },

    interactiveControlGroup: {
      surface: { interior: { background: "transparent", gap: { all: "none" }, padding: {} }, boundary: { border: { width: "none" } } },
    },

    interactiveControl: {
      sizes: {
        "3xs": { partialSurface: { boundary: { radius: { all: "sm" } }, interior: { padding: { x: "2xs", y: "3xs" } }, defaultTypography: { typographyType: "numbersSmall" } }, icon: { size: "3xs" } },
        "2xs": { partialSurface: { boundary: { radius: { all: "sm" } }, interior: { padding: { x: "xs", y: "2xs" } }, defaultTypography: { typographyType: "numbersSmall" } }, icon: { size: "2xs" } },
        xs: { partialSurface: { boundary: { radius: { all: "sm" } }, interior: { padding: { x: "xs", y: "xs" } }, defaultTypography: { typographyType: "numbersSmall" } }, icon: { size: "xs" } },
        sm: { partialSurface: { boundary: { radius: { all: "sm" } }, interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "numbers" } }, icon: { size: "xs" } },
        md: { partialSurface: { interior: { padding: { x: "md", y: "sm" } }, defaultTypography: { typographyType: "link" } }, icon: { size: "sm" } },
        lg: { partialSurface: { interior: { padding: { x: "lg", y: "sm" } }, defaultTypography: { typographyType: "link" } }, icon: { size: "md" } },
        xl: { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "link" } }, icon: { size: "lg" } },
        "2xl": { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "link" } }, icon: { size: "lg" } },
        "3xl": { partialSurface: { interior: { padding: { x: "xl", y: "md" } }, defaultTypography: { typographyType: "link" } }, icon: { size: "lg" } },
      },
      surface: {
        // the plain control: white, hairline — the target's default button
        interior: { background: "background", foreground: "foreground", padding: { x: "md", y: "sm" }, gap: { all: "sm" } },
        boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" }, radius: { all: "md" } },
        defaultTypography: { typographyType: "link" },
        cursor: "pointer",
        combined: [
          // emphasis = the pattern; tint = the color (status re-tints below)
          // hero: the screen's main action — the brand fill with its glow. primary: the same fill, flat.
          { where: { emphasis: "hero" }, partialSurface: { tint: "primary", interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" }, effect: "button" } } },
          { where: { emphasis: "primary" }, partialSurface: { tint: "primary", interior: { background: "tint", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "secondary" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { color: "brand-3-gray-200" } } } },
          { where: { emphasis: "tertiary" }, partialSurface: { interior: { background: "transparent", foreground: "brand-1" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "transparent", foreground: "brand-3-gray-700" }, boundary: { border: { color: "transparent" } } } },
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
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" }, boundary: { border: { color: "brand-3-gray-600" } } } },
          { where: { emphasis: "primary", state: "hover" }, partialSurface: { interior: { background: "brand-1-dark", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "hero", state: "hover" }, partialSurface: { interior: { background: "brand-1-dark", foreground: "smart-bw" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "tertiary", state: "hover" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "quiet", state: "hover" }, partialSurface: { interior: { background: "brand-3-gray-100", foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { state: "active" }, partialSurface: { interior: { background: "brand-3-gray-100" } } },
          // selected: the ink fill, as the prototype's chosen tab
          { where: { state: "selected" }, partialSurface: { tint: "brand-2", interior: { background: "brand-2", foreground: "smart-bw" }, boundary: { border: { color: "brand-2" } } } },
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
    media: { surface: { interior: { background: "brand-3-gray-100", padding: {} }, boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" } } }, objectFit: "cover" },
  },

  elements: {
    // ── the label voice: mono, small, tracked, uppercase, gray ──
    label: {
      surface: {
        interior: { background: "transparent", foreground: "brand-3-gray-400", padding: {} },
        boundary: { border: { width: "none" } },
        defaultTypography: { typographyType: "numbersExtraSmall", textTransform: "uppercase" },
      },
    },
    fieldDescription: { surface: { interior: { background: "transparent", foreground: "brand-3-gray-700", padding: {} }, boundary: { border: { width: "none" } }, defaultTypography: { typographyType: "bodySmall" } } },
    fieldMessage: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "none" } }, defaultTypography: { typographyType: "bodySmall" } } },
    tableHeaderCell: {
      interior: { padding: { x: "lg", y: "xs" }, foreground: "brand-3-gray-600", background: "transparent" },
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } },
      defaultTypography: { typographyType: "numbersExtraSmall", textTransform: "uppercase", textAlign: "left" },
    },
    tableRoot: { boundary: { border: { width: "none" } }, interior: { background: "transparent", padding: {} } },
    tableRow: {
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "brand-3-gray-100" } } },
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
      boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "brand-3-gray-100" } } },
      defaultTypography: { typographyType: "heading4" },
    },
    content: { interior: { background: "transparent", padding: { x: "lg", y: "md" } }, boundary: { border: { width: "none" } } },
    footer: {
      interior: { background: "background", padding: { x: "lg", y: "sm" }, gap: { all: "sm" } },
      boundary: { border: { width: "none", top: { width: "thin", style: "solid", color: "brand-3-gray-100" } } },
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
      boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" }, radius: { all: "md" } },
      combined: [
        { where: { emphasis: "hero" }, partialSurface: { interior: { background: "brand-2", foreground: "smart-bw" }, boundary: { border: { color: "brand-2" } } } },
        { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "brand-3-gray-50" }, boundary: { border: { color: "transparent" } } } },
      ],
    },
    separator: { surface: { interior: { background: "brand-3-gray-100", padding: {} }, boundary: { border: { width: "none" } } }, height: "1px" },
    emptyState: {
      surface: {
        interior: { background: "transparent", foreground: "brand-3-gray-700", padding: { all: "xl" }, childAlign: { horizontal: "center", vertical: "center" } },
        boundary: { border: { width: "thin", style: "dashed", color: "brand-3-gray-200" } },
      },
    },
    alert: { surface: { interior: { padding: { x: "md", y: "sm" }, gap: { all: "sm" } }, boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-150" } } } },

    // ── badge: the pill — soft green with deep green text; gray when quiet; a status takes its soft fill ──
    badge: {
      surface: {
        interior: { background: "brand-1-light", foreground: "brand-1-dark", padding: { x: "sm", y: "xs" }, gap: { all: "2xs" } },
        boundary: { border: { width: "none" }, radius: { all: "full" } },
        defaultTypography: { typographyType: "numbersSmall" },
        combined: [
          { where: { emphasis: "primary" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" } } },
          { where: { emphasis: "hero" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" } } },
          { where: { emphasis: "quiet" }, partialSurface: { interior: { background: "brand-3-gray-150", foreground: "brand-3-gray-600" } } },
          { where: { status: "error" }, partialSurface: { interior: { background: "status-error-light", foreground: "status-error" } } },
          { where: { status: "destructive" }, partialSurface: { interior: { background: "status-error-light", foreground: "status-error" } } },
          { where: { status: "success" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" } } },
          { where: { status: "warning" }, partialSurface: { interior: { background: "status-warning-light", foreground: "status-warning-dark" } } },
          { where: { status: "info" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" } } },
          // emphasis="primary" is the component default: a status on it still shows its colour
          { where: { emphasis: "primary", status: "error" }, partialSurface: { interior: { background: "status-error-light", foreground: "status-error" } } },
          { where: { emphasis: "primary", status: "destructive" }, partialSurface: { interior: { background: "status-error-light", foreground: "status-error" } } },
          { where: { emphasis: "primary", status: "warning" }, partialSurface: { interior: { background: "status-warning-light", foreground: "status-warning-dark" } } },
        ],
      },
      sizes: {
        "3xs": { partialSurface: { interior: { padding: { all: "none" } }, dimensionPosition: { width: "8px", height: "8px" } } },
        "2xs": { partialSurface: { interior: { padding: { x: "2xs", y: "none" } }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        xs: { partialSurface: { interior: { padding: { x: "xs", y: "3xs" } }, defaultTypography: { typographyType: "numbersExtraSmall" } } },
        sm: { partialSurface: { interior: { padding: { x: "sm", y: "2xs" } }, defaultTypography: { typographyType: "numbersSmall" } } },
        md: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "numbersSmall" } } },
        lg: { partialSurface: { interior: { padding: { x: "sm", y: "2xs" } }, defaultTypography: { typographyType: "numbers" } } },
        xl: { partialSurface: { interior: { padding: { x: "sm", y: "xs" } }, defaultTypography: { typographyType: "numbers" } } },
      },
    },
    // ── chip: the tinted tag ──
    chip: {
      surface: {
        interior: { background: "brand-1-light", foreground: "brand-1-dark", padding: { x: "xs", y: "3xs" }, gap: { all: "2xs" } },
        boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-200" } },
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
    progress: { surface: { interior: { background: "brand-3-gray-100", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "4px" } } },
    progressInner: { interior: { background: "brand-1" } },
    skeleton: { surface: { interior: { background: "brand-3-gray-100" }, boundary: { border: { width: "none" } } } },
    spinner: { surface: { interior: { foreground: "brand-1", background: "transparent" }, boundary: { border: { width: "none" } } } },

    // ── controls ──
    button: { surface: { interior: { gap: { all: "sm" } } } },
    switch: {
      track: {
        dimensionPosition: { width: "30px", height: "17px" },
        interior: { background: "brand-3-gray-200", padding: { all: "none" } },
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
        boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-600" }, radius: { all: "none" } },
        dimensionPosition: { width: "15px", height: "15px" },
        combined: [{ where: { state: "selected" }, partialSurface: { interior: { background: "brand-1", foreground: "smart-bw" }, boundary: { border: { color: "brand-1" } } } }],
      },
    },
    radio: {
      surface: {
        interior: { background: "background", padding: { all: "none" } },
        boundary: { border: { width: "thin", style: "solid", color: "brand-3-gray-600" }, radius: { all: "full" } },
        dimensionPosition: { width: "15px", height: "15px" },
        combined: [{ where: { state: "selected" }, partialSurface: { boundary: { border: { width: "extraThick", color: "brand-1" } } } }],
      },
    },
    // ── tabs: text, a 3px brand bar when selected ──
    tabBar: { surface: { boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "brand-3-gray-150" } } }, interior: { gap: { all: "lg" } } } },
    tabTrigger: {
      surface: {
        interior: { background: "transparent", foreground: "brand-3-gray-700", padding: { x: "none", y: "sm" } },
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
      boundary: { border: { right: { width: "thin", style: "solid", color: "brand-3-gray-150" } } }  
       } },
    sidebarItem: {
      surface: {
        interior: { background: "transparent", foreground: "brand-3-gray-700", padding: { x: "lg", y: "sm" }, gap: { all: "sm" }, childAlign: { horizontal: "start", vertical: "center" } },
        boundary: { border: { width: "none", left: { width: "thick", style: "solid", color: "transparent" } }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "background", foreground: "foreground" }, boundary: { border: { left: { color: "brand-1" } } } } },
          // main nav (emphasis="primary") looks exactly like the section nav: the same quiet rows,
          // the same selected row — light ground and the brand bar. The entries exist only to
          // cancel the control family's primary fill (tint and alpha reset: the fill formula mixes --tint in).
          { where: { emphasis: "primary" }, partialSurface: { tint: "transparent", interior: { background: "transparent", backgroundAlpha: 1, foreground: "brand-3-gray-700" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", state: "hover" }, partialSurface: { tint: "transparent", interior: { background: "background", backgroundAlpha: 1, foreground: "foreground" }, boundary: { border: { color: "transparent" } } } },
          { where: { emphasis: "primary", state: "selected" }, partialSurface: { tint: "transparent", interior: { background: "background", backgroundAlpha: 1, foreground: "foreground" }, boundary: { border: { color: "transparent", left: { color: "brand-1" } } } } },
        ],
      },
    },
    // ── lists and menus ──
    list: { surface: { interior: { gap: { all: "none" } } } },
    listItem: {
      surface: {
        interior: { background: "transparent", padding: { x: "lg", y: "sm" } },
        boundary: { border: { width: "none", bottom: { width: "thin", style: "solid", color: "brand-3-gray-100" } }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background" }, boundary: { border: { color: "brand-3-gray-100" } } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" }, boundary: { border: { color: "brand-3-gray-100" } } } },
        ],
      },
    },
    menuItem: {
      surface: {
        interior: { background: "transparent", padding: { x: "md", y: "xs" } },
        boundary: { border: { width: "none" }, radius: { all: "none" } },
        combined: [
          { where: { state: "hover" }, partialSurface: { interior: { background: "background", foreground: "foreground" } } },
          { where: { state: "selected" }, partialSurface: { interior: { background: "brand-1-light", foreground: "brand-1-dark" } } },
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
        interior: { background: "background", foreground: "brand-3-gray-700", padding: { all: "xl" }, childAlign: { horizontal: "center", vertical: "center" } },
        boundary: { border: { width: "default", style: "dashed", color: "brand-3-gray-200" } },
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

  // ═══════════════════════════════════════════════════════════════════════════
  // RULES — the collapsed rail. Nav icons already sit centred in 56px; the
  // header's and footer's items lead with a 32px avatar, which the expanded
  // insets (region md + item md) push half out of the rail — tighten them.
  // ═══════════════════════════════════════════════════════════════════════════
  rules: [
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "header" }], tokens: { interior: { padding: { x: "sm" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "footer" }], tokens: { interior: { padding: { x: "sm" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "header" }, { key: "sidebarItem" }], tokens: { interior: { padding: { x: "xs" } } } },
    { chain: [{ key: "sidebar", concept: "collapsed" }, { key: "footer" }, { key: "sidebarItem" }], tokens: { interior: { padding: { x: "xs" } } } },
  ],
};
