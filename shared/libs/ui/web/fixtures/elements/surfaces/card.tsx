import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function CardFixture() {
  return (
    <FixtureBody>
      <Row label="default — header / content / footer">
        <Card style={{ maxWidth: 400 }}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>A short description of this card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p element="type--body-small">Card body content goes here.</p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button emphasis="secondary" scale="sm">Cancel</Button>
            <Button emphasis="primary" scale="sm">Save</Button>
          </CardFooter>
        </Card>
      </Row>

      <Row label="with action in header">
        <Card style={{ maxWidth: 400 }}>
          <CardHeader>
            <CardTitle>Organization Status</CardTitle>
            <CardAction>
              <Badge status="success" scale="xs">Active</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p element="type--body-small">Platform Admin · 24 members</p>
          </CardContent>
        </Card>
      </Row>
    </FixtureBody>
  );
}
