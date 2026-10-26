import type { WebTheme } from "../../../types";

export const wireframesTheme: WebTheme = {




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

  id: "wireframes",
  name: "Wireframes",
  version: 2,
  type: "wireframe",
  kind: "seed",
  colors: {
    main: {
      white: "#ffffff",
      black: "#000000",
    },
    brand: {
      "1": "#000000",
      "2": "#666666",
      "3": "#999999",
      "4": "#cccccc",
    },
    status: {
      success: "flat-green",
      info: "flat-blue",
      warning: "flat-orange",
      error: "flat-red",
    },
    flat: {
      red: "#ff0000",
      orange: "#ffa200",
      yellow: "#fff700",
      lime: "#affd3a",
      green: "#73d100",
      mint: "#00ff62",
      turquoise: "#00e6d6",
      blue: "#009dff",
      violet: "#0040ff",
      purple: "#3700ff",
      pink: "#fb00ff",
    },
    semanticTokens: {
      primary: "brand-1",
      secondary: "brand-2",
      accent: "brand-3",
      muted: "brand-4",
    },
  },
  typography: {
    fonts: {
      primary: "Inter",
      secondary: "Inter",
      quote: "Inter",
      monoPrimary: "Inter",
      monoSecondary: "Inter",
    },
    fontSources: {
      Inter: {
        type: "google",
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    },
    types: {
      heading1: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 36,
        fontSizeDesktop: 56,
        fontWeight: 700,
        lineHeight: 1.1,
      },
      heading2: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 28,
        fontSizeDesktop: 40,
        fontWeight: 700,
        lineHeight: 1.15,
      },
      heading3: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 22,
        fontSizeDesktop: 30,
        fontWeight: 600,
        lineHeight: 1.2,
      },
      heading4: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 18,
        fontSizeDesktop: 22,
        fontWeight: 600,
        lineHeight: 1.25,
      },
      bodyExtraLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 18,
        fontSizeDesktop: 20,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      bodyLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 16,
        fontSizeDesktop: 18,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 16,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      bodySmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 13,
        fontSizeDesktop: 14,
        fontWeight: 400,
        lineHeight: 1.55,
      },
      bodyExtraSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 12,
        fontSizeDesktop: 12,
        fontWeight: 400,
        lineHeight: 1.45,
      },
      quoteLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 20,
        fontSizeDesktop: 24,
        fontWeight: 400,
        lineHeight: 1.7,
      },
      quote: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 16,
        fontSizeDesktop: 18,
        fontWeight: 400,
        lineHeight: 1.7,
      },
      quoteSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 15,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      code: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 13,
        fontSizeDesktop: 14,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      numbersExtraLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 28,
        fontSizeDesktop: 34,
        fontWeight: 700,
        lineHeight: 1.1,
      },
      numbersLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 20,
        fontSizeDesktop: 28,
        fontWeight: 600,
        lineHeight: 1.2,
      },
      numbers: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 16,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      numbersSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 12,
        fontSizeDesktop: 13,
        fontWeight: 500,
        lineHeight: 1.45,
      },
      numbersExtraSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 11,
        fontSizeDesktop: 11,
        fontWeight: 400,
        lineHeight: 1.4,
      },
      link: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 16,
        fontSizeDesktop: 16,
        fontWeight: 500,
        lineHeight: 1.5,
      },
    },
  },
  spacing: {
    unit: 1,
  },
  radius: {
    none: "0px",
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  effects: {
    "effect-1": [
      {
        type: "drop-shadow",
        x: 0,
        y: 2,
        blur: 4,
        color: "main-black",
        opacity: 0.12,
      },
    ],
  },
  transitions: {
    duration: {
      extraFast: "50ms",
      fast: "100ms",
      average: "200ms",
      slow: "400ms",
      extraSlow: "700ms",
    },
    timing: {
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      linear: "linear",
    },
  },
  borderWidths: {
    none: "0px",
    extraThin: "0.5px",
    thin: "1px",
    default: "2px",
    thick: "3px",
    extraThick: "4px",
  },
  modes: {
    colorScheme: {
      light: {
        background: "main-white",
        foreground: "main-black",
        derivation: {
          brandLightAmount: 96,
          brandDarkAmount: 18,
          statusLightAmount: 96,
          statusDarkAmount: 18,
          grayColorMixPercentage: "0%",
          flatSaturationAdjust: 0,
        },
      },
      dark: {
        background: "main-black",
        foreground: "main-white",
        derivation: {
          brandLightAmount: 91,
          brandDarkAmount: 25,
          statusLightAmount: 90,
          statusDarkAmount: 25,
          grayColorMixPercentage: "5%",
          flatSaturationAdjust: 0,
        },
      },
    },
  },
  icons: {
    set: "lucide",
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    weight: 2,
  },
  layouts: {
    surface: {
      interior: {
        background: "foreground",
        backgroundAlpha: 0.04,
        gap: {},
        padding: {},
      },
    },
    pageHeader: {
      height: "56px",
      sm: {
        height: "48px",
      },
      md: {
        height: "56px",
      },
      lg: {
        height: "72px",
      },
      surface: {},
    },
    secondPageHeader: {
      height: "56px",
      sm: {
        height: "48px",
      },
      md: {
        height: "56px",
      },
      lg: {
        height: "72px",
      },
      surface: {},
    },
    mainHeader: {
      height: "48px",
      sm: {
        height: "40px",
      },
      md: {
        height: "48px",
      },
      lg: {
        height: "64px",
      },
    },
    secondMainHeader: {
      height: "48px",
      sm: {
        height: "40px",
      },
      md: {
        height: "48px",
      },
      lg: {
        height: "64px",
      },
    },
    leftSidebar: {
      width: "280px",
      sm: {
        width: "200px",
      },
      md: {
        width: "280px",
      },
      lg: {
        width: "360px",
      },
    },
    rightSidebar: {
      width: "320px",
      sm: {
        width: "280px",
      },
      md: {
        width: "320px",
      },
      lg: {
        width: "480px",
      },
    },
    contextPanel: {
      width: "240px",
      sm: {
        width: "200px",
      },
      md: {
        width: "240px",
      },
      lg: {
        width: "320px",
      },
    },
    container: {
      sm: {
        maxWidth: "640px",
      },
      md: {
        maxWidth: "860px",
      },
      lg: {
        maxWidth: "1120px",
      },
    },
    dialog: {
      sm: {
        maxWidth: "480px",
      },
      md: {
        maxWidth: "640px",
      },
      lg: {
        maxWidth: "860px",
      },
    },
    page: {
      surface: {
        interior: {
          padding: {
            all: "none",
          },
          gap: {
            all: "none",
          },
        },
      },
    },
    section: {
      surface: {
        interior: {
          gap: {
            all: "md",
          },
        },
      },
    },
    mainBody: {
      surface: {
        interior: {
          childAlign: {},
        },
      },
    },
  },
  families: {
    surfaceContainer: {
      interior: {
        background: "foreground",
        backgroundAlpha: 0.04,
        gap: {
          all: "md",
        },
        padding: {},
      },
      combined: [
        // A disabled surface goes ghost so every card, header, badge, etc.
        // reads as unavailable without a per-element rule.
        { where: { state: 'disabled' }, partialSurface: { interior: { opacity: 0.4 } } },
      ],
    },
    field: {
      // Family default per-scale padding. Same axis as interactiveControl so
      // a field and a button at scale=lg have the same visual weight.
      sizes: {
        '3xs': { partialSurface: { interior: { padding: { all: '3xs' } } } },
        '2xs': { partialSurface: { interior: { padding: { all: '2xs' } } } },
        xs:    { partialSurface: { interior: { padding: { all: 'xs'  } } } },
        sm:    { partialSurface: { interior: { padding: { all: 'sm'  } } } },
        md:    { partialSurface: { interior: { padding: { all: 'md'  } } } },
        lg:    { partialSurface: { interior: { padding: { all: 'lg'  } } } },
        xl:    { partialSurface: { interior: { padding: { all: 'xl'  } } } },
        '2xl': { partialSurface: { interior: { padding: { all: '2xl' } } } },
        '3xl': { partialSurface: { interior: { padding: { all: '3xl' } } } },
      },
      surface: {
        interior: {
          padding: {
            all: "sm",
          },
          gap: {
            all: "md",
          },
          background: "foreground",
          backgroundAlpha: 0.04,
        },
        combined: [
          // Fields get the same hover feedback controls get, and every status
          // paints a subtle tint plus a matching text color. No borders here.
          { where: { state: 'hover' }, partialSurface: { tint: "flat-blue", interior: { backgroundAlpha: 0.15 } } },
          { where: { status: 'error' }, partialSurface: { tint: "flat-red", interior: { backgroundAlpha: 0.15, foreground: "status-error" } } },
          { where: { status: 'destructive' }, partialSurface: { tint: "flat-red", interior: { backgroundAlpha: 0.15, foreground: "status-error" } } },
          { where: { status: 'warning' }, partialSurface: { tint: "flat-orange", interior: { backgroundAlpha: 0.15, foreground: "status-warning" } } },
          { where: { status: 'success' }, partialSurface: { tint: "flat-green", interior: { backgroundAlpha: 0.15, foreground: "status-success" } } },
          { where: { state: 'disabled' }, partialSurface: { interior: { opacity: 0.4 } } },
        ],
      },
    },
    elevatedOverlay: {
      surface: {
        interior: {
          background: "background",
        },
      },
      overlay: {
        scrimColor: "foreground",
        scrimOpacity: 0.3,
        scrimBlur: "md",
      },
    },
    interactiveControl: {
      // Family default per-scale padding + typography + icon. Every element in
      // the family (button, chip, radio, switch, tabs, toggle, sidebar item…)
      // scales through these. 2xl and 3xl cap at xl — no control grows past xl.
      sizes: {
        '3xs': { partialSurface: { interior: { padding: { x: '3xs', y: '3xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '3xs' } },
        '2xs': { partialSurface: { interior: { padding: { x: '2xs', y: '2xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '2xs' } },
        xs:    { partialSurface: { interior: { padding: { x: 'xs',  y: 'xs'  } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: 'xs'  } },
        sm:    { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'xs'  } },
        md:    { partialSurface: { interior: { padding: { x: 'md',  y: 'sm'  } }, defaultTypography: { typographyType: 'body'           } }, icon: { size: 'sm'  } },
        lg:    { partialSurface: { interior: { padding: { x: 'lg',  y: 'md'  } }, defaultTypography: { typographyType: 'bodyLarge'      } }, icon: { size: 'md'  } },
        xl:    { partialSurface: { interior: { padding: { x: 'xl',  y: 'lg'  } }, defaultTypography: { typographyType: 'bodyExtraLarge' } }, icon: { size: 'lg'  } },
        '2xl': { partialSurface: { interior: { padding: { x: 'xl',  y: 'lg'  } }, defaultTypography: { typographyType: 'bodyExtraLarge' } }, icon: { size: 'lg'  } },
        '3xl': { partialSurface: { interior: { padding: { x: 'xl',  y: 'lg'  } }, defaultTypography: { typographyType: 'bodyExtraLarge' } }, icon: { size: 'lg'  } },
      },
      surface: {
        interior: {
          background: "foreground",
          backgroundAlpha: 0.04,
          padding: {
            all: "md",
          },
        },
        boundary: {},
        combined: [
          { where: { state: 'hover' }, partialSurface: { tint: "flat-blue", interior: { backgroundAlpha: 0.2 } } },
          { where: { state: 'active' }, partialSurface: { tint: "flat-green", interior: { backgroundAlpha: 0.2 } } },
          { where: { state: 'selected' }, partialSurface: { tint: "flat-green", interior: { backgroundAlpha: 0.2 } } },
          // A disabled control fades. Status paints a subtle tint plus the
          // matching text color — no borders in wireframes-01.
          { where: { state: 'disabled' }, partialSurface: { interior: { opacity: 0.4 } } },
          { where: { status: 'error' }, partialSurface: { tint: "flat-red", interior: { backgroundAlpha: 0.15, foreground: "status-error" } } },
          { where: { status: 'destructive' }, partialSurface: { tint: "flat-red", interior: { backgroundAlpha: 0.15, foreground: "status-error" } } },
          { where: { status: 'warning' }, partialSurface: { tint: "flat-orange", interior: { backgroundAlpha: 0.15, foreground: "status-warning" } } },
          { where: { status: 'success' }, partialSurface: { tint: "flat-green", interior: { backgroundAlpha: 0.15, foreground: "status-success" } } },
        ],
      },
    },
    listContainer: {
      surface: { interior: { padding: { all: 'xs' }, gap: { all: '3xs' } } },
    },
  },
  elements: {
    // Chip: compact affordance. Smaller and quieter than a control at the same
    // scale — bodyExtraSmall through md, bodySmall for lg/xl, body only at 3xl.
    // Gap grows with scale so icons and text breathe as the chip gets bigger.
    chip: {
      sizes: {
        '3xs': { partialSurface: { interior: { padding: { x: '3xs', y: '3xs' }, gap: { all: '3xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '3xs' } },
        '2xs': { partialSurface: { interior: { padding: { x: '2xs', y: '3xs' }, gap: { all: '3xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '2xs' } },
        xs:    { partialSurface: { interior: { padding: { x: '2xs', y: '3xs' }, gap: { all: '2xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '2xs' } },
        sm:    { partialSurface: { interior: { padding: { x: 'xs',  y: '2xs' }, gap: { all: '2xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: 'xs'  } },
        md:    { partialSurface: { interior: { padding: { x: 'xs',  y: '2xs' }, gap: { all: 'xs'  } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: 'xs'  } },
        lg:    { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'xs'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'xs'  } },
        xl:    { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'sm'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'xs'  } },
        '2xl': { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'sm'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'sm'  } },
        '3xl': { partialSurface: { interior: { padding: { x: 'md',  y: 'sm'  }, gap: { all: 'md'  } }, defaultTypography: { typographyType: 'body'           } }, icon: { size: 'sm'  } },
      },
    },
    // Badge (data label): same profile as chip — padding, gap, typography.
    badge: {
      sizes: {
        '3xs': { partialSurface: { interior: { padding: { x: '3xs', y: '3xs' }, gap: { all: '3xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '3xs' } },
        '2xs': { partialSurface: { interior: { padding: { x: '2xs', y: '3xs' }, gap: { all: '3xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '2xs' } },
        xs:    { partialSurface: { interior: { padding: { x: '2xs', y: '3xs' }, gap: { all: '2xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: '2xs' } },
        sm:    { partialSurface: { interior: { padding: { x: 'xs',  y: '2xs' }, gap: { all: '2xs' } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: 'xs'  } },
        md:    { partialSurface: { interior: { padding: { x: 'xs',  y: '2xs' }, gap: { all: 'xs'  } }, defaultTypography: { typographyType: 'bodyExtraSmall' } }, icon: { size: 'xs'  } },
        lg:    { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'xs'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'xs'  } },
        xl:    { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'sm'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'xs'  } },
        '2xl': { partialSurface: { interior: { padding: { x: 'sm',  y: 'xs'  }, gap: { all: 'sm'  } }, defaultTypography: { typographyType: 'bodySmall'      } }, icon: { size: 'sm'  } },
        '3xl': { partialSurface: { interior: { padding: { x: 'md',  y: 'sm'  }, gap: { all: 'md'  } }, defaultTypography: { typographyType: 'body'           } }, icon: { size: 'sm'  } },
      },
    },
    icon: {},
    avatar: {
      surface: {
        interior: {
          childAlign: {
            horizontal: "center",
            vertical: "center",
          },
          padding: {
            all: "xs",
          },
        },
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
    button: {
      surface: {
        interior: {
          foreground: "foreground",
          gap: {
            all: "md",
          },
        },
      },
      sizes: {
        xs: {
          partialSurface: {
            interior: {
              padding: {
                x: "xs",
                y: "xs",
              },
            },
            defaultTypography: {
              typographyType: "bodyExtraSmall",
            },
          },
          icon: {
            size: "xs",
          },
        },
        sm: {
          partialSurface: {
            interior: {
              padding: {
                x: "sm",
                y: "xs",
              },
            },
            defaultTypography: {
              typographyType: "bodySmall",
            },
          },
          icon: {
            size: "xs",
          },
        },
        md: {
          partialSurface: {
            interior: {
              padding: {
                x: "md",
                y: "sm",
              },
            },
            defaultTypography: {
              typographyType: "body",
            },
          },
          icon: {
            size: "sm",
          },
        },
        lg: {
          partialSurface: {
            interior: {
              padding: {
                x: "lg",
                y: "md",
              },
            },
            defaultTypography: {
              typographyType: "bodyLarge",
            },
          },
          icon: {
            size: "sm",
          },
        },
        xl: {
          partialSurface: {
            interior: {
              padding: {
                x: "xl",
                y: "lg",
              },
            },
            defaultTypography: {
              typographyType: "bodyExtraLarge",
            },
          },
          icon: {
            size: "md",
          },
        },
      },
      startIcon: {
        interior: {
          background: "foreground",
          backgroundAlpha: 0.05,
          padding: {
            right: "sm",
          },
        },
        smartBleed: "border",
      },
      endIcon: {
        interior: {
          background: "foreground",
          backgroundAlpha: 0.05,
          padding: {
            left: "sm",
          },
        },
        smartBleed: "border",
      },
    },
    select: {
      surface: {
        cursor: "pointer",
        interior: {
          foreground: "foreground",
          gap: {
            all: "md",
          },
        },
      },
      sizes: {
        xs: {
          partialSurface: {
            interior: {
              padding: {
                x: "xs",
                y: "xs",
              },
            },
            defaultTypography: {
              typographyType: "bodyExtraSmall",
            },
          },
          icon: {
            size: "xs",
          },
        },
        sm: {
          partialSurface: {
            interior: {
              padding: {
                x: "sm",
                y: "xs",
              },
            },
            defaultTypography: {
              typographyType: "bodySmall",
            },
          },
          icon: {
            size: "sm",
          },
        },
        md: {
          partialSurface: {
            interior: {
              padding: {
                x: "md",
                y: "sm",
              },
            },
            defaultTypography: {
              typographyType: "body",
            },
          },
          icon: {
            size: "md",
          },
        },
        lg: {
          partialSurface: {
            interior: {
              padding: {
                x: "lg",
                y: "md",
              },
            },
            defaultTypography: {
              typographyType: "bodyLarge",
            },
          },
          icon: {
            size: "lg",
          },
        },
        xl: {
          partialSurface: {
            interior: {
              padding: {
                x: "xl",
                y: "lg",
              },
            },
            defaultTypography: {
              typographyType: "bodyExtraLarge",
            },
          },
          icon: {
            size: "xl",
          },
        },
      },
      endIcon: {
        interior: {
          background: "foreground",
          backgroundAlpha: 0.05,
          padding: {
            left: "sm",
          },
        },
        smartBleed: "border",
      },
    },
    // wireframes-01 rule: no round shapes. A switch is a rectangle with a
    // small square inside that slides from left to right.
    switch: {
      track: {
        dimensionPosition: { width: "2.5rem", height: "1.25rem" },
        interior: {
          background: "foreground",
          backgroundAlpha: 0.15,
          padding: { all: "none" },
        },
        boundary: { radius: { all: "none" } },
        combined: [
          { where: { state: 'selected' }, partialSurface: { interior: { backgroundAlpha: 0.4 } } },
        ],
      },
      thumb: {
        dimensionPosition: { width: "1rem", height: "1rem" },
        interior: { background: "foreground", backgroundAlpha: 0.5 },
        boundary: { radius: { all: "none" } },
      },
    },
    list: {
      surface: {
        interior: {
          gap: {
            all: "md",
          },
    listItem: {
      surface: {
        interior: { gap: { all: "sm" } },
      },
    },
        },
      },
    },
    // ── list draggable, simple: a box per row, a heavy line and a heavy outline where the drop lands ──
    listDraggable: { surface: { interior: { gap: { all: "sm" } } } },
    listDraggableGroup: { interior: { background: "transparent", padding: { left: "xl" }, gap: { all: "sm" } }, boundary: { border: { width: "none" } } },
    listDraggableRow: { surface: { interior: { padding: { x: "md", y: "sm" } }, boundary: { border: { width: "thin", style: "solid", color: "foreground" }, radius: { all: "none" } } } },
    listDraggableHandle: { surface: { interior: { background: "transparent", padding: { all: "2xs" } }, boundary: { border: { width: "none" } }, cursor: "grab" } },
    listDraggableGhost: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thin", style: "dashed", color: "foreground" }, radius: { all: "none" } } },
    listDraggableOverlay: { surface: { interior: { background: "background" }, boundary: { border: { width: "thin", style: "solid", color: "foreground" } } } },
    listDraggableDropLine: { surface: { interior: { background: "foreground", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "4px" } } },
    listDraggableDropInto: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thick", style: "solid", color: "foreground" }, radius: { all: "none" } } } },
    // ── list tree, simple: plain rows, a heavy line and a heavy outline where the drop lands ──
    listTree: { surface: { interior: { gap: { all: "none" } } } },
    listTreeRow: { surface: { interior: { padding: { x: "xs", y: "2xs" } }, boundary: { border: { width: "none" }, radius: { all: "none" } } } },
    listTreeToggle: { surface: { interior: { background: "transparent", padding: { all: "2xs" } }, boundary: { border: { width: "none" } }, cursor: "pointer" } },
    listTreeLine: { surface: { interior: { background: "foreground", padding: {} }, boundary: { border: { width: "none" } } } },
    listTreeHandle: { surface: { interior: { background: "transparent", padding: { all: "2xs" } }, boundary: { border: { width: "none" } }, cursor: "grab" } },
    listTreeGhost: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thin", style: "dashed", color: "foreground" }, radius: { all: "none" } } },
    listTreeOverlay: { surface: { interior: { background: "background" }, boundary: { border: { width: "thin", style: "solid", color: "foreground" } } } },
    listTreeDropLine: { surface: { interior: { background: "foreground", padding: {} }, boundary: { border: { width: "none" } }, dimensionPosition: { height: "4px" } } },
    listTreeDropInto: { surface: { interior: { background: "transparent", padding: {} }, boundary: { border: { width: "thick", style: "solid", color: "foreground" }, radius: { all: "none" } } } },
    tableHeaderCell: {
      interior: {
        padding: {
          x: "md",
          y: "sm",
        },
      },
      defaultTypography: {
        textAlign: "left",
      },
    },
    tableRow: {
      boundary: {
        border: {
          bottom: {
            width: "extraThin",
            style: "solid",
            color: "foreground",
          },
        },
      },
    },
    card: {
      interior: {
        padding: {
          all: "md",
        },
        gap: {
          all: "md",
        },
      },
    },
  },
  rules: [
    {
      chain: [
        {
          key: "table",
        },
        {
          key: "button",
          concept: "rosebud",
        },
      ],
      tokens: {
        interior: {
          background: "flat-purple",
          backgroundAlpha: 1,
          foreground: "smart-bw",
        },
        boundary: {
          radius: {
            all: "full",
          },
          border: {
            width: "thick",
            style: "solid",
            color: "flat-pink",
          },
          outline: {},
        },
      },
    },
  ],
};
