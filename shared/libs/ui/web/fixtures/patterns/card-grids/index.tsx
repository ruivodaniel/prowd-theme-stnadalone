import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  Chip,
  Icon,
  Tile,
  type BadgeStatus,
  type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: card grids — the d9cae0e7 / 7d5d2a51 (agent cards) and 5ac3dc5b
 * (referenced sources) uploads, from canonical components only.
 *
 * Layout is <Stack>; the one true 2-D grid is the structural `grid grid-cols-2`.
 * Content is Card · Tile · Avatar · Badge · Chip · Accordion parts · Icon and
 * type--* elements coloured through the emphasis/status axes. No inline styles:
 * how a card is framed, how two tiles are separated, what "disabled" or "quiet"
 * look like — the theme decides, on this exact markup.
 *
 * Gap surfaced by both patterns: the uploads' square icon frames and brand
 * logos have no component — an Avatar with an Icon fallback stands in for both.
 */

// ── agent cards ─────────────────────────────────────────────────────────────

type AgentStatus = "Active" | "Busy" | "Idle" | "Offline";

type Agent = {
  name: string;
  model?: string;
  status: AgentStatus;
  description: string;
  capabilities: string[];
};

// the status word is content; its colour is the status axis
const TONE: Record<AgentStatus, BadgeStatus> = {
  Active: "success",
  Busy: "info",
  Idle: "neutral",
  Offline: "neutral",
};

const AGENTS: Agent[] = [
  {
    name: "Research Agent",
    status: "Active",
    description: "Searches the web, reads documentation, and gathers information",
    capabilities: ["Web Search", "Document Reading", "Summarization"],
  },
  {
    name: "Code Agent",
    model: "claude-sonnet-4-20250514",
    status: "Busy",
    description: "Writes, reviews, and refactors code across multiple languages",
    capabilities: ["Code Generation", "Debugging", "Refactoring"],
  },
  {
    name: "Planning Agent",
    status: "Active",
    description: "Breaks down complex tasks and creates execution plans",
    capabilities: ["Task Decomposition", "Scheduling", "Prioritization"],
  },
  {
    name: "Review Agent",
    status: "Idle",
    description: "Reviews code, content, and plans for quality assurance",
    capabilities: ["Code Review", "Content Review", "Security Audit"],
  },
  {
    name: "Data Agent",
    status: "Offline",
    description: "Analyzes data, generates insights, and creates visualizations",
    capabilities: ["Data Analysis", "Visualization", "Reporting"],
  },
];

// one agent in one card — a header row (icon · name + model · status badge), a description, a cluster of chips
function AgentCard({ a }: { a: Agent }) {
  return (
    // an offline agent is not available: the card itself carries state="disabled"
    <Card state={a.status === "Offline" ? "disabled" : undefined}>
      <Stack dir="col" gap={14} pad={20}>
        <Stack dir="row" align="start" justify="between" gap={12}>
          <Stack dir="row" align="center" gap={14}>
            <Avatar scale="md">
              <AvatarFallback><Icon name="bot" size="sm" /></AvatarFallback>
            </Avatar>
            <Stack dir="col" gap={2}>
              <span element="type--heading4">{a.name}</span>
              {a.model && <span element="type--code" emphasis="quiet">{a.model}</span>}
            </Stack>
          </Stack>
          <Badge emphasis="quiet" status={TONE[a.status]} showIcon iconName="dot">{a.status}</Badge>
        </Stack>

        <span element="type--body" emphasis="quiet">{a.description}</span>

        <Stack dir="row" align="center" gap={8} wrap>
          {a.capabilities.map((c) => (
            <Chip key={c} emphasis="tertiary" scale="sm" closable={false}>{c}</Chip>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

// ── referenced sources ──────────────────────────────────────────────────────

type Source = { title: string; domain: string; description: string; icon: IconName };

const SOURCES: Source[] = [
  {
    title: "Next.js Quickstart - Clerk",
    domain: "clerk.com",
    description: "Learn how to add authentication to your Next.js application with Clerk.",
    icon: "lock",
  },
  {
    title: "Authentication - Next.js",
    domain: "nextjs.org",
    description: "Learn how to implement authentication in Next.js applications.",
    icon: "code",
  },
  {
    title: "Managing State - React",
    domain: "react.dev",
    description: "Learn how to manage state effectively in React applications.",
    icon: "component",
  },
  {
    title: "clerk/javascript - GitHub",
    domain: "github.com",
    description: "Official Clerk JavaScript SDK monorepo with React, Next.js, and more.",
    icon: "gitBranch",
  },
];

const API_REFS: Source[] = [
  {
    title: "useAuth() - Clerk",
    domain: "clerk.com",
    description: "Hook returning the current session, the user id and a token getter.",
    icon: "fileCode",
  },
  {
    title: "middleware - Next.js",
    domain: "nextjs.org",
    description: "Run code before a request is completed, at the edge.",
    icon: "fileCode",
  },
];

// one source in one tile — icon beside a column of title + domain, then the one-line description
function SourceTile({ s }: { s: Source }) {
  return (
    <Tile>
      <Stack dir="row" align="start" gap={14}>
        <Avatar scale="md">
          <AvatarFallback><Icon name={s.icon} size="sm" /></AvatarFallback>
        </Avatar>
        <Stack dir="col" gap={8} size="fill">
          <Stack dir="col" gap={2}>
            <span element="type--heading4">{s.title}</span>
            <span element="type--body-small" emphasis="quiet">{s.domain}</span>
          </Stack>
          <span element="type--body-small" emphasis="quiet">{s.description}</span>
        </Stack>
      </Stack>
    </Tile>
  );
}

// a section header — icon · title · count; the Accordion trigger adds the chevron
function SectionTitle({ icon, title, count }: { icon: IconName; title: string; count: number }) {
  return (
    <Stack dir="row" align="center" gap={14}>
      <Avatar scale="md">
        <AvatarFallback><Icon name={icon} size="sm" /></AvatarFallback>
      </Avatar>
      <span element="type--heading4">{title}</span>
      <Badge emphasis="secondary" status="neutral">{count}</Badge>
    </Stack>
  );
}

export default function CardGridsFixture() {
  return (
    <FixtureBody>
      <Row label="#7 · #9 · agent cards — a 2-column grid of Card; each: Avatar · name + model · quiet status Badge · description · a cluster of Chips; the offline card is state='disabled'">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          {AGENTS.map((a) => <AgentCard key={a.name} a={a} />)}
        </div>
      </Row>

      <Row label="#8 · referenced sources — an Accordion of two sections; the open one holds a 2-column grid of source Tiles, the second is collapsed">
        {/* GAP: the upload's square favicon frames are images — Avatar with an Icon fallback stands in */}
        <Accordion type="multiple" defaultValue={["sources"]} className="w-full max-w-3xl">
          <AccordionItem value="sources">
            <AccordionTrigger>
              <SectionTitle icon="fileText" title="Referenced Sources" count={SOURCES.length} />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                {SOURCES.map((s) => <SourceTile key={s.title} s={s} />)}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="api">
            <AccordionTrigger>
              <SectionTitle icon="fileText" title="API References" count={API_REFS.length} />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                {API_REFS.map((s) => <SourceTile key={s.title} s={s} />)}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Row>
    </FixtureBody>
  );
}
