import { Button, Separator, Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Tabs, TabsContent, TabsList, TabsTrigger } from "@libs/web-components";
import { ScrollArea, Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/**
 * Pattern: a panel whose header carries a tab bar; each tab scrolls on its own;
 * the footer stays. Sheet parts, Tabs parts, a ScrollArea per tab, Stacks.
 */
const TABS = [
  { value: "tab1", label: "Tab 1", body: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  ] },
  { value: "tab2", label: "Tab 2", body: [
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  ] },
  { value: "tab3", label: "Tab 3", body: [
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
  ] },
];

export default function PanelWithTabsFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Sheet>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open panel</Button>
          </SheetTrigger>
          <SheetContent>
            <Tabs defaultValue="tab1" className="flex flex-1 min-h-0 flex-col">
              <SheetHeader>
                <Stack dir="col" gap={12}>
                  <SheetTitle>Panel title</SheetTitle>
                  <TabsList>
                    {TABS.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
                  </TabsList>
                </Stack>
              </SheetHeader>
              <Separator />
              {TABS.map((t) => (
                <TabsContent key={t.value} value={t.value} className="flex-1 min-h-0">
                  <ScrollArea className="h-full">
                    <Stack dir="col" gap={16} pad={16}>
                      {t.body.map((p, i) => <p key={i} element="type--body-small" emphasis="quiet">{p}</p>)}
                    </Stack>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
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
