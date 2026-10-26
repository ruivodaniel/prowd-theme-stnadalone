import { Checkbox } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function CheckboxFixture() {
  return (
    <FixtureBody>
      <Row label='state — scale="md"'>
        <Checkbox scale="md" />
        <Checkbox scale="md" checked />
        <Checkbox scale="md" checked disabled />
        <Checkbox scale="md" disabled />
      </Row>

      <Row label="scale — all checked">
        <Checkbox scale="sm" checked />
        <Checkbox scale="md" checked />
        <Checkbox scale="lg" checked />
      </Row>
    </FixtureBody>
  );
}
