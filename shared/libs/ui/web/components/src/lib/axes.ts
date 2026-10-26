// The axis attributes a root node carries. Which axes a component may forward is
// decided by its element row (ElementProps<key>); here we only pass the set ones through.
/** The six axis attributes. Components take them from ElementProps<key>, never from the native attributes. */
export type AxisName = "emphasis" | "status" | "state" | "scale" | "concept" | "position";

export interface AxisAttrs {
  emphasis?: string;
  status?: string;
  state?: string;
  scale?: string;
  concept?: string;
  /** where the element stands in its parent — POSITION words; emitted as an attribute like the others, and turned into classes by lib/position.ts */
  position?: string;
}

const AXES = ["emphasis", "status", "state", "scale", "concept", "position"] as const;

/** Only the axes that are set, as attributes. */
export function axisAttrs(a: AxisAttrs): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of AXES) { const v = a[k]; if (v) out[k] = v; }
  return out;
}
