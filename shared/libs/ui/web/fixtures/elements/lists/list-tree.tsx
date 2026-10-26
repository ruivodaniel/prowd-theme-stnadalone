import { useState } from "react";
import { ListTree } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

type Item = { id: string; title: string; note?: string; children?: Item[] };

const SEED: Item[] = [
  { id: "mon-projet", title: "mon-projet", children: [
    { id: "package", title: "package.json" },
    { id: "public", title: "public", children: [{ id: "favicon", title: "favicon.ico" }] },
    { id: "readme", title: "README.md" },
    { id: "src", title: "src", children: [
      { id: "index", title: "index.js" },
      { id: "styles", title: "styles.css" },
    ] },
  ] },
  { id: "docs", title: "docs", children: [
    { id: "intro", title: "intro.md", note: "A longer entry: a row can hold anything, and the line beside it goes on through every row below the gap." },
    { id: "api", title: "api.md" },
  ] },
  { id: "license", title: "LICENSE" },
];

const node = (item: Item, ctx: { handle: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    {ctx.handle}
    <span style={{ flex: 1 }}>{item.title}{item.note && <><br /><small>{item.note}</small></>}</span>
  </div>
);

function Demo(props: Partial<React.ComponentProps<typeof ListTree>>) {
  const [items, setItems] = useState<Item[]>(SEED);
  const [selectedId, setSelectedId] = useState<string | null>("readme");
  return <ListTree<Item> items={items} onItemsChange={setItems} selectedId={selectedId} onSelect={(i) => setSelectedId(i.id)} renderNode={node} {...(props as object)} />;
}

export default function ListTreeFixture() {
  return (
    <FixtureBody>
      <Row label="lines · indent"><Demo lines /></Row>
      <Row label="lines · anchor top · tall rows"><Demo lines anchor="top" /></Row>
      <Row label="indent only"><Demo /></Row>
      <Row label="no indent (the caller turns depth into heading levels)"><Demo indent={false} /></Row>
      <Row label="reorderable · lines"><Demo lines reorderable /></Row>
      <Row label="expand single (every level): opening a row closes its open siblings"><Demo lines expand="single" /></Row>
      <Row label="expand per level: level 1 single, level 2 multiple"><Demo lines expand={["single", "multiple"]} /></Row>
      <Row label="toggleOnClick (every level)"><Demo lines toggleOnClick /></Row>
      <Row label="toggleOnClick: level 1 only · expand single"><Demo lines toggleOnClick={[true, false]} expand="single" /></Row>
      <Row label="not collapsible"><Demo lines collapsible={false} /></Row>
      <Row label="disabled"><Demo lines reorderable disabled /></Row>
    </FixtureBody>
  );
}
