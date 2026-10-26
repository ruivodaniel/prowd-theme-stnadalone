// A component's props schema, for tooling (catalog, theme editor, docs).
// Typed against the component's own props: a missing key is a compile error,
// an enum whose values are not the prop's type is a compile error.

type Base = { doc?: string; required?: boolean };

export type PropMeta<T> =
  [NonNullable<T>] extends [boolean] ? Base & { kind: "boolean"; default?: boolean }
  : NonNullable<T> extends (...args: never[]) => unknown ? Base & { kind: "function" }
  : NonNullable<T> extends string ? Base & (
      | { kind: "enum"; values: readonly NonNullable<T>[]; default?: NonNullable<T> }
      | { kind: "string"; default?: string })
  : NonNullable<T> extends number ? Base & { kind: "number"; default?: number }
  : Base & { kind: "node" | "other" };

export type PropsSchema<Own> = { readonly [K in keyof Own]-?: PropMeta<Own[K]> };

export interface ComponentSchema<Own = Record<string, unknown>> {
  component: string;
  props: PropsSchema<Own>;
}

export function defineProps<Own>(component: string, props: PropsSchema<Own>): ComponentSchema<Own> {
  return { component, props };
}
