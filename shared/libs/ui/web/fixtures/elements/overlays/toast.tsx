import { Toaster, Button } from "@libs/web-components";
import { toast } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ToastFixture() {
  return (
    <FixtureBody>
      <Toaster />
      <Row label="toasts">
        <Button scale="sm" onClick={() => toast("Default message")}>Default</Button>
        <Button scale="sm" onClick={() => toast.success("Saved!")}>Success</Button>
        <Button scale="sm" onClick={() => toast.error("Something went wrong")}>Error</Button>
        <Button scale="sm" onClick={() => toast.warning("Low disk space")}>Warning</Button>
        <Button scale="sm" onClick={() => toast.info("Update available")}>Info</Button>
        <Button scale="sm" onClick={() => toast.loading("Processing…")}>Loading</Button>
      </Row>
    </FixtureBody>
  );
}
