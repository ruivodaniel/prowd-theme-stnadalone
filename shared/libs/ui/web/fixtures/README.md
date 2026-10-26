# UI fixtures

Renderable fixtures of the UI library, consumed by tooling (the live-designs catalog).
A workspace package (`@libs/ui-fixtures`), never bundled into a product.

```
fixtures/
  _chrome.tsx      Row · FixtureBody · Swatch · Ramp · Token · Mode · Block
  _theme-vars.ts   the active theme's css variables, read at runtime (base + every [data-mode])
  foundations/     tokens of the active theme, driven by the variables: colors, colors-derived,
                   typography, spacing, radius, borders, effects, transitions, icons
  elements/        one component each, <family>/<component>.tsx — the family of the root element
  patterns/        recipes of components, no identity of their own
  layouts/         one region each, full viewport, filler blocks (rendered in frames by the catalog)
  pages/           layout + patterns, product-like content                                (to come)
```

Every fixture default-exports a React component. Imports allowed: `@libs/web-components`,
`@libs/web-layouts`, `../_chrome`, `../_theme-vars`, react, and the component's own peer libs.
Files starting with `_` are chrome, not entries.

Foundations show what the engine emitted for whatever theme is active — no hand-kept token
lists. Layouts use only structural classes (flex, overflow), as the markup examples do.
