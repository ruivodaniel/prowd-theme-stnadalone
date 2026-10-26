import { Switch } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SwitchFixture() {
  return (
    <FixtureBody>
      <Row label='state — scale="md"'>
        <Switch scale="md" />
        <Switch scale="md" checked />
        <Switch scale="md" disabled />
      </Row>

      <Row label="scale — all checked">
        <Switch scale="sm" checked />
        <Switch scale="md" checked />
        <Switch scale="lg" checked />
      </Row>
    </FixtureBody>
  );
}
