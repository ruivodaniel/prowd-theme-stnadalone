import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

function MultiSelectControlled(props: Omit<React.ComponentProps<typeof MultiSelect>, "value" | "onChange">) {
  const [value, setValue] = useState<MultiSelectOption[]>([]);
  return <MultiSelect {...props} value={value} onChange={setValue} />;
}

export default function MultiSelectFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <MultiSelectControlled options={options} scale="sm" placeholder="Small" />
        <MultiSelectControlled options={options} scale="md" placeholder="Medium" />
        <MultiSelectControlled options={options} scale="lg" placeholder="Large" />
      </Row>

      <Row label="status">
        <MultiSelectControlled options={options} scale="md" status="error" placeholder="Error" />
        <MultiSelectControlled options={options} scale="md" status="warning" placeholder="Warning" />
        <MultiSelectControlled options={options} scale="md" status="success" placeholder="Success" />
      </Row>

      <Row label="disabled">
        <MultiSelectControlled options={options} scale="md" placeholder="Disabled" disabled />
      </Row>
    </FixtureBody>
  );
}
