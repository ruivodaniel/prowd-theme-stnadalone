import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SelectFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Select key={s}>
              <SelectTrigger scale={s} className="w-full">
                <SelectValue placeholder={`${s.toUpperCase()} select`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
                <SelectItem value="b">Option B</SelectItem>
                <SelectItem value="c">Option C</SelectItem>
              </SelectContent>
            </Select>
          ))}
        </div>
      </Row>

      <Row label="status + state">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <Select>
            <SelectTrigger scale="md" className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger scale="md" status="error" className="w-full">
              <SelectValue placeholder="Error state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger scale="md" className="w-full">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Row>
    </FixtureBody>
  );
}
