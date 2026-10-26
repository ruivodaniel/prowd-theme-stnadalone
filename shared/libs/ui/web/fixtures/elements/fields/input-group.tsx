import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function InputGroupFixture() {
  return (
    <FixtureBody>
      <Row label="text addon left">
        <div style={{ maxWidth: 320, width: "100%" }}>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <Input placeholder="example.com" />
          </InputGroup>
        </div>
      </Row>

      <Row label="text addon right">
        <div style={{ maxWidth: 320, width: "100%" }}>
          <InputGroup>
            <Input placeholder="yoursite" />
            <InputGroupAddon>
              <InputGroupText>.com</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Row>

      <Row label="button addon">
        <div style={{ maxWidth: 320, width: "100%" }}>
          <InputGroup>
            <Input placeholder="Search..." />
            <InputGroupAddon>
              <Button scale="sm">Go</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Row>

      <Row label="scale">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>SM</InputGroupText>
            </InputGroupAddon>
            <Input scale="sm" placeholder="Small" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>MD</InputGroupText>
            </InputGroupAddon>
            <Input scale="md" placeholder="Medium" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>LG</InputGroupText>
            </InputGroupAddon>
            <Input scale="lg" placeholder="Large" />
          </InputGroup>
        </div>
      </Row>

      <Row label="status">
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input scale="md" status="error" placeholder="Error" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input scale="md" status="warning" placeholder="Warning" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input scale="md" status="success" placeholder="Success" />
          </InputGroup>
        </div>
      </Row>
    </FixtureBody>
  );
}
