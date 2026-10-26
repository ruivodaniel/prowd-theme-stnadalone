import { Tabs, TabsContent, TabsList, TabsTrigger } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: three tabs, one paragraph each — Tabs parts, nothing else. The panel's padding is the theme's. */
const TABS = [
  { value: "account", label: "Account", content: "Manage your account settings and preferences." },
  { value: "security", label: "Security", content: "Update your password and security options." },
  { value: "notifications", label: "Notifications", content: "Configure your notification preferences." },
];

export default function TabsSimpleFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            {TABS.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              <p element="type--body-small" emphasis="quiet">{t.content}</p>
            </TabsContent>
          ))}
        </Tabs>
      </FixtureContainer>
    </FixtureBody>
  );
}
