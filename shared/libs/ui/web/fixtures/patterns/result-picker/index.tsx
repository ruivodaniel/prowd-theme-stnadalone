import { Button, ButtonGroup, Icon } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";
import * as React from "react";

/**
 * Pattern: result picker — a two/three-way "mark this" choice, from canonical
 * components only. Each option is a full-size Button carrying `status`
 * (success/error/…); the chosen one adds `state="selected"`. Grouped in a
 * ButtonGroup so they read as one control, not two floating buttons.
 *
 * Replaces TestRunRunPage.tsx's `BigMark` — a raw `<button>` with inline
 * `style={{ border, color, background }}` and a `color="#16a34a"` prop.
 */

function PassFail() {
  const [v, setV] = React.useState<"pass" | "fail" | null>(null);
  return (
    <ButtonGroup scale="lg" className="w-full max-w-sm">
      <Button
        fill
        status="success"
        emphasis={v === "pass" ? "primary" : "secondary"}
        state={v === "pass" ? "selected" : undefined}
        startIcon="check"
        data-testid="mark-pass"
        onClick={() => setV("pass")}
      >
        Pass
      </Button>
      <Button
        fill
        status="error"
        emphasis={v === "fail" ? "primary" : "secondary"}
        state={v === "fail" ? "selected" : undefined}
        startIcon="close"
        data-testid="mark-fail"
        onClick={() => setV("fail")}
      >
        Fail
      </Button>
    </ButtonGroup>
  );
}

function PassNoteFlag() {
  const [v, setV] = React.useState<"pass" | "note" | "flag" | null>("pass");
  const opts = [
    { id: "pass", label: "Pass", status: "success", icon: "check" as const },
    { id: "note", label: "Note", status: "info", icon: "message" as const },
    { id: "flag", label: "Flag", status: "warning", icon: "warning" as const },
  ];
  return (
    <ButtonGroup scale="md" className="w-full max-w-md">
      {opts.map((o) => (
        <Button
          key={o.id}
          fill
          status={o.status as "success" | "info" | "warning"}
          emphasis={v === o.id ? "primary" : "secondary"}
          state={v === o.id ? "selected" : undefined}
          startIcon={o.icon}
          data-testid={`mark-${o.id}`}
          onClick={() => setV(o.id as typeof v)}
        >
          {o.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default function ResultPickerFixture() {
  return (
    <FixtureBody>
      <Row label="#1 · Pass / Fail — a two-way ButtonGroup, each Button carrying its own status; the chosen one is emphasis='primary' + state='selected', the other stays 'secondary'">
        <Stack dir="col" gap={8} align="start">
          <PassFail />
        </Stack>
      </Row>

      <Row label="#2 · Pass / Note / Flag — the three-way variant (test-run-run's actual choice set), same recipe at scale='md'">
        <Stack dir="col" gap={8} align="start">
          <PassNoteFlag />
        </Stack>
      </Row>
    </FixtureBody>
  );
}
