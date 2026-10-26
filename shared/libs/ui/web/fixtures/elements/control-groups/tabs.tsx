import { Tabs, TabsList, TabsTrigger } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function TabsFixture() {
  return (
    <FixtureBody>
      <Row label="default — All / Active / Inactive / Disabled">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
          </TabsList>
        </Tabs>
      </Row>
    </FixtureBody>
  );
}
