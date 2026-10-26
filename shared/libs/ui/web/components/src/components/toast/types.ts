import type { ToasterProps } from "sonner";
import { defineProps } from "../../lib/define-props";

// The toaster wraps sonner (the vendor, named nowhere else); it takes its props and adds none of its own.
export type { ToasterProps };

export const toasterSchema = defineProps<Record<never, never>>("Toaster", {});
