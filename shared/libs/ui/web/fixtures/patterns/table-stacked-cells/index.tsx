import {
  Avatar, AvatarFallback, Badge, Button, Icon,
  Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: table with stacked cells — a real Table whose cells are compositions.
 * A cell is not one value: it is an Avatar beside a name over an email, a date
 * over a status-coloured relative time, a number over its delta, a header label
 * over its unit. Each cell's inside is a Stack of type--*.
 *
 * Table parts carry what things ARE (header, row, cell, footer, a selected row);
 * the theme decides rules, banding and hover on `table--*`. Invented from the
 * vocabulary; refine against reference images later.
 */

// ── team ─────────────────────────────────────────────────────────────────────

type Member = { name: string; email: string; role: string; status: "Active" | "Away" | "Invited"; active: string; date: string; selected?: boolean };
const MEMBER_STATUS: Record<Member["status"], "success" | "neutral" | "warning"> = { Active: "success", Away: "neutral", Invited: "warning" };

const TEAM: Member[] = [
  { name: "Daniel Ruivo", email: "daniel@altar.io", role: "Owner", status: "Active", active: "Now", date: "13 Sep 2026", selected: true },
  { name: "Inês Carvalho", email: "ines@altar.io", role: "Admin", status: "Active", active: "12 min ago", date: "13 Sep 2026" },
  { name: "Tomás Ferreira", email: "tomas@altar.io", role: "Designer", status: "Away", active: "2 h ago", date: "13 Sep 2026" },
  { name: "Marta Silva", email: "marta@altar.io", role: "Engineer", status: "Away", active: "Yesterday", date: "12 Sep 2026" },
  { name: "Rui Almeida", email: "rui@altar.io", role: "Engineer", status: "Invited", active: "—", date: "Invited 11 Sep" },
  { name: "Sofia Mendes", email: "sofia@altar.io", role: "Product", status: "Away", active: "3 days ago", date: "10 Sep 2026" },
  { name: "João Costa", email: "joao@altar.io", role: "Viewer", status: "Away", active: "Last week", date: "5 Sep 2026" },
];

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

// ── invoices ─────────────────────────────────────────────────────────────────

type InvoiceStatus = "Paid" | "Due" | "Overdue" | "Draft";
const INVOICE_STATUS: Record<InvoiceStatus, "success" | "info" | "error" | "neutral"> = { Paid: "success", Due: "info", Overdue: "error", Draft: "neutral" };
type Invoice = { number: string; issued: string; company: string; contact: string; amount: string; status: InvoiceStatus; due: string; rel: string };

const INVOICES: Invoice[] = [
  { number: "INV-2026-0142", issued: "1 Sep 2026", company: "Altar Design Systems", contact: "Inês Carvalho", amount: "€4,800.00", status: "Paid", due: "15 Sep 2026", rel: "paid 12 Sep" },
  { number: "INV-2026-0141", issued: "28 Aug 2026", company: "Blueway Logistics", contact: "Nuno Baptista", amount: "€6,380.00", status: "Due", due: "16 Sep 2026", rel: "in 3 days" },
  { number: "INV-2026-0140", issued: "20 Aug 2026", company: "Helm Works", contact: "Carla Reis", amount: "€1,240.00", status: "Overdue", due: "3 Sep 2026", rel: "10 days late" },
  { number: "INV-2026-0139", issued: "18 Aug 2026", company: "Nordic Compliance AB", contact: "Erik Lund", amount: "€3,150.00", status: "Paid", due: "1 Sep 2026", rel: "paid 30 Aug" },
  { number: "INV-2026-0138", issued: "—", company: "Clerk Studio", contact: "Maya Ortiz", amount: "€920.00", status: "Draft", due: "—", rel: "not sent" },
  { number: "INV-2026-0137", issued: "5 Aug 2026", company: "Loan Plans Ltd", contact: "Owen Price", amount: "€4,410.00", status: "Overdue", due: "19 Aug 2026", rel: "25 days late" },
  { number: "INV-2026-0136", issued: "1 Aug 2026", company: "Nordic Compliance AB", contact: "Erik Lund", amount: "€3,150.00", status: "Paid", due: "15 Aug 2026", rel: "paid 14 Aug" },
];

const REL_STATUS: Record<InvoiceStatus, "success" | "info" | "error" | undefined> = { Paid: "success", Due: "info", Overdue: "error", Draft: undefined };

// ── regions ──────────────────────────────────────────────────────────────────

type Region = { name: string; revenue: string; revDelta: string; orders: string; ordDelta: string; aov: string; aovDelta: string; up: [boolean, boolean, boolean] };

const REGIONS: Region[] = [
  { name: "Portugal", revenue: "48.2k", revDelta: "+12%", orders: "1,092", ordDelta: "+4%", aov: "44.10", aovDelta: "+7%", up: [true, true, true] },
  { name: "Spain", revenue: "31.7k", revDelta: "+3%", orders: "804", ordDelta: "−2%", aov: "39.40", aovDelta: "+5%", up: [true, false, true] },
  { name: "Nordics", revenue: "27.9k", revDelta: "+18%", orders: "512", ordDelta: "+11%", aov: "54.50", aovDelta: "+6%", up: [true, true, true] },
  { name: "UK", revenue: "22.4k", revDelta: "−6%", orders: "633", ordDelta: "−9%", aov: "35.40", aovDelta: "+3%", up: [false, false, true] },
  { name: "Germany", revenue: "19.1k", revDelta: "+1%", orders: "440", ordDelta: "+2%", aov: "43.40", aovDelta: "−1%", up: [true, true, false] },
];

const Delta = ({ value, up }: { value: string; up: boolean }) => (
  <span element="type--body-extra-small" status={up ? "success" : "error"}>
    <Icon name={up ? "arrowUp" : "arrowDown"} size="xs" /> {value}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function TableStackedCellsFixture() {
  return (
    <FixtureBody>
      <Row label="team — member = Avatar beside name over email · role Badge · status dot + text · last active over date · actions; one row selected">
        <div className="w-full max-w-3xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM.map((m) => (
                <TableRow key={m.email} state={m.selected ? "selected" : undefined}>
                  <TableCell>
                    <Stack dir="row" align="center" gap={10}>
                      <Avatar scale="sm"><AvatarFallback>{initials(m.name)}</AvatarFallback></Avatar>
                      <Stack dir="col" gap={2}>
                        <span element="type--body">{m.name}</span>
                        <span element="type--body-extra-small" emphasis="quiet">{m.email}</span>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell><Badge emphasis="quiet">{m.role}</Badge></TableCell>
                  <TableCell>
                    <span element="type--body-small" status={MEMBER_STATUS[m.status]}>
                      <Icon name="dot" size="xs" /> {m.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--body-small">{m.active}</span>
                      <span element="type--body-extra-small" emphasis="quiet">{m.date}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack dir="row" justify="end" gap={4}>
                      <Button buttonType="icon" startIcon="edit" emphasis="quiet" scale="sm" aria-label={`Edit ${m.name}`} />
                      <Button buttonType="icon" startIcon="more" emphasis="quiet" scale="sm" aria-label="More" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Row>

      <Row label="invoices — number over issued date · company over contact · amount · status Badge · due date over a status-coloured relative time · a footer total">
        <div className="w-full max-w-3xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.number}>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--code">{inv.number}</span>
                      <span element="type--body-extra-small" emphasis="quiet">Issued {inv.issued}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--body">{inv.company}</span>
                      <span element="type--body-extra-small" emphasis="quiet">{inv.contact}</span>
                    </Stack>
                  </TableCell>
                  <TableCell><span element="type--numbers-small">{inv.amount}</span></TableCell>
                  <TableCell><Badge emphasis="quiet" status={INVOICE_STATUS[inv.status]}>{inv.status}</Badge></TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--body-small">{inv.due}</span>
                      <span element="type--body-extra-small" emphasis={REL_STATUS[inv.status] ? undefined : "quiet"} status={REL_STATUS[inv.status]}>{inv.rel}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack dir="row" justify="end">
                      <Button buttonType="icon" startIcon="download" emphasis="quiet" scale="sm" aria-label={`Download ${inv.number}`} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell><span element="type--body-small" emphasis="quiet">7 invoices</span></TableCell>
                <TableCell><span element="type--body-small" emphasis="quiet">3 paid · 1 due · 2 overdue · 1 draft</span></TableCell>
                <TableCell><span element="type--numbers-small">€24,050.00</span></TableCell>
                <TableCell />
                <TableCell><span element="type--body-small" status="error">€5,650.00 overdue</span></TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Row>

      <Row label="regions — stacked header cells (label over unit) · body cells of a number over its delta">
        <div className="w-full max-w-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>
                  <Stack dir="col" gap={2}>
                    <span>Revenue</span>
                    <span element="type--body-extra-small" emphasis="quiet">EUR · month</span>
                  </Stack>
                </TableHead>
                <TableHead>
                  <Stack dir="col" gap={2}>
                    <span>Orders</span>
                    <span element="type--body-extra-small" emphasis="quiet">count · month</span>
                  </Stack>
                </TableHead>
                <TableHead>
                  <Stack dir="col" gap={2}>
                    <span>Avg. order</span>
                    <span element="type--body-extra-small" emphasis="quiet">EUR</span>
                  </Stack>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REGIONS.map((r) => (
                <TableRow key={r.name}>
                  <TableCell><span element="type--body">{r.name}</span></TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--numbers-small">{r.revenue}</span>
                      <Delta value={r.revDelta} up={r.up[0]} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--numbers-small">{r.orders}</span>
                      <Delta value={r.ordDelta} up={r.up[1]} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack dir="col" gap={2}>
                      <span element="type--numbers-small">{r.aov}</span>
                      <Delta value={r.aovDelta} up={r.up[2]} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Row>
    </FixtureBody>
  );
}
