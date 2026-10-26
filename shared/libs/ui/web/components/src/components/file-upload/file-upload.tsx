import * as React from "react";
import { Upload } from "lucide-react";

import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { FileUploadProps } from "./types";

// =============================================================================
// Component
// =============================================================================

function FileUpload({ position,
  emphasis,
  state,
  concept,
  className,
  value,
  defaultValue = null,
  onChange,
  accept,
  multiple,
  maxSize,
  onReject,
  disableDrop,
  disabled,
  scale = "md",
  status,
  children,
  ...props
}: FileUploadProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<File | string | null>(defaultValue);
  const current = isControlled ? (value as File | string | null) : internal;

  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const commit = (next: File | null) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const accepts = (f: File) => {
    if (!accept) return true;
    const list = accept.split(",").map((s) => s.trim().toLowerCase());
    const name = f.name.toLowerCase();
    const type = f.type.toLowerCase();
    return list.some((entry) => {
      if (entry.startsWith(".")) return name.endsWith(entry);
      if (entry.endsWith("/*")) return type.startsWith(entry.slice(0, -1));
      return type === entry;
    });
  };

  const handleFile = (f: File | undefined | null) => {
    if (!f) return;
    if (maxSize !== undefined && f.size > maxSize) {
      onReject?.("too-large", f);
      return;
    }
    if (!accepts(f)) {
      onReject?.("wrong-type", f);
      return;
    }
    commit(f);
  };

  const pick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const clear = () => commit(null);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled || disableDrop) return;
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled || disableDrop) return;
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const themeAttrs: Record<string, string | undefined> = {
    element: "field--file-upload",
    ...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : dragOver ? "selected" : state, position }),
  };

  return (
    <div
      {...themeAttrs}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn("flex w-full items-center", className, positionClasses(position))}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {typeof children === "function"
        ? children({ value: current, pick, clear, dragOver })
        : children ?? (
            <button
              type="button"
              data-part="default-trigger"
              onClick={pick}
              disabled={disabled}
              className="flex w-full items-center justify-center"
            >
              <Upload className="size-4" />
              <span element="type--body-small">
                {current instanceof File
                  ? current.name
                  : typeof current === "string" && current
                    ? current
                    : "Click or drop a file"}
              </span>
            </button>
          )}
    </div>
  );
}

export { FileUpload };
