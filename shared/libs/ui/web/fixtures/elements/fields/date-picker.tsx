import { useState } from "react";
import { DatePicker, type DateRange } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

function SinglePicker(props: Omit<React.ComponentProps<typeof DatePicker>, "mode" | "value" | "defaultValue" | "onChange">) {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker {...props} mode="single" value={value} onChange={setValue} />;
}

function RangePicker(props: Omit<React.ComponentProps<typeof DatePicker>, "mode" | "value" | "defaultValue" | "onChange">) {
  const [value, setValue] = useState<DateRange | null>(null);
  return <DatePicker {...props} mode="range" value={value} onChange={setValue} />;
}

export default function DatePickerFixture() {
  return (
    <FixtureBody>
      <Row label="single">
        <SinglePicker scale="sm" placeholder="Small" />
        <SinglePicker scale="md" placeholder="Medium" />
        <SinglePicker scale="lg" placeholder="Large" />
      </Row>

      <Row label="range">
        <RangePicker scale="md" placeholder="Select range" />
      </Row>

      <Row label="status">
        <SinglePicker scale="md" status="error" placeholder="Error" />
        <SinglePicker scale="md" status="warning" placeholder="Warning" />
        <SinglePicker scale="md" status="success" placeholder="Success" />
      </Row>
    </FixtureBody>
  );
}
