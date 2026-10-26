import { AuthPage, Container } from "@libs/web-layouts";
import { LOREM } from "../_lorem";

/** Auth archetype — no chrome, a centered card (sign in / onboarding). */
export default function AuthFixture() {
  return (
    <AuthPage>
      <Container>{LOREM}</Container>
    </AuthPage>
  );
}
