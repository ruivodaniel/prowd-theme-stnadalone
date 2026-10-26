import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  EmptyState,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  InputSelect,
  PhoneInput,
  Separator,
  type InputSelectOption,
  type PhoneCountryOption,
} from "@libs/web-components";
import { Stack } from "@libs/web-layouts";
import { FixtureBody, Row } from "../../_chrome";

/**
 * Pattern: forms & checkout — uploads #5 (create your account) and #24 (checkout in
 * two states), from canonical components only. Layout is <Stack>. The form glue is
 * react-hook-form + the Form parts exactly as form-feedback.tsx; the content is Card
 * regions · Avatar · Input · PhoneInput · InputSelect · Separator · Collapsible ·
 * EmptyState · Button and type--* elements coloured through the emphasis/status axes.
 * No inline styles. Nothing here says how a card, a field or a divider looks.
 *
 * Gaps surfaced by these uploads: a logo mark and third-party brand marks (Google,
 * GitHub, PayPal, Apple Pay, Google Pay, a "Secured by" wordmark) have no component —
 * an Avatar fallback and text-only Buttons stand in; the icon registry has no
 * credit-card glyph — the saved-card option carries none.
 */

// a labelled divider between two alternative paths — the word is the content, the lines belong to it
function OrDivider() {
  return (
    <Stack dir="row" align="center" gap={12}>
      <Separator className="flex-1 min-w-0" />
      <span element="type--body-small" emphasis="quiet">or</span>
      <Separator className="flex-1 min-w-0" />
    </Stack>
  );
}

// ─── #5 · Create your account ───────────────────────────────────────────────

type SignUpValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

const COUNTRIES: PhoneCountryOption[] = [
  { code: "US", dialingCode: "1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dialingCode: "44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "PT", dialingCode: "351", flag: "🇵🇹", name: "Portugal" },
];

function SignUpCard() {
  const form = useForm<SignUpValues>({
    defaultValues: { firstName: "", lastName: "", username: "", email: "", phone: "", password: "" },
  });
  return (
    <Card className="w-96">
      <CardContent>
        <Stack dir="col" gap={24}>

          {/* logo mark · heading · sub-line */}
          <Stack dir="col" align="center" gap={16}>
            {/* GAP: logo mark — an Avatar fallback holding an Icon stands in */}
            <Avatar scale="lg">
              <AvatarFallback><Icon name="circle" /></AvatarFallback>
            </Avatar>
            <Stack dir="col" align="center" gap={4}>
              <h1 element="type--heading3">Create your account</h1>
              <p element="type--body" emphasis="quiet">Welcome! Please fill in the details to get started.</p>
            </Stack>
          </Stack>

          {/* GAP: Google / GitHub brand marks — text-only secondary Buttons, each fills half */}
          <Stack dir="row" gap={12}>
            <Button emphasis="secondary" className="flex-1 min-w-0">Google</Button>
            <Button emphasis="secondary" className="flex-1 min-w-0">GitHub</Button>
          </Stack>

          <OrDivider />

          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(() => {})}>

              {/* two optional names side by side — each FormItem fills half */}
              <Stack dir="row" gap={12}>
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <Stack dir="row" justify="between" align="center" gap={8}>
                      <FormLabel>First name</FormLabel>
                      <span element="type--body-small" emphasis="quiet">Optional</span>
                    </Stack>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <Stack dir="row" justify="between" align="center" gap={8}>
                      <FormLabel>Last name</FormLabel>
                      <span element="type--body-small" emphasis="quiet">Optional</span>
                    </Stack>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </Stack>

              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* country picker + local number is PhoneInput's own anatomy */}
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      countryOptions={COUNTRIES}
                      defaultCountryCode="US"
                      placeholder=""
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* the show/hide toggle is Input's own when type="password" */}
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" emphasis="primary" fill buttonType="text-icon" endIcon="arrowRight">Continue</Button>
            </form>
          </Form>

        </Stack>
      </CardContent>

      <CardFooter>
        <Stack dir="col" align="center" gap={8} className="w-full">
          <Stack dir="row" align="center" gap={4}>
            <span element="type--body-small" emphasis="quiet">Already have an account?</span>
            <Button asChild emphasis="quiet" scale="sm"><a href="#">Sign in</a></Button>
          </Stack>
          {/* GAP: "Secured by" wordmark — quiet text */}
          <span element="type--body-extra-small" emphasis="quiet">Secured by Clerk</span>
        </Stack>
      </CardFooter>
    </Card>
  );
}

// ─── #24 · Checkout — paying, then paid ─────────────────────────────────────

const ORDER = {
  plan: { name: "Starter", cycle: "Billed annually", currency: "USD", price: "$40.00", per: "per month" },
  lines: [
    { label: "Subtotal", value: "$40.00" },
    { label: "Tax", value: "$5.00" },
  ],
  total: { label: "Total Due Today", currency: "USD", value: "$45.00" },
};

const SAVED_CARDS: InputSelectOption[] = [{ value: "visa-4242", label: "Visa ··· 4242" }];

const QUICK_PAY = ["Pay with PayPal", "Pay with Apple Pay", "Google Pay"];

const RECEIPT = [
  { label: "Total paid", value: "$45.00", numeric: true },
  { label: "Payment method", value: "Visa ··· 4242", numeric: false },
];

const PAYMENT_ID = "cinv-cpayer_393JW…J1938";

// the header band both states share: a title and a close control
function CheckoutHeader() {
  return (
    <CardHeader>
      <Stack dir="row" justify="between" align="center" gap={12}>
        <span element="type--heading4">Checkout</span>
        <Button buttonType="icon" startIcon="close" emphasis="quiet" scale="sm" aria-label="Close" />
      </Stack>
    </CardHeader>
  );
}

// a payment panel: a Card whose header is the Collapsible trigger; open by default, like the upload
function PaymentSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <Card>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <Button
              emphasis="quiet"
              fill
              buttonType="text-icon"
              endIcon={open ? "chevronUp" : "chevronDown"}
              className="justify-between"
            >
              {title}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// the paying state: order summary, then the two ways to pay
function CheckoutPayCard() {
  return (
    <Card className="w-96">
      <CheckoutHeader />
      <CardContent>
        <Stack dir="col" gap={24}>

          {/* order summary — the plan line, subtotal and tax, then its total under a Separator */}
          <Stack dir="col" gap={12}>
            <Stack dir="row" justify="between" align="start" gap={12}>
              <Stack dir="col" gap={2}>
                <span element="type--body">{ORDER.plan.name}</span>
                <span element="type--body-small" emphasis="quiet">{ORDER.plan.cycle}</span>
              </Stack>
              <Stack dir="col" gap={2} align="end">
                <Stack dir="row" align="baseline" gap={4}>
                  <span element="type--body-extra-small" emphasis="quiet">{ORDER.plan.currency}</span>
                  <span element="type--numbers">{ORDER.plan.price}</span>
                </Stack>
                <span element="type--body-small" emphasis="quiet">{ORDER.plan.per}</span>
              </Stack>
            </Stack>
            <Stack dir="col" gap={8}>
              {ORDER.lines.map((l) => (
                <Stack key={l.label} dir="row" justify="between" align="baseline" gap={12}>
                  <span element="type--body-small" emphasis="quiet">{l.label}</span>
                  <span element="type--numbers-small" emphasis="quiet">{l.value}</span>
                </Stack>
              ))}
            </Stack>
            <Separator />
            <Stack dir="row" justify="between" align="baseline" gap={12}>
              <span element="type--body">{ORDER.total.label}</span>
              <Stack dir="row" align="baseline" gap={4}>
                <span element="type--body-extra-small" emphasis="quiet">{ORDER.total.currency}</span>
                <span element="type--numbers">{ORDER.total.value}</span>
              </Stack>
            </Stack>
          </Stack>

          <PaymentSection title="Account Funds">
            <Stack dir="col" gap={12}>
              {/* GAP: no credit-card icon in the registry — the saved-card option carries none */}
              <InputSelect options={SAVED_CARDS} defaultValue="visa-4242" clearable={false} aria-label="Saved card" />
              <Button emphasis="primary" fill>Pay {ORDER.total.value}</Button>
            </Stack>
          </PaymentSection>

          <OrDivider />

          <PaymentSection title="Add a New Payment Source">
            <Stack dir="col" gap={8}>
              {/* GAP: PayPal / Apple Pay / Google Pay brand marks — text-only Buttons */}
              {QUICK_PAY.map((p) => <Button key={p} emphasis="primary" fill>{p}</Button>)}
              <Button emphasis="secondary" fill>More Payment Methods</Button>
            </Stack>
          </PaymentSection>

        </Stack>
      </CardContent>
    </Card>
  );
}

// the paid state: a success EmptyState filling the middle, the receipt and its action in the footer
function CheckoutSuccessCard() {
  return (
    <Card className="w-96">
      <CheckoutHeader />
      <Stack size="fill" justify="center" align="center">
        <EmptyState
          status="success"
          icon={<Icon name="success" size="lg" />}
          title="Payment was successful!"
          description="Your payment was successful."
        />
      </Stack>
      <CardFooter>
        <Stack dir="col" gap={12} className="w-full">
          {RECEIPT.map((r) => (
            <Stack key={r.label} dir="row" justify="between" align="baseline" gap={12}>
              <span element="type--body-small" emphasis="quiet">{r.label}</span>
              <span element={r.numeric ? "type--numbers-small" : "type--body"}>{r.value}</span>
            </Stack>
          ))}
          <Stack dir="row" justify="between" align="center" gap={12}>
            <span element="type--body-small" emphasis="quiet">Payment ID</span>
            <Stack dir="row" align="center" gap={4}>
              <span element="type--body-small" emphasis="quiet">{PAYMENT_ID}</span>
              <Button buttonType="icon" startIcon="copy" emphasis="quiet" scale="xs" aria-label="Copy payment ID" />
            </Stack>
          </Stack>
          <Button emphasis="primary" fill>Go to app</Button>
        </Stack>
      </CardFooter>
    </Card>
  );
}

export default function FormsAndCheckoutFixture() {
  return (
    <FixtureBody>
      <Row label="#5 · Create your account — Card regions · Form parts as form-feedback · PhoneInput · the password toggle is Input's own · footer link">
        <SignUpCard />
      </Row>

      <Row label="#24 · Checkout, paying then paid — order summary with its total under a Separator · two Collapsible payment panels · EmptyState over a receipt footer">
        <Stack dir="row" gap={24} align="stretch" wrap>
          <CheckoutPayCard />
          <CheckoutSuccessCard />
        </Stack>
      </Row>
    </FixtureBody>
  );
}
