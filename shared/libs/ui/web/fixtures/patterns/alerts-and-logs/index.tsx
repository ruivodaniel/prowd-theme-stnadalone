import { useId, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  Label,
  Spinner,
  type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: alerts & logs — uploads #13/#14 (an error Alert, Stack Trace collapsed
 * then expanded), #22 (three event cards) and #30 (a checklist card), from canonical
 * components only. Layout is <Stack>. The content is Alert · Collapsible · Badge ·
 * Spinner · Card regions · Checkbox · Label · Button · Icon and type--* elements
 * coloured through the emphasis/status axes; every monospace line is type--code.
 * No inline styles.
 *
 * Nothing here says how an error surface, a status square, a code block or a sticky
 * note looks — that is the theme's decision, on this markup. The upload's dark
 * checklist card is expressed as emphasis="hero"; what hero means is the theme's.
 */

// ─── #13 · #14 · the error Alert, collapsed and expanded ────────────────────

const ERROR = {
  title: "Error",
  message: "Cannot read properties of undefined (reading 'map')",
  stack: [
    { fn: "UserList", at: "src/components/UserList.tsx:15:23" },
    { fn: "renderWithHooks", at: "node_modules/react-dom/cjs/react-dom.development.js:14985:18" },
    { fn: "mountIndeterminateComponent", at: "node_modules/react-dom/cjs/react-dom.development.js:17811:13" },
  ],
};

// title · message · two small actions · a Collapsible "Stack Trace" whose chevron follows its open state
function ErrorAlert({ defaultOpen }: { defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Alert status="error" icon={<Icon name="warning" />} className="w-full max-w-3xl">
      <AlertTitle>{ERROR.title}</AlertTitle>
      <AlertDescription>{ERROR.message}</AlertDescription>

      <Stack dir="row" gap={8} wrap>
        <Button emphasis="secondary" status="error" scale="sm" buttonType="icon-text" startIcon="refresh">Try again</Button>
        <Button emphasis="secondary" status="error" scale="sm" buttonType="icon-text" startIcon="copy">Copy error</Button>
      </Stack>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            emphasis="quiet"
            status="error"
            fill
            buttonType="text-icon"
            endIcon={open ? "chevronUp" : "chevronDown"}
            className="justify-between"
          >
            Stack Trace
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* one type--code line per frame — "at" and the location are quiet, the function is not */}
          <Stack dir="col" gap={4} className="overflow-hidden">
            {ERROR.stack.map((f) => (
              <code key={f.fn} element="type--code">
                <span element="type--code" emphasis="quiet">at </span>{f.fn}<span element="type--code" emphasis="quiet"> ({f.at})</span>
              </code>
            ))}
          </Stack>
        </CollapsibleContent>
      </Collapsible>
    </Alert>
  );
}

// ─── #22 · event log ────────────────────────────────────────────────────────

type LogEvent = {
  status: "info" | "success" | "error";
  /** the glyph in the status Badge; absent while the event is still running, a Spinner takes the place */
  icon?: IconName;
  label: string;
  id: string;
  payload: string;
  meta: { icon: IconName; text: string }[];
  error?: string;
};

const EVENTS: LogEvent[] = [
  {
    status: "info",
    label: "Processing",
    id: "msg_abc1...",
    payload: '{"userId": "user_123", "action": "send_email"}',
    meta: [
      { icon: "calendar", text: "11 Feb, 16:15" },
      { icon: "refresh", text: "1/3 retries" },
    ],
  },
  {
    status: "success",
    icon: "check",
    label: "Completed",
    id: "msg_xyz7...",
    payload: '{"report": "daily_analytics"}',
    meta: [
      { icon: "calendar", text: "11 Feb, 15:15" },
      { icon: "check", text: "11 Feb, 16:15" },
    ],
  },
  {
    status: "error",
    icon: "close",
    label: "Failed",
    id: "msg_fail...",
    payload: '{"webhook": "https://api.example.com"}',
    meta: [{ icon: "refresh", text: "3/3 retries" }],
    error: "Connection timeout after 30s",
  },
];

// one event: status Badge + label · id, the payload as one type--code line, a meta row, an error Alert when it failed
function EventCard({ e }: { e: LogEvent }) {
  return (
    <Card>
      <Stack dir="col" gap={16} pad={20}>
        <Stack dir="row" justify="between" align="center" gap={12}>
          <Stack dir="row" align="center" gap={12}>
            <Badge status={e.status} emphasis="secondary" scale="lg" showIcon={!!e.icon} iconName={e.icon} aria-label={e.label}>
              {!e.icon && <Spinner scale="xs" status={e.status} />}
            </Badge>
            <span element="type--heading4" status={e.status}>{e.label}</span>
          </Stack>
          <span element="type--code" emphasis="quiet">{e.id}</span>
        </Stack>

        <code element="type--code">{e.payload}</code>

        <Stack dir="row" align="center" gap={16} wrap>
          {e.meta.map((m) => (
            <span key={m.text} element="type--body-small" emphasis="quiet">
              <Icon name={m.icon} size="xs" /> {m.text}
            </span>
          ))}
        </Stack>

        {e.error && (
          <Alert status="error">
            <AlertDescription>{e.error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </Card>
  );
}

// ─── #30 · Tasks Project ────────────────────────────────────────────────────

const TASKS = [
  { title: "Complete the development", done: false },
  { title: "Conduct testing and fix", done: false },
  { title: "Discuss new ideas for improving", done: true },
  { title: "Prepare a report on the work completed", done: false },
];

// the checklist card: a title row with its collapse control, Checkbox + Label rows, a footer of link + pager
function TasksCard({ emphasis }: { emphasis?: "hero" }) {
  const id = useId();
  return (
    <Card emphasis={emphasis} className="w-80">
      <CardContent>
        <Stack dir="col" gap={16}>
          <Stack dir="row" justify="between" align="center" gap={12}>
            <span element="type--heading4">Tasks Project</span>
            <Button buttonType="icon" startIcon="chevronUp" emphasis="quiet" scale="sm" aria-label="Collapse" />
          </Stack>
          <Stack dir="col" gap={12}>
            {TASKS.map((t, i) => (
              <Stack key={t.title} dir="row" align="center" gap={12}>
                <Checkbox id={`${id}-${i}`} checked={t.done} />
                <Label htmlFor={`${id}-${i}`} emphasis={t.done ? "quiet" : undefined}>{t.title}</Label>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack dir="row" justify="between" align="center" gap={12} className="w-full">
          <Button asChild emphasis="quiet" scale="sm"><a href="#">View All Tasks</a></Button>
          <Stack dir="row" gap={4}>
            <Button buttonType="icon" startIcon="chevronLeft" emphasis="quiet" scale="sm" aria-label="Previous" />
            <Button buttonType="icon" startIcon="chevronRight" emphasis="quiet" scale="sm" aria-label="Next" />
          </Stack>
        </Stack>
      </CardFooter>
    </Card>
  );
}

export default function AlertsAndLogsFixture() {
  return (
    <FixtureBody>
      <Row label="#13 · error Alert, Stack Trace collapsed — Alert · two secondary status=error Buttons · Collapsible">
        <ErrorAlert defaultOpen={false} />
      </Row>

      <Row label="#14 · the same Alert, Stack Trace expanded — three type--code frames">
        <ErrorAlert defaultOpen />
      </Row>

      <Row label="#22 · event log — three Cards: status Badge + label · id, a type--code payload, a meta row; the failed one ends in an error Alert">
        <Stack dir="col" gap={16} className="w-full max-w-2xl">
          {EVENTS.map((e) => <EventCard key={e.id} e={e} />)}
        </Stack>
      </Row>

      <Row label="#30 · Tasks Project — a Card: title row · Checkbox + Label rows · footer of link + pager; the second is emphasis='hero' (the upload's dark variant)">
        <Stack dir="row" gap={24} align="start" wrap>
          <TasksCard />
          <TasksCard emphasis="hero" />
        </Stack>
      </Row>
    </FixtureBody>
  );
}
