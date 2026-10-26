import { FixtureBody, Row, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Transitions — durations and timing functions. Hover a box to see it move with its own value. */
export default function TransitionsFixture() {
  const vars = useThemeVars();
  const durations = withPrefix(vars.base, "transition-duration-");
  const timings = withPrefix(vars.base, "transition-timing-");
  return (
    <FixtureBody>
      <style>{`.fx-move { transition-property: transform; } .fx-move:hover { transform: translateX(48px); }`}</style>
      <Row label="durations (timing: ease)">
        {durations.map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <div className="fx-move" style={{ width: 40, height: 24, borderRadius: 4, background: "var(--color-brand-1, currentColor)", transitionDuration: `var(--${n})`, transitionTimingFunction: "ease" }} />
          </Token>
        ))}
      </Row>
      <Row label="timings (duration: slow)">
        {timings.map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <div className="fx-move" style={{ width: 40, height: 24, borderRadius: 4, background: "var(--color-brand-2, currentColor)", transitionDuration: "var(--transition-duration-slow, 350ms)", transitionTimingFunction: `var(--${n})` }} />
          </Token>
        ))}
      </Row>
    </FixtureBody>
  );
}
