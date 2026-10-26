import { Input } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function InputFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <Input scale="sm" placeholder="Small input" />
          <Input scale="md" placeholder="Medium input" />
          <Input scale="lg" placeholder="Large input" />
        </div>
      </Row>

      <Row label="status">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <Input scale="md" placeholder="Default" />
          <Input scale="md" status="error" placeholder="Error state" />
        </div>
      </Row>

      <Row label="state">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <Input scale="md" placeholder="Default" />
          <Input scale="md" placeholder="Disabled" disabled />
        </div>
      </Row>
    </FixtureBody>
  );
}
