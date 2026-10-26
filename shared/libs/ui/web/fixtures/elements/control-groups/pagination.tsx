import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function PaginationFixture() {
  return (
    <FixtureBody>
      <Row label="Previous (disabled) | 1 | 2 (selected) | 3 | … | 12 | Next">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink>12</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Row>
    </FixtureBody>
  );
}
