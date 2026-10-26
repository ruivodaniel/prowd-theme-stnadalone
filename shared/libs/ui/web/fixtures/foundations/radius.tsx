import { FixtureBody, Row, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Radius — every `radius-*` variable on the same box. */
export default function RadiusFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <Row label="radius">
        {withPrefix(vars.base, "radius-").map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <div style={{ width: 72, height: 56, borderRadius: `var(--${n})`, border: "1.5px solid currentColor", background: "color-mix(in srgb, var(--color-brand-1, currentColor) 12%, transparent)" }} />
          </Token>
        ))}
      </Row>
    </FixtureBody>
  );
}
