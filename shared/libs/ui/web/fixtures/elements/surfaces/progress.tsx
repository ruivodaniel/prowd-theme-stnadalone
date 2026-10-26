import { Progress } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ProgressFixture() {
  return (
    <FixtureBody>
      <Row label="emphasis">
        <Progress value={65} emphasis="hero" style={{ width: 160 }} />
        <Progress value={65} emphasis="primary" style={{ width: 160 }} />
        <Progress value={65} emphasis="secondary" style={{ width: 160 }} />
        <Progress value={65} emphasis="tertiary" style={{ width: 160 }} />
        <Progress value={65} emphasis="quiet" style={{ width: 160 }} />
      </Row>
      <Row label="status">
        <Progress value={75} status="neutral" style={{ width: 160 }} />
        <Progress value={75} status="success" style={{ width: 160 }} />
        <Progress value={75} status="warning" style={{ width: 160 }} />
        <Progress value={75} status="error" style={{ width: 160 }} />
      </Row>
      <Row label="scale">
        <Progress value={50} scale="xs" style={{ width: 160 }} />
        <Progress value={50} scale="sm" style={{ width: 160 }} />
        <Progress value={50} scale="md" style={{ width: 160 }} />
        <Progress value={50} scale="lg" style={{ width: 160 }} />
        <Progress value={50} scale="xl" style={{ width: 160 }} />
      </Row>
      <Row label="indeterminate">
        <Progress style={{ width: 160 }} />
      </Row>
    </FixtureBody>
  );
}
