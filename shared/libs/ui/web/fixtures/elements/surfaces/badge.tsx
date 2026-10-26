import { Badge } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function BadgeFixture() {
  return (
    <FixtureBody>
      <Row label='status — scale="sm"'>
        <Badge scale="sm" status="neutral">Neutral</Badge>
        <Badge scale="sm" status="info">Info</Badge>
        <Badge scale="sm" status="success">Success</Badge>
        <Badge scale="sm" status="warning">Warning</Badge>
        <Badge scale="sm" status="error">Error</Badge>
        <Badge scale="sm" status="destructive">Destructive</Badge>
      </Row>

      <Row label='scale — status="neutral"'>
        <Badge scale="xs" status="neutral">XS</Badge>
        <Badge scale="sm" status="neutral">SM</Badge>
        <Badge scale="md" status="neutral">MD</Badge>
        <Badge scale="lg" status="neutral">LG</Badge>
      </Row>
    </FixtureBody>
  );
}
