/**
 * @libs/web-layouts
 *
 * Structural layout primitives for page composition.
 * All components emit `layout="..."` attributes — the theme engine handles visuals.
 *
 * Pages assemble primitives via app-level section layouts (TitleBandLayout,
 * SettingsLayout). AuthPage is the only prebuilt composition.
 */

// =============================================================================
// Compositions
// =============================================================================

export { AuthPage, type AuthPageProps } from "./compositions/AuthPage";

// =============================================================================
// Primitives
// =============================================================================

export { ShellSideNav, ShellNav, ShellTopNav, ShellNone } from "./components/Shell";
export { Page, PageHeader, type PageHeaderProps, SecondPageHeader, type SecondPageHeaderProps, PageBody } from "./components/Page";
export {
  Main,
  MainHeader, type MainHeaderProps,
  SecondMainHeader, type SecondMainHeaderProps,
  MainContent,
  MainBody,
  MainFooter, type MainFooterProps,
} from "./components/Main";
export {
  LeftSidebar, type LeftSidebarProps,
  RightSidebar, type RightSidebarProps,
  ContextPanel, type ContextPanelProps,
} from "./components/Sidebars";
export {
  Container, type ContainerProps, type ContainerScale, type ContainerAlign,
} from "./components/Container";
export { ScrollArea } from "./components/ScrollArea";
export {
  Stack,
  type StackProps, type StackDir, type StackAlign, type StackJustify, type StackSize,
} from "./components/Stack";

export * from "./schemas";
