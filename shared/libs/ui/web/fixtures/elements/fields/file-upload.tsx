import { FileUpload } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function FileUploadFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <FileUpload scale="sm" />
        <FileUpload scale="md" />
        <FileUpload scale="lg" />
      </Row>

      <Row label="status">
        <FileUpload scale="md" status="error" />
        <FileUpload scale="md" status="warning" />
        <FileUpload scale="md" status="success" />
      </Row>

      <Row label="disabled">
        <FileUpload scale="md" disabled />
      </Row>

      <Row label="images only">
        <FileUpload scale="md" multiple accept="image/*" />
      </Row>
    </FixtureBody>
  );
}
