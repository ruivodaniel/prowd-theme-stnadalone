import {
  Avatar, AvatarFallback, Badge, Button, Icon, Tile,
  Tabs, TabsList, TabsTrigger, type IconName,
} from "@libs/web-components";
import { ShellNav, Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: top nav — the shell's other variant (shell-top-nav): the same
 * entries and options as the sidebar, composed as a bar. Left: the brand line
 * and the org switcher (the active org's avatar, name, chevron). Middle: the nav
 * items as a tab bar — control-group--tab-bar / control--tab-trigger, the
 * canonical horizontal set with one selected — the same icon + title, the same
 * count. Right: the user menu (avatar, name, chevron).
 *
 * Same logic as the sidebar: entries are gated by the active membership's
 * roles — the second row is what a company member sees (no Legal documents).
 * The third is the bar at a narrow width: items fold into a menu button, the
 * top-bar analogue of the sidebar's icon rail. The band is the ShellNav
 * region; how it looks is the theme's (layouts.shellNav).
 */

type NavItem = { id: string; title: string; icon: IconName; count?: number; requiredRoles?: string[] };

const NAV: NavItem[] = [
  { id: "home", title: "Home", icon: "home" },
  { id: "organizations", title: "Organizations", icon: "users", count: 2 },
  { id: "legal-documents", title: "Legal documents", icon: "fileText", requiredRoles: ["manage_legal_docs"] },
];

// the app's rule: no requiredRoles → everyone; otherwise any of them (effective roles, inheritance included)
const visibleTo = (roles: string[]) => (e: NavItem) => !e.requiredRoles?.length || e.requiredRoles.some((r) => roles.includes(r));

type Viewer = { org: string; orgInitials: string; user: string; userInitials: string; roles: string[] };
const PLATFORM_OWNER: Viewer = { org: "Platform", orgInitials: "PL", user: "Samantha Reyes", userInitials: "SR", roles: ["platform_owner", "manage_platform", "manage_legal_docs"] };
const COMPANY_MEMBER: Viewer = { org: "Borealis", orgInitials: "BO", user: "Daniel Ruivo", userInitials: "DR", roles: ["company_standard"] };

function OrgSwitcher({ v }: { v: Viewer }) {
  return (
    <Button emphasis="quiet" endIcon="chevronDown" aria-label={`Active organization: ${v.org}`}>
      <Stack dir="row" align="center" gap={6}>
        <Avatar scale="xs"><AvatarFallback>{v.orgInitials}</AvatarFallback></Avatar>
        <span element="type--body">{v.org}</span>
      </Stack>
    </Button>
  );
}

function UserMenu({ v }: { v: Viewer }) {
  return (
    <Button emphasis="quiet" endIcon="chevronDown" aria-label={`Account menu: ${v.user}`}>
      <Stack dir="row" align="center" gap={6}>
        <Avatar scale="xs"><AvatarFallback>{v.userInitials}</AvatarFallback></Avatar>
        <span element="type--body">{v.user}</span>
      </Stack>
    </Button>
  );
}

function TopNav({ v, selected = "organizations" }: { v: Viewer; selected?: string }) {
  return (
    <ShellNav className="w-full">
      <Stack dir="row" align="center" justify="between" gap={16} pad={8}>
        <Stack dir="row" align="center" gap={12}>
          <Tile emphasis="quiet" className="p-1"><span element="type--body-extra-small" emphasis="quiet">Platform logo</span></Tile>
          <OrgSwitcher v={v} />
        </Stack>
        <Tabs defaultValue={selected}>
          <TabsList>
            {NAV.filter(visibleTo(v.roles)).map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                <Icon name={item.icon} size="sm" />
                <span>{item.title}</span>
                {item.count && <Badge scale="xs" status="info">{item.count}</Badge>}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <UserMenu v={v} />
      </Stack>
    </ShellNav>
  );
}

// narrow: the items fold into a menu button; brand and the user stay
function CompactTopNav({ v }: { v: Viewer }) {
  return (
    <ShellNav className="w-80">
      <Stack dir="row" align="center" justify="between" gap={8} pad={8}>
        <Stack dir="row" align="center" gap={8}>
          <Button buttonType="icon" startIcon="menu" emphasis="quiet" aria-label="Open navigation" />
          <Tile emphasis="quiet" className="p-1"><span element="type--body-extra-small" emphasis="quiet">Platform logo</span></Tile>
        </Stack>
        <Button emphasis="quiet" buttonType="icon" startIcon="user" aria-label={`Account menu: ${v.user}`} />
      </Stack>
    </ShellNav>
  );
}

export default function TopNavFixture() {
  return (
    <FixtureBody>
      <Row label="top nav — brand · org switcher | nav items as a tab bar, one selected, a count | user menu (a platform owner: every entry)">
        <TopNav v={PLATFORM_OWNER} />
      </Row>
      <Row label="the same bar as a company member sees it — Legal documents gated away by requiredRoles">
        <TopNav v={COMPANY_MEMBER} selected="home" />
      </Row>
      <Row label="compact — at a narrow width the items fold into a menu button; brand and user stay">
        <CompactTopNav v={PLATFORM_OWNER} />
      </Row>
    </FixtureBody>
  );
}
