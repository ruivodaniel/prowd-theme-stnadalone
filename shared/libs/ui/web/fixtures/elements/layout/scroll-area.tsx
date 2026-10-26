import { ScrollArea, ScrollBar } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ScrollAreaFixture() {
  return (
    <FixtureBody>
      <Row label="vertical">
        <ScrollArea style={{ height: 120, width: 240 }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
          <p>Nulla pariatur. Curabitur pretium tincidunt lacus.</p>
          <p>Nulla gravida orci a odio, et tempus feugiat.</p>
          <p>Nullam varius, turpis molestie pretium placerat.</p>
          <p>Aliquam erat volutpat. Nam dui mi, tincidunt quis.</p>
          <p>Phasellus ultrices nulla quis nibh. Quisque a lectus.</p>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Row>
      <Row label="horizontal">
        <ScrollArea style={{ width: 240, whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-flex", gap: 16, padding: "8px 0" }}>
            <span>Item one</span>
            <span>Item two</span>
            <span>Item three</span>
            <span>Item four</span>
            <span>Item five</span>
            <span>Item six</span>
            <span>Item seven</span>
            <span>Item eight</span>
            <span>Item nine</span>
            <span>Item ten</span>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Row>
    </FixtureBody>
  );
}
