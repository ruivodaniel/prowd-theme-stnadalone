import { PhoneInput, type PhoneCountryOption } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const COUNTRIES: PhoneCountryOption[] = [
  { code: "PT", dialingCode: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "US", dialingCode: "1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dialingCode: "44", flag: "🇬🇧", name: "United Kingdom" },
];

export default function PhoneInputFixture() {
  return (
    <FixtureBody>
      <Row label="default">
        <PhoneInput countryOptions={COUNTRIES} defaultCountryCode="PT" />
      </Row>

      <Row label="with value">
        <PhoneInput countryOptions={COUNTRIES} value="+15550100" />
      </Row>

      <Row label="disabled">
        <PhoneInput countryOptions={COUNTRIES} disabled />
      </Row>
    </FixtureBody>
  );
}
