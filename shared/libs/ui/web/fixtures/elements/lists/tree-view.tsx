import { TreeView } from "@libs/web-components";
import type { TreeNode } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

const NODES: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Resume.pdf" },
      { id: "1-2", label: "Cover letter.docx" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      { id: "2-1", label: "avatar.png" },
      { id: "2-2", label: "banner.jpg" },
    ],
  },
  { id: "3", label: "Notes.txt" },
];

export default function TreeViewFixture() {
  return (
    <FixtureBody>
      <Row label="scale sm">
        <TreeView items={NODES} scale="sm" />
      </Row>
      <Row label="scale md">
        <TreeView items={NODES} scale="md" />
      </Row>
      <Row label="scale lg">
        <TreeView items={NODES} scale="lg" />
      </Row>
    </FixtureBody>
  );
}
