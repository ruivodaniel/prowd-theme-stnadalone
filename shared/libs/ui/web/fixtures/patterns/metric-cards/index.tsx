import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Icon,
  type IconName,
  Progress,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tile,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: metric & stat cards — uploads #1, #4, #17, #19, #23, from canonical
 * components only. Layout is <Stack>; Table where cells must align in two
 * dimensions. Content is Card · Tile · Badge · Button · Progress · Separator ·
 * EmptyState · Icon and type--* elements coloured through the emphasis/status
 * axes. No inline styles.
 *
 * Gaps surfaced by these patterns, each marked `GAP:` at its Row:
 *   – no stacked, multi-segment meter (#1): Progress (one value) stands in
 *   – no series-colour swatch bar (#1, per-device columns): Progress with the share
 *   – no chart or sparkline (#17, #19): EmptyState marks the region in #17;
 *     #19 keeps the number alone in its Tile
 */

type Trend = "success" | "error";

// #1 — Marketing insights: the channel table under the meter
const CHANNELS: { icon: IconName; label: string; metric: string; delta: string; trend: Trend }[] = [
  { icon: "user", label: "Acquisition", metric: "$38.25", delta: "+5.2%", trend: "success" },
  { icon: "clock", label: "Conversion", metric: "4.2 days", delta: "+3.8%", trend: "error" },
  { icon: "circle", label: "ROI", metric: "324%", delta: "+4.5%", trend: "success" },
];
const LEGEND = ["Organic Search", "Social Media", "Direct"];

// #1 — Traffic by device: three per-device columns
const DEVICES: { label: string; share: number; delta: string; trend: Trend }[] = [
  { label: "Desktop", share: 27, delta: "-3.2%", trend: "error" },
  { label: "Tablet", share: 12, delta: "-6.4%", trend: "error" },
  { label: "Mobile", share: 61, delta: "+0.8%", trend: "success" },
];

// #19 — four stats, each with a delta against the last period
type Stat = { label: string; value: string; delta: string; trend: Trend };
const STATS: Stat[] = [
  { label: "MRR", value: "$12.4K", delta: "+11.2%", trend: "success" },
  { label: "ARR", value: "$149.4K", delta: "+11.2%", trend: "success" },
  { label: "New Customers", value: "847", delta: "-8.2%", trend: "error" },
  { label: "Churn Rate", value: "2.4", delta: "-22.6%", trend: "error" },
];

// #23 — one rate-limit card per condition
const LIMITS: { remaining: number; status: "success" | "warning" | "error"; note: string }[] = [
  { remaining: 73, status: "success", note: "Requests available" },
  { remaining: 15, status: "warning", note: "Requests available" },
  { remaining: 0, status: "error", note: "Rate limit exceeded" },
];

// arrow + delta, coloured by the trend it reports
function Delta({ trend, value }: { trend: Trend; value: string }) {
  return (
    <span element="type--body-small" status={trend}>
      <Icon name={trend === "success" ? "arrowUp" : "arrowDown"} size="xs" /> {value}
    </span>
  );
}

// #1 — a feature card: an icon tile, a title, a blurb, then whatever stat card it embeds
function FeatureCard({ icon, title, blurb, children }: { icon: IconName; title: string; blurb: string; children: ReactNode }) {
  return (
    <Card emphasis="quiet" className="w-96">
      <Stack dir="col" gap={16} pad={24}>
        <Stack dir="row">
          <Tile><Icon name={icon} size="md" /></Tile>
        </Stack>
        <Stack dir="col" gap={6}>
          <span element="type--heading3">{title}</span>
          <span element="type--body" emphasis="quiet">{blurb}</span>
        </Stack>
        {children}
      </Stack>
    </Card>
  );
}

// #19 — one stat in one tile: label over number over the delta line
// GAP: the upload draws a sparkline beside each number — no chart component; the number stands alone
function StatTile({ s }: { s: Stat }) {
  return (
    <Tile className="flex-1 min-w-0">
      <Stack dir="col" gap={6}>
        <span element="type--body" emphasis="quiet">{s.label}</span>
        <span element="type--numbers-large">{s.value}</span>
        <Stack dir="row" align="baseline" gap={6}>
          <Delta trend={s.trend} value={s.delta} />
          <span element="type--body-small" emphasis="quiet">vs last period</span>
        </Stack>
      </Stack>
    </Tile>
  );
}

export default function MetricCardsFixture() {
  return (
    <FixtureBody>
      <Row label="#1 · feature cards — icon tile, title, blurb, an embedded stat card (meter + legend + table · total + per-device columns)">
        <Stack dir="row" gap={24} align="start">

          <FeatureCard icon="folder" title="Marketing insights" blurb="Understand what's working—and what's not—with live performance data.">
            <Card>
              <Stack dir="col" gap={16} pad={20}>
                <Stack dir="row" justify="between" align="start" gap={12}>
                  <Stack dir="col" gap={4}>
                    <span element="type--body-small" emphasis="quiet">
                      Marketing Channels <Icon name="info" size="xs" />
                    </span>
                    <Stack dir="row" align="baseline" gap={8}>
                      <span element="type--numbers-large">82%</span>
                      <span element="type--body-small" status="success">+2.1%</span>
                      <span element="type--body-small" emphasis="quiet">vs last week</span>
                    </Stack>
                  </Stack>
                  <Button emphasis="secondary" scale="sm">Details</Button>
                </Stack>

                {/* GAP: three-segment stacked meter — Progress (one value) stands in */}
                <Progress value={55} />

                {/* legend — dot · label, a cluster */}
                <Stack dir="row" gap={16} wrap>
                  {LEGEND.map((l) => (
                    <span key={l} element="type--body-small" emphasis="quiet">
                      <Icon name="dot" size="xs" /> {l}
                    </span>
                  ))}
                </Stack>

                <Separator />

                {/* channels — three columns that must line up across rows: a Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channels</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CHANNELS.map((c) => (
                      <TableRow key={c.label}>
                        <TableCell>
                          <Stack dir="row" align="center" gap={8}>
                            <Icon name={c.icon} size="sm" />
                            <span element="type--body-small">{c.label}</span>
                          </Stack>
                        </TableCell>
                        <TableCell><span element="type--body-small">{c.metric}</span></TableCell>
                        <TableCell><Delta trend={c.trend} value={c.delta} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            </Card>
          </FeatureCard>

          <FeatureCard icon="layout" title="Traffic by device" blurb="Track visitor trends by platform and spot shifts in real-time usage.">
            <Card>
              <Stack dir="col" gap={16} pad={20}>
                <Stack dir="row" justify="between" align="start" gap={12}>
                  <Stack dir="col" gap={4}>
                    <span element="type--body-small" emphasis="quiet">Total Visitors</span>
                    <Stack dir="row" align="center" gap={8}>
                      <span element="type--numbers-large">237,456</span>
                      <Badge status="error">-1.4%</Badge>
                    </Stack>
                  </Stack>
                  <Button emphasis="secondary" scale="sm">Report</Button>
                </Stack>

                <Separator />

                {/* per-device columns — cells in a Stack; the theme draws the seams */}
                <Stack dir="row" gap={12}>
                  {DEVICES.map((d) => (
                    <Tile key={d.label} className="flex-1 min-w-0">
                      <Stack dir="col" gap={16}>
                        <Stack dir="col" gap={4}>
                          <span element="type--body-small" emphasis="quiet">{d.label}</span>
                          <span element="type--numbers">{d.share}%</span>
                        </Stack>
                        <Stack dir="col" gap={8}>
                          <Delta trend={d.trend} value={d.delta} />
                          {/* GAP: series-colour swatch bar — Progress with the device's share stands in */}
                          <Progress value={d.share} scale="sm" />
                        </Stack>
                      </Stack>
                    </Tile>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </FeatureCard>

        </Stack>
      </Row>

      <Row label="#4 · stat tile — icon tile, title, more-icon; the number beside its delta sentence; a quiet sub-panel with a chevron">
        <Tile className="w-96">
          <Stack dir="col" gap={20}>
            <Stack dir="row" align="center" gap={12}>
              <Tile status="success"><Icon name="fileText" size="md" /></Tile>
              <span element="type--heading3" className="flex-1 min-w-0">Compliance Rate</span>
              <Icon name="moreVertical" size="sm" />
            </Stack>

            <Stack dir="row" align="baseline" gap={12} wrap>
              <Stack dir="row" align="baseline" gap={2}>
                <span element="type--numbers-extra-large">98</span>
                <span element="type--numbers">%</span>
              </Stack>
              <Stack dir="row" align="baseline" gap={6}>
                <span element="type--body" status="success">
                  <Icon name="arrowUp" size="xs" /> 8.3%
                </span>
                <span element="type--body" emphasis="quiet">increased vs last month</span>
              </Stack>
            </Stack>

            <Tile emphasis="quiet">
              <Stack dir="row" align="center" gap={12}>
                <span element="type--body" emphasis="quiet" className="flex-1 min-w-0">
                  4 departments meeting the target of 95%, and 2 departments critically below 90%
                </span>
                <Icon name="chevronRight" size="sm" />
              </Stack>
            </Tile>
          </Stack>
        </Tile>
      </Row>

      <Row label="#17 · big stat over a chart — number, subject, period; the chart region below">
        <Card className="w-96">
          <Stack dir="col" gap={20} pad={24}>
            <Stack dir="col" gap={4}>
              <span element="type--numbers-extra-large">104.7K</span>
              <span element="type--body">GitHub Stars for shadcn-ui/ui</span>
              <span element="type--body-small" emphasis="quiet">Last 30 days</span>
            </Stack>
            {/* GAP: 30-day line chart — no chart component; EmptyState marks the region */}
            <EmptyState
              emphasis="quiet"
              className="h-56"
              icon={<Icon name="activity" size="lg" />}
              title="Star history"
              description="Daily stars, last 30 days"
            />
          </Stack>
        </Card>
      </Row>

      <Row label="#19 · four stat tiles — label, number, delta vs last period; a 2×2, each tile fills half">
        <Stack dir="col" gap={16} className="w-full max-w-2xl">
          <Stack dir="row" gap={16}>
            {STATS.slice(0, 2).map((s) => <StatTile key={s.label} s={s} />)}
          </Stack>
          <Stack dir="row" gap={16}>
            {STATS.slice(2).map((s) => <StatTile key={s.label} s={s} />)}
          </Stack>
        </Stack>
      </Row>

      <Row label="#23 · rate-limit cards — icon + title + remaining count, a Progress, two footnotes; success · warning · error carried by status">
        <Stack dir="col" gap={16} className="w-full max-w-2xl">
          {LIMITS.map((l) => (
            <Card key={l.status}>
              <Stack dir="col" gap={12} pad={20}>
                <Stack dir="row" align="center" gap={8}>
                  <span element="type--body" status={l.status}><Icon name="lock" size="sm" /></span>
                  <span element="type--heading4" className="flex-1 min-w-0">Rate Limit</span>
                  <span element="type--numbers-small" status={l.status}>{l.remaining} / 100</span>
                </Stack>
                <Progress value={l.remaining} status={l.status} />
                <Stack dir="row" justify="between" align="center" gap={12}>
                  <span element="type--body-small" emphasis="quiet">{l.note}</span>
                  <span element="type--body-small" emphasis="quiet">Resets in 42s</span>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Row>
    </FixtureBody>
  );
}
