import { FixtureBody, Mode, Row, Swatch } from "../_chrome";
import { matching, modeColumns, useThemeVars } from "../_theme-vars";

/**
 * Color primitives — the tokens a theme declares directly, per color mode.
 * Groups are found by name in the generated css; only the order of the
 * groups is authored here.
 */
const GROUPS: { label: string; re: RegExp }[] = [
  { label: "anchors (per mode)", re: /^(background|foreground)$/ },
  { label: "main", re: /^color-main-/ },
  { label: "brand", re: /^color-brand-\d+$/ },
  { label: "status", re: /^color-status-(success|info|warning|error)$/ },
  { label: "flat", re: /^color-flat-/ },
  { label: "semantic", re: /^color-(primary|secondary|accent|muted|destructive|success|background|foreground|border|input|ring)(-foreground)?$/ },
  { label: "charts", re: /^color-chart-/ },
  { label: "sidebar (legacy bridge)", re: /^color-sidebar/ },
];

export default function ColorsFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <div className="flex gap-4 flex-wrap items-start">
        {modeColumns(vars).map((col) => (
          <Mode key={col.label} mode={col.mode} label={col.label}>
            {GROUPS.map((g) => {
              const names = matching(vars.base, g.re);
              if (!names.length) return null;
              const values = col.mode ? { ...vars.base, ...vars.modes[col.mode] } : vars.base;
              return (
                <Row key={g.label} label={g.label}>
                  {names.map((n) => <Swatch key={n} token={n} value={values[n]} />)}
                </Row>
              );
            })}
          </Mode>
        ))}
      </div>
    </FixtureBody>
  );
}
