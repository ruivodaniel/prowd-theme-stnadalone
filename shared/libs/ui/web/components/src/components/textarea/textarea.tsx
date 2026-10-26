import * as React from "react"

import { cn } from "../../lib/utils"
import { axisAttrs } from "../../lib/axes"
import { positionClasses } from "../../lib/position"
import type { TextareaProps } from "./types";

// =============================================================================
// Component
// =============================================================================

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ position, className, disabled, emphasis, status, state, scale = "md", concept, autoSize, minRows = 2, maxRows, onChange, style, ...props }, forwardedRef) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
  const setRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    },
    [forwardedRef],
  );

  const resize = React.useCallback(() => {
    const el = innerRef.current;
    if (!el || !autoSize) return;
    // Reset to measure the real scrollHeight.
    el.style.height = "auto";
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const minH = minRows * lineHeight;
    const maxH = maxRows ? maxRows * lineHeight : Infinity;
    const next = Math.max(minH, Math.min(el.scrollHeight, maxH));
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
  }, [autoSize, minRows, maxRows]);

  React.useEffect(() => {
    resize();
  }, [resize, props.value, props.defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoSize) resize();
    onChange?.(e.target.value);
  };

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--textarea",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position }),
  };

  return (
    <textarea
      {...themeAttrs}
      className={cn(
        "flex disabled:pointer-events-none disabled:cursor-not-allowed",
        className, positionClasses(position)
      )}
      disabled={disabled}
      rows={autoSize ? minRows : props.rows}
      style={autoSize ? { resize: "none", ...style } : style}
      onChange={handleChange}
      ref={setRef}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea";

export { Textarea }
