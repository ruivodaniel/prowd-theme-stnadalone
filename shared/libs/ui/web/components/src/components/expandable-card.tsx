import * as React from "react";
import { cn } from "../lib/utils";
import { CollapsiblePrimitive, CollapsiblePrimitiveContent, CollapsiblePrimitiveTrigger } from "./collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

// =============================================================================
// Constants (single source of truth)
// =============================================================================

const EXPANDABLE_CARD_ICON_POSITIONS = ["left", "right"] as const;

// Types derived from constants
export type ExpandableCardIconPosition = typeof EXPANDABLE_CARD_ICON_POSITIONS[number];

// Helper to generate typeString from const array
const toTypeString = (arr: readonly string[]) => arr.map(v => `"${v}"`).join(" | ");

// =============================================================================
// Component
// =============================================================================

export interface ExpandableCardProps {
  /** Card title */
  title: string;
  /** Whether the card starts expanded */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Position of the expand/collapse icon */
  iconPosition?: ExpandableCardIconPosition;
  /** Content to show when expanded */
  children: React.ReactNode;
  /** Additional className for the card */
  className?: string;
}

export function ExpandableCard({
  title,
  defaultOpen = false,
  open,
  onOpenChange,
  iconPosition = "right",
  children,
  className,
}: ExpandableCardProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const handleOpenChange = onOpenChange ?? setInternalOpen;

  return (
    <CollapsiblePrimitive open={isOpen} onOpenChange={handleOpenChange}>
      <Card className={cn(className)}>
        <CollapsiblePrimitiveTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-center justify-between">
              {iconPosition === "left" && (
                <Button
                  emphasis="tertiary"
                  buttonType="icon"
                  scale="sm"
                  startIcon={isOpen ? "chevronUp" : "chevronDown"}
                />
              )}
              <CardTitle className="flex-1">{title}</CardTitle>
              {iconPosition === "right" && (
                <Button
                  emphasis="tertiary"
                  buttonType="icon"
                  scale="sm"
                  startIcon={isOpen ? "chevronUp" : "chevronDown"}
                />
              )}
            </div>
          </CardHeader>
        </CollapsiblePrimitiveTrigger>
        <CollapsiblePrimitiveContent>
          <CardContent>{children}</CardContent>
        </CollapsiblePrimitiveContent>
      </Card>
    </CollapsiblePrimitive>
  );
}

// =============================================================================
// Props Schema (for Cockpit and tooling)
// =============================================================================

ExpandableCard.propsSchema = {
  componentName: "ExpandableCard",
  interfaceName: "ExpandableCardProps",
  props: [
    {
      name: "title",
      type: "string",
      required: true,
      defaultValue: "Card Title",
      typeString: "string",
      description: "Card title displayed in the header",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: false,
      typeString: "boolean",
      description: "Whether the card starts expanded",
    },
    {
      name: "iconPosition",
      type: "union",
      required: false,
      defaultValue: "right",
      unionValues: EXPANDABLE_CARD_ICON_POSITIONS,
      typeString: toTypeString(EXPANDABLE_CARD_ICON_POSITIONS),
      description: "Position of the expand/collapse icon",
    },
  ],
};
