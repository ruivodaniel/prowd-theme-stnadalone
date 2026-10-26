import {
  Avatar,
  AvatarFallback,
  Button,
  Icon,
  List,
  ListItem,
  ListItemContent,
  Textarea,
  Tile,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: chat — a message thread + composer, from canonical components only.
 * A message is a Tile (surface--tile) holding text; "mine" vs "theirs" is the
 * emphasis axis, never a hand-picked colour. Layout is <Stack>; rows are plain
 * Stack rows (not List/ListItem — a message isn't a selectable row).
 *
 * Replaces the hand-rolled bubbles in ReportChat.tsx / AlignChat.tsx
 * (arbitrary bg-[var(--…,#hex)] + rounded-xl) — those should render Message()
 * from this pattern via a canonical component instead.
 */

type Msg = { id: string; from: "me" | "them"; author: string; text: string; when: string };

const THREAD: Msg[] = [
  { id: "m1", from: "them", author: "dAInta", text: "I drafted the FAT protocol outline from the run — 6 sections. Reorder or drop them, then tell me when you're ready.", when: "09:14" },
  { id: "m2", from: "me", author: "You", text: "Move Deviations above Test cases.", when: "09:15" },
  { id: "m3", from: "them", author: "dAInta", text: "Done. Deviations now precedes the test cases. Ready to preview when you are.", when: "09:15" },
];

function Message({ m }: { m: Msg }) {
  const mine = m.from === "me";
  return (
    <Stack dir="row" gap={8} align="start" justify={mine ? "end" : "start"} data-testid={`msg-${m.id}`}>
      {!mine && (
        <Avatar scale="xs">
          <AvatarFallback><Icon name="bot" size="xs" /></AvatarFallback>
        </Avatar>
      )}
      <Stack dir="col" gap={2} className="max-w-[82%]">
        <Tile emphasis={mine ? "secondary" : "quiet"} className="px-3 py-2">
          <span element="type--body-small">{m.text}</span>
        </Tile>
        <span element="type--body-extra-small" emphasis="quiet" className={mine ? "text-right" : undefined}>
          {mine ? m.when : `${m.author} · ${m.when}`}
        </span>
      </Stack>
    </Stack>
  );
}

function Composer() {
  return (
    <Stack dir="col" gap={8} className="w-full">
      <Textarea placeholder="Message dAInta…" minRows={1} maxRows={4} autoSize data-testid="chat-input" />
      <Stack dir="row" justify="end">
        <Button emphasis="primary" scale="sm" data-testid="chat-send">Send</Button>
      </Stack>
    </Stack>
  );
}

export default function ChatFixture() {
  return (
    <FixtureBody>
      <Row label="#1 · thread + composer — Message bubbles (Tile, emphasis='secondary' mine · 'quiet' theirs) over a Stack; a fixed Composer (Textarea + primary Button) below, no Separator needed (the two Stacks read as regions on their own)">
        <Stack dir="col" gap={16} className="w-full max-w-md">
          <Stack dir="col" gap={12}>
            {THREAD.map((m) => <Message key={m.id} m={m} />)}
          </Stack>
          <Composer />
        </Stack>
      </Row>

      <Row label="#2 · thread as List — same messages as ListItem rows (state='selected' stands in for 'unread'); use when the thread lives in a sidebar/panel and rows need a hover/selected affordance">
        <List className="w-full max-w-md">
          {THREAD.map((m, i) => (
            <ListItem key={m.id} state={i === THREAD.length - 1 ? "selected" : undefined} className="gap-3">
              <ListItemContent>
                <Stack dir="row" gap={8} align="start">
                  {m.from === "them" && (
                    <Avatar scale="xs"><AvatarFallback><Icon name="bot" size="xs" /></AvatarFallback></Avatar>
                  )}
                  <Stack dir="col" gap={2} size="fill">
                    <Stack dir="row" gap={8} align="baseline">
                      <span element="type--body-small" emphasis={m.from === "me" ? "primary" : "secondary"}>{m.author}</span>
                      <span element="type--body-extra-small" emphasis="quiet">{m.when}</span>
                    </Stack>
                    <span element="type--body-small" emphasis="quiet">{m.text}</span>
                  </Stack>
                </Stack>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Row>

      {/* GAP: no distinct "read/unread" indicator component — state="selected" on the
          last ListItem stands in for #2; a real unread affordance (dot + bold) needs
          a decision from the theme, not an invented colour here. */}
    </FixtureBody>
  );
}
