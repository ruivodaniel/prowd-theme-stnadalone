import { Chip } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ChipFixture() {
  return (
    <FixtureBody>
      <Row label='emphasis — scale="md"'>
        <Chip emphasis="primary">Primary</Chip>
        <Chip emphasis="secondary">Secondary</Chip>
        <Chip emphasis="tertiary">Tertiary</Chip>
      </Row>

      <Row label='state — emphasis="secondary"'>
        <Chip emphasis="secondary">Default</Chip>
        <Chip emphasis="secondary" {...{ state: "selected" }}>Selected</Chip>
        <Chip emphasis="secondary" disabled>Disabled</Chip>
      </Row>

      <Row label="with icon">
        <Chip emphasis="secondary" showIcon iconName="check">Active</Chip>
        <Chip emphasis="secondary" closable {...{ state: "selected" }}>Closable</Chip>
      </Row>
    </FixtureBody>
  );
}
