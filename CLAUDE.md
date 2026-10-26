# theme standalone

The design system and the themes of the UI library, for a theme designer. A copy made by slice-design's
`scripts/standalone-build.ts`: nothing here is edited by hand except a theme.

- A theme: `shared/libs/ui/themes/<id>/v<n>/theme.ts`. The skill that writes one: `claude/skills/new-theme/SKILL.md`.
- The docs: `pnpm docs`, then http://localhost:8901/docs/ — theme authoring, architecture, cascade, markup dictionary, layouts, naming.
- The tool: `pnpm dev`, then http://localhost:4510 — the design system (foundations, components, patterns, layouts, check mode) and the themes.
