import { Badge, Button, Card, CardContent, CardHeader, Icon, Input, Progress, type IconName } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: timelines and agenda — the 1b8a2480 · e5cb6097 · 694b6272 uploads, from canonical
 * components only. Layout is <Stack>. Content is Card parts · Input · Button · Badge ·
 * Progress · Icon and type--* elements coloured through the emphasis/status axes. No inline styles.
 *
 * Gaps surfaced by these patterns: no illustration (a quiet Icon stands in); no connector
 * line between timeline stops (the stops are a column of marker + content rows); no coloured
 * left-accent bar (status on the Card carries it).
 */

// #3 — the two stops of a delivery: pickup, then home
type Stop = {
  marker: IconName;
  markerEmphasis: "quiet" | "primary";
  name: string;
  address: string;
  contact: string;
  pkg: string;
  item: string;
  action: string;
};

const STOPS: Stop[] = [
  {
    marker: "circle",
    markerEmphasis: "quiet",
    name: "Raju Textile",
    address: "15, Nerhu Street, Pallipalayam, Namakkal - 652396",
    contact: "Raju | +919874563210",
    pkg: "Package 1",
    item: "Notebooks | ₹200",
    action: "Pickup package",
  },
  {
    marker: "mapPin",
    markerEmphasis: "primary",
    name: "Home",
    address: "145, Kovil Street, Pallipalayam, Namakkal - 652396",
    contact: "Raju | +919874563210",
    pkg: "Package 1",
    item: "Notebooks | ₹200",
    action: "Delivery package",
  },
];

// #25 — three events; each card is its status
type Event = { title: string; time: string; place: string; status: "info" | "success" | "error" };

const AGENDA: Event[] = [
  { title: "Team Standup", time: "9:00 AM - 9:30 AM", place: "Google Meet", status: "info" },
  { title: "Product Review", time: "2:00 PM - 3:00 PM", place: "Conference Room A", status: "success" },
  { title: "Client Call", time: "4:00 PM - 5:00 PM", place: "Zoom", status: "error" },
];

// #26 — three goals; completion is the Badge's status
type Goal = { title: string; pct: number; phase: "In Progress" | "Completed"; steps: string; due: string };

const GOALS: Goal[] = [
  { title: "Launch MVP by end of quarter", pct: 75, phase: "In Progress", steps: "3/4 steps", due: "Dec 8, 2025" },
  { title: "Complete user onboarding flow", pct: 100, phase: "Completed", steps: "3/3 steps", due: "Dec 1, 2025" },
  { title: "Fix critical performance issues", pct: 30, phase: "In Progress", steps: "1/3 steps", due: "Dec 15, 2025" },
];

export default function TimelinesAndAgendaFixture() {
  return (
    <FixtureBody>
      <Row label="#3 · Blueway delivery — app title · a hero Card (Input + icon Button) · an action-row Card · 'Ongoing Delivery': Card header (shipment · date · Badge · illustration) over a two-stop timeline, each stop with a quiet package sub-Card">
        <Stack dir="col" gap={16} className="w-full max-w-lg">

          {/* app bar */}
          <Stack dir="row" gap={12} align="center">
            <Icon name="menu" />
            <span element="type--heading3">Blueway</span>
          </Stack>

          {/* track your package */}
          <Card emphasis="hero">
            <Stack dir="col" gap={12} pad={20}>
              <Stack dir="col" gap={4}>
                <span element="type--heading4">Track your package</span>
                <span element="type--body">Please enter your tracking number</span>
              </Stack>
              <Stack dir="row" gap={8} align="center">
                <Input placeholder="Shipment Number" startIcon={<Icon name="package" size="sm" />} className="flex-1 min-w-0" />
                <Button buttonType="icon" startIcon="search" aria-label="Track" />
              </Stack>
            </Stack>
          </Card>

          {/* pickup / drop action row */}
          <Card>
            <Stack dir="row" gap={12} align="center" pad={16}>
              <Icon name="package" />
              <span element="type--body-large" className="flex-1 min-w-0">Pickup / Drop New Package</span>
              <Button buttonType="icon" startIcon="send" aria-label="New package" />
            </Stack>
          </Card>

          {/* ongoing delivery */}
          <span element="type--heading3">Ongoing Delivery</span>
          <Card>
            <CardHeader>
              <Stack dir="row" justify="between" align="start" gap={16}>
                <Stack dir="col" gap={4}>
                  <span element="type--body-small" emphasis="quiet">Shipment number</span>
                  <span element="type--heading4">PD-202411200146</span>
                  <Stack dir="row" gap={8} align="center">
                    <span element="type--body-small" emphasis="quiet">19-11-2024 02:45 PM</span>
                    <Badge status="info">On the way to deliver</Badge>
                  </Stack>
                </Stack>
                {/* GAP: illustration (rider with a phone) — a large quiet Icon stands in */}
                <span element="type--body" emphasis="quiet"><Icon name="package" size="lg" /></span>
              </Stack>
            </CardHeader>
            <CardContent>
              {/* GAP: no connector line between the stops — a column of marker + content rows */}
              <Stack dir="col" gap={16}>
                {STOPS.map((s) => (
                  <Stack key={s.name} dir="row" gap={12} align="start">
                    <span element="type--body" emphasis={s.markerEmphasis}><Icon name={s.marker} size="sm" /></span>
                    <Stack dir="col" gap={6} size="fill">
                      <span element="type--heading4">{s.name}</span>
                      <span element="type--body-small" emphasis="quiet">{s.address}</span>
                      <Stack dir="row" gap={4} align="baseline">
                        <span element="type--body-small" emphasis="quiet">Contact on</span>
                        <span element="type--body-small">{s.contact}</span>
                      </Stack>
                      <Card emphasis="quiet">
                        <Stack dir="row" justify="between" align="center" gap={12} pad={12}>
                          <Stack dir="col" gap={2}>
                            <span element="type--body-small">{s.pkg}</span>
                            <span element="type--body-small" emphasis="quiet">{s.item}</span>
                          </Stack>
                          <Button emphasis="quiet" scale="sm">{s.action}</Button>
                        </Stack>
                      </Card>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

        </Stack>
      </Row>

      <Row label="#25 · agenda — three event Cards, status='info' | 'success' | 'error': title · time · place">
        {/* GAP: coloured left-accent bar — status on the Card stands in */}
        <Stack dir="col" gap={12} className="w-full max-w-2xl">
          {AGENDA.map((e) => (
            <Card key={e.title} status={e.status}>
              <Stack dir="col" gap={4} pad={16}>
                <span element="type--heading4">{e.title}</span>
                <span element="type--body" emphasis="quiet">{e.time}</span>
                <span element="type--body-small" emphasis="quiet">{e.place}</span>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Row>

      <Row label="#26 · goals — three Cards: title · Progress with the % at right · a meta row (phase Badge · steps Badge · date) beside a 'View Goal' secondary Button">
        <Stack dir="col" gap={16} className="w-full max-w-2xl">
          {GOALS.map((g) => {
            const done = g.phase === "Completed";
            return (
              <Card key={g.title}>
                <Stack dir="col" gap={16} pad={20}>
                  <span element="type--heading4">{g.title}</span>
                  <Stack dir="row" gap={16} align="center">
                    <Progress value={g.pct} className="flex-1 min-w-0" />
                    <span element="type--numbers" emphasis="quiet">{g.pct}%</span>
                  </Stack>
                  <Stack dir="row" justify="between" align="center" gap={16}>
                    <Stack dir="row" gap={8} align="center" wrap>
                      <Badge status={done ? "success" : "info"}>{g.phase}</Badge>
                      <Badge emphasis="tertiary" showIcon iconName="success">{g.steps}</Badge>
                      <span element="type--body-small" emphasis="quiet">
                        <Icon name="calendar" size="xs" /> {g.due}
                      </span>
                    </Stack>
                    <Button emphasis="secondary" buttonType="text-icon" endIcon="chevronRight">View Goal</Button>
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
