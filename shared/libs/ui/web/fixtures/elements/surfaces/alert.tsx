import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icon,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function AlertFixture() {
  return (
    <FixtureBody>
      <Row label="status">
        <div className="flex flex-col gap-3" style={{ maxWidth: 480, width: "100%" }}>
          <Alert status="info" icon={<Icon name="info" />}>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>An informational message.</AlertDescription>
          </Alert>
          <Alert status="success" icon={<Icon name="check" />}>
            <AlertTitle>Done</AlertTitle>
            <AlertDescription>Action completed successfully.</AlertDescription>
          </Alert>
          <Alert status="warning" icon={<Icon name="warning" />}>
            <AlertTitle>Watch out</AlertTitle>
            <AlertDescription>Something needs your attention.</AlertDescription>
          </Alert>
          <Alert status="error" icon={<Icon name="error" />}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
        </div>
      </Row>
    </FixtureBody>
  );
}
