import { useState } from "react";
import { ListDraggable } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

type Item = { id: string; title: string; children: Item[] };

const SEED: Item[] = [
  { id: "1", title: "Foundations", children: [
    { id: "1-1", title: "Slice separation", children: [] },
    { id: "1-2", title: "Owner of every page", children: [] },
  ] },
  { id: "2", title: "Versioning", children: [
    { id: "2-1", title: "What is versioned", children: [] },
    { id: "2-2", title: "History and restore", children: [] },
  ] },
  { id: "3", title: "Storage", children: [] },
];

function Demo({ dragPreview = true, nesting = true, disabled = false }: { dragPreview?: boolean; nesting?: boolean; disabled?: boolean }) {
  const [items, setItems] = useState<Item[]>(SEED);
  return (
    <ListDraggable<Item>
      items={items}
      onItemsChange={setItems}
      dragPreview={dragPreview}
      nesting={nesting}
      disabled={disabled}
      renderRow={(item, ctx) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {ctx.handle}
          <span>{ctx.path}</span>
          <span style={{ flex: 1 }}>{item.title}</span>
          {ctx.hasChildren && <button type="button" onClick={ctx.toggle} aria-label={ctx.expanded ? "Collapse" : "Expand"}>{ctx.expanded ? "−" : "+"}</button>}
        </div>
      )}
    />
  );
}

export default function ListDraggableFixture() {
  return (
    <FixtureBody>
      <Row label="default: preview, nesting"><Demo /></Row>
      <Row label="no preview"><Demo dragPreview={false} /></Row>
      <Row label="no nesting"><Demo nesting={false} /></Row>
      <Row label="disabled"><Demo disabled /></Row>
    </FixtureBody>
  );
}
