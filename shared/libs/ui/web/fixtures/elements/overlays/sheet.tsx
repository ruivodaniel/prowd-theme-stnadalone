import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SheetFixture() {
  const [openRight, setOpenRight] = useState<boolean>(false);
  const [openLeft, setOpenLeft] = useState<boolean>(false);
  const [openTop, setOpenTop] = useState<boolean>(false);
  const [openBottom, setOpenBottom] = useState<boolean>(false);

  return (
    <FixtureBody>
      <Row label="right">
        <Sheet open={openRight} onOpenChange={setOpenRight}>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open right sheet</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Right Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the right side of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button emphasis="secondary" className="mt-4">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </Row>

      <Row label="left">
        <Sheet open={openLeft} onOpenChange={setOpenLeft}>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open left sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Left Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the left side of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button emphasis="secondary" className="mt-4">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </Row>

      <Row label="top">
        <Sheet open={openTop} onOpenChange={setOpenTop}>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open top sheet</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Top Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the top of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button emphasis="secondary" className="mt-4">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </Row>

      <Row label="bottom">
        <Sheet open={openBottom} onOpenChange={setOpenBottom}>
          <SheetTrigger asChild>
            <Button emphasis="secondary">Open bottom sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Bottom Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the bottom of the screen.
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button emphasis="secondary" className="mt-4">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </Row>
    </FixtureBody>
  );
}
