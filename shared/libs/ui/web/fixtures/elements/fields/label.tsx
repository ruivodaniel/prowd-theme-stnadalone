import { Label } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function LabelFixture() {
  return (
    <FixtureBody>
      <Row label="basic">
        <Label>First name</Label>
        <Label>Email address</Label>
      </Row>
      <Row label="with icon left">
        <Label showIcon iconName="info" iconPosition="left">Tooltip label</Label>
      </Row>
      <Row label="with icon right">
        <Label showIcon iconName="info" iconPosition="right">Help text</Label>
      </Row>
    </FixtureBody>
  );
}
