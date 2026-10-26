import { Toggle, ToggleGroup, ToggleGroupItem } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ToggleFixture() {
  return (
    <FixtureBody>
      <Row label="emphasis">
        <Toggle defaultPressed emphasis="hero">Hero</Toggle>
        <Toggle defaultPressed emphasis="primary">Primary</Toggle>
        <Toggle defaultPressed emphasis="secondary">Secondary</Toggle>
        <Toggle defaultPressed emphasis="tertiary">Tertiary</Toggle>
        <Toggle defaultPressed emphasis="quiet">Quiet</Toggle>
      </Row>
      <Row label="status">
        <Toggle defaultPressed status="neutral">Neutral</Toggle>
        <Toggle defaultPressed status="success">Success</Toggle>
        <Toggle defaultPressed status="warning">Warning</Toggle>
        <Toggle defaultPressed status="error">Error</Toggle>
      </Row>
      <Row label="scale">
        <Toggle defaultPressed scale="xs">XS</Toggle>
        <Toggle defaultPressed scale="sm">SM</Toggle>
        <Toggle defaultPressed scale="md">MD</Toggle>
        <Toggle defaultPressed scale="lg">LG</Toggle>
        <Toggle defaultPressed scale="xl">XL</Toggle>
      </Row>
      <Row label="group">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </Row>
    </FixtureBody>
  );
}
