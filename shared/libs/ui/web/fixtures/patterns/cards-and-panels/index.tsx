import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  Input,
  Separator,
  Tile,
  type ChipStatus,
  type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: cards and panels — the 5afa292e / 6909e7d2 (agent memory), 2e48c1f3
 * (agent routing), 10856e86 (profile), ae7b6bf7 (repo), d8e486c0 (task) and
 * aa779bbe (automation) uploads, from canonical components only.
 *
 * Layout is <Stack>. Content is Card parts · Tile · Avatar · Badge · Chip ·
 * Button · Input · Separator · Accordion parts · Icon and type--* elements
 * coloured through the emphasis/status axes. No inline styles: every frame,
 * fill, seam and radius is the theme's decision, on this exact markup.
 *
 * Gaps surfaced: no inline text highlight (a Badge per matched term), no
 * images or brand logos (Avatar fallbacks), no avatar-stack (a row of Avatars),
 * no loading state on Chip (the loading icon), no bolt / flag / brand icons
 * (the nearest registry glyph). Each is marked at its Row.
 */

// ── shared bits ─────────────────────────────────────────────────────────────

// a small caption over a block — INPUT, PATTERN, TARGET AGENT
const Caption = ({ children }: { children: ReactNode }) => (
  <span element="type--body-extra-small" emphasis="quiet">{children}</span>
);

// quiet icon + text, the unit of every meta row here; the icon inherits the span's colour
function Meta({ icon, large, children }: { icon: IconName; large?: boolean; children: ReactNode }) {
  return (
    <span element={large ? "type--body" : "type--body-small"} emphasis="quiet" className="inline-flex items-center gap-2">
      <Icon name={icon} size="sm" />
      {children}
    </span>
  );
}

// a framed icon — the uploads' square icon tiles; Avatar is the canonical frame
function IconFrame({ icon }: { icon: IconName }) {
  return (
    <Avatar scale="md">
      <AvatarFallback><Icon name={icon} size="sm" /></AvatarFallback>
    </Avatar>
  );
}

// ── agent memory ────────────────────────────────────────────────────────────

type Memory = { text: string; kind: string; icon: IconName; status: ChipStatus; time: string };
type MemorySection = { value: string; icon: IconName; title: string; subtitle: string; items: Memory[] };

const MEMORY: MemorySection[] = [
  {
    value: "working",
    icon: "database",
    title: "Working Memory",
    subtitle: "Active context for current conversation",
    items: [
      { text: "User prefers TypeScript over JavaScript", kind: "Conversation", icon: "message", status: "success", time: "11:06 PM" },
      { text: "Current project uses Next.js 15 with App Router", kind: "System", icon: "settings", status: "info", time: "11:03 PM" },
    ],
  },
  {
    value: "history",
    icon: "history",
    title: "Conversation History",
    subtitle: "Past interactions and context",
    items: [
      { text: "User is a senior developer at Clerk", kind: "Profile", icon: "user", status: "neutral", time: "Yesterday" },
      { text: "Asked how to protect API routes with middleware", kind: "Conversation", icon: "message", status: "success", time: "Yesterday" },
      { text: "Prefers short answers with a code sample", kind: "Conversation", icon: "message", status: "success", time: "Mon" },
    ],
  },
];

const MEMORY_COUNT = MEMORY.reduce((n, s) => n + s.items.length, 0);

// one memory in one tile — the text over a row of kind Chip + time
function MemoryTile({ m }: { m: Memory }) {
  return (
    <Tile>
      <Stack dir="col" gap={10}>
        <span element="type--body">{m.text}</span>
        <Stack dir="row" align="center" gap={12}>
          <Chip emphasis="secondary" status={m.status} scale="sm" closable={false} showIcon iconName={m.icon}>{m.kind}</Chip>
          <Meta icon="clock">{m.time}</Meta>
        </Stack>
      </Stack>
    </Tile>
  );
}

// ── agent routing ───────────────────────────────────────────────────────────

type Word = { t: string; hit?: boolean };

const ROUTED = {
  input: [
    { t: "Help me" },
    { t: "write", hit: true },
    { t: "a" },
    { t: "React", hit: true },
    { t: "component for user" },
    { t: "authentication", hit: true },
  ] as Word[],
  pattern: "write|React|authentication",
  agent: "Code Agent",
  confidence: "92%",
};

const PENDING = { input: "What is the weather like today?" };

// ── profile · repo · task · automation ──────────────────────────────────────

type MetaItem = { icon: IconName; text: string };

const PROFILE = {
  name: "shadcn",
  handle: "@shadcn",
  initials: "SC",
  bio: "Building @vercel. Creator of shadcn/ui.",
  meta: [
    { icon: "building", text: "@vercel" },
    { icon: "mapPin", text: "New York" },
    { icon: "link", text: "shadcn.com" },
    { icon: "share", text: "@shadcn" },
  ] as MetaItem[],
  stats: [
    { n: "45", label: "repos" },
    { n: "12.5K", label: "followers" },
    { n: "89", label: "following" },
  ],
};

const REPO = {
  name: "shadcn-ui/ui",
  description: "Beautifully designed components that you can copy and paste into your apps.",
  meta: [
    { icon: "dot", text: "TypeScript" },
    { icon: "star", text: "104.7K" },
    { icon: "gitBranch", text: "6.2K" },
  ] as MetaItem[],
};

type Tag = { label: string; icon: IconName; status: ChipStatus };

const TASK = {
  title: "Review pull requests",
  description: "Check and review the pending pull requests on GitHub",
  tags: [
    { label: "58 days ago", icon: "calendar", status: "error" },
    { label: "GAIA UI", icon: "folder", status: "neutral" },
    { label: "Development", icon: "tag", status: "info" },
    { label: "Urgent", icon: "tag", status: "neutral" },
    { label: "High", icon: "arrowUp", status: "error" },
  ] as Tag[],
  subtasks: "1/2 subtasks",
};

const AUTOMATION = {
  apps: ["layers", "fileText", "hash"] as IconName[],
  title: "Daily Engineering Report",
  description: "Automated summary of high-priority Linear issues posted to Notion and Slack.",
  schedule: "9:00 AM Daily",
  runs: "1.2K runs",
};

export default function CardsAndPanelsFixture() {
  return (
    <FixtureBody>
      <Row label="#6 · #11 · agent memory — a Card: header, a search Input, an Accordion of two sections of memory Tiles; the first open, the second collapsed">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <Stack dir="row" align="center" gap={14}>
              <IconFrame icon="database" />
              <Stack dir="col" gap={2}>
                <span element="type--heading4">Agent Memory</span>
                <span element="type--body-small" emphasis="quiet">{MEMORY_COUNT} items</span>
              </Stack>
            </Stack>
          </CardHeader>
          <CardContent>
            <Stack dir="col" gap={16}>
              <Input type="search" placeholder="Search memories…" startIcon={<Icon name="search" size="sm" />} />

              <Accordion type="multiple" defaultValue={["working"]}>
                {MEMORY.map((s) => (
                  <AccordionItem key={s.value} value={s.value}>
                    <AccordionTrigger>
                      <Stack dir="row" align="center" gap={14}>
                        <IconFrame icon={s.icon} />
                        <Stack dir="col" gap={2} align="start">
                          <Stack dir="row" align="center" gap={8}>
                            <span element="type--heading4">{s.title}</span>
                            <Badge emphasis="secondary" status="neutral">{s.items.length}</Badge>
                          </Stack>
                          <span element="type--body-small" emphasis="quiet">{s.subtitle}</span>
                        </Stack>
                      </Stack>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Stack dir="col" gap={12}>
                        {s.items.map((m) => <MemoryTile key={m.text} m={m} />)}
                        {/* GAP: the upload's dashed "add" zone has no component — a tertiary, full-width Button stands in */}
                        <Button emphasis="tertiary" fill buttonType="icon-text" startIcon="add">Add memory</Button>
                      </Stack>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Stack>
          </CardContent>
        </Card>
      </Row>

      <Row label="#12 · agent routing — two Cards: INPUT in a quiet Tile, then PATTERN → TARGET AGENT as Chips; the second card is still routing">
        <Stack dir="col" gap={16} className="w-full max-w-3xl">
          <Card>
            <CardHeader>
              <Stack dir="row" align="center" gap={14}>
                <IconFrame icon="gitBranch" />
                <span element="type--heading4">Agent Routing</span>
              </Stack>
            </CardHeader>
            <CardContent>
              <Stack dir="col" gap={16}>
                <Stack dir="col" gap={8}>
                  <Caption>INPUT</Caption>
                  {/* GAP: no inline text highlight — a Badge stands in for each matched term */}
                  <Tile emphasis="quiet">
                    <Stack dir="row" align="center" gap={6} wrap>
                      {ROUTED.input.map((w) =>
                        w.hit
                          ? <Badge key={w.t} emphasis="secondary" status="info">{w.t}</Badge>
                          : <span key={w.t} element="type--body">{w.t}</span>,
                      )}
                    </Stack>
                  </Tile>
                </Stack>

                <Stack dir="row" align="end" gap={24}>
                  <Stack dir="col" gap={8}>
                    <Caption>PATTERN</Caption>
                    {/* GAP: no bolt icon — "activity" stands in for the trigger glyph */}
                    <Chip emphasis="secondary" status="warning" closable={false} showIcon iconName="activity">
                      <span element="type--code">{ROUTED.pattern}</span>
                    </Chip>
                  </Stack>
                  <Stack dir="row" justify="center" className="w-24">
                    <span element="type--body" emphasis="quiet"><Icon name="arrowRight" size="md" /></span>
                  </Stack>
                  <Stack dir="col" gap={8}>
                    <Caption>TARGET AGENT</Caption>
                    <Chip emphasis="secondary" status="success" closable={false} showIcon iconName="bot">
                      {ROUTED.agent}
                      <Badge scale="xs" status="success">{ROUTED.confidence}</Badge>
                    </Chip>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* the card that is still routing carries status="info"; its badge and arrow follow */}
          <Card status="info">
            <CardHeader>
              <Stack dir="row" align="center" gap={14}>
                {/* GAP: no sparkles icon — "star" stands in */}
                <IconFrame icon="star" />
                <span element="type--heading4">Agent Routing</span>
                <Badge emphasis="secondary" status="info">Routing…</Badge>
              </Stack>
            </CardHeader>
            <CardContent>
              <Stack dir="col" gap={16}>
                <Stack dir="col" gap={8}>
                  <Caption>INPUT</Caption>
                  <Tile emphasis="quiet">
                    <span element="type--body">{PENDING.input}</span>
                  </Tile>
                </Stack>

                <Stack dir="row" align="end" gap={24}>
                  <Stack dir="row" justify="center" className="w-24">
                    <span element="type--body" status="info"><Icon name="arrowRight" size="md" /></span>
                  </Stack>
                  <Stack dir="col" gap={8}>
                    <Caption>TARGET AGENT</Caption>
                    {/* GAP: Chip has no loading state — the loading icon stands in for a spinner */}
                    <Chip emphasis="tertiary" closable={false} showIcon iconName="loading">Determining…</Chip>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Row>

      <Row label="#15 · profile card — Avatar beside name + handle, a bio, a meta row of icon + text, a Separator, a stats row of numbers">
        <Card className="w-full max-w-xl">
          <Stack dir="col" gap={20} pad={24}>
            <Stack dir="row" align="center" gap={20}>
              {/* GAP: no images — the upload's photo becomes an Avatar fallback */}
              <Avatar scale="xl"><AvatarFallback>{PROFILE.initials}</AvatarFallback></Avatar>
              <Stack dir="col" gap={4}>
                <span element="type--heading3">{PROFILE.name}</span>
                <span element="type--body" emphasis="quiet">{PROFILE.handle}</span>
              </Stack>
            </Stack>

            <span element="type--body" emphasis="quiet">{PROFILE.bio}</span>

            {/* GAP: no twitter/x brand icon — "share" stands in */}
            <Stack dir="row" align="center" gap={20} wrap>
              {PROFILE.meta.map((m) => <Meta key={m.text} icon={m.icon} large>{m.text}</Meta>)}
            </Stack>

            <Separator />

            <Stack dir="row" align="baseline" gap={24}>
              {PROFILE.stats.map((s) => (
                <Stack key={s.label} dir="row" align="baseline" gap={6}>
                  <span element="type--numbers">{s.n}</span>
                  <span element="type--body" emphasis="quiet">{s.label}</span>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Row>

      <Row label="#16 · repo card — icon + title, a description, a meta row of icon + text">
        <Card className="w-full max-w-2xl">
          <Stack dir="col" gap={12} pad={24}>
            <span element="type--heading4" className="inline-flex items-center gap-2">
              <Icon name="book" size="md" />
              {REPO.name}
            </span>
            <span element="type--body" emphasis="quiet">{REPO.description}</span>
            <Stack dir="row" align="center" gap={20} wrap>
              {REPO.meta.map((m) => <Meta key={m.text} icon={m.icon}>{m.text}</Meta>)}
            </Stack>
          </Stack>
        </Card>
      </Row>

      <Row label="#27 · task card — a status glyph beside title + description, a cluster of tag Chips, a subtasks Chip">
        <Card className="w-full max-w-3xl">
          <Stack dir="row" align="start" gap={16} pad={20}>
            {/* GAP: no task-status glyph — an Icon circle inside an error-status span stands in for the dashed ring */}
            <span element="type--heading4" status="error"><Icon name="circle" size="md" /></span>
            <Stack dir="col" gap={10} size="fill">
              <span element="type--heading4">{TASK.title}</span>
              <span element="type--body" emphasis="quiet">{TASK.description}</span>
              {/* GAP: no flag icon — "arrowUp" stands in for the priority flag */}
              <Stack dir="row" align="center" gap={8} wrap>
                {TASK.tags.map((t) => (
                  <Chip key={t.label} emphasis="secondary" status={t.status} scale="sm" closable={false} showIcon iconName={t.icon}>{t.label}</Chip>
                ))}
              </Stack>
              <Stack dir="row">
                <Chip emphasis="tertiary" scale="sm" closable={false} showIcon iconName="check">{TASK.subtasks}</Chip>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Row>

      <Row label="#28 · automation card — a row of app Avatars, title + description, a meta column beside a primary Create button">
        <Card className="w-full max-w-2xl">
          <Stack dir="col" gap={16} pad={24}>
            {/* GAP: no avatar-stack and no brand logos — a row of Avatars with Icon fallbacks stands in for the three overlapping app icons */}
            <Stack dir="row" align="center" gap={8}>
              {AUTOMATION.apps.map((icon) => <IconFrame key={icon} icon={icon} />)}
            </Stack>
            <Stack dir="col" gap={6}>
              <span element="type--heading3">{AUTOMATION.title}</span>
              <span element="type--body" emphasis="quiet">{AUTOMATION.description}</span>
            </Stack>
            <Stack dir="row" align="end" justify="between" gap={16}>
              <Stack dir="col" gap={6}>
                {/* GAP: no bolt icon — "activity" stands in for the trigger glyph */}
                <Meta icon="activity">{AUTOMATION.schedule}</Meta>
                <Meta icon="refresh">{AUTOMATION.runs}</Meta>
              </Stack>
              <Button emphasis="primary" scale="lg" buttonType="text-icon" endIcon="activity">Create</Button>
            </Stack>
          </Stack>
        </Card>
      </Row>
    </FixtureBody>
  );
}
