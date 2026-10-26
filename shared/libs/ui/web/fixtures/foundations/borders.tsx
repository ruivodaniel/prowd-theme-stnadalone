import { FixtureBody, Row, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Border widths — every `border-width-*` variable as a stroke. */
export default function BordersFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <Row label="border widths">
        {withPrefix(vars.base, "border-width-").map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <div style={{ width: 72, height: 56, borderRadius: "var(--radius-md, 8px)", border: `var(--${n}) solid currentColor` }} />
          </Token>
        ))}
      </Row>
    </FixtureBody>
  );
}
