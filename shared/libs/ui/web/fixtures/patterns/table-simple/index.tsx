import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: a three-column table of invoices, amounts right-aligned — Table parts, nothing else. */
const ROWS = [
  { id: "INV-001", status: "Paid", amount: "$250.00" },
  { id: "INV-002", status: "Pending", amount: "$150.00" },
  { id: "INV-003", status: "Unpaid", amount: "$350.00" },
  { id: "INV-004", status: "Paid", amount: "$450.00" },
];

export default function TableSimpleFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell className="text-right">{r.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FixtureContainer>
    </FixtureBody>
  );
}
