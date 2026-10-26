import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function CollapsibleFixture() {
  return (
    <FixtureBody>
      <Row label="basic">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button scale="sm">Toggle</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>This section is open by default. Click the button above to collapse it.</p>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button scale="sm">Toggle</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>This section is closed by default. Click the button above to expand it.</p>
          </CollapsibleContent>
        </Collapsible>
      </Row>
    </FixtureBody>
  );
}
