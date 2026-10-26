import { PageHeader, PageBody, Main, MainBody, Container } from "@libs/web-layouts";
import { LOREM } from "../_lorem";
import { InShell } from "../_frame";

export default function Fixture() {
  return (
    <InShell>
      <PageHeader>page-header</PageHeader>
      <PageBody className="flex flex-1 overflow-hidden">
        <Main className="flex flex-1 flex-col overflow-hidden">
            <MainBody className="flex flex-1 flex-col overflow-y-auto">
              <Container>{LOREM}</Container>
            </MainBody>
        </Main>
      </PageBody>
    </InShell>
  );
}
