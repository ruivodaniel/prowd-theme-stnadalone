import { RadioGroup, RadioGroupItem } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function RadioFixture() {
  return (
    <FixtureBody>
      <Row label='state — scale="md"'>
        <RadioGroup scale="md" defaultValue="b" className="flex flex-row gap-4">
          <RadioGroupItem value="a" />
          <RadioGroupItem value="b" />
          <RadioGroupItem value="c" disabled />
        </RadioGroup>
      </Row>

      <Row label="scale — all checked">
        <RadioGroup scale="sm" defaultValue="sm" className="flex flex-row gap-4">
          <RadioGroupItem value="sm" />
        </RadioGroup>
        <RadioGroup scale="md" defaultValue="md" className="flex flex-row gap-4">
          <RadioGroupItem value="md" />
        </RadioGroup>
        <RadioGroup scale="lg" defaultValue="lg" className="flex flex-row gap-4">
          <RadioGroupItem value="lg" />
        </RadioGroup>
      </Row>
    </FixtureBody>
  );
}
