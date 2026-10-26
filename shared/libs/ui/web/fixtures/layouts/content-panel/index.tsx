import { PageHeader, PageBody, Main, MainContent, MainBody, Container, ContextPanel } from "@libs/web-layouts";
import { LOREM } from "../_lorem";
import { InShell } from "../_frame";

export default function Fixture() {
  return (
    <InShell>
      <PageHeader>page-header</PageHeader>
      <PageBody className="flex flex-1 overflow-hidden">
        <Main className="flex flex-1 flex-col overflow-hidden">
          <MainContent className="flex flex-1 overflow-hidden">
            <MainBody className="flex flex-1 flex-col overflow-y-auto">
              <Container>{LOREM}</Container>
            </MainBody>
            <ContextPanel>context-panel</ContextPanel>
          </MainContent>
        </Main>
      </PageBody>
    </InShell>
  );
}
