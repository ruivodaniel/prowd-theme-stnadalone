import { FixtureBody, Mode, Ramp, Row, Swatch, Token } from "../_chrome";
import { matching, modeColumns, useThemeVars } from "../_theme-vars";

/**
 * Color derivations — what the engine computes from the anchors and the
 * derivation amounts: gray ramps, brand light/dark and tinted grays, status
 * light/dark. Every ramp is discovered by name; a mode column re-resolves it.
 */
const byStep = (a: string, b: string) => Number(a.match(/\d+$/)?.[0] ?? 0) - Number(b.match(/\d+$/)?.[0] ?? 0);

export default function ColorsDerivedFixture() {
  const vars = useThemeVars();
  const brands = matching(vars.base, /^color-brand-\d+$/);
  const statuses = matching(vars.base, /^color-status-[a-z]+$/);
  const params = matching(vars.base, /^colors-/);
  return (
    <FixtureBody>
      <Row label="derivation parameters">
        {params.map((n) => <Token key={n} name={n} value={vars.base[n]} />)}
      </Row>
      <div className="flex gap-4 flex-wrap items-start">
        {modeColumns(vars).map((col) => (
          <Mode key={col.label} mode={col.mode} label={col.label}>
            <Row label="gray (foreground → background)">
              <Ramp tokens={matching(vars.base, /^color-gray-\d+$/).sort(byStep)} />
            </Row>
            <Row label="gray pure (mode-independent)">
              <Ramp tokens={matching(vars.base, /^color-gray-pure-\d+$/).sort(byStep)} />
            </Row>
            {brands.map((b) => (
              <Row key={b} label={`${b} · light · dark · tinted gray`}>
                <Swatch token={b} />
                <Swatch token={`${b}-light`} />
                <Swatch token={`${b}-dark`} />
                <Ramp tokens={matching(vars.base, new RegExp(`^${b}-gray-\\d+$`)).sort(byStep)} />
              </Row>
            ))}
            {statuses.map((s) => (
              <Row key={s} label={`${s} · light · dark`}>
                <Swatch token={s} />
                <Swatch token={`${s}-light`} />
                <Swatch token={`${s}-dark`} />
              </Row>
            ))}
          </Mode>
        ))}
      </div>
    </FixtureBody>
  );
}
