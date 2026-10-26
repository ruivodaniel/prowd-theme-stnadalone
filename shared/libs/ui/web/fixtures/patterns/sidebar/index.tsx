import {
  Avatar, AvatarFallback, Icon, Tile,
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar,
  type IconName,
} from "@libs/web-components";
import { LeftSidebar, Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: sidebar — the product's shell sidebar as it is composed: a header
 * (brand line + the org switcher: the active org's avatar, name, chevron), the
 * content (a collapse toggle item, then the nav items — icon + title, one
 * selected, a count badge), and a footer (the signed-in user: avatar, name,
 * menu). Shown expanded and collapsed to the icon rail (collapsible="icon"),
 * then the settings section's own secondary sidebar — a LeftSidebar region
 * holding a menu.
 *
 * Only Sidebar parts: the item is `control--sidebar-item`, its icon and title
 * are plain content; the rail is `control-group--sidebar`. What a row, the
 * rail, the header band or the collapsed width look like is the theme's.
 */

type NavItem = { id: string; title: string; icon: IconName; selected?: boolean; count?: number };

const NAV: NavItem[] = [
  { id: "home", title: "Home", icon: "home" },
  { id: "organizations", title: "Organizations", icon: "users", selected: true, count: 2 },
  { id: "legal-documents", title: "Legal documents", icon: "fileText" },
];

const SETTINGS: NavItem[] = [
  { id: "account", title: "Account", icon: "mail", selected: true },
  { id: "profile", title: "Profile", icon: "user" },
  { id: "security", title: "Security", icon: "lock" },
  { id: "legal", title: "Legal agreements", icon: "bookOpen" },
  { id: "preferences", title: "Preferences", icon: "settings" },
];

// the collapse toggle as a menu item — its label follows the state
function ToggleItem() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <SidebarMenuItem>
      <SidebarMenuButton emphasis="primary" concept="sidebar-toggle" tooltip={collapsed ? "Expand" : "Collapse"} onClick={toggleSidebar}>
        <Icon name={collapsed ? "panelLeft" : "panelRight"} size="sm" />
        <span className="flex-1 truncate">{collapsed ? "Expand" : "Collapse"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// the platform's logo slot — the full mark when expanded, a monogram in the rail
function LogoSlot() {
  const { state } = useSidebar();
  return state === "collapsed"
    ? <Avatar scale="sm"><AvatarFallback>PL</AvatarFallback></Avatar>
    : <Tile emphasis="quiet" className="p-1"><span element="type--body-extra-small" emphasis="quiet">Platform logo</span></Tile>;
}

function ShellSidebar({ open }: { open: boolean }) {
  return (
    <SidebarProvider open={open} onOpenChange={() => {}} className="h-full">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Stack dir="col" gap={2}>
            <LogoSlot />
            <SidebarMenuButton emphasis="primary" concept="org-switcher" tooltip="System Admin">
              <Avatar scale="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
              <span element="type--body" className="flex-1 truncate">System Admin</span>
              <Icon name="chevronDown" size="sm" />
            </SidebarMenuButton>
          </Stack>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <ToggleItem />
              {NAV.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton emphasis="primary" concept="main-nav-item" tooltip={item.title} isActive={item.selected}>
                    <Icon name={item.icon} size="sm" />
                    <span className="flex-1 truncate">{item.title}</span>
                  </SidebarMenuButton>
                  {item.count && <SidebarMenuBadge>{item.count}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton emphasis="primary" tooltip="Samantha Reyes">
                <Avatar scale="sm"><AvatarFallback>SR</AvatarFallback></Avatar>
                <span className="flex-1 truncate">Samantha Reyes</span>
                <Icon name="moreVertical" size="sm" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}

export default function SidebarFixture() {
  return (
    <FixtureBody>
      <Row label="shell sidebar — expanded: header (brand · org switcher with avatar), content (toggle item · nav items, one selected, a count), footer (user)">
        <div className="h-96 flex"><ShellSidebar open /></div>
      </Row>

      <Row label="shell sidebar — collapsed to the icon rail (collapsible='icon'): the same markup, state='collapsed'; titles hide, tooltips carry them">
        <div className="h-96 flex"><ShellSidebar open={false} /></div>
      </Row>

      <Row label="settings secondary sidebar — a LeftSidebar region holding a labelled menu; one item selected">
        <SidebarProvider open onOpenChange={() => {}} className="h-96">
          <LeftSidebar className="h-96 flex flex-col">
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarMenu>
                {SETTINGS.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton isActive={item.selected} tooltip={item.title}>
                      <Icon name={item.icon} size="sm" />
                      <span className="flex-1 truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </LeftSidebar>
        </SidebarProvider>
      </Row>
    </FixtureBody>
  );
}
