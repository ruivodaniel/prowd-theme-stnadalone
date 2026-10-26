import { useState } from "react";
import { IconPicker, libraryIcons, type IconLibrary, type IconRef } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

/** a subset of the library: the icons a nav entry may take */
const NAV: IconLibrary = { id: "nav", name: "navigation", icons: libraryIcons(["home", "users", "settings", "mail", "file", "folder", "search", "info"]) };
/** another library altogether: a consumer's own glyphs, drawn its own way */
const MARKS: IconLibrary = { id: "marks", name: "marks", icons: ["●", "■", "▲", "◆", "★", "✚"].map((g) => ({ name: g, keywords: ["mark", "shape"], render: ({ size }) => <span style={{ fontSize: size ?? 16, lineHeight: 1 }}>{g}</span> })) };

export default function IconPickerFixture() {
  const [one, setOne] = useState<IconRef | null>({ library: "library", name: "home" });
  return (
    <FixtureBody>
      <Row label="the library's own registry, whole (default) — with search">
        <IconPicker value={one} onChange={setOne} />
      </Row>
      <Row label="a subset of the library — no search">
        <IconPicker libraries={[NAV]} search={false} defaultValue={{ library: "nav", name: "home" }} />
      </Row>
      <Row label="two libraries — the subset and a consumer's own glyphs">
        <IconPicker libraries={[NAV, MARKS]} defaultValue={{ library: "marks", name: "★" }} />
      </Row>
      <Row label="status · disabled">
        <IconPicker libraries={[NAV]} status="error" defaultValue={{ library: "nav", name: "mail" }} />
        <IconPicker libraries={[NAV]} disabled defaultValue={{ library: "nav", name: "mail" }} />
        <IconPicker libraries={[NAV]} disabled placeholder="no icon" />
      </Row>
      <Row label="scale">
        <IconPicker scale="sm" libraries={[NAV]} defaultValue={{ library: "nav", name: "home" }} />
        <IconPicker scale="md" libraries={[NAV]} defaultValue={{ library: "nav", name: "home" }} />
        <IconPicker scale="lg" libraries={[NAV]} defaultValue={{ library: "nav", name: "home" }} />
      </Row>
    </FixtureBody>
  );
}
