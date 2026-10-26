import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: a single-open accordion of three questions — Accordion parts, nothing else. */
const ITEMS = [
  { value: "item-1", q: "Is it accessible?", a: "Yes. It adheres to the WAI-ARIA design pattern." },
  { value: "item-2", q: "Is it styled?", a: "Yes. It comes with default styles that match the other components." },
  { value: "item-3", q: "Is it animated?", a: "Yes. It's animated by default, but you can disable it if you prefer." },
];

export default function AccordionFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <Accordion type="single" collapsible className="w-full">
          {ITEMS.map((it) => (
            <AccordionItem key={it.value} value={it.value}>
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FixtureContainer>
    </FixtureBody>
  );
}
