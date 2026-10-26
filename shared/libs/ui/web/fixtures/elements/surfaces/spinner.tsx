import { Spinner } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SpinnerFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <Spinner scale="xs" />
        <Spinner scale="sm" />
        <Spinner scale="md" />
        <Spinner scale="lg" />
      </Row>
    </FixtureBody>
  );
}
