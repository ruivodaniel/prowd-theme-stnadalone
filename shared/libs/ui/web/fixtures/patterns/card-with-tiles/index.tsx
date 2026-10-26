import { Card, Tile, Badge } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: card with tiles — a Card holding a Stack of Tiles, each tile a metric.
 *
 * The markup says only what things ARE: surface--card · layout="stack" ·
 * surface--tile (+ emphasis / status) · type--*. Nothing here says how a tile
 * looks or how two tiles are separated. That is the theme's decision, in ONE place:
 *
 *   shared/libs/ui/themes/wireframe-stroke/v1/theme.ts  →  elements.tile   (the TILE block)
 *
 * In wireframe-stroke a tile is a white cell with a hairline. Another theme may engrave it,
 * float it on glass, fill it with colour, or draw nothing between cells at all —
 * on this exact markup.
 */

type Metric = { label: string; value: string; delta?: string; status?: "success" | "error" };

const ROW: Metric[] = [
  { label: "Compliance rate", value: "98%", delta: "+8.3%", status: "success" },
  { label: "Sent", value: "1,204" },
  { label: "Opened", value: "867", delta: "−1.4%", status: "error" },
  { label: "Bounced", value: "2.1%", delta: "+0.3%", status: "error" },
];

const GRID: Metric[] = [
  { label: "Revenue", value: "$48.2k", delta: "+12%", status: "success" },
  { label: "Orders", value: "1,092", delta: "+4%", status: "success" },
  { label: "Avg. order", value: "$44.10" },
  { label: "Refunds", value: "1.8%", delta: "+0.2%", status: "error" },
];

// one metric in one tile — label over a baseline row of number + delta
function MetricTile({ m, emphasis, className }: { m: Metric; emphasis?: "hero" | "quiet"; className?: string }) {
  return (
    <Tile emphasis={emphasis} className={className}>
      <Stack dir="col" gap={6}>
        <span element="type--body-small">{m.label}</span>
        <Stack dir="row" align="baseline" gap={8}>
          <span element="type--numbers-large">{m.value}</span>
          {m.delta && <Badge status={m.status}>{m.delta}</Badge>}
        </Stack>
      </Stack>
    </Tile>
  );
}

export default function CardWithTilesFixture() {
  return (
    <FixtureBody>
      <Row label="a row of tiles — four metrics, each tile fills an equal share">
        <Card className="w-full max-w-2xl">
          <Stack dir="row" gap={12} pad={12}>
            {ROW.map((m) => <MetricTile key={m.label} m={m} className="flex-1 min-w-0" />)}
          </Stack>
        </Card>
      </Row>

      <Row label="a 2×2 of tiles — the first is emphasis='hero'; the theme decides what hero means">
        <Card className="w-96">
          <Stack dir="col" gap={12} pad={12}>
            <Stack dir="row" gap={12}>
              <MetricTile m={GRID[0]} emphasis="hero" className="flex-1 min-w-0" />
              <MetricTile m={GRID[1]} className="flex-1 min-w-0" />
            </Stack>
            <Stack dir="row" gap={12}>
              <MetricTile m={GRID[2]} className="flex-1 min-w-0" />
              <MetricTile m={GRID[3]} className="flex-1 min-w-0" />
            </Stack>
          </Stack>
        </Card>
      </Row>
    </FixtureBody>
  );
}
