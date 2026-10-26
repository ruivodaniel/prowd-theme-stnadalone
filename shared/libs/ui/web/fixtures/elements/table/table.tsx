import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function TableFixture() {
  return (
    <FixtureBody>
      <Row label="header + body + footer">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Members</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar scale="sm"><AvatarFallback>PA</AvatarFallback></Avatar>
                  <span element="type--body-small">Platform Admin</span>
                </div>
              </TableCell>
              <TableCell><span element="type--body-small">Owner</span></TableCell>
              <TableCell><Badge status="success" scale="sm">Active</Badge></TableCell>
              <TableCell><Badge scale="xs">24</Badge></TableCell>
              <TableCell><Button buttonType="icon" startIcon="arrowRight" emphasis="secondary" scale="sm" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar scale="sm"><AvatarFallback>HC</AvatarFallback></Avatar>
                  <span element="type--body-small">Health Co</span>
                </div>
              </TableCell>
              <TableCell><span element="type--body-small">Member</span></TableCell>
              <TableCell><Badge status="neutral" scale="sm">Inactive</Badge></TableCell>
              <TableCell><Badge scale="xs">7</Badge></TableCell>
              <TableCell><Button buttonType="icon" startIcon="arrowRight" emphasis="secondary" scale="sm" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar scale="sm"><AvatarFallback>CN</AvatarFallback></Avatar>
                  <span element="type--body-small">Organization</span>
                </div>
              </TableCell>
              <TableCell><span element="type--body-small">Admin</span></TableCell>
              <TableCell><Badge status="success" scale="sm">Active</Badge></TableCell>
              <TableCell><Badge scale="xs">41</Badge></TableCell>
              <TableCell><Button buttonType="icon" startIcon="arrowRight" emphasis="secondary" scale="sm" /></TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}><span element="type--body-small" emphasis="quiet">Showing 3 of 3</span></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Row>
    </FixtureBody>
  );
}
