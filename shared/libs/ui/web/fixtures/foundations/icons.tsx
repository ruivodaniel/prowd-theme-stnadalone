import { Icon, iconRegistry, type IconName, type IconScale } from "@libs/web-components";
import { FixtureBody, Row, Token } from "../_chrome";
import { useThemeVars, withPrefix } from "../_theme-vars";

/** Icons — the size and weight tokens, then the whole registry at md. */
const NAMES = Object.keys(iconRegistry) as IconName[];
const SCALES: IconScale[] = ["xs", "sm", "md", "lg", "xl"];

export default function IconsFixture() {
  const vars = useThemeVars();
  return (
    <FixtureBody>
      <Row label="tokens">
        {[...withPrefix(vars.base, "icon-size"), ...withPrefix(vars.base, "icon-weight")].map((n) => <Token key={n} name={n} value={vars.base[n]} />)}
      </Row>
      <Row label="scale">
        {SCALES.map((s) => (
          <Token key={s} name={`size=${s}`}>
            <Icon name="settings" size={s} />
          </Token>
        ))}
      </Row>
      <Row label={`registry · ${NAMES.length} icons`}>
        <div className="flex flex-wrap gap-3">
          {NAMES.map((n) => (
            <div key={n} className="flex flex-col items-center gap-1" style={{ width: 84 }} title={n}>
              <Icon name={n} size="md" />
              <span style={{ fontFamily: "'SF Mono',Menlo,monospace", fontSize: 9, opacity: 0.6, textAlign: "center", wordBreak: "break-all" }}>{n}</span>
            </div>
          ))}
        </div>
      </Row>
    </FixtureBody>
  );
}
