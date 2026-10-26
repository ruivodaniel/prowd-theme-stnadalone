import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function AccordionFixture() {
  return (
    <FixtureBody>
      <Row label="single — one item open by default">
        <Accordion type="single" defaultValue="two" collapsible style={{ maxWidth: 400, width: "100%" }}>
          <AccordionItem value="one">
            <AccordionTrigger>What is Acme?</AccordionTrigger>
            <AccordionContent>
              <p element="type--body-small" emphasis="quiet">A collaboration platform connecting teams across your organization.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionTrigger>How do I manage my organization?</AccordionTrigger>
            <AccordionContent>
              <p element="type--body-small" emphasis="quiet">Settings → Organization to invite members, change roles, and configure access.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="three">
            <AccordionTrigger>What roles are available?</AccordionTrigger>
            <AccordionContent>
              <p element="type--body-small" emphasis="quiet">Owner, Admin, Member, and Viewer — assignable per organization.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Row>
    </FixtureBody>
  );
}
