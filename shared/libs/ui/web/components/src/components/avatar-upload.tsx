/**
 * AvatarUploadField
 *
 * Avatar + "upload" button + hidden file input. Accepts an already-saved
 * remote identifier (string) or a freshly picked `File`; emits `File` on
 * pick. Source resolution for stored remote values is delegated to an
 * optional `resolver` (see `RemoteImage`).
 */

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { RemoteImage } from "./remote-image";
import { defineProps } from "../lib/define-props";

export interface AvatarUploadFieldProps {
  value: File | string | undefined | null;
  onChange: (file: File) => void;
  fallback: string;
  uploadLabel: string;
  disabled?: boolean;
  /** Resolves stored string values (e.g. S3 keys) to a final URL. */
  resolver?: (src: string) => Promise<string | null | undefined>;
  /** The field's test id, on its root */
  "data-testid"?: string;
}

export const avatarUploadFieldSchema = defineProps<Pick<AvatarUploadFieldProps, "value" | "onChange" | "fallback" | "uploadLabel" | "disabled">>("AvatarUploadField", {
  value: { kind: "other", doc: "The stored image URL, or the File just picked (previewed)" },
  onChange: { kind: "function", doc: "(file) — the picked file" },
  fallback: { kind: "string", required: true, doc: "Initials shown without an image" },
  uploadLabel: { kind: "string", required: true, doc: "The button's label" },
  disabled: { kind: "boolean", default: false },
});

export function AvatarUploadField({
  value,
  onChange,
  fallback,
  uploadLabel,
  disabled = false,
  resolver,
  "data-testid": testId,
}: AvatarUploadFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>();

  React.useEffect(() => {
    let objectUrl: string | undefined;

    if (!value) {
      setPreviewUrl(undefined);
    } else if (value instanceof File) {
      objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(value);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div className="flex items-center" data-testid={testId}>
      <Avatar scale="lg">
        <AvatarImage asChild src={previewUrl} alt={fallback}>
          <RemoteImage
            src={previewUrl}
            resolver={resolver}
            alt={fallback}
            width={32}
            height={32}
            className="h-full w-full"
          />
        </AvatarImage>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <Button
        disabled={disabled}
        emphasis="secondary"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {uploadLabel}
      </Button>
      <input
        disabled={disabled}
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFile}
      />
    </div>
  );
}
