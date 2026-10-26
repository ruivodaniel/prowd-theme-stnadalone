import * as React from "react";
import { ShellNone } from "../components/Shell";
import { Page } from "../components/Page";

export interface AuthPageProps {
  /** Auth form or card to center in the viewport. */
  children: React.ReactNode;
}

/**
 * AuthPage — full-viewport shell with no navigation, content centered.
 * Use for login, registration, password reset, and other standalone auth flows.
 *
 * Structure: ShellNone → scroll wrapper → Page (centering) → container → card
 */
export function AuthPage({ children }: AuthPageProps) {
  return (
    <ShellNone>
      <Page className="flex-1 items-center justify-center">
        <div layout="container" scale="xs" className="flex flex-col items-center">
          {children}
        </div>
      </Page>
    </ShellNone>
  );
}
