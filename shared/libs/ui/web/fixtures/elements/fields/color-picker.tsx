import { useState } from "react";
import { ColorPicker, type ColorPalette } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const BRAND: ColorPalette[] = [
  { id: "brand", name: "brand", colors: [{ value: "#4a2d8f", name: "plum" }, { value: "#7aa2f7", name: "sky" }, { value: "#e8a33d", name: "amber" }, { value: "#9ece6a", name: "leaf" }, { value: "#f7768e", name: "rose" }] },
  { id: "grays", name: "grays", colors: ["#14151a", "#33312c", "#87837a", "#d8d4cb", "#f7f5f1"].map((value) => ({ value })) },
];

export default function ColorPickerFixture() {
  const [one, setOne] = useState<string | null>("#4a2d8f");
  const [many, setMany] = useState<string[]>(["#4a2d8f", "#e8a33d"]);
  return (
    <FixtureBody>
      <Row label="picker only — a free colour">
        <ColorPicker palettes={false} value={one} onChange={setOne} />
      </Row>
      <Row label="picker + eyedropper (where the browser offers it)">
        <ColorPicker palettes={false} eyedropper value={one} onChange={setOne} />
      </Row>
      <Row label={'palettes only — the active theme’s colours (palettes="theme")'}>
        <ColorPicker picker={false} />
      </Row>
      <Row label="palettes only — the consumer's own">
        <ColorPicker picker={false} palettes={BRAND} defaultValue="#7aa2f7" />
      </Row>
      <Row label="palettes + picker + eyedropper, multiple (max 4) — a combination">
        <ColorPicker multiple max={4} eyedropper palettes={BRAND} value={many} onChange={setMany} />
      </Row>
      <Row label="status · disabled">
        <ColorPicker palettes={BRAND} status="error" defaultValue="#f7768e" />
        <ColorPicker palettes={BRAND} disabled defaultValue="#4a2d8f" />
        <ColorPicker palettes={BRAND} disabled placeholder="no colour" />
      </Row>
      <Row label="scale">
        <ColorPicker scale="sm" palettes={BRAND} defaultValue="#4a2d8f" />
        <ColorPicker scale="md" palettes={BRAND} defaultValue="#4a2d8f" />
        <ColorPicker scale="lg" palettes={BRAND} defaultValue="#4a2d8f" />
      </Row>
    </FixtureBody>
  );
}
