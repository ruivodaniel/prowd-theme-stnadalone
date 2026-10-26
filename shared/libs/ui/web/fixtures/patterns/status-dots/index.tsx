import { Badge, List, ListItem, ListItemAction, ListItemContent } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: status dots — a per-item result marker, from canonical components
 * only. A dot is a childless Badge at scale='3xs' carrying status; its actual
 * size/shape/colour is the theme's decision (surface--badge), never a
 * hand-picked hex or inline style.
 *
 * Replaces RunNav.tsx's `DOT: Record<TestResult, string>` hex-literal map and
 * its inline `style={{ background: DOT[...], borderRadius: 4, ... }}` span.
 */

type Result = "pass" | "fail" | "note" | "flag" | "not-run";
const RESULT_STATUS: Record<Result, "success" | "error" | "info" | "warning" | "neutral"> = {
  pass: "success",
  fail: "error",
  note: "info",
  flag: "warning",
  "not-run": "neutral",
};

const ROWS: { id: string; title: string; result: Result }[] = [
  { id: "t1", title: "Signature with an authorised role is accepted", result: "pass" },
  { id: "t2", title: "Signature with an unauthorised role is rejected", result: "fail" },
  { id: "t3", title: "Batch start records signature, user and timestamp", result: "note" },
  { id: "t4", title: "Deviation raised requires review before continuing", result: "flag" },
  { id: "t5", title: "Recipe selection loads the approved recipe", result: "not-run" },
];

export default function StatusDotsFixture() {
  return (
    <FixtureBody>
      <Row label="#1 · nav list with a status dot — a childless Badge (scale='3xs', status=result) leads each row; the theme decides the dot's size/shape">
        <List className="w-full max-w-md">
          {ROWS.map((r) => (
            <ListItem key={r.id} className="gap-3">
              <Badge status={RESULT_STATUS[r.result]} scale="3xs" aria-label={r.result} />
              <ListItemContent>
                <span element="type--body-small">{r.title}</span>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="#2 · trailing status dot + label — the dot and its word both carry the same status axis, so the theme keeps them in sync">
        <Stack dir="col" gap={8} className="w-full max-w-md">
          {ROWS.map((r) => (
            <Stack key={r.id} dir="row" justify="between" align="center" className="w-full">
              <span element="type--body-small">{r.title}</span>
              <Stack dir="row" gap={6} align="center">
                <Badge status={RESULT_STATUS[r.result]} scale="3xs" />
                <span element="type--body-extra-small" status={RESULT_STATUS[r.result]} className="capitalize">{r.result.replace("-", " ")}</span>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Row>
    </FixtureBody>
  );
}
