# theme standalone

```
pnpm install
pnpm theme:build      # every theme's CSS
pnpm dev              # the tool: http://localhost:4510
pnpm docs             # the docs: http://localhost:8901/docs/
```

A theme is `shared/libs/ui/themes/<id>/v<n>/theme.ts`. Write one with `claude/skills/new-theme/SKILL.md`; activate it in the tool's
themes tab; walk the design system to judge it. The active theme is `project/shared/themes/active.json`.
