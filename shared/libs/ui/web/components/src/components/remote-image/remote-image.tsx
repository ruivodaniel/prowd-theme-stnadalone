/**
 * RemoteImage
 *
 * Generic `<img>` that resolves an opaque source identifier (S3 key, IPFS CID,
 * signed-URL-required path, …) to a final URL via an injected async `resolver`.
 * If no `resolver` is provided, `src` is treated as an already-final URL.
 *
 * Caching/deduping is the caller's responsibility — wrap react-query or any
 * other cache inside the resolver if you need memoization.
 */

import * as React from "react";
import type { RemoteImageProps } from "./types";

export function RemoteImage({
  src,
  resolver,
  fallback = null,
  ...imgProps
}: RemoteImageProps) {
  const [resolvedSrc, setResolvedSrc] = React.useState<string | null | undefined>(
    src && !resolver ? src : null,
  );
  const [loading, setLoading] = React.useState(Boolean(src && resolver));

  React.useEffect(() => {
    if (!src) {
      setResolvedSrc(null);
      setLoading(false);
      return;
    }
    if (!resolver) {
      setResolvedSrc(src);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void resolver(src).then(
      (url) => {
        if (cancelled) return;
        setResolvedSrc(url ?? null);
        setLoading(false);
      },
      () => {
        if (cancelled) return;
        setResolvedSrc(null);
        setLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [src, resolver]);

  if (loading || !resolvedSrc) {
    return <>{fallback}</>;
  }
  return <img src={resolvedSrc} {...imgProps} />;
}
