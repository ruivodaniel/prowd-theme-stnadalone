import { FixtureBody, Row, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Spacing — every `spacing-*` variable as a bar of its own length. */
export default function SpacingFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <Row label="spacing">
        <div className="flex flex-col gap-3 w-full">
          {withPrefix(vars.base, "spacing-").map((n) => (
            <div key={n} className="flex items-center gap-4">
              <div style={{ width: `var(--${n})`, height: 14, background: "var(--color-brand-1, currentColor)", borderRadius: 2, minWidth: 1 }} />
              <Token name={n} value={vars.base[n]} />
            </div>
          ))}
        </div>
      </Row>
    </FixtureBody>
  );
}
