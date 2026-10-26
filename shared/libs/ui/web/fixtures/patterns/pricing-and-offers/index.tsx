import { Badge, Button, Card, Icon, type IconName, Tile } from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: pricing & offers — uploads #18 and #31, from canonical components only.
 * Layout is <Stack>. Content is Card · Tile · Badge · Button · Icon and type--*
 * elements coloured through the emphasis/status/state axes. No inline styles.
 *
 * Nothing here says how the popular plan or the banner looks: emphasis="primary"
 * on the Pro card and emphasis="hero" on the banner name the prominence; the
 * theme decides what that means. A feature a plan does not include is
 * state="disabled" — not available — never a struck-through style.
 */

type Feature = { label: string; included: boolean };
type Plan = {
  name: string;
  blurb: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: Feature[];
  cta: string;
  ctaEmphasis: "primary" | "secondary";
};

// #18 — three plans; the middle one is the popular, emphasised plan
const PLANS: Plan[] = [
  {
    name: "Free",
    blurb: "For hobbyists and side projects",
    price: "Free",
    cta: "Get Started",
    ctaEmphasis: "secondary",
    features: [
      { label: "Up to 3 projects", included: true },
      { label: "Basic analytics", included: true },
      { label: "Community support", included: true },
      { label: "Custom domain", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    blurb: "For professionals and growing teams",
    price: "$29",
    period: "/mo",
    popular: true,
    cta: "Start Free Trial",
    ctaEmphasis: "primary",
    features: [
      { label: "Unlimited projects", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Priority support", included: true },
      { label: "Custom domain", included: true },
      { label: "API access", included: true },
    ],
  },
  {
    name: "Enterprise",
    blurb: "For large organizations",
    price: "$99",
    period: "/mo",
    cta: "Contact Sales",
    ctaEmphasis: "secondary",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "SSO & SAML", included: true },
      { label: "Dedicated support", included: true },
      { label: "Custom integrations", included: true },
      { label: "SLA guarantee", included: true },
    ],
  },
];

type Loan = { icon: IconName; title: string; limit: string };

// #31 — the 2×2 of loan tiles under the banner
const LOANS: Loan[] = [
  { icon: "book", title: "Education", limit: "3,000,000" },
  { icon: "home", title: "Home Loan", limit: "3,000,000" },
  { icon: "briefcase", title: "Business Loan", limit: "3,000,000" },
  { icon: "star", title: "Special Loan", limit: "3,000,000" },
];

// one plan — name and blurb, the price on a baseline, a checklist that fills, the CTA at the bottom
function PlanCard({ p }: { p: Plan }) {
  return (
    <Card emphasis={p.popular ? "primary" : undefined} className="flex-1 min-w-0">
      <Stack dir="col" gap={24} pad={28} size="fill">
        {p.popular && (
          <Stack dir="row" justify="center">
            <Badge emphasis="hero" showIcon iconName="star">Most Popular</Badge>
          </Stack>
        )}

        <Stack dir="col" gap={6}>
          <span element="type--heading3">{p.name}</span>
          <span element="type--body" emphasis="quiet">{p.blurb}</span>
        </Stack>

        <Stack dir="row" align="baseline" gap={4}>
          <span element="type--numbers-extra-large">{p.price}</span>
          {p.period && <span element="type--body-large" emphasis="quiet">{p.period}</span>}
        </Stack>

        {/* checklist — a check icon leads each line; a feature not in the plan is not available */}
        <Stack dir="col" gap={12} size="fill">
          {p.features.map((f) => (
            <span key={f.label} element="type--body" state={f.included ? undefined : "disabled"}>
              <Icon name="check" size="sm" /> {f.label}
            </span>
          ))}
        </Stack>

        <Button emphasis={p.ctaEmphasis} fill>{p.cta}</Button>
      </Stack>
    </Card>
  );
}

// one loan — icon beside a column of title, limit line, action line
function LoanTile({ l }: { l: Loan }) {
  return (
    <Tile className="flex-1 min-w-0">
      <Stack dir="row" align="start" gap={12}>
        <Icon name={l.icon} size="md" />
        <Stack dir="col" gap={4} size="fill">
          <span element="type--heading4">{l.title}</span>
          <Stack dir="row" align="baseline" gap={4}>
            <span element="type--body-extra-small" emphasis="quiet">Up to</span>
            <span element="type--numbers-small" emphasis="quiet">{l.limit}</span>
          </Stack>
          <span element="type--body-small">Application</span>
        </Stack>
      </Stack>
    </Tile>
  );
}

export default function PricingAndOffersFixture() {
  return (
    <FixtureBody>
      <Row label="#18 · pricing — three plan cards: name, blurb, price on a baseline, checklist, CTA; the popular plan is emphasis='primary'">
        <Stack dir="row" gap={24} align="stretch" className="w-full max-w-4xl">
          {PLANS.map((p) => <PlanCard key={p.name} p={p} />)}
        </Stack>
      </Row>

      <Row label="#31 · loan plans — a hero banner (headline, rate, CTA) over a centred heading and a 2×2 of loan tiles">
        <Stack dir="col" gap={24} className="w-96">

          {/* the banner — headline top-right, offer bottom-left, CTA bottom-right */}
          <Card emphasis="hero">
            <Stack dir="col" gap={20} pad={24}>
              <Stack dir="row" justify="end">
                <span element="type--heading2">Loan Plans</span>
              </Stack>
              <Stack dir="col" gap={4}>
                <span element="type--body-small">Get a business loan</span>
                <Stack dir="row" justify="between" align="end" gap={16}>
                  <Stack dir="row" align="baseline" gap={8}>
                    <span element="type--numbers-extra-large">0.5%</span>
                    <span element="type--body-large">Interest</span>
                  </Stack>
                  <Button emphasis="secondary" buttonType="text-icon" endIcon="add">More</Button>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          <Stack dir="row" justify="center">
            <span element="type--heading3" emphasis="quiet">All Loan Plans</span>
          </Stack>

          {/* 2×2 — two rows of two tiles, each tile fills half */}
          <Stack dir="col" gap={16}>
            <Stack dir="row" gap={16}>
              {LOANS.slice(0, 2).map((l) => <LoanTile key={l.title} l={l} />)}
            </Stack>
            <Stack dir="row" gap={16}>
              {LOANS.slice(2).map((l) => <LoanTile key={l.title} l={l} />)}
            </Stack>
          </Stack>

        </Stack>
      </Row>
    </FixtureBody>
  );
}
