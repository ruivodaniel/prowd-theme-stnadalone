import { PageHeader, SecondPageHeader, PageBody, LeftSidebar, Main, MainHeader, SecondMainHeader, MainContent, MainBody, Container, ContextPanel, MainFooter, RightSidebar } from "@libs/web-layouts";
import { LOREM } from "../_lorem";
import { InShell } from "../_frame";

// Anatomy · soft — no dark band anywhere. The page header steps down to a
// branded-gray strip (secondary); every other region stays canvas with its
// thin rule. The calm, all-light distribution.
export default function Fixture() {
  return (
    <InShell>
      <PageHeader emphasis="secondary">page-header</PageHeader>
      <SecondPageHeader>second-page-header</SecondPageHeader>
      <PageBody className="flex flex-1 overflow-hidden">
        <LeftSidebar>left-sidebar</LeftSidebar>
        <Main className="flex flex-1 flex-col overflow-hidden">
          <MainHeader>main-header</MainHeader>
          <SecondMainHeader>second-main-header</SecondMainHeader>
          <MainContent className="flex flex-1 overflow-hidden">
            <MainBody className="flex flex-1 flex-col overflow-y-auto">
              <Container>{LOREM}</Container>
            </MainBody>
            <ContextPanel>context-panel</ContextPanel>
          </MainContent>
          <MainFooter>main-footer</MainFooter>
        </Main>
        <RightSidebar>right-sidebar</RightSidebar>
      </PageBody>
    </InShell>
  );
}
