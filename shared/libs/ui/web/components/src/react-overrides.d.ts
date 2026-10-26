/**
 * Fix @types/react@19.0.14 popover type regression.
 *
 * @types/react defines popover as `"" | "auto" | "manual"` but the JSX runtime
 * expects `boolean | "auto" | "manual"`. This augmentation patches the mismatch.
 */
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    // Radix popover type fix (@types/react@19.0.14 regression)
    popover?: boolean | "auto" | "manual" | undefined;
    // Markup dictionary — theme engine attributes
    element?: string;
    emphasis?: string;
    status?: string;
    scale?: string;
    state?: string;

    fill?: string | boolean;
    concept?: string;
    // Layout system attributes
    layout?: string;
    width?: string;
    align?: string;
  }

  interface SVGAttributes<T> {
    element?: string;
    scale?: string;
  }
}
