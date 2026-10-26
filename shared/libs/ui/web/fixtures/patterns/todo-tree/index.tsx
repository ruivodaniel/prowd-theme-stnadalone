import { useState } from "react";
import { Badge, Button, Checkbox, ListDraggable } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/**
 * Pattern: a nested to-do — ListDraggable draws the list, the rows and the drag; the row is composed here from
 * canonical components only. Layout is <Stack>; no inline styles.
 *
 * One row, left to right: the grip (`ctx.handle`, placed by the row) · a Checkbox (on a row with children it ticks
 * every thing inside it) · the number by position (`ctx.path`) · the title · a Badge with the progress (only a row
 * with children has one) · the actions as icon Buttons: add inside, edit, and expand/collapse (only a row with children
 * has it). The optional detail is a line of quiet type under the title.
 *
 * Dragging: grab the grip. The row under the pointer shows where the drop lands: the top is before it, the bottom
 * is after it, the middle (after the pointer stays there for `dwellMs`) is inside it, as its last child.
 */

type Item = { id: string; title: string; detail?: string; done?: boolean; children: Item[] };

const SEED: Item[] = [
  { id: "1", title: "Foundations", detail: "The slices of the product and what each owns.", children: [
    { id: "1-1", title: "Slice separation", children: [] },
    { id: "1-2", title: "Owner of every page and entity type", children: [] },
    { id: "1-3", title: "ERD per slice", detail: "With the foreign keys that cross slices.", done: true, children: [] },
  ] },
  { id: "2", title: "Versioning", detail: "Every artifact is versioned when a user or an agent changes it.", children: [
    { id: "2-1", title: "What is versioned", children: [] },
    { id: "2-2", title: "History and restore", children: [] },
  ] },
  { id: "3", title: "Storage", children: [] },
];

const leaves = (n: Item): Item[] => (n.children.length ? n.children.flatMap(leaves) : [n]);
const setDone = (ns: Item[], ids: Set<string>, done: boolean): Item[] => ns.map((n) => ({ ...n, done: ids.has(n.id) ? done : n.done, children: setDone(n.children, ids, done) }));

export default function TodoTreeFixture() {
  const [items, setItems] = useState<Item[]>(SEED);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  return (
    <FixtureBody>
      <FixtureContainer width={720}>
        <ListDraggable<Item>
          items={items}
          onItemsChange={setItems}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          renderRow={(item, ctx) => {
            const ls = leaves(item), done = ls.filter((l) => l.done).length, all = ls.length > 0 && done === ls.length;
            return (
              <Stack dir="row" gap={12} align="start">
                {ctx.handle}
                <Checkbox
                  scale="sm"
                  checked={all}
                  onCheckedChange={() => setItems((cur) => setDone(cur, new Set(ls.map((l) => l.id)), !all))}
                />
                <Stack dir="col" gap={2}>
                  <Stack dir="row" gap={8} align="baseline">
                    <span element="type--body-extra-small" emphasis="quiet">{ctx.path}</span>
                    <span element="type--body">{item.title}</span>
                    {ctx.hasChildren && <Badge scale="sm" emphasis="quiet">{done}/{ls.length}</Badge>}
                  </Stack>
                  {item.detail && <span element="type--body-extra-small" emphasis="quiet">{item.detail}</span>}
                </Stack>
                <Stack dir="row" gap={4} align="center">
                  <Button buttonType="icon" startIcon="add" emphasis="quiet" scale="xs" aria-label="Add inside" />
                  <Button buttonType="icon" startIcon="edit" emphasis="quiet" scale="xs" aria-label="Edit" />
                  {ctx.hasChildren && <Button buttonType="icon" startIcon={ctx.expanded ? "chevronUp" : "chevronDown"} emphasis="quiet" scale="xs" aria-label={ctx.expanded ? "Collapse" : "Expand"} onClick={ctx.toggle} />}
                </Stack>
              </Stack>
            );
          }}
        />
      </FixtureContainer>
    </FixtureBody>
  );
}
