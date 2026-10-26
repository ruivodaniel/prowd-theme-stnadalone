import { Icon, type IconScale } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const SCALES: IconScale[] = ["xs", "sm", "md", "lg", "xl"];

export default function IconFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        {SCALES.map((s) => <Icon key={s} name="settings" size={s} />)}
      </Row>
      <Row label="a few names">
        {(["home", "search", "user", "bell", "check", "warning", "error", "info", "trash", "edit"] as const).map((n) => <Icon key={n} name={n} size="md" />)}
      </Row>
    </FixtureBody>
  );
}
