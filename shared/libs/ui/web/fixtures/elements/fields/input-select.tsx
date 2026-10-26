import { useState } from "react";
import { InputSelect, type InputSelectOption } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const FRUITS: InputSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig", disabled: true },
];

const RICH: InputSelectOption[] = [
  { value: "eu-west", label: "Europe West", description: "Dublin, 3 zones", icon: "network", group: "Europe" },
  { value: "eu-central", label: "Europe Central", description: "Frankfurt, 3 zones", icon: "network", group: "Europe" },
  { value: "us-east", label: "US East", description: "Virginia, 6 zones", icon: "network", group: "Americas" },
  { value: "us-west", label: "US West", description: "Oregon, 4 zones", icon: "network", group: "Americas" },
  { value: "ap-south", label: "Asia Pacific South", description: "Mumbai, 3 zones", icon: "network", group: "Asia", keywords: ["india"] },
];

const searchFruits = (q: string) =>
  new Promise<InputSelectOption[]>((resolve) =>
    setTimeout(() => resolve(FRUITS.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()))), 400),
  );

type Shared = Omit<React.ComponentProps<typeof InputSelect>, "multiple" | "value" | "onChange" | "defaultValue">;

function Single(props: Shared) {
  const [value, setValue] = useState<string | null>(null);
  return <InputSelect {...props} value={value} onChange={setValue} />;
}

function Multiple(props: Shared) {
  const [value, setValue] = useState<string[]>([]);
  return <InputSelect {...props} multiple value={value} onChange={setValue} />;
}

const col = { display: "flex", flexDirection: "column" as const, gap: 12, width: "100%", maxWidth: 360 };

export default function InputSelectFixture() {
  return (
    <FixtureBody>
      <Row label="single · no search / search in-list / search as-input">
        <div style={col}>
          <Single options={FRUITS} placeholder="Pick a fruit" />
          <Single options={FRUITS} search="in-list" placeholder="Pick a fruit" />
          <Single options={FRUITS} search="as-input" placeholder="Type a fruit" />
        </div>
      </Row>

      <Row label="multiple · no search / search in-list / search as-input">
        <div style={col}>
          <Multiple options={FRUITS} placeholder="Pick fruits" />
          <Multiple options={FRUITS} search="in-list" placeholder="Pick fruits" />
          <Multiple options={FRUITS} search="as-input" placeholder="Type fruits" />
        </div>
      </Row>

      <Row label="rich options · icon, description, groups, keywords">
        <div style={col}>
          <Single options={RICH} search="in-list" placeholder="Region" />
        </div>
      </Row>

      <Row label="async search · onSearch with delay, loading">
        <div style={col}>
          <Single onSearch={searchFruits} search="as-input" placeholder="Type to search…" />
        </div>
      </Row>

      <Row label="multiple · creatable, maxSelected 3, one value preset">
        <div style={col}>
          <InputSelect multiple options={FRUITS} search="as-input" creatable maxSelected={3} defaultValue={["apple"]} placeholder="Type or create" />
        </div>
      </Row>

      <Row label="status · error, warning, success">
        <div style={col}>
          <Single options={FRUITS} status="error" placeholder="Error" />
          <Single options={FRUITS} status="warning" placeholder="Warning" />
          <Single options={FRUITS} status="success" placeholder="Success" />
        </div>
      </Row>

      <Row label="state · disabled, not clearable">
        <div style={col}>
          <InputSelect options={FRUITS} disabled defaultValue="apple" />
          <InputSelect options={FRUITS} clearable={false} defaultValue="banana" />
        </div>
      </Row>

      <Row label="scale">
        <div style={col}>
          <Single options={FRUITS} scale="sm" placeholder="Small" />
          <Single options={FRUITS} scale="md" placeholder="Medium" />
          <Single options={FRUITS} scale="lg" placeholder="Large" />
        </div>
      </Row>
    </FixtureBody>
  );
}
