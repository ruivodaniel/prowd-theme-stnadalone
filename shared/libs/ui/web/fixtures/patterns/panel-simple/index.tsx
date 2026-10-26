import { Button, Sheet, SheetContent, SheetTrigger } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: the simplest panel — a trigger, a Sheet, one block of text. */
export default function PanelSimpleFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Sheet>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open panel</Button>
          </SheetTrigger>
          <SheetContent>
            <Stack dir="col" gap={16} pad={16}>
              <p element="type--body-small" emphasis="quiet">Panel content goes here…</p>
            </Stack>
          </SheetContent>
        </Sheet>
      </FixtureContainer>
    </FixtureBody>
  );
}
