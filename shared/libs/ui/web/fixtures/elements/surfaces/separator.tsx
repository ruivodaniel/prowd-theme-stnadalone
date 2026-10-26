import { Separator } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SeparatorFixture() {
  return (
    <FixtureBody>
      <Row label="horizontal">
        <div className="w-full">
          <Separator orientation="horizontal" />
        </div>
      </Row>

      <Row label="vertical">
        <div className="flex items-center gap-3 h-8">
          <span element="type--body-small">Left</span>
          <Separator orientation="vertical" />
          <span element="type--body-small">Right</span>
        </div>
      </Row>
    </FixtureBody>
  );
}
