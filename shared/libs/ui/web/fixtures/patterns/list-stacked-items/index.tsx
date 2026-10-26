import {
  Avatar, AvatarFallback, Badge, Button, Chip, Icon, Tile,
  List, ListItem, ListItemAction, ListItemContent, ListItemDescription, ListItemIcon, ListItemTitle,
  type IconName,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: list with stacked items — long lists whose rows are themselves
 * compositions. A row is not "label · value": it is an icon cell, a column of
 * title over description over meta, and an action cell — each a Stack.
 *
 * List/ListItem carry what a row IS (its status, whether it is selected); the
 * cells inside are Stacks of type--* with Avatar · Badge · Chip · Tile · Button ·
 * Icon. Nothing here says how a row looks or how rows are separated — the theme
 * decides on `list--item`. Invented from the vocabulary; refine against
 * reference images later.
 */

// ── contacts ─────────────────────────────────────────────────────────────────

type Presence = "success" | "warning" | "neutral";
type Contact = { name: string; email: string; role: string; last: string; presence: Presence; selected?: boolean; invited?: boolean };

const CONTACTS: Contact[] = [
  { name: "Daniel Ruivo", email: "daniel@altar.io", role: "Owner", last: "Active now", presence: "success", selected: true },
  { name: "Inês Carvalho", email: "ines@altar.io", role: "Admin", last: "12 min ago", presence: "success" },
  { name: "Tomás Ferreira", email: "tomas@altar.io", role: "Designer", last: "2 h ago", presence: "neutral" },
  { name: "Marta Silva", email: "marta@altar.io", role: "Engineer", last: "Yesterday", presence: "neutral" },
  { name: "Rui Almeida", email: "rui@altar.io", role: "Engineer", last: "Invite pending", presence: "warning", invited: true },
  { name: "Sofia Mendes", email: "sofia@altar.io", role: "Product", last: "3 days ago", presence: "neutral" },
  { name: "João Costa", email: "joao@altar.io", role: "Viewer", last: "Last week", presence: "neutral" },
  { name: "Beatriz Lopes", email: "beatriz@altar.io", role: "Viewer", last: "Invite pending", presence: "warning", invited: true },
];

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

// ── inbox ────────────────────────────────────────────────────────────────────

type Mail = { from: string; subject: string; preview: string; time: string; unread?: boolean; attachment?: boolean };

const INBOX: Mail[] = [
  { from: "Inês Carvalho", subject: "Q3 roadmap review", preview: "Attaching the deck we discussed — the sequencing on slide 4 changed.", time: "09:12", unread: true, attachment: true },
  { from: "Stripe", subject: "Your invoice INV-2026-0142 is paid", preview: "€4,800.00 was received for Altar Design Systems. No action needed.", time: "08:40", unread: true },
  { from: "Tomás Ferreira", subject: "Re: catalog patterns", preview: "The tile seam question — I think the theme owns it, agreed. Two more…", time: "Yesterday" },
  { from: "GitHub", subject: "[OmniChord-26] 3 pull requests await your review", preview: "stack primitive · card-with-tiles · pattern fixtures", time: "Yesterday" },
  { from: "Marta Silva", subject: "Onboarding flow — copy pass", preview: "Rewrote the empty states; the terms line is still too long for mobile.", time: "Mon", attachment: true },
  { from: "Linear", subject: "Weekly digest", preview: "14 issues closed, 6 created. Cycle 32 ends Friday.", time: "Mon" },
  { from: "Sofia Mendes", subject: "Persona anchors", preview: "Ruled: personas anchor on the org, not the role. Doc updated.", time: "Sun" },
];

// ── orders ───────────────────────────────────────────────────────────────────

type OrderStatus = "Paid" | "Pending" | "Shipped" | "Refunded";
const ORDER_STATUS: Record<OrderStatus, "success" | "warning" | "info" | "error"> = { Paid: "success", Pending: "warning", Shipped: "info", Refunded: "error" };
type Order = { id: string; date: string; customer: string; email: string; items: number; channel: string; amount: string; status: OrderStatus };

const ORDERS: Order[] = [
  { id: "ORD-10482", date: "13 Sep, 09:41", customer: "Helm Works", email: "ops@helm.works", items: 3, channel: "Web", amount: "€1,240.00", status: "Paid" },
  { id: "ORD-10481", date: "13 Sep, 08:15", customer: "Blueway Logistics", email: "billing@blueway.io", items: 12, channel: "API", amount: "€6,380.00", status: "Shipped" },
  { id: "ORD-10480", date: "12 Sep, 22:03", customer: "Ana Ribeiro", email: "ana.r@gmail.com", items: 1, channel: "Web", amount: "€89.00", status: "Pending" },
  { id: "ORD-10479", date: "12 Sep, 18:47", customer: "Nordic Compliance AB", email: "finance@nordic.se", items: 6, channel: "Sales", amount: "€3,150.00", status: "Paid" },
  { id: "ORD-10478", date: "12 Sep, 16:20", customer: "Pedro Nunes", email: "pedro.n@proton.me", items: 2, channel: "Web", amount: "€178.00", status: "Refunded" },
  { id: "ORD-10477", date: "12 Sep, 11:02", customer: "Clerk Studio", email: "hello@clerk.studio", items: 4, channel: "API", amount: "€920.00", status: "Shipped" },
  { id: "ORD-10476", date: "11 Sep, 19:35", customer: "Loan Plans Ltd", email: "ap@loanplans.co", items: 8, channel: "Sales", amount: "€4,410.00", status: "Paid" },
  { id: "ORD-10475", date: "11 Sep, 14:12", customer: "Rita Gomes", email: "rita.g@outlook.com", items: 1, channel: "Web", amount: "€45.00", status: "Pending" },
];

// ── activity ─────────────────────────────────────────────────────────────────

type Activity = { actor: string; action: string; object: string; time: string; icon: IconName; status?: "success" | "error" | "info" | "warning" };

const ACTIVITY: Activity[] = [
  { actor: "Daniel Ruivo", action: "merged", object: "stack: the auto-layout primitive as a library component", time: "2 min ago", icon: "gitMerge", status: "success" },
  { actor: "CI", action: "failed", object: "theme:build · wireframe-stroke v1", time: "9 min ago", icon: "error", status: "error" },
  { actor: "Inês Carvalho", action: "commented on", object: "card-with-tiles — the seam belongs to the theme", time: "24 min ago", icon: "message" },
  { actor: "Tomás Ferreira", action: "uploaded", object: "32 images to Component-examples", time: "1 h ago", icon: "upload" },
  { actor: "Marta Silva", action: "opened", object: "PR #418 · Tile emits surface--tile", time: "2 h ago", icon: "gitBranch", status: "info" },
  { actor: "Rui Almeida", action: "was invited to", object: "Altar Design Systems", time: "3 h ago", icon: "userPlus" },
  { actor: "Deploy", action: "promoted", object: "catalog → staging", time: "5 h ago", icon: "package", status: "success" },
  { actor: "Sofia Mendes", action: "archived", object: "explorations/OLD (9 items)", time: "Yesterday", icon: "archive", status: "warning" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ListStackedItemsFixture() {
  return (
    <FixtureBody>
      <Row label="contacts — 8 rows: Avatar with presence · name + role Badge over email over last-active · two actions; one row selected, invites carry status">
        <List className="w-full max-w-2xl">
          {CONTACTS.map((c) => (
            <ListItem key={c.email} status={c.invited ? "warning" : undefined} state={c.selected ? "selected" : undefined} className="gap-3">
              <ListItemIcon>
                <Avatar scale="md" status={c.presence}><AvatarFallback>{initials(c.name)}</AvatarFallback></Avatar>
              </ListItemIcon>
              <ListItemContent>
                <Stack dir="col" gap={2}>
                  <Stack dir="row" align="baseline" gap={8}>
                    <ListItemTitle>{c.name}</ListItemTitle>
                    <Badge emphasis="quiet">{c.role}</Badge>
                  </Stack>
                  <ListItemDescription>{c.email}</ListItemDescription>
                  <span element="type--body-extra-small" emphasis="quiet" status={c.invited ? "warning" : undefined}>{c.last}</span>
                </Stack>
              </ListItemContent>
              <ListItemAction>
                <Stack dir="row" gap={4}>
                  <Button buttonType="icon" startIcon="mail" emphasis="quiet" scale="sm" aria-label={`Email ${c.name}`} />
                  <Button buttonType="icon" startIcon="more" emphasis="quiet" scale="sm" aria-label="More" />
                </Stack>
              </ListItemAction>
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="inbox — 7 rows: sender + time on one line · subject · preview; unread rows carry a Badge, attachments an icon">
        <List className="w-full max-w-2xl">
          {INBOX.map((m) => (
            <ListItem key={m.subject} className="gap-3">
              <ListItemIcon>
                <Avatar scale="md"><AvatarFallback>{initials(m.from)}</AvatarFallback></Avatar>
              </ListItemIcon>
              <ListItemContent>
                <Stack dir="col" gap={2}>
                  <Stack dir="row" align="baseline" justify="between" gap={8}>
                    <Stack dir="row" align="baseline" gap={8}>
                      <ListItemTitle>{m.from}</ListItemTitle>
                      {m.unread && <Badge status="info" scale="xs">New</Badge>}
                    </Stack>
                    <span element="type--body-extra-small" emphasis="quiet">{m.time}</span>
                  </Stack>
                  <span element="type--body">{m.subject}</span>
                  <ListItemDescription>{m.preview}</ListItemDescription>
                </Stack>
              </ListItemContent>
              {m.attachment && (
                <ListItemAction>
                  <span element="type--body-small" emphasis="quiet"><Icon name="file" size="sm" /></span>
                </ListItemAction>
              )}
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="orders — 8 dense rows of four stacked cells: id over date · customer over email · items over channel · amount over status Badge">
        <List className="w-full max-w-3xl">
          {ORDERS.map((o) => (
            <ListItem key={o.id} className="gap-3">
              <ListItemContent>
                <Stack dir="row" align="center" gap={24}>
                  <Stack dir="col" gap={2} className="w-36">
                    <span element="type--code">{o.id}</span>
                    <span element="type--body-extra-small" emphasis="quiet">{o.date}</span>
                  </Stack>
                  <Stack dir="col" gap={2} size="fill">
                    <ListItemTitle>{o.customer}</ListItemTitle>
                    <ListItemDescription>{o.email}</ListItemDescription>
                  </Stack>
                  <Stack dir="col" gap={2} className="w-24">
                    <span element="type--body-small">{o.items} {o.items === 1 ? "item" : "items"}</span>
                    <span element="type--body-extra-small" emphasis="quiet">{o.channel}</span>
                  </Stack>
                  <Stack dir="col" gap={2} align="end" className="w-28">
                    <span element="type--numbers-small">{o.amount}</span>
                    <Badge emphasis="quiet" status={ORDER_STATUS[o.status]} scale="xs">{o.status}</Badge>
                  </Stack>
                </Stack>
              </ListItemContent>
              <ListItemAction>
                <span element="type--body-small" emphasis="quiet"><Icon name="chevronRight" size="sm" /></span>
              </ListItemAction>
            </ListItem>
          ))}
        </List>
      </Row>

      <Row label="activity — 8 rows: a typed icon Tile · actor + verb over the object over the time; the row's status is the event's">
        <List className="w-full max-w-2xl">
          {ACTIVITY.map((a, i) => (
            <ListItem key={i} status={a.status} className="gap-3">
              <ListItemIcon>
                <Tile emphasis="quiet" className="p-2"><span element="type--body-small" status={a.status}><Icon name={a.icon} size="sm" /></span></Tile>
              </ListItemIcon>
              <ListItemContent>
                <Stack dir="col" gap={2}>
                  <Stack dir="row" align="baseline" gap={6} wrap>
                    <ListItemTitle>{a.actor}</ListItemTitle>
                    <span element="type--body-small" emphasis="quiet">{a.action}</span>
                  </Stack>
                  <ListItemDescription>{a.object}</ListItemDescription>
                  <span element="type--body-extra-small" emphasis="quiet">{a.time}</span>
                </Stack>
              </ListItemContent>
              {a.status === "error" && (
                <ListItemAction>
                  <Chip emphasis="tertiary" scale="sm" closable={false}>Retry</Chip>
                </ListItemAction>
              )}
            </ListItem>
          ))}
        </List>
      </Row>
    </FixtureBody>
  );
}
