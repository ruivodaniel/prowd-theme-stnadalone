import { Button, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@libs/web-components";
import { ScrollArea, Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/**
 * Pattern: a panel with a fixed header, a scrolling body and a fixed footer.
 * The recipe is this file: Sheet parts for the surfaces, a ScrollArea for the
 * one thing that scrolls, a Stack for each row. Nothing is styled here.
 */
const BODY = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
];

export default function PanelHeaderFooterFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Sheet>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open panel</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Panel title</SheetTitle>
              <SheetDescription>Optional description text goes here.</SheetDescription>
            </SheetHeader>
            <Separator />
            <ScrollArea>
              <Stack dir="col" gap={16} pad={16}>
                {BODY.map((t, i) => (
                  <p key={i} element="type--body-small" emphasis="quiet">{t}</p>
                ))}
              </Stack>
            </ScrollArea>
            <Separator />
            <SheetFooter>
              <Stack dir="row" justify="between" align="center">
                <SheetClose asChild>
                  <Button emphasis="secondary">Cancel</Button>
                </SheetClose>
                <Button emphasis="primary">Save</Button>
              </Stack>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </FixtureContainer>
    </FixtureBody>
  );
}
