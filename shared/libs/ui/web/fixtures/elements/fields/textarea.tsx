import { Textarea } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function TextareaFixture() {
  return (
    <FixtureBody>
      <Row label="status + state">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <Textarea scale="md" placeholder="Default" rows={3} />
          <Textarea scale="md" status="error" placeholder="Error state" rows={3} />
          <Textarea scale="md" placeholder="Disabled" rows={3} disabled />
        </div>
      </Row>
    </FixtureBody>
  );
}
