
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import { axesSchema } from "../../lib/axes-schema";

export interface QrCodeProps extends ElementProps<"svg"> {
  /** The value to encode in the QR code */
  value: string;
  /** Pixel size of the rendered SVG (default: 200) */
  size?: number;
}

export const qrCodeSchema = defineProps<QrCodeProps>("QrCode", {
  ...axesSchema("svg"),
  value: { kind: "string", required: true, doc: "Value to encode" },
  size: { kind: "number", default: 200, doc: "Pixel size of the SVG" },
});
