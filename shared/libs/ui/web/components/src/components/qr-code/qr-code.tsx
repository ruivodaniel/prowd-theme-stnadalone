import { QRCodeSVG } from "qrcode.react";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import type { QrCodeProps } from "./types";

// =============================================================================
// Component
// =============================================================================

export function QrCode({  value, size = 200, emphasis, scale, concept }: QrCodeProps) {
  return (
    <span element="shape--svg" {...axisAttrs({ emphasis, scale, concept })} className="inline-flex">
      <QRCodeSVG value={value} size={size} />
    </span>
  );
}
