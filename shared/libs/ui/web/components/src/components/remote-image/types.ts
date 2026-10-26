import type * as React from "react";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";

export interface RemoteImageOwnProps {
  /** Opaque source identifier (S3 key, IPFS CID, signed-URL path…) or a final URL when no resolver is given */
  src?: string | null;
  /** When provided, called with src to produce the final URL. */
  resolver?: (src: string) => Promise<string | null | undefined>;
  /** Rendered while resolving, or when the resolved URL is null/undefined. */
  fallback?: React.ReactNode;
}

export type RemoteImageProps = RemoteImageOwnProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof RemoteImageOwnProps | AxisName>;

export const remoteImageSchema = defineProps<RemoteImageOwnProps>("RemoteImage", {
  src: { kind: "string", doc: "Source id, or the final URL when there is no resolver" },
  resolver: { kind: "function", doc: "src → final URL (async)" },
  fallback: { kind: "node", doc: "Shown while resolving or when nothing resolves" },
});
