import {
  Alert, AlertDescription, AlertTitle, Badge, Button,
  Card, CardContent, CardFooter, CardHeader, Icon, Tile, type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: status cards — the same four notices (info · success · warning ·
 * error) carried seven different ways. The status is always the `status` axis;
 * what changes is WHERE it lives:
 *
 *   A  the whole Card                      — a thing that is in a state (as #25)
 *   B  the CardHeader band                 — the state names the card, the body stays neutral
 *   C  the title row + a Badge             — neutral surface, typography carries it
 *   D  a status icon Tile as leading cell  — the mark carries it
 *   E  a status Tile column on the edge    — the edge carries it; its width is the
 *                                            theme's tile padding (a theme may make it a hairline)
 *   F  an Alert                            — a MESSAGE about a state, with actions
 *   G  the CardFooter                      — content first, the state as the footer line
 *
 * Pick by what the card IS: a thing in a state → A · B · C · D · E · G; a message
 * about a state → F. Every colour comes from the theme's status palette; the
 * markup says only which part is in which status.
 */

type Status = "info" | "success" | "warning" | "error";
type Notice = { status: Status; icon: IconName; label: string; title: string; body: string; time: string; action: string };

const NOTICES: Notice[] = [
  { status: "info", icon: "info", label: "Info", title: "New version available", body: "v2.4 adds the Stack primitive and the tile theme block.", time: "Just now", action: "See what's new" },
  { status: "success", icon: "success", label: "Success", title: "Payment received", body: "€4,800.00 from Altar Design Systems for INV-2026-0142.", time: "12 min ago", action: "View invoice" },
  { status: "warning", icon: "warning", label: "Warning", title: "Storage almost full", body: "92% of 50 GB used — uploads pause at 100%.", time: "1 h ago", action: "Manage storage" },
  { status: "error", icon: "error", label: "Error", title: "Sync failed", body: "Connection timed out after 30 s; 3 changes were not saved.", time: "2 h ago", action: "Retry" },
];

const Four = ({ children }: { children: React.ReactNode }) => (
  <Stack dir="row" gap={12} align="stretch" wrap className="w-full max-w-5xl">{children}</Stack>
);

// A — the whole card is in the state
const WholeCard = ({ n }: { n: Notice }) => (
  <Card status={n.status} className="flex-1 min-w-56">
    <Stack dir="col" gap={6}>
      <Stack dir="row" align="center" gap={8}>
        <Icon name={n.icon} size="sm" />
        <span element="type--heading4">{n.title}</span>
      </Stack>
      <span element="type--body-small">{n.body}</span>
      <span element="type--body-extra-small" emphasis="quiet">{n.time}</span>
    </Stack>
  </Card>
);

// B — the header band names the state; the body is neutral
const HeaderBand = ({ n }: { n: Notice }) => (
  <Card className="flex-1 min-w-56">
    <CardHeader status={n.status}>
      <Stack dir="row" align="center" gap={8}>
        <Icon name={n.icon} size="sm" />
        <span element="type--heading4">{n.title}</span>
      </Stack>
    </CardHeader>
    <CardContent><span element="type--body-small">{n.body}</span></CardContent>
    <CardFooter className="w-full">
      <Stack dir="row" align="center" justify="between" gap={8} className="w-full">
        <span element="type--body-extra-small" emphasis="quiet">{n.time}</span>
        <Button emphasis="secondary" scale="sm">{n.action}</Button>
      </Stack>
    </CardFooter>
  </Card>
);

// C — neutral surface; the title row and a Badge carry the state
const TitleRow = ({ n }: { n: Notice }) => (
  <Card className="flex-1 min-w-56">
    <Stack dir="col" gap={6}>
      <Stack dir="row" align="center" justify="between" gap={8}>
        <span element="type--heading4" status={n.status}><Icon name={n.icon} size="sm" /> {n.title}</span>
        <Badge emphasis="quiet" status={n.status} scale="xs">{n.label}</Badge>
      </Stack>
      <span element="type--body-small">{n.body}</span>
      <span element="type--body-extra-small" emphasis="quiet">{n.time}</span>
    </Stack>
  </Card>
);

// D — a status icon Tile as the leading cell
const IconCell = ({ n }: { n: Notice }) => (
  <Card className="flex-1 min-w-56">
    <Stack dir="row" align="start" gap={12}>
      <Tile status={n.status} className="flex-none p-2"><Icon name={n.icon} size="sm" /></Tile>
      <Stack dir="col" gap={4} size="fill">
        <span element="type--heading4">{n.title}</span>
        <span element="type--body-small">{n.body}</span>
        <span element="type--body-extra-small" emphasis="quiet">{n.time}</span>
      </Stack>
    </Stack>
  </Card>
);

// E — a status Tile column on the leading edge; how wide it is — a band or a
// hairline — is the theme's tile padding, not the markup's
const Strip = ({ n }: { n: Notice }) => (
  <Card className="flex-1 min-w-56">
    <Stack dir="row" align="stretch" gap={12}>
      <Tile status={n.status} className="flex-none" />
      <Stack dir="col" gap={4} size="fill">
        <span element="type--heading4">{n.title}</span>
        <span element="type--body-small">{n.body}</span>
        <span element="type--body-extra-small" emphasis="quiet">{n.time}</span>
      </Stack>
    </Stack>
  </Card>
);

// F — an Alert: a message about a state, with its actions
const Message = ({ n }: { n: Notice }) => (
  <Alert status={n.status} icon={<Icon name={n.icon} />} className="flex-1 min-w-56">
    <AlertTitle>{n.title}</AlertTitle>
    <AlertDescription>{n.body}</AlertDescription>
    <Stack dir="row" gap={8}>
      <Button emphasis="secondary" status={n.status} scale="sm">{n.action}</Button>
      <Button emphasis="quiet" scale="sm">Dismiss</Button>
    </Stack>
  </Alert>
);

// G — content first; the footer line carries the state
const FooterLine = ({ n }: { n: Notice }) => (
  <Card className="flex-1 min-w-56">
    <CardContent>
      <Stack dir="col" gap={4}>
        <span element="type--heading4">{n.title}</span>
        <span element="type--body-small">{n.body}</span>
      </Stack>
    </CardContent>
    <CardFooter status={n.status} className="w-full">
      <Stack dir="row" align="center" justify="between" gap={8} className="w-full">
        <span element="type--body-small"><Icon name={n.icon} size="xs" /> {n.label} · {n.time}</span>
        <Button emphasis="secondary" status={n.status} scale="sm">{n.action}</Button>
      </Stack>
    </CardFooter>
  </Card>
);

export default function StatusCardsFixture() {
  return (
    <FixtureBody>
      <Row label="A · the whole Card is in the state — Card status=… (as #25): icon + title · body · time">
        <Four>{NOTICES.map((n) => <WholeCard key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="B · a status CardHeader band over neutral content; the footer holds time + action">
        <Four>{NOTICES.map((n) => <HeaderBand key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="C · neutral Card; the title row (type--heading4 status=…) and a quiet Badge carry the state">
        <Four>{NOTICES.map((n) => <TitleRow key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="D · a status icon Tile as the leading cell; content neutral">
        <Four>{NOTICES.map((n) => <IconCell key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="E · a status Tile column on the leading edge — the accent-bar idea as a surface cell; its width is the theme's tile padding">
        <Four>{NOTICES.map((n) => <Strip key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="F · an Alert — a message about a state, with a status action and Dismiss">
        <Four>{NOTICES.map((n) => <Message key={n.status} n={n} />)}</Four>
      </Row>
      <Row label="G · content first; a status CardFooter carries the state line and the action">
        <Four>{NOTICES.map((n) => <FooterLine key={n.status} n={n} />)}</Four>
      </Row>
    </FixtureBody>
  );
}
