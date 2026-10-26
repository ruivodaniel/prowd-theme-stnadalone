import { Button, Card, CardContent, CardFooter, CardHeader } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: a titled card — a header row with an action, content, a footer. Card parts and a Stack. */
export default function CompactCardFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Card>
          <CardHeader>
            <Stack dir="row" justify="between" align="center">
              <p element="type--body">Compact card</p>
              <Button emphasis="tertiary">Action</Button>
            </Stack>
          </CardHeader>
          <CardContent>
            <p element="type--body-small" emphasis="quiet">A titled card: header with an action, content, and a footer.</p>
          </CardContent>
          <CardFooter>
            <Button emphasis="primary">Save</Button>
          </CardFooter>
        </Card>
      </FixtureContainer>
    </FixtureBody>
  );
}
