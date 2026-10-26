import { cn } from '../../lib/utils';
import { iconRegistry, type IconRegistryKey } from './registry';
import { defineProps } from '../../lib/define-props';

// =============================================================================
// Constants (single source of truth) — aligned with markup dictionary
// =============================================================================

const ICON_SCALES = ["xs", "sm", "md", "lg", "xl"] as const;

// Types derived from constants
export type IconName = IconRegistryKey;
export type IconScale = typeof ICON_SCALES[number];

// Helper to generate typeString from const array
const toTypeString = (arr: readonly string[]) => arr.map(v => `"${v}"`).join(" | ");

// =============================================================================
// Component
// =============================================================================

export interface IconProps {
  /** Semantic icon name */
  name: IconName;
  /** Structural size (default: "md") */
  size?: IconScale;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

export const iconSchema = defineProps<Pick<IconProps, "name" | "size">>("Icon", {
  name: { kind: "string", required: true, doc: "Semantic icon name (the registry's keys)" },
  size: { kind: "enum", values: ICON_SCALES, default: "md", doc: "Structural size" },
});

/**
 * Theme-aware icon component with semantic naming.
 *
 * Uses semantic icon names (e.g., "add", "close", "search") that map to
 * the underlying icon library (currently Lucide).
 *
 * @example
 * <Icon name="add" size="md" />
 * <Icon name="chevronRight" size="sm" />
 */
export function Icon({
  name,
  size,
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return (
    <IconComponent
      element="shape--icon"
      {...(size != null && { scale: size })}
      className={cn(className)}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

const iconNames = Object.keys(iconRegistry) as IconName[];

Icon.propsSchema = {
  componentName: "Icon",
  interfaceName: "IconProps",
  props: [
    {
      name: "name",
      type: "union",
      required: true,
      unionValues: iconNames,
      typeString: "IconName",
      description: "Semantic icon name from the registry",
    },
    {
      name: "size",
      type: "union",
      required: false,
      defaultValue: "md",
      unionValues: ICON_SCALES,
      typeString: toTypeString(ICON_SCALES),
      description: "Structural size",
    },
  ],
};
