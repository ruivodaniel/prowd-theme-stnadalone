import { QrCode } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function QrCodeFixture() {
  return (
    <FixtureBody>
      <Row label="size">
        <QrCode value="https://example.com/one" size={96} />
        <QrCode value="https://example.com/two" size={144} />
        <QrCode value="https://example.com/three" size={200} />
      </Row>
    </FixtureBody>
  );
}
