import type { ReactNode } from "react";
import { Page, ShellNav, ShellSideNav } from "@libs/web-layouts";

/** The shell every layout fixture sits in: side nav + page. Plain library
 *  components; the only child of a region is its name as text. */
export function InShell({ children }: { children: ReactNode }) {
  return (
    <ShellSideNav className="flex h-screen w-full overflow-hidden">
      <ShellNav className="flex h-full flex-col">shell-nav</ShellNav>
      <Page className="flex flex-1 flex-col overflow-hidden">{children}</Page>
    </ShellSideNav>
  );
}
