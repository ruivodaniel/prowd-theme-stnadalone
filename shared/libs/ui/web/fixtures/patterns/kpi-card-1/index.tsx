import { Card, Separator, Progress, Icon, Spinner } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: KPI card 1 — the 8b78805c upload, from canonical components only.
 * Layout is <Stack>. Content is Card · Separator · Progress · Icon · Spinner and
 * type--* elements coloured through the emphasis/status axes. No inline styles.
 *
 * Gap surfaced by this pattern: the upload's bar is a stacked, three-segment
 * meter; no such component exists. Progress (one value) stands in until it does.
 */
export default function KpiCard1Fixture() {
  return (
    <FixtureBody>
      <Row label="KPI card 1 — layout is <Stack>; content is Card · Separator · Progress · Icon · Spinner · type--*">
        <Card className="w-96">
          <Stack dir="col" gap={18} pad={22}>

            {/* header + meta */}
            <Stack dir="col" gap={4}>
              <Stack dir="row" justify="between" align="center" gap={12}>
                <Stack dir="row" align="baseline" gap={6}>
                  <span element="type--body" emphasis="quiet">query</span>
                  <span element="type--heading4">getProductById</span>
                  <Icon name="chevronRight" size="sm" />
                </Stack>
                <Icon name="more" size="sm" />
              </Stack>
              <span element="type--body-small" emphasis="quiet">7.15M Requests · 9% · 734ms P95</span>
            </Stack>

            {/* two stat columns — each fills half */}
            <Stack dir="row" gap={24}>
              <Stack dir="col" gap={6} size="fill">
                <span element="type--body-small" emphasis="quiet">Cache Hit Rate</span>
                <Stack dir="row" align="center" gap={8}>
                  <Spinner scale="sm" status="error" />
                  <span element="type--numbers-large">12.3%</span>
                </Stack>
                <span element="type--body-small" status="error">
                  <Icon name="arrowDown" size="xs" /> down from 19.6%
                </span>
              </Stack>
              <Stack dir="col" gap={6} size="fill" align="end">
                <span element="type--body-small" emphasis="quiet">Max CHR</span>
                <span element="type--numbers-large">72.6%</span>
                <span element="type--body-small" emphasis="quiet">
                  CHR Impact +5.4% <Icon name="help" size="xs" />
                </span>
              </Stack>
            </Stack>

            <Separator />

            {/* bandwidth */}
            <Stack dir="col" gap={14}>
              <Stack dir="col" gap={4}>
                <Stack dir="row" justify="between" align="end" gap={12}>
                  <Stack dir="row" align="baseline" gap={6}>
                    <span element="type--numbers">90.5 GB</span>
                    <span element="type--body" emphasis="quiet">(69.8%)</span>
                  </Stack>
                  <Stack dir="row" align="center" gap={6}>
                    <span element="type--numbers">$9.05</span>
                    <Icon name="help" size="xs" />
                  </Stack>
                </Stack>
                <span element="type--body-small" emphasis="quiet">Cacheable Bandwidth</span>
              </Stack>

              {/* the stacked meter in the upload has no component yet — Progress stands in */}
              <Progress value={30} />

              {/* legend — rows of dot · label (fills) · value */}
              <Stack dir="col" gap={8}>
                <Stack dir="row" align="center" gap={8}>
                  <Icon name="dot" size="xs" />
                  <span element="type--body-small" className="flex-1 min-w-0">Cached</span>
                  <span element="type--body-small">12.8 GB (9.8%)</span>
                </Stack>
                <Stack dir="row" align="center" gap={8}>
                  <Icon name="dot" size="xs" />
                  <span element="type--body-small" className="flex-1 min-w-0">Non-Cacheable</span>
                  <span element="type--body-small">26.3 GB (20.3%)</span>
                </Stack>
                <Stack dir="row" align="center" gap={8}>
                  <span element="type--body-small" className="flex-1 min-w-0">Total</span>
                  <span element="type--body-small">129.6 GB</span>
                </Stack>
              </Stack>
            </Stack>

          </Stack>
        </Card>
      </Row>
    </FixtureBody>
  );
}
