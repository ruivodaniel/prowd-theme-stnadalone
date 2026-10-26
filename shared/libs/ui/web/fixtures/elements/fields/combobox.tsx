import { useState } from "react";
import { Combobox } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

function ComboboxControlled(props: Omit<React.ComponentProps<typeof Combobox>, "value" | "onChange">) {
  const [value, setValue] = useState<string | null>(null);
  return <Combobox {...props} value={value} onChange={setValue} />;
}

export default function ComboboxFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <ComboboxControlled options={options} scale="sm" placeholder="Small" />
        <ComboboxControlled options={options} scale="md" placeholder="Medium" />
        <ComboboxControlled options={options} scale="lg" placeholder="Large" />
      </Row>

      <Row label="status">
        <ComboboxControlled options={options} scale="md" status="error" placeholder="Error" />
        <ComboboxControlled options={options} scale="md" status="warning" placeholder="Warning" />
        <ComboboxControlled options={options} scale="md" status="success" placeholder="Success" />
      </Row>

      <Row label="disabled">
        <ComboboxControlled options={options} scale="md" placeholder="Disabled" disabled />
      </Row>
    </FixtureBody>
  );
}
