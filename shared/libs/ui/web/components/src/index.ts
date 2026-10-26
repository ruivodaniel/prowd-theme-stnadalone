/**
 * @libs/web-components
 *
 * Shared UI components based on shadcn/ui.
 * Theme-aware components that use CSS variables for styling.
 *
 * Structure (V3):
 *   /components  - Reusable UI pieces (Button, Card, etc.)
 *
 * Usage:
 *   import { Button } from "@libs/web-components"
 *   import { Button } from "@libs/web-components/components"
 */

// Ambient JSX augmentations (the custom `element`/`layout` styling
// attributes) travel with the package — ambient .d.ts files aren't
// discovered through imports, so consumers need this explicit reference.
/// <reference path="./react-overrides.d.ts" />

// Utilities
export { cn } from "./lib/utils";
export { defineProps, type ComponentSchema, type PropMeta, type PropsSchema } from "./lib/define-props";

// Hooks
export { useDebouncedBoolean } from "./hooks/use-debounced-boolean";
export { useIsMobile } from "./hooks/use-mobile";

// Components
export { Icon, type IconName, type IconProps } from "./components";

// Re-export all components for convenience
export * from "./components";
