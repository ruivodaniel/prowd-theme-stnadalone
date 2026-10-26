import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function DialogFixture() {
  const [openSm, setOpenSm] = useState<boolean>(false);
  const [openMd, setOpenMd] = useState<boolean>(false);
  const [openLg, setOpenLg] = useState<boolean>(false);

  return (
    <FixtureBody>
      <Row label="sm">
        <Dialog open={openSm} onOpenChange={setOpenSm}>
          <DialogTrigger asChild>
            <Button emphasis="secondary">Open sm dialog</Button>
          </DialogTrigger>
          <DialogContent scale="sm">
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
              <DialogDescription>
                This is a small dialog. It contains a brief description of the
                action being performed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button emphasis="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpenSm(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>

      <Row label="md">
        <Dialog open={openMd} onOpenChange={setOpenMd}>
          <DialogTrigger asChild>
            <Button emphasis="secondary">Open md dialog</Button>
          </DialogTrigger>
          <DialogContent scale="md">
            <DialogHeader>
              <DialogTitle>Medium Dialog</DialogTitle>
              <DialogDescription>
                This is a medium dialog. It contains a more detailed description
                of the action being performed, with a bit more room for content.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button emphasis="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpenMd(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>

      <Row label="lg">
        <Dialog open={openLg} onOpenChange={setOpenLg}>
          <DialogTrigger asChild>
            <Button emphasis="secondary">Open lg dialog</Button>
          </DialogTrigger>
          <DialogContent scale="lg">
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
              <DialogDescription>
                This is a large dialog. It provides ample space for more complex
                content, forms, or detailed information that requires additional
                room to display properly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button emphasis="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpenLg(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </FixtureBody>
  );
}
