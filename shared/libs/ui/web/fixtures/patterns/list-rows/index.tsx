import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
  Icon,
  List,
  ListItem,
  ListItemAction,
  ListItemContent,
  ListItemDescription,
  ListItemIcon,
  ListItemTitle,
  Tile,
  type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: list rows — the 7b5c547d · bb62df4d · a64bac47 · b008f2f8 · f5b5e0b2 uploads,
 * from canonical components only. Layout is <Stack>. Rows are List · ListItem, the row
 * carrying its own status or state; content is Card parts · Avatar · Badge · Chip · Button ·
 * Tile · Icon and type--* elements coloured through the emphasis/status axes. No inline styles.
 *
 * Gaps surfaced by these patterns: no image thumbnail (a quiet Tile holding the file-type
 * icon stands in); no medal colours for a leaderboard rank (emphasis="hero" on the leader
 * stands in); no agent-phase colour (the phase is a concept, the theme decides).
 */

// #10 — one safety check per row; the verdict is the row's status
type Check = { name: string; verdict: "Approved" | "Modified"; io: "Output" | "Input"; score: string };

const CHECKS: Check[] = [
  { name: "PII Detection", verdict: "Approved", io: "Output", score: "98%" },
  { name: "Toxicity Filter", verdict: "Approved", io: "Output", score: "95%" },
  { name: "Factual Accuracy", verdict: "Modified", io: "Output", score: "72%" },
  { name: "Prompt Injection", verdict: "Approved", io: "Input", score: "99%" },
  { name: "Output Length", verdict: "Approved", io: "Output", score: "100%" },
  { name: "PII Redaction", verdict: "Modified", io: "Output", score: "97%" },
];

const VERDICT_STATUS = { Approved: "success", Modified: "warning" } as const;
const VERDICT_ICON: Record<Check["verdict"], IconName> = { Approved: "success", Modified: "warning" };

// #20 — one file per row; the last row has no remove action
type FileRow = { name: string; size: string; kind: string; icon: IconName; removable: boolean };

const FILES: FileRow[] = [
  { name: "profile-photo.jpg", size: "2.34 MB", kind: "JPEG", icon: "image", removable: true },
  { name: "document.pdf", size: "1 MB", kind: "PDF", icon: "fileText", removable: true },
  { name: "presentation.mp4", size: "15 MB", kind: "MP4", icon: "file", removable: false },
];

const FILE_ACTIONS: IconName[] = ["copy", "download", "externalLink"];

// #21 — ranked players; the leader is the hero of the list
type Player = { rank: number; initial: string; name: string; points: string };

const PLAYERS: Player[] = [
  { rank: 1, initial: "A", name: "Alice Chen", points: "15,847" },
  { rank: 2, initial: "B", name: "Bob Smith", points: "14,523" },
  { rank: 3, initial: "C", name: "Carol White", points: "13,891" },
  { rank: 4, initial: "D", name: "David Brown", points: "12,456" },
  { rank: 5, initial: "E", name: "Eve Johnson", points: "11,234" },
];

// #29 — one changed file per row; additions and deletions
type Diff = { file: string; add: number; del: number };

const DIFFS: Diff[] = [
  { file: "preview.tsx", add: 16, del: 0 },
  { file: "index.ts", add: 1, del: 0 },
  { file: "input.tsx", add: 14, del: 1 },
  { file: "main.tsx", add: 7, del: 2 },
  { file: "routes.ts", add: 21, del: 47 },
  { file: "step-screen.tsx", add: 10, del: 4 },
];

// #32 — one agent per card; the phase names a concept
type AgentRow = { name: string; phase: "Thinking" | "Acting"; icon: IconName; description: string };

const AGENTS: AgentRow[] = [
  { name: "Research Agent", phase: "Thinking", icon: "activity", description: "Analyzing search results and extracting relevant information…" },
  { name: "Code Agent", phase: "Acting", icon: "loading", description: "Writing implementation for auth middleware" },
];

export default function ListRowsFixture() {
  return (
    <FixtureBody>
      <Row label="#10 · Content Safety — a titled Card over a List of checks; each ListItem carries its verdict as status (success · warning): icon · name · verdict Badge · type Chip · score · chevron">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <Stack dir="row" gap={12} align="center">
              <Tile status="warning" className="items-center justify-center">
                <Icon name="warning" />
              </Tile>
              <Stack dir="col" gap={2}>
                <span element="type--heading4">Content Safety</span>
                <Stack dir="row" gap={8} align="baseline">
                  <span element="type--body-small" status="warning">2 modified</span>
                  <span element="type--body-small" status="success">4 approved</span>
                </Stack>
              </Stack>
            </Stack>
          </CardHeader>
          <CardContent>
            <List className="w-full">
              {CHECKS.map((c) => (
                <ListItem key={c.name} status={VERDICT_STATUS[c.verdict]} className="gap-3">
                  <ListItemIcon>
                    <span element="type--body" status={VERDICT_STATUS[c.verdict]}>
                      <Icon name={VERDICT_ICON[c.verdict]} size="sm" />
                    </span>
                  </ListItemIcon>
                  <ListItemContent>
                    <Stack dir="row" gap={12} align="center">
                      <span element="type--body-large">{c.name}</span>
                      <Badge emphasis="quiet" status={VERDICT_STATUS[c.verdict]}>{c.verdict}</Badge>
                      <Chip emphasis="tertiary" scale="sm" closable={false}>{c.io}</Chip>
                    </Stack>
                  </ListItemContent>
                  <ListItemAction>
                    <Stack dir="row" gap={12} align="center">
                      <span element="type--numbers-small" emphasis="quiet">{c.score}</span>
                      <Icon name="chevronDown" size="sm" />
                    </Stack>
                  </ListItemAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Row>

      <Row label="#20 · file list — List rows of thumbnail · name over meta · quiet icon Buttons (copy · download · open · remove)">
        <List className="w-full max-w-2xl">
          {FILES.map((f) => (
            <ListItem key={f.name} className="gap-4">
              <ListItemIcon>
                {/* GAP: image thumbnail (the first row is a photo) — a quiet Tile holding the file-type icon stands in */}
                <Tile emphasis="quiet" className="w-20 h-20 items-center justify-center">
                  <Icon name={f.icon} size="lg" />
                </Tile>
              </ListItemIcon>
              <ListItemContent>
                <ListItemTitle><span element="type--body-large">{f.name}</span></ListItemTitle>
                <ListItemDescription>
                  <span element="type--body-small" emphasis="quiet">{f.size} · {f.kind}</span>
                </ListItemDescription>
              </ListItemContent>
              <ListItemAction>
                <Stack dir="row" gap={8} align="center">
                  {FILE_ACTIONS.map((a) => (
                    <Button key={a} buttonType="icon" startIcon={a} emphasis="quiet" scale="sm" aria-label={a} />
                  ))}
                  {f.removable && <Button buttonType="icon" startIcon="close" emphasis="quiet" scale="sm" aria-label="remove" />}
                </Stack>
              </ListItemAction>
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="#21 · Top Players — Card header (icon · title · Points column label) over full-bleed List rows (rank Avatar · Avatar · name · points), a footer; the leader is emphasis='hero'">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Stack dir="row" justify="between" align="center" gap={12}>
              <Stack dir="row" gap={8} align="center">
                <Icon name="star" />
                <span element="type--heading4">Top Players</span>
              </Stack>
              <span element="type--body-small" emphasis="quiet">Points</span>
            </Stack>
          </CardHeader>
          <List className="w-full">
            {PLAYERS.map((p) => {
              const lead = p.rank === 1;
              return (
                <ListItem key={p.rank} className="gap-3">
                  <ListItemIcon>
                    <Stack dir="row" gap={12} align="center">
                      {/* GAP: medal colours (gold · silver · bronze) — the leader is hero, the rest quiet */}
                      <Avatar scale="sm" emphasis={lead ? "hero" : "quiet"}>
                        <AvatarFallback>
                          {lead ? <Icon name="star" size="xs" /> : <span element="type--numbers-small">{p.rank}</span>}
                        </AvatarFallback>
                      </Avatar>
                      <Avatar scale="md"><AvatarFallback>{p.initial}</AvatarFallback></Avatar>
                    </Stack>
                  </ListItemIcon>
                  <ListItemContent>
                    <ListItemTitle><span element="type--body-large">{p.name}</span></ListItemTitle>
                  </ListItemContent>
                  <ListItemAction>
                    <span element="type--numbers" emphasis={lead ? "hero" : "quiet"}>{p.points}</span>
                  </ListItemAction>
                </ListItem>
              );
            })}
          </List>
          <CardFooter className="justify-center">
            <span element="type--body-small" emphasis="quiet">+2 more entries</span>
          </CardFooter>
        </Card>
      </Row>

      <Row label="#29 · file diffs — List rows of code icon · type--code name · +additions (success) −deletions (error) · chevron; the first row is state='selected'">
        <List className="w-full max-w-2xl">
          {DIFFS.map((d, i) => (
            <ListItem key={d.file} state={i === 0 ? "selected" : undefined} className="gap-3">
              <ListItemIcon>
                <span element="type--body" emphasis="quiet"><Icon name="code" size="sm" /></span>
              </ListItemIcon>
              <ListItemContent>
                <ListItemTitle><span element="type--code">{d.file}</span></ListItemTitle>
              </ListItemContent>
              <ListItemAction>
                <Stack dir="row" gap={12} align="center">
                  <Stack dir="row" gap={2} align="baseline">
                    <span element="type--body" status="success">+{d.add}</span>
                    <span element="type--body" status="error">−{d.del}</span>
                  </Stack>
                  <Icon name="chevronRight" size="sm" />
                </Stack>
              </ListItemAction>
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="#32 · agent status — two Cards: Avatar with presence (status='success') · name · phase Badge · description; the phase is a concept, the theme decides its colour">
        <Stack dir="col" gap={16} className="w-full max-w-2xl">
          {AGENTS.map((a) => {
            const concept = a.phase.toLowerCase();
            return (
              <Card key={a.name} concept={concept}>
                <Stack dir="row" gap={16} align="center" pad={16}>
                  <Avatar scale="lg" status="success">
                    <AvatarFallback><Icon name="bot" /></AvatarFallback>
                  </Avatar>
                  <Stack dir="col" gap={4} size="fill">
                    <Stack dir="row" gap={12} align="center">
                      <span element="type--heading4">{a.name}</span>
                      {/* GAP: no brain icon for "Thinking" — activity stands in; "Acting" keeps its spinner (loading) */}
                      <Badge status="info" concept={concept} showIcon iconName={a.icon}>{a.phase}</Badge>
                    </Stack>
                    <span element="type--body-small" emphasis="quiet">{a.description}</span>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Row>
    </FixtureBody>
  );
}
