import { Button, ButtonGroup } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ButtonGroupFixture() {
  return (
    <FixtureBody>
      <Row label="text group">
        <ButtonGroup>
          <Button emphasis="secondary" scale="md"><span>Left</span></Button>
          <Button emphasis="secondary" scale="md" {...{ state: "selected" }}><span>Center</span></Button>
          <Button emphasis="secondary" scale="md"><span>Right</span></Button>
        </ButtonGroup>
      </Row>

      <Row label="icon group">
        <ButtonGroup>
          <Button buttonType="icon" startIcon="menu" emphasis="secondary" scale="md" />
          <Button buttonType="icon" startIcon="layout" emphasis="secondary" scale="md" {...{ state: "selected" }} />
        </ButtonGroup>
      </Row>
    </FixtureBody>
  );
}
