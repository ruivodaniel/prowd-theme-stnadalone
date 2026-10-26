import type * as React from "react";
import { type Status, type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** FileUpload takes scale and status from the global axes. Named aliases kept for consumers. */
export type FileUploadScale = Scale;
export type FileUploadStatus = Status;

export interface FileUploadRenderContext {
  value: File | string | null;
  pick: () => void;
  clear: () => void;
  dragOver: boolean;
}

export interface FileUploadOwnProps extends ElementProps<"fileUpload"> {
  /** Controlled value (File, URL string, or null) */
  value?: File | string | null;
  /** Uncontrolled default value */
  defaultValue?: File | string | null;
  /** Called when a file is picked or dropped */
  onChange?: (file: File | null) => void;
  /** Accept attribute (MIME or extension list) */
  accept?: string;
  /** Whether to accept multiple files — the component still surfaces one at a time to onChange */
  multiple?: boolean;
  /** Max file size in bytes; oversized files are rejected via onReject */
  maxSize?: number;
  onReject?: (reason: "too-large" | "wrong-type", file: File) => void;
  /** Disable drag-and-drop (click-to-pick still works) */
  disableDrop?: boolean;
  disabled?: boolean;
  /** Render prop for the display surface, or a node. If omitted, a default drop zone is rendered. */
  children?: React.ReactNode | ((ctx: FileUploadRenderContext) => React.ReactNode);
}

export type FileUploadProps = FileUploadOwnProps & Omit<React.ComponentProps<"div">, keyof FileUploadOwnProps | AxisName>;

export const fileUploadSchema = defineProps<FileUploadOwnProps>("FileUpload", {
  ...axesSchema("fileUpload"),
  value: { kind: "other", doc: "Controlled value: File, URL string, or null" },
  defaultValue: { kind: "other", doc: "Uncontrolled default value" },
  onChange: { kind: "function", doc: "File picked or dropped" },
  accept: { kind: "string", doc: "Accept attribute (MIME or extension list)" },
  multiple: { kind: "boolean", default: false, doc: "Accept multiple files" },
  maxSize: { kind: "number", doc: "Max file size in bytes" },
  onReject: { kind: "function", doc: "Rejected: too-large or wrong-type" },
  disableDrop: { kind: "boolean", default: false, doc: "No drag-and-drop" },
  disabled: { kind: "boolean", default: false, doc: "Not available" },
  children: { kind: "other", doc: "Render prop or node for the display surface" },
});
