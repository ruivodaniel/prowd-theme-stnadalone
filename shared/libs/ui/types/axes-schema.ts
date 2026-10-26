// Schema entries for the axes of an element, read from the ELEMENTS table.
import { ELEMENTS, type ElementKey, type ElementProps } from "./elements";
import type { PropsSchema } from "./define-props";

export function axesSchema<K extends ElementKey>(key: K): PropsSchema<ElementProps<K>> {
  const row = ELEMENTS[key];
  const out: Record<string, unknown> = { concept: { kind: "string", doc: "Product concept the theme may key on" } };
  if (row.emphasis.length) out.emphasis = { kind: "enum", values: row.emphasis, doc: "Visual prominence" };
  if (row.status.length) out.status = { kind: "enum", values: row.status, doc: "Semantic condition" };
  if (row.state.length) out.state = { kind: "enum", values: row.state, doc: "State; the component derives what it can from behavior" };
  if (row.scale.length) out.scale = { kind: "enum", values: row.scale, default: "md", doc: "Structural size" };
  if (row.position.length) out.position = { kind: "enum", values: row.position, doc: "Where it stands in its parent and how much it takes (several words allowed)" };
  return out as unknown as PropsSchema<ElementProps<K>>;
}
