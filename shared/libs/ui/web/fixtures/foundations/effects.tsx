import { FixtureBody, Row, Swatch, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Effects — shadows, gradients and the overlay scrim, from their variables. */
export default function EffectsFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <Row label="shadows">
        {withPrefix(vars.base, "shadow-").map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <div style={{ width: 96, height: 64, borderRadius: "var(--radius-md, 8px)", background: "var(--background)", boxShadow: `var(--${n})`, margin: 8 }} />
          </Token>
        ))}
      </Row>
      <Row label="gradients">
        {withPrefix(vars.base, "gradient-").map((n) => <Swatch key={n} token={n} value={vars.base[n]} />)}
      </Row>
      <Row label="scrim">
        {withPrefix(vars.base, "scrim-").map((n) => <Token key={n} name={n} value={vars.base[n]} />)}
      </Row>
    </FixtureBody>
  );
}
