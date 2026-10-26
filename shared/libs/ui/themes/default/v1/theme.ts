import type { WebTheme } from "../../../types";

export const wireframesTheme: WebTheme = {


  id: "default",
  name: "Default",
  version: 1,
  type: "high-fidelity",
  kind: "seed",
  colors: {
    main: {
      white: "#ffffff",
      black: "#0A0A18",
    },
    brand: {
      "1": "#5C5FEB",
      "2": "#8999FD",
      "3": "#B8BAFC",
      "4": "#EDEDFE",
    },
    status: {
      success: "flat-green",
      info: "flat-blue",
      warning: "flat-orange",
      error: "flat-red",
    },
    flat: {
      red: "#EF4444",
      orange: "#F97316",
      yellow: "#EAB308",
      lime: "#84CC16",
      green: "#22C55E",
      mint: "#10B981",
      turquoise: "#14B8A6",
      blue: "#3B82F6",
      violet: "#6366F1",
      purple: "#A855F7",
      pink: "#EC4899",
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
      primary: "Plus Jakarta Sans",
      secondary: "Inter",
      quote: "Inter",
      monoPrimary: "JetBrains Mono",
      monoSecondary: "JetBrains Mono",
    },
    fontSources: {
      "Plus Jakarta Sans": {

        url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
      },
      Inter: {

        url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
      "JetBrains Mono": {
        type: "google",
        url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
      },
    },
    types: {
      heading1: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 32,
        fontSizeDesktop: 48,
        fontWeight: 900,
        lineHeight: 1.1,
      },
      heading2: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 26,
        fontSizeDesktop: 36,
        fontWeight: 900,
        lineHeight: 1.15,
      },
      heading3: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 20,
        fontSizeDesktop: 26,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      heading4: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 18,
        fontWeight: 600,
        lineHeight: 1.25,
      },
      bodyExtraLarge: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 18,
        fontSizeDesktop: 20,
        fontWeight: 400,
        lineHeight: 1.65,
      },
      bodyLarge: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 16,
        fontSizeDesktop: 18,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 15,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      bodySmall: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 13,
        fontSizeDesktop: 13,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      bodyExtraSmall: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 11,
        fontSizeDesktop: 11,
        fontWeight: 400,
        lineHeight: 1.45,
      },
      quoteLarge: {
        fontFamily: "quote",
        fontStyle: "normal",
        fontSizeMobile: 20,
        fontSizeDesktop: 24,
        fontWeight: 400,
        lineHeight: 1.7,
      },
      quote: {
        fontFamily: "quote",
        fontStyle: "normal",
        fontSizeMobile: 16,
        fontSizeDesktop: 18,
        fontWeight: 400,
        lineHeight: 1.7,
      },
      quoteSmall: {
        fontFamily: "quote",
        fontStyle: "normal",
        fontSizeMobile: 14,
        fontSizeDesktop: 15,
        fontWeight: 400,
        lineHeight: 1.65,
      },
      code: {
        fontFamily: "monoPrimary",
        fontStyle: "normal",
        fontSizeMobile: 12,
        fontSizeDesktop: 13,
        fontWeight: 400,
        lineHeight: 1.6,
      },
      numbersExtraLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 28,
        fontSizeDesktop: 40,
        fontWeight: 800,
        lineHeight: 1.05,
      },
      numbersLarge: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 22,
        fontSizeDesktop: 30,
        fontWeight: 700,
        lineHeight: 1.1,
      },
      numbers: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 15,
        fontSizeDesktop: 16,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      numbersSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 13,
        fontSizeDesktop: 13,
        fontWeight: 500,
        lineHeight: 1.4,
      },
      numbersExtraSmall: {
        fontFamily: "primary",
        fontStyle: "normal",
        fontSizeMobile: 11,
        fontSizeDesktop: 11,
        fontWeight: 500,
        lineHeight: 1.35,
      },
      link: {
        fontFamily: "secondary",
        fontStyle: "normal",
        fontSizeMobile: 15,
        fontSizeDesktop: 15,
        fontWeight: 500,
        lineHeight: 1.5,
      },
    },
  },
  spacing: {
    unit: 2,
  },
  radius: {
    none: "0px",
    xs: "4px",
    sm: "6px",
    md: "10px",
    lg: "24px",
    xl: "48px",
    full: "9999px",
  },
  borderWidths: {
    none: "0px",
    extraThin: "0.5px",
    thin: "1px",
    default: "1.5px",
    thick: "2px",
    extraThick: "4px",
  },
  transitions: {
    duration: {
      extraFast: "60ms",
      fast: "120ms",
      average: "200ms",
      slow: "350ms",
      extraSlow: "600ms",
    },
    timing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
    },
  },
  effects: {
    "soft-shadow": [
      {
        type: "drop-shadow",
        x: 0,
        y: 4,
        blur: 30,
        color: "main-black",
        opacity: 0.04,
      },
      {
        type: "drop-shadow",
        x: 0,
        y: 2,
        blur: 4,
        color: "main-black",
        opacity: 0.1,
      },
    ],
    "brand-shadow": [
      {
        type: "drop-shadow",
        x: 0,
        y: 4,
        blur: 20,
        color: "secondary",
        opacity: 0.6,
      },
      {
        type: "drop-shadow",
        x: 0,
        y: 2,
        blur: 4,
        color: "primary",
        opacity: 0.1,
      },
    ],
    "no-effect": [],
  },
  modes: {
    colorScheme: {
      light: {
        background: "main-white",
        foreground: "main-black",
        derivation: {
          brandLightAmount: 96,
          brandDarkAmount: 18,
          statusLightAmount: 70,
          statusDarkAmount: 18,
          grayColorMixPercentage: "7%",
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
        gap: {},
        padding: {},
      },
    },
    pageHeader: {
      height: "88px",
      sm: {
        height: "64px",
      },
      md: {
        height: "88px",
      },
      lg: {
        height: "122px",
      },
      surface: {
        interior: {
          background: "background",
          childAlign: {
            vertical: "center",
            horizontal: "start",
          },
          padding: {
            x: "sm",
          },
        },
        boundary: {
          effect: "soft-shadow",
          border: {
            bottom: {
              width: "thin",
              style: "solid",
              color: "brand-1-gray-150",
            },
          },
        },
      },
    },
    secondPageHeader: {
      height: "88px",
      sm: {
        height: "64px",
      },
      md: {
        height: "88px",
      },
      lg: {
        height: "122px",
      },
      surface: {
        interior: {
          background: "background",
          childAlign: {
            vertical: "center",
            horizontal: "start",
          },
          padding: {
            x: "sm",
          },
        },
        boundary: {
          effect: "soft-shadow",
          border: {
            bottom: {
              width: "thin",
              style: "solid",
              color: "brand-1-gray-150",
            },
          },
        },
      },
    },
    mainHeader: {
      height: "72px",
      sm: {
        height: "40px",
      },
      md: {
        height: "72px",
      },
      lg: {
        height: "72px",
      },
      surface: {
        interior: {
          childAlign: {
            vertical: "end",
          },
        },
      },
    },
    secondMainHeader: {
      height: "72px",
      sm: {
        height: "40px",
      },
      md: {
        height: "72px",
      },
      lg: {
        height: "72px",
      },
      surface: {
        interior: {
          childAlign: {
            vertical: "end",
          },
        },
      },
    },
    mainFooter: {
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
      width: "240px",
      widthCollapsed: "56px",
      sm: {
        width: "180px",
      },
      md: {
        width: "240px",
      },
      lg: {
        width: "280px",
      },
      surface: {
        interior: {
          background: "background",
          backgroundAlpha: 0.7,
          padding: {},
          gap: {
            all: "sm",
          },
          foreground: "brand-1-gray-400",
        },
        boundary: {
          border: {
            left: {},
            right: {
              width: "extraThin",
              style: "solid",
              color: "brand-1-gray-200",
            },
          },
          outline: {},
        },
        defaultTypography: {
          typographyType: "bodySmall",
          textTransform: "uppercase",
        },
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
      xs: {
        maxWidth: "480px",
      },
      xl: {
        maxWidth: "1280px",
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
          backgroundAlpha: 0,
        },
        boundary: {
          radius: {},
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
    main: {
      surface: {
        interior: {
          padding: {},
        },
      },
    },
    shell: {
      surface: {
        interior: {
          background: "brand-3-gray-100",
        },
      },
    },
    rowSection: {
      surface: {
        interior: {
          childAlign: {},
          gap: {
            all: "md",
          },
        },
      },
    },
    colSection: {
      surface: {
        interior: {
          gap: {
            all: "md",
          },
        },
      },
    },
    shellNone: {
      surface: {
        interior: {
          background: "brand-3-gray-250",
        },
      },
    },
  },
  families: {
    surfaceContainer: {
      interior: {
        gap: {
          all: "md",
        },
        padding: {},
      },
    },
    field: {
      surface: {
        interior: {
          padding: {
            all: "sm",
          },
          gap: {
            all: "md",
          },
          background: "brand-1-gray-50",
          foreground: "brand-1-gray-600",
          backgroundAlpha: 0.4,
        },
        boundary: {
          radius: {
            all: "full",
          },
          border: {
            width: "default",
            style: "solid",
            color: "brand-1-gray-200",
          },
        },
        combined: [
          {
            where: {
              state: "active",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "primary",
                },
              },
            },
          },
          {
            where: {
              state: "focus",
            },
            partialSurface: {
              boundary: {
                border: {},
              },
            },
          },
          {
            where: {
              state: "focus",
              status: "error",
            },
            partialSurface: {
              interior: {
                backgroundAlpha: 1,
              },
            },
          },
          {
            where: {
              status: "error",
            },
            partialSurface: {
              interior: {
                background: "brand-1-gray-50",
                foreground: "status-error",
              },
              boundary: {
                border: {
                  color: "status-error",
                },
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                background: "brand-1-gray-100",
                backgroundAlpha: 1,
                foreground: "brand-1-gray-300",
              },
            },
          },
          {
            where: {
              state: "hover",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "secondary",
                },
              },
            },
          },
        ],
      },
    },
    elevatedOverlay: {
      surface: {
        interior: {
          background: "background",
        },
        boundary: {
          effect: "soft-shadow",
        },
      },
      overlay: {
        scrimColor: "foreground",
        scrimOpacity: 0.3,
        scrimBlur: "md",
      },
    },
    interactiveControl: {
      surface: {
        interior: {
          padding: {
            all: "md",
          },
        },
        boundary: {},
        combined: [
          {
            where: {
              state: "hover",
            },
            partialSurface: {
              interior: {
                backgroundAlpha: 1,
                opacity: 0.8,
              },
            },
          },
          {
            where: {
              state: "active",
            },
            partialSurface: {
              tint: "primary",
              interior: {
                backgroundAlpha: 1,
              },
            },
          },
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {},
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                backgroundAlpha: 1,
              },
              tint: "muted",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
              status: "error",
            },
            partialSurface: {
              tint: "flat-red",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
              status: "warning",
            },
            partialSurface: {
              tint: "status-warning-light",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
              status: "success",
            },
            partialSurface: {
              tint: "status-success",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
              status: "destructive",
            },
            partialSurface: {
              tint: "status-error",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
              status: "info",
            },
            partialSurface: {
              tint: "status-info",
            },
          },
        ],
      },
    },
    listContainer: {
      surface: {
        interior: {},
      },
    },
  },
  elements: {
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
          background: "brand-3-gray-50",
        },
        boundary: {
          radius: {
            all: "full",
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
          foreground: "background",
          gap: {
            all: "md",
          },
          background: "secondary",
          backgroundAlpha: 1,
        },
        boundary: {
          radius: {
            all: "full",
          },
          effect: "brand-shadow",
        },
        combined: [
          {
            where: {
              state: "hover",
            },
            partialSurface: {
              interior: {},
            },
          },
          {
            where: {
              emphasis: "secondary",
            },
            partialSurface: {
              interior: {
                background: "background",
                foreground: "primary",
              },
              boundary: {
                border: {
                  width: "thin",
                  style: "solid",
                  color: "primary",
                },
                effect: "no-effect",
              },
            },
          },
          {
            where: {
              emphasis: "quiet",
            },
            partialSurface: {
              boundary: {
                effect: "no-effect",
              },
              interior: {
                background: "background",
                backgroundAlpha: 0,
                foreground: "smart-bw",
              },
              defaultTypography: {
                textDecoration: "underline",
              },
            },
          },
          {
            where: {
              emphasis: "secondary",
              state: "hover",
            },
            partialSurface: {
              tint: "secondary",
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "hover",
            },
            partialSurface: {
              interior: {
                foreground: "primary",
              },
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "selected",
            },
            partialSurface: {
              interior: {
                foreground: "primary",
              },
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "active",
            },
            partialSurface: {
              interior: {
                foreground: "primary",
              },
            },
          },
          {
            where: {
              emphasis: "quiet",
              state: "disabled",
            },
            partialSurface: {
              interior: {
                foreground: "muted",
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                backgroundAlpha: 1,
                background: "muted",
                foreground: "accent",
              },
              tint: "muted",
            },
          },
          {
            where: {
              emphasis: "tertiary",
            },
            partialSurface: {
              interior: {
                background: "brand-4",
                foreground: "brand-1",
              },
            },
          },
          {
            where: {
              status: "destructive",
            },
            partialSurface: {
              interior: {},
              boundary: {
                border: {},
              },
            },
          },
          {
            where: {
              status: "destructive",
              emphasis: "secondary",
            },
            partialSurface: {
              interior: {
                foreground: "status-error",
              },
              boundary: {
                border: {
                  color: "status-error",
                },
              },
            },
          },
          {
            where: {
              emphasis: "secondary",
              status: "destructive",
              state: "hover",
            },
            partialSurface: {
              interior: {
                background: "background",
              },
              tint: "status-error-light",
            },
          },
          {
            where: {
              state: "disabled",
              emphasis: "secondary",
            },
            partialSurface: {
              tint: "muted",
              interior: {
                background: "muted",
                foreground: "accent",
              },
            },
          },
          {
            where: {
              status: "warning",
            },
            partialSurface: {
              interior: {
                background: "status-warning-light",
              },
            },
          },
          {
            where: {
              status: "warning",
              emphasis: "secondary",
            },
            partialSurface: {
              interior: {
                background: "background",
                foreground: "status-warning",
              },
              boundary: {
                border: {
                  color: "status-warning",
                },
              },
            },
          },
          {
            where: {
              status: "success",
            },
            partialSurface: {
              interior: {
                background: "status-success-light",
              },
            },
          },
          {
            where: {
              status: "success",
              emphasis: "secondary",
            },
            partialSurface: {
              interior: {
                foreground: "status-success",
                background: "background",
              },
              boundary: {
                border: {
                  color: "status-success",
                },
              },
            },
          },
        ],
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
    badge: {
      surface: {
        cursor: "auto",
        interior: {
          foreground: "secondary",
          gap: {
            all: "xs",
          },
          background: "muted",
          padding: {
            x: "xs",
            y: "2xs",
          },
        },
        boundary: {
          radius: {
            all: "sm",
          },
        },
        combined: [
          {
            where: {
              status: "error",
            },
            partialSurface: {
              interior: {
                foreground: "smart-bw",
              },
            },
          },
          {
            where: {
              status: "success",
            },
            partialSurface: {
              interior: {
                foreground: "smart-bw",
              },
            },
          },
          {
            where: {
              status: "warning",
            },
            partialSurface: {
              interior: {
                foreground: "smart-bw",
              },
            },
          },
          {
            where: {
              status: "info",
            },
            partialSurface: {
              interior: {
                foreground: "smart-bw",
              },
            },
          },
          {
            where: {
              status: "destructive",
            },
            partialSurface: {
              interior: {
                foreground: "smart-bw",
              },
            },
          },
          {
            where: {
              status: "warning",
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  width: "thin",
                  style: "solid",
                  color: "status-warning",
                },
              },
              interior: {
                foreground: "status-warning",
              },
            },
          },
          {
            where: {
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  width: "thin",
                  style: "solid",
                  color: "secondary",
                },
              },
              interior: {
                foreground: "secondary",
                background: "background",
              },
            },
          },
          {
            where: {
              status: "error",
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "status-error",
                },
              },
              interior: {
                foreground: "status-error",
              },
            },
          },
          {
            where: {
              status: "success",
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "status-success",
                },
              },
              interior: {
                foreground: "status-success",
              },
            },
          },
          {
            where: {
              status: "info",
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "status-info",
                },
              },
              interior: {
                foreground: "status-info",
              },
            },
          },
          {
            where: {
              status: "destructive",
              emphasis: "secondary",
            },
            partialSurface: {
              boundary: {
                border: {
                  color: "status-error",
                },
              },
              interior: {
                foreground: "status-error",
              },
            },
          },
        ],
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
    switch: {
      track: {
        boundary: {
          radius: {
            all: "full",
          },
        },
        dimensionPosition: {
          width: "2.5rem",
          height: "1.25rem",
        },
        interior: {
          background: "brand-3",
          padding: {
            all: "2xs",
          },
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "brand-1",
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                opacity: 0.5,
              },
            },
          },
        ],
      },
      thumb: {
        boundary: {
          radius: {
            all: "full",
          },
          effect: "soft-shadow",
        },
        dimensionPosition: {
          width: "50%",
          height: "100%",
          translateX: "0",
        },
        interior: {
          background: "main-white",
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              dimensionPosition: {
                translateX: "100%",
              },
            },
          },
        ],
      },
    },
    checkbox: {
      surface: {
        boundary: {
          radius: {
            all: "xs",
          },
          border: {
            width: "thin",
            style: "solid",
            color: "primary",
          },
        },
        dimensionPosition: {
          width: "1.25rem",
          height: "1.25rem",
        },
        interior: {
          background: "background",
          foreground: "background",
          padding: {
            all: "none",
          },
          childAlign: {
            horizontal: "center",
            vertical: "center",
          },
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                opacity: 0.5,
              },
            },
          },
        ],
      },
    },
    radio: {
      surface: {
        boundary: {
          radius: {
            all: "full",
          },
          border: {
            width: "thin",
            style: "solid",
            color: "primary",
          },
        },
        dimensionPosition: {
          width: "1.25rem",
          height: "1.25rem",
        },
        interior: {
          background: "background",
          foreground: "primary",
          padding: {
            all: "none",
          },
          childAlign: {
            horizontal: "center",
            vertical: "center",
          },
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              boundary: {
                border: {
                  width: "thick",
                  style: "solid",
                  color: "primary",
                },
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                opacity: 0.5,
              },
            },
          },
        ],
      },
    },
    toggle: {
      surface: {
        boundary: {
          radius: {
            all: "md",
          },
          border: {
            width: "thin",
            style: "solid",
            color: "primary",
          },
        },
        interior: {
          background: "background",
          foreground: "primary",
          padding: {
            x: "md",
            y: "sm",
          },
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                opacity: 0.5,
              },
            },
          },
        ],
      },
    },
    chip: {
      surface: {
        boundary: {
          radius: {
            all: "full",
          },
        },
        interior: {
          background: "muted",
          foreground: "foreground",
          padding: {
            x: "sm",
            y: "2xs",
          },
        },
        transition: {
          duration: "fast",
          timing: "easeOut",
        },
        combined: [
          {
            where: {
              emphasis: "primary",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
            },
          },
          {
            where: {
              emphasis: "tertiary",
            },
            partialSurface: {
              boundary: {
                border: {
                  width: "thin",
                  style: "solid",
                  color: "primary",
                },
              },
              interior: {
                background: "background",
                foreground: "primary",
              },
            },
          },
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "brand-1",
                foreground: "background",
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                opacity: 0.5,
              },
            },
          },
        ],
        defaultTypography: {
          typographyType: "bodySmall",
        },
      },
      endIcon: {
        interior: {},
      },
    },
    list: {
      surface: {
        interior: {
          gap: {
            all: "md",
          },
        },
      },
    },
    tableHeaderCell: {
      interior: {
        padding: {
          x: "md",
          y: "sm",
          all: "sm",
        },
        foreground: "brand-1-gray-500",
      },
      defaultTypography: {
        textAlign: "left",
      },
    },
    tableRow: {
      boundary: {
        border: {
          bottom: {
            width: "thin",
            style: "solid",
            color: "muted",
          },
        },
      },
      interior: {
        padding: {
          y: "md",
        },
      },
    },
    card: {
      interior: {
        padding: {},
        gap: {
          all: "none",
        },
        background: "background",
        backgroundAlpha: 1,
      },
      boundary: {
        radius: {
          all: "xl",
        },
        effect: "soft-shadow",
      },
    },
    sidebar: {
      surface: {
        boundary: {
          border: {
            right: {
              width: "extraThin",
              style: "solid",
              color: "brand-1-gray-250",
            },
          },
        },
        interior: {
          padding: {
            all: "none",
          },
          background: "background",
        },
        transition: {
          duration: "slow",
          timing: "ease",
        },
      },
    },
    header: {
      interior: {
        childAlign: {
          horizontal: "start",
        },
      },
      defaultTypography: {
        textAlign: "left",
      },
    },
    content: {
      interior: {
        padding: {
          all: "md",
        },
        gap: {
          all: "md",
        },
      },
      boundary: {
        radius: {
          all: "none",
        },
        effect: "no-effect",
      },
    },
    // v3: tab panels borrowed surface--content before they got their own identity; same tokens, unrevised
    tabPanel: {
      interior: {
        padding: {
          all: "md",
        },
        gap: {
          all: "md",
        },
      },
      boundary: {
        radius: {
          all: "none",
        },
        effect: "no-effect",
      },
    },
    // v3: these nodes carried element="type--body-small" before they got their own identity; same typography, unrevised
    label: { defaultTypography: { typographyType: "bodySmall" } },
    fieldDescription: { defaultTypography: { typographyType: "bodySmall" } },
    fieldMessage: { defaultTypography: { typographyType: "bodySmall" } },
    buttonGroupText: { defaultTypography: { typographyType: "bodySmall" } },
    breadcrumbItem: { surface: { defaultTypography: { typographyType: "bodySmall" } } },
    // v3: was item
    listItem: {
      surface: {
        interior: {
          background: "background",
          padding: {
            all: "md",
          },
        },
        boundary: {
          radius: {
            all: "lg",
          },
        },
      },
    },
    // v3: accordion items borrowed list--item before they got their own identity; same tokens, unrevised
    accordionItem: {
      surface: {
        interior: {
          background: "background",
          padding: {
            all: "md",
          },
        },
        boundary: {
          radius: {
            all: "lg",
          },
        },
      },
    },
    input: {},
    tableCell: {
      interior: {
        padding: {
          all: "sm",
        },
        gap: {
          all: "xs",
        },
        childAlign: {},
      },
    },
    tableHeader: {
      interior: {
        background: "brand-2-gray-50",
      },
    },
    tableCellContent: {
      interior: {
        gap: {
          h: "xs",
          all: "xs",
        },
      },
    },
    sidebarItem: {
      surface: {
        interior: {
          padding: {
            all: "sm",
          },
        },
        defaultTypography: {
          typographyType: "heading4",
        },
      },
    },
    tabBar: {
      surface: {
        interior: {
          background: "smart-bw",
        },
      },
    },
    tabTrigger: {
      surface: {
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
              boundary: {
                radius: {
                  all: "full",
                },
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                foreground: "accent",
              },
            },
          },
        ],
        boundary: {
          radius: {
            all: "full",
          },
        },
      },
    },
    // v3: accordion triggers borrowed control--tab-trigger before they got their own identity; same tokens, unrevised
    accordionTrigger: {
      surface: {
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
              boundary: {
                radius: {
                  all: "full",
                },
              },
            },
          },
          {
            where: {
              state: "disabled",
            },
            partialSurface: {
              interior: {
                foreground: "accent",
              },
            },
          },
        ],
        boundary: {
          radius: {
            all: "full",
          },
        },
      },
    },
    dialog: {
      surface: {
        boundary: {
          radius: {
            all: "lg",
          },
        },
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
    textarea: {
      surface: {
        boundary: {
          radius: {
            all: "lg",
          },
        },
      },
    },
    sheet: {
      surface: {
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
    image: {
      surface: {
        boundary: {
          radius: {
            all: "xl",
          },
        },
        interior: {},
      },
    },
  },
  rules: [
    {
      chain: [
        {
          key: "card",
        },
        {
          key: "header",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "md",
          },
          gap: {
            all: "md",
          },
          background: "muted",
        },
        smartBleed: "normal",
      },
    },
    {
      chain: [
        {
          key: "rowSection",
          concept: "top-header",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "xl",
          },
          foreground: "brand-1-gray-600",
          padding: {
            y: "sm",
          },
          childAlign: {
            vertical: "center",
            horizontal: "start",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "card",
        },
        {
          key: "table",
        },
        {
          key: "header",
        },
      ],
      tokens: {
        interior: {
          background: "brand-2-gray-50",
        },
      },
    },
    {
      chain: [
        {
          key: "card",
        },
        {
          key: "footer",
        },
      ],
      tokens: {
        interior: {
          padding: {
            y: "sm",
            x: "md",
          },
          childAlign: {
            horizontal: "end",
          },
        },
        boundary: {
          border: {
            top: {
              width: "thin",
              style: "solid",
              color: "muted",
            },
          },
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "sidebarItem",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "xs",
          },
          foreground: "brand-1-gray-600",
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "sidebarItem",
          concept: "main-nav-item",
        },
      ],
      tokens: {
        combined: [
          {
            where: {
              state: "active",
            },
            partialSurface: {
              interior: {
                background: "gradient-brand-to-white",
              },
              boundary: {
                border: {
                  left: {
                    width: "extraThick",
                    style: "solid",
                    color: "primary",
                  },
                },
              },
            },
          },
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "gradient-brand-to-white",
                foreground: "secondary",
              },
              boundary: {
                border: {
                  left: {
                    width: "extraThick",
                    style: "solid",
                    color: "secondary",
                  },
                },
              },
            },
          },
        ],
        interior: {},
        boundary: {
          border: {
            left: {
              width: "extraThick",
              style: "solid",
              color: "background",
            },
          },
        },
        defaultTypography: {
          typographyType: "body",
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "header",
        },
      ],
      tokens: {
        interior: {
          padding: {
            top: "xs",
            bottom: "sm",
          },
          background: "brand-1-gray-50",
          backgroundAlpha: 0.6,
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "footer",
        },
      ],
      tokens: {
        interior: {
          padding: {
            y: "xs",
          },
          gap: {
            all: "none",
          },
        },
        boundary: {
          border: {
            top: {
              width: "thin",
              style: "solid",
              color: "brand-2-gray-150",
            },
          },
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "header",
        },
        {
          key: "sidebarItem",
          concept: "org-switcher-nav",
        },
      ],
      tokens: {
        interior: {
          childAlign: {
            horizontal: "start",
          },
          gap: {},
          padding: {},
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
          concept: "collapsed",
        },
        {
          key: "header",
        },
        {
          key: "sidebarItem",
          concept: "org-switcher-nav",
        },
        {
          key: "avatar",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "xs",
          },
          background: "muted",
        },
        defaultTypography: {
          typographyType: "bodySmall",
        },
        transition: {
          duration: "slow",
          timing: "easeInOut",
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "footer",
        },
        {
          key: "sidebarItem",
          concept: "user-account-nav",
        },
      ],
      tokens: {
        interior: {
          childAlign: {
            horizontal: "start",
          },
        },
        defaultTypography: {
          typographyType: "bodyExtraSmall",
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "footer",
        },
        {
          key: "sidebarItem",
          concept: "notifications-nav",
        },
      ],
      tokens: {
        defaultTypography: {
          typographyType: "bodySmall",
          textTransform: "uppercase",
        },
      },
    },
    {
      chain: [
        {
          key: "tableCell",
        },
        {
          key: "tableCellContent",
        },
        {
          key: "badge",
          concept: "member-count",
        },
      ],
      tokens: {
        interior: {
          background: "transparent",
          padding: {},
          foreground: "brand-2-gray-500",
        },
        boundary: {
          border: {
            width: "extraThin",
            style: "solid",
            color: "brand-1-gray-500",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "sidebarItem",
          concept: "sidebar-toggle",
        },
      ],
      tokens: {
        defaultTypography: {
          textAlign: "left",
          typographyType: "bodySmall",
        },
        interior: {
          foreground: "brand-1-gray-300",
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
          concept: "expanded",
        },
        {
          key: "header",
        },
        {
          key: "sidebarItem",
          concept: "org-switcher-nav",
        },
        {
          key: "avatar",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "md",
          },
          background: "muted",
        },
      },
    },
    {
      chain: [
        {
          key: "tableBody",
        },
        {
          key: "tableRow",
        },
        {
          key: "tableCell",
          concept: "row-actions",
        },
        {
          key: "tableCellContent",
        },
      ],
      tokens: {
        interior: {
          childAlign: {
            horizontal: "end",
          },
        },
        defaultTypography: {},
      },
    },
    {
      chain: [
        {
          key: "card",
        },
        {
          key: "header",
          concept: "auth-header",
        },
      ],
      tokens: {
        interior: {
          background: "muted",
          padding: {
            all: "md",
          },
          gap: {
            all: "sm",
          },
          foreground: "smart-bw",
        },
        smartBleed: "normal",
      },
    },
    {
      chain: [
        {
          key: "card",
          concept: "sign-in-card",
        },
      ],
      tokens: {
        interior: {
          padding: {},
          gap: {},
        },
      },
    },
    {
      chain: [
        {
          key: "card",
          concept: "sign-in-card",
        },
        {
          key: "content",
          concept: "auth-body",
        },
        {
          key: "colSection",
          concept: "auth-form",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "md",
          },
          padding: {
            all: "md",
          },
        },
        boundary: {
          border: {
            bottom: {
              width: "extraThin",
              style: "solid",
              color: "brand-2-gray-250",
            },
          },
        },
      },
    },
    {
      chain: [
        {
          key: "toggleGroup",
        },
        {
          key: "toggle",
        },
      ],
      tokens: {
        interior: {
          padding: {
            y: "xs",
          },
          childAlign: {
            horizontal: "center",
          },
          foreground: "brand-1-gray-500",
          background: "transparent",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              boundary: {
                border: {
                  bottom: {
                    width: "thick",
                    style: "solid",
                    color: "primary",
                  },
                },
              },
              interior: {
                background: "smart-bw",
                childAlign: {},
                foreground: "primary",
              },
              defaultTypography: {},
            },
          },
        ],
        defaultTypography: {
          typographyType: "heading4",
        },
        boundary: {
          border: {
            width: "none",
          },
          radius: {
            all: "none",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "sidebar",
        },
        {
          key: "content",
        },
      ],
      tokens: {
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
    {
      chain: [
        {
          key: "leftSidebar",
        },
        {
          key: "sidebarItem",
        },
      ],
      tokens: {
        interior: {
          foreground: "brand-1-gray-600",
        },
        defaultTypography: {
          typographyType: "bodySmall",
          textTransform: "capitalize",
        },
        combined: [
          {
            where: {
              state: "active",
            },
            partialSurface: {
              interior: {},
            },
          },
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {},
            },
          },
          {
            where: {
              state: "active",
              emphasis: "primary",
            },
            partialSurface: {
              interior: {},
            },
          },
          {
            where: {
              state: "selected",
              emphasis: "primary",
            },
            partialSurface: {
              interior: {
                background: "gradient-secondary-to-white",
                backgroundAlpha: 0.3,
                foreground: "brand-2-light",
              },
              boundary: {
                border: {
                  left: {
                    width: "extraThick",
                    style: "solid",
                    color: "secondary",
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      chain: [
        {
          key: "card",
          concept: "orgs-list-card",
        },
        {
          key: "content",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "none",
          },
          padding: {
            all: "none",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "container",
          concept: "members-list",
        },
        {
          key: "card",
          concept: "members-list-card",
        },
        {
          key: "content",
        },
      ],
      tokens: {
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
    {
      chain: [
        {
          key: "popover",
          concept: "org-switcher",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "xs",
          },
          gap: {
            all: "md",
          },
          childAlign: {
            horizontal: "start",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "popover",
          concept: "org-switcher",
        },
        {
          key: "sidebarItem",
        },
      ],
      tokens: {
        interior: {
          childAlign: {
            horizontal: "start",
          },
          gap: {
            all: "xs",
          },
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "muted",
                gap: {
                  all: "none",
                },
                padding: {
                  all: "2xs",
                },
                foreground: "primary",
              },
              boundary: {
                radius: {
                  all: "full",
                },
                border: {
                  width: "thin",
                  style: "solid",
                  color: "primary",
                },
              },
            },
          },
        ],
        defaultTypography: {
          typographyType: "body",
        },
      },
    },
    {
      chain: [
        {
          key: "mainBody",
          concept: "legal-mgmt-content",
        },
        {
          key: "field",
        },
      ],
      tokens: {
        interior: {
          childAlign: {
            horizontal: "start",
          },
        },
        defaultTypography: {
          textAlign: "left",
        },
      },
    },
    {
      chain: [
        {
          key: "rowSection",
          concept: "top-header",
        },
        {
          key: "button",
        },
      ],
      tokens: {
        interior: {
          background: "gradient-gradient-2",
        },
      },
    },
    {
      chain: [
        {
          key: "pageBody",
          concept: "orgs-list",
        },
        {
          key: "main",
        },
      ],
      tokens: {
        interior: {
          padding: {},
        },
      },
    },
    {
      chain: [
        {
          key: "pageBody",
          concept: "orgs-list",
        },
        {
          key: "main",
        },
        {
          key: "mainBody",
        },
        {
          key: "container",
        },
      ],
      tokens: {
        boundary: {
          margin: {
            y: "xl",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "container",
          concept: "org-members",
        },
        {
          key: "card",
          concept: "members-list-card",
        },
        {
          key: "content",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "none",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "container",
          concept: "org-members",
        },
      ],
      tokens: {
        boundary: {
          margin: {
            top: "sm",
            bottom: "xl",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "mainHeader",
          concept: "org-detail-tabs",
        },
        {
          key: "container",
        },
      ],
      tokens: {
        boundary: {
          margin: {
            top: "md",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "pageBody",
          concept: "home-dashboard",
        },
        {
          key: "main",
        },
        {
          key: "mainBody",
        },
        {
          key: "container",
        },
      ],
      tokens: {
        boundary: {
          margin: {
            y: "auto",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "buttonGroup",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "none",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "buttonGroup",
        },
        {
          key: "button",
        },
      ],
      tokens: {
        boundary: {
          radius: {
            all: "none",
          },
        },
        combined: [
          {
            where: {
              position: "first",
            },
            partialSurface: {
              boundary: {
                radius: {
                  topLeft: "full",
                  bottomLeft: "full",
                },
              },
            },
          },
          {
            where: {
              position: "middle",
            },
            partialSurface: {
              boundary: {
                border: {
                  left: {
                    width: "none",
                  },
                },
              },
            },
          },
          {
            where: {
              position: "last",
            },
            partialSurface: {
              boundary: {
                radius: {
                  topRight: "full",
                  bottomRight: "full",
                },
                border: {
                  left: {
                    width: "none",
                  },
                },
              },
            },
          },
          {
            where: {
              position: "only",
            },
            partialSurface: {
              boundary: {
                radius: {
                  all: "full",
                },
              },
            },
          },
        ],
      },
    },
    {
      chain: [
        {
          key: "paginationBar",
          concept: "pagination",
        },
        {
          key: "button",
        },
      ],
      tokens: {
        boundary: {
          effect: "no-effect",
          radius: {
            all: "md",
          },
        },
        interior: {
          background: "transparent",
          padding: {
            x: "sm",
            y: "xs",
          },
          foreground: "foreground",
        },
        dimensionPosition: {
          height: "2rem",
        },
        combined: [
          {
            where: {
              state: "selected",
            },
            partialSurface: {
              interior: {
                background: "primary",
                foreground: "background",
              },
            },
          },
          {
            where: {
              state: "hover",
            },
            partialSurface: {
              interior: {
                background: "muted",
              },
            },
          },
        ],
      },
    },
    {
      chain: [
        {
          key: "field",
          concept: "phone-input",
        },
      ],
      tokens: {
        interior: {
          gap: {
            all: "xs",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "content",
          concept: "auth-body",
        },
      ],
      tokens: {
        interior: {
          padding: {
            all: "none",
          },
          gap: {},
        },
      },
    },
    {
      chain: [
        {
          key: "mainBody",
        },
        {
          key: "container",
        },
      ],
      tokens: {
        boundary: {
          margin: {
            y: "xl",
          },
        },
      },
    },
    {
      chain: [
        {
          key: "separator",
          concept: "sidebar-divider",
        },
      ],
      tokens: {
        interior: {
          background: "brand-1-gray-200",
        },
      },
    },
    {
      chain: [
        {
          key: "separator",
        },
        {
          key: "header",
        },
      ],
      tokens: {
        interior: {
          background: "brand-4-gray-50",
          padding: {
            x: "sm",
            y: "xs",
          },
        },
        defaultTypography: {
          typographyType: "bodyExtraSmall",
        },
      },
    },
  ],
  gradients: {
    "brand-to-white": {
      type: "linear",
      angle: 90,
      stops: [
        {
          color: "brand-4-light",
        },
        {
          color: "background",
        },
      ],
    },
    "secondary-to-white": {
      type: "linear",
      angle: 90,
      stops: [
        {
          color: "muted",
        },
        {
          color: "brand-1-gray-50",
        },
      ],
    },
    "brand-aurora": [
      {
        type: "radial",
        position: "15% 20%",
        stops: [
          {
            color: "brand-1",
            position: "0%",
          },
          {
            color: "transparent",
            position: "50%",
          },
        ],
      },
      {
        type: "radial",
        position: "85% 15%",
        stops: [
          {
            color: "brand-2",
            position: "0%",
          },
          {
            color: "transparent",
            position: "45%",
          },
        ],
      },
      {
        type: "radial",
        position: "50% 90%",
        stops: [
          {
            color: "brand-3",
            position: "0%",
          },
          {
            color: "transparent",
            position: "55%",
          },
        ],
      },
      {
        type: "linear",
        angle: 135,
        stops: [
          {
            color: "brand-1",
            position: "0%",
          },
          {
            color: "brand-4",
            position: "100%",
          },
        ],
      },
    ],
    "brand-radiance": [
      {
        type: "radial",
        position: "65% 35%",
        stops: [
          {
            color: "brand-2",
            position: "0%",
          },
          {
            color: "transparent",
            position: "60%",
          },
        ],
      },
      {
        type: "radial",
        position: "20% 75%",
        stops: [
          {
            color: "brand-3",
            position: "0%",
          },
          {
            color: "transparent",
            position: "40%",
          },
        ],
      },
      {
        type: "radial",
        position: "80% 80%",
        stops: [
          {
            color: "flat-violet",
            position: "0%",
          },
          {
            color: "transparent",
            position: "35%",
          },
        ],
      },
      {
        type: "linear",
        angle: 160,
        stops: [
          {
            color: "brand-1",
            position: "0%",
          },
          {
            color: "brand-3",
            position: "100%",
          },
        ],
      },
    ],
    "brand-twilight": [
      {
        type: "radial",
        position: "10% 50%",
        stops: [
          {
            color: "flat-violet",
            position: "0%",
          },
          {
            color: "transparent",
            position: "50%",
          },
        ],
      },
      {
        type: "radial",
        position: "90% 20%",
        stops: [
          {
            color: "brand-2",
            position: "0%",
          },
          {
            color: "transparent",
            position: "40%",
          },
        ],
      },
      {
        type: "linear",
        angle: 200,
        stops: [
          {
            color: "brand-1",
            position: "0%",
          },
          {
            color: "flat-violet",
            position: "50%",
          },
          {
            color: "brand-3",
            position: "100%",
          },
        ],
      },
    ],
    "gradient-1": {
      type: "linear",
      angle: 0,
      stops: [],
    },
    "gradient-2": [
      {
        type: "radial",
        shape: "ellipse",
        position: "8.2% 86.3%",
        stops: [
          {
            color: "flat-violet",
          },
          {
            color: "transparent",
            position: "200%",
          },
        ],
      },
      {
        type: "radial",
        shape: "ellipse",
        position: "97.7% 4.8%",
        stops: [
          {
            color: "status-error",
          },
          {
            color: "transparent",
            position: "50%",
          },
        ],
      },
      {
        type: "radial",
        shape: "ellipse",
        position: "84.6% 83.1%",
        stops: [
          {
            color: "muted",
          },
          {
            color: "transparent",
            position: "100%",
          },
        ],
      },
    ],
  },
};
