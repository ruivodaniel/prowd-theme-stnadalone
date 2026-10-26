import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./types";


// =============================================================================
// Internal context — tracks the active tab value so TabsTrigger can
// set state="selected" for the theme engine (Radix only sets data-state).
// =============================================================================

const TabsValueContext = React.createContext<string | undefined>(undefined);

// =============================================================================
// Components
// =============================================================================

function Tabs({
  onValueChange,
  defaultValue,
  value: valueProp,
  ...props
}: TabsProps) {
  // Track active value ourselves so we can expose it via context.
  // For controlled mode, use valueProp directly.
  // For uncontrolled mode, track via onValueChange.
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue as string | undefined,
  );

  const activeValue = isControlled ? valueProp : uncontrolledValue;

  const handleChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val);
      onValueChange?.(val);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsValueContext.Provider value={activeValue}>
      <TabsPrimitive.Root
        value={valueProp}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        {...props}
      />
    </TabsValueContext.Provider>
  );
}

function TabsList({ position, className, emphasis, state, scale, concept, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      element="control-group--tab-bar"
      {...axisAttrs({ emphasis, scale, concept, state, position })}
      className={cn(
        "flex items-center",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

function TabsTrigger({ position,
  value,
  className,
  status,
  state,
  concept,
  disabled,
  ...props
}: TabsTriggerProps) {
  const activeValue = React.useContext(TabsValueContext);
  const isSelected = value !== undefined && activeValue === value;
  // Same derivation buttons do — the theme reads state="disabled", not the DOM attribute.
  const derivedState = disabled ? "disabled" : isSelected ? "selected" : state;

  return (
    <TabsPrimitive.Trigger
      element="control--tab-trigger"
      {...axisAttrs({ status, concept, state: derivedState, position })}
      disabled={disabled}
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className, positionClasses(position),
      )}
      {...props}
    />
  );
}

function TabsContent({  className, state, concept, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content element="surface--tab-panel" {...axisAttrs({ concept, state })} className={cn("flex-1", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
