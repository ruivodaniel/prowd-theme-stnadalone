import * as React from "react";
import { cn } from "../lib/utils";
import { CollapsiblePrimitive, CollapsiblePrimitiveContent, CollapsiblePrimitiveTrigger } from "./collapsible";
import { Icon, type IconName } from "./icons/Icon";

// =============================================================================
// Component
// =============================================================================

export interface SidebarExpandableSectionProps {
  /** Section label */
  label: string;
  /** Optional icon for the section */
  iconName?: IconName;
  /** Whether the section starts expanded */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Section children (typically nav items) */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function SidebarExpandableSection({
  label,
  iconName,
  defaultOpen = true,
  open,
  onOpenChange,
  children,
  className,
}: SidebarExpandableSectionProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const handleOpenChange = onOpenChange ?? setInternalOpen;

  return (
    <CollapsiblePrimitive open={isOpen} onOpenChange={handleOpenChange}>
      <div className={cn(className)}>
        <CollapsiblePrimitiveTrigger asChild>
          <button element="control--sidebar-item" className="flex items-center">
            <Icon
              name={isOpen ? "chevronDown" : "chevronRight"}
              size="xs"
            />
            {iconName && <Icon name={iconName} size="sm" />}
            <span className="flex-1">{label}</span>
          </button>
        </CollapsiblePrimitiveTrigger>
        <CollapsiblePrimitiveContent>
          <div element="surface--content">{children}</div>
        </CollapsiblePrimitiveContent>
      </div>
    </CollapsiblePrimitive>
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

SidebarExpandableSection.propsSchema = {
  componentName: "SidebarExpandableSection",
  interfaceName: "SidebarExpandableSectionProps",
  props: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: "Section",
      typeString: "string",
      description: "Section label displayed in the trigger",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: true,
      typeString: "boolean",
      description: "Whether the section starts expanded",
    },
  ],
};
