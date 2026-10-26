import { Icon, Input, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, Tabs, TabsContent, TabsList, TabsTrigger, type IconName } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/**
 * Pattern: a sidebar whose header carries a tab bar — browse, search, recent.
 * Sidebar parts, Tabs parts, a Stack in the header. SidebarContent is the
 * library's own scrolling surface, so nothing else scrolls. A placeholder
 * until the real product sidebar is copied in (see the status note).
 */
const NAV: { label: string; items: [IconName, string][] }[] = [
  { label: "Navigation", items: [["home", "Dashboard"], ["layers", "Projects"], ["users", "Team"]] },
  { label: "Settings", items: [["user", "Profile"], ["bell", "Notifications"], ["lock", "Security"]] },
  { label: "Resources", items: [["file", "Documentation"], ["info", "Help center"], ["message", "Feedback"]] },
];
const RECENT = ["Recent item 1", "Recent item 2", "Recent item 3"];

export default function SidebarWithTabsFixture() {
  return (
    <FixtureBody>
      <FixtureContainer width={280}>
        <SidebarProvider>
          <Sidebar collapsible="none" className="h-[520px] w-full">
            <Tabs defaultValue="browse" className="flex flex-1 min-h-0 flex-col">
              <SidebarHeader>
                <Stack dir="col" gap={12}>
                  <span element="type--body">Sidebar</span>
                  <TabsList>
                    <TabsTrigger value="browse">Browse</TabsTrigger>
                    <TabsTrigger value="search">Search</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                </Stack>
              </SidebarHeader>
              <TabsContent value="browse" className="flex-1 min-h-0">
                <SidebarContent className="h-full">
                  {NAV.map((g) => (
                    <SidebarGroup key={g.label}>
                      <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {g.items.map(([icon, label]) => (
                            <SidebarMenuItem key={label}>
                              <SidebarMenuButton><Icon name={icon} size="sm" />{label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ))}
                </SidebarContent>
              </TabsContent>
              <TabsContent value="search" className="flex-1 min-h-0">
                <Stack dir="col" gap={12} pad={12}>
                  <Input placeholder="Search…" />
                  <span element="type--body-small" emphasis="quiet">Type to search…</span>
                </Stack>
              </TabsContent>
              <TabsContent value="recent" className="flex-1 min-h-0">
                <SidebarContent className="h-full">
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {RECENT.map((r) => (
                          <SidebarMenuItem key={r}>
                            <SidebarMenuButton><Icon name="clock" size="sm" />{r}</SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </TabsContent>
            </Tabs>
          </Sidebar>
        </SidebarProvider>
      </FixtureContainer>
    </FixtureBody>
  );
}
