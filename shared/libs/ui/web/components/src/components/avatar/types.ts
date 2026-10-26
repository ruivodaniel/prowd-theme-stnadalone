import type * as React from "react";
import type * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type Scale } from "../../../../../types/axes";
import type { ElementProps } from "../../../../../types/elements";
import { defineProps } from "../../lib/define-props";
import type { AxisName } from "../../lib/axes";
import { axesSchema } from "../../lib/axes-schema";

/** Avatar takes scale from the global axes. Named alias kept for consumers. */
export type AvatarScale = Scale;

export interface AvatarOwnProps extends ElementProps<"avatar"> {

}

export type AvatarProps = AvatarOwnProps & Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, keyof AvatarOwnProps | AxisName>;
export type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;
export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback>;

export const avatarSchema = defineProps<AvatarOwnProps>("Avatar", {
  ...axesSchema("avatar"),

});

// the parts: the image (src) and the fallback (its content)
export const avatarImageSchema = defineProps<{ src?: string }>("AvatarImage", { src: { kind: "string", doc: "The image URL" } });
export const avatarFallbackSchema = defineProps<Record<never, never>>("AvatarFallback", {});
