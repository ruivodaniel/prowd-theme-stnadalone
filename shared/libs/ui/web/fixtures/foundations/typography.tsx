import { FixtureBody, Row, Token } from "../_chrome";
import { matching, useThemeVars } from "../_theme-vars";

/**
 * Typography — the type scales and the font families. Scales are found in
 * the generated css (`typography-<scale>-font-size`), rendered through the
 * `element="type--…"` identity the engine styles, and captioned with their
 * variables. Fonts render a specimen in each declared family.
 */
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const SAMPLE: Record<string, string> = { numbers: "1234567890 · 42.5%", code: 'const answer = compute(42, "units");', quote: "Calm clarity over loud certainty.", link: "A link to somewhere" };
const sample = (scale: string) => SAMPLE[Object.keys(SAMPLE).find((k) => scale.toLowerCase().startsWith(k)) ?? ""] ?? "The quick brown fox jumps over the lazy dog";

export default function TypographyFixture() {
  const vars = useThemeVars();
  const scales = matching(vars.base, /^typography-[a-zA-Z0-9]+-font-size$/).map((n) => n.replace(/^typography-/, "").replace(/-font-size$/, ""));
  const fonts = matching(vars.base, /^typography-font-family-/);
  return (
    <FixtureBody>
      <Row label="fonts">
        {fonts.map((n) => (
          <Token key={n} name={n} value={vars.base[n]}>
            <span style={{ fontFamily: `var(--${n})`, fontSize: 22, lineHeight: 1.2 }}>Aa Bb Cc 123</span>
          </Token>
        ))}
      </Row>
      <Row label="scales">
        <div className="flex flex-col gap-4 w-full">
          {scales.map((s) => {
            const v = (p: string) => vars.base[`typography-${s}-${p}`] ?? "";
            const el = s === "link" ? "a" : "p";
            return (
              <div key={s} className="flex flex-col gap-1">
                {el === "a" ? <a href="#" element={`type--${kebab(s)}`} onClick={(e) => e.preventDefault()}>{sample(s)}</a> : <p element={`type--${kebab(s)}`}>{sample(s)}</p>}
                <span style={{ fontFamily: "'SF Mono',Menlo,monospace", fontSize: 9, opacity: 0.5 }}>
                  type--{kebab(s)} · {v("font-size")} · {v("font-weight")} · lh {v("line-height")} · {v("font-family").replace(/^var\(--typography-font-family-|\)$/g, "")}
                </span>
              </div>
            );
          })}
        </div>
      </Row>
      <Row label="emphasis">
        <div className="flex flex-col gap-2 w-full">
          <p element="type--body">Default — the quick brown fox jumps over the lazy dog</p>
          <p element="type--body" emphasis="quiet">Quiet — the quick brown fox jumps over the lazy dog</p>
        </div>
      </Row>
    </FixtureBody>
  );
}
