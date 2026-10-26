import type { ReactNode } from "react";
import { Card, Badge } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";

/**
 * Layout: Stack — the auto-layout primitive. A box that is a row or a column,
 * owning the gap and the alignment; children hug, fill or stay fixed. Nest it
 * to build anything. Cells are Card — a canonical surface — so the boxes are
 * visible; the only thing doing layout is <Stack>. Canonical components only.
 */

const Label = ({ children }: { children: ReactNode }) => (
  <span element="type--body-extra-small" emphasis="quiet">{children}</span>
);

// a cell is a Card; its flex behaviour is a structural utility on the Card
const Cell = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <Card className={`p-3 ${className}`}>
    <span element="type--body-small">{children}</span>
  </Card>
);

export default function Fixture() {
  return (
    <Stack dir="col" gap={32} pad={32}>

      <Stack dir="col" gap={10}>
        <Label>direction — a row, and a column (same component, dir="row" | "col")</Label>
        <Stack dir="row" gap={24} align="start">
          <Stack dir="row" gap={10} className="w-80">
            <Cell className="flex-1 min-w-0">one</Cell>
            <Cell className="flex-1 min-w-0">two</Cell>
            <Cell className="flex-1 min-w-0">three</Cell>
          </Stack>
          <Stack dir="col" gap={10} className="w-40">
            <Cell>one</Cell>
            <Cell>two</Cell>
            <Cell>three</Cell>
          </Stack>
        </Stack>
      </Stack>

      <Stack dir="col" gap={10}>
        <Label>sizing — hug · fill · fixed (the child decides how it takes space)</Label>
        <Stack dir="row" gap={10} className="w-full max-w-xl">
          <Cell className="flex-none">hug</Cell>
          <Cell className="flex-1 min-w-0">fill — grows to eat the leftover space</Cell>
          <Cell className="flex-none w-28">fixed · w-28</Cell>
        </Stack>
      </Stack>

      <Stack dir="col" gap={10}>
        <Label>nesting — a column of a row of fills, holding a stack (no new concept)</Label>
        <Stack dir="col" gap={10} className="w-full max-w-xl h-56">
          <Cell className="flex-none">header · hug height</Cell>
          <Stack dir="row" gap={10} size="fill">
            <Stack dir="col" gap={10} size="fill">
              <Cell className="flex-none">left · a</Cell>
              <Cell className="flex-1 min-h-0">left · b (fills the rest)</Cell>
            </Stack>
            <Cell className="flex-1 min-w-0">right (fills)</Cell>
          </Stack>
          <Cell className="flex-none">footer · hug height</Cell>
        </Stack>
      </Stack>

      <Stack dir="col" gap={10}>
        <Label>wrap — a cluster that flows onto the next line</Label>
        <Stack dir="row" gap={8} wrap className="w-80">
          {["design", "system", "auto", "layout", "stack", "row", "column", "gap", "fill", "hug"].map((t) => (
            <Badge key={t} emphasis="secondary">{t}</Badge>
          ))}
        </Stack>
      </Stack>

    </Stack>
  );
}
