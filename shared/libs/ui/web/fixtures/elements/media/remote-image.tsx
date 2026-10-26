import { RemoteImage } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const SAMPLE = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" fill="#5C5FEB"/><circle cx="120" cy="30" r="18" fill="#fff" opacity=".8"/><path d="M0 100 L60 40 L100 75 L130 55 L160 100Z" fill="#0A0A18" opacity=".6"/></svg>')}`;

export default function RemoteImageFixture() {
  return (
    <FixtureBody>
      <Row label="resolved">
        <RemoteImage src={SAMPLE} alt="sample" width={160} height={100} />
      </Row>
      <Row label="fallback (no source)">
        <RemoteImage src={null} alt="none" width={160} height={100} fallback={<span element="type--body-small" emphasis="quiet">no image</span>} />
      </Row>
    </FixtureBody>
  );
}
