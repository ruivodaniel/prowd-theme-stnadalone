// The props schema of every layout primitive, for tooling (the UI-as-data validator and interpreter read them): the same shape as
// @libs/web-components' defineProps — { component, props: { name: { kind, values?, default?, required?, doc? } } }. Every primitive also
// takes the HTML div props and `position` (the markup axis), which are not listed: they are common to all.
const SCALE3 = ["sm", "md", "lg"] as const;
const region = (component: string, extra: Record<string, unknown> = {}) => ({ component, props: { ...extra } }) as const;
const scaled = (component: string, extra: Record<string, unknown> = {}) => region(component, { scale: { kind: "enum", values: SCALE3, default: "md" }, ...extra });

export const authPageSchema = region("AuthPage");
export const shellSideNavSchema = region("ShellSideNav");
export const shellNavSchema = region("ShellNav");
export const shellTopNavSchema = region("ShellTopNav");
export const shellNoneSchema = region("ShellNone");
export const pageSchema = region("Page");
export const pageHeaderSchema = scaled("PageHeader");
export const secondPageHeaderSchema = scaled("SecondPageHeader");
export const pageBodySchema = region("PageBody");
export const mainSchema = region("Main");
export const mainHeaderSchema = scaled("MainHeader", { sticky: { kind: "boolean", default: false } });
export const secondMainHeaderSchema = scaled("SecondMainHeader", { sticky: { kind: "boolean", default: false } });
export const mainContentSchema = region("MainContent");
export const mainBodySchema = region("MainBody");
export const mainFooterSchema = scaled("MainFooter");
export const leftSidebarSchema = scaled("LeftSidebar", { collapsed: { kind: "boolean", default: false } });
export const rightSidebarSchema = scaled("RightSidebar");
export const contextPanelSchema = scaled("ContextPanel");
export const containerSchema = region("Container", { scale: { kind: "enum", values: ["xs", "sm", "md", "lg", "xl"], default: "lg" }, align: { kind: "enum", values: ["left", "center", "right"] } });
export const scrollAreaSchema = region("ScrollArea", { axis: { kind: "enum", values: ["x", "y", "both"], default: "y" } });
export const stackSchema = region("Stack", {
  dir: { kind: "enum", values: ["row", "col"], default: "col" },
  gap: { kind: "number", doc: "px between children" },
  pad: { kind: "number", doc: "px of padding" },
  align: { kind: "enum", values: ["start", "center", "end", "stretch", "baseline"] },
  justify: { kind: "enum", values: ["start", "center", "end", "between", "around"] },
  wrap: { kind: "boolean", default: false },
  size: { kind: "enum", values: ["hug", "fill", "fixed"], doc: "how this stack sizes inside its parent stack" },
  role: { kind: "string", doc: "ARIA role (tablist)" },
});
