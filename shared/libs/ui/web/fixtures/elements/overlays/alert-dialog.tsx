import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function AlertDialogFixture() {
  const [openNeutral, setOpenNeutral] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const [openDestructive, setOpenDestructive] = useState<boolean>(false);

  return (
    <FixtureBody>
      <Row label="neutral">
        <AlertDialog open={openNeutral} onOpenChange={setOpenNeutral}>
          <AlertDialogTrigger asChild>
            <Button emphasis="secondary">Open neutral alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent status="neutral">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will proceed with the selected operation. Please
                confirm you want to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpenNeutral(false)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>

      <Row label="warning">
        <AlertDialog open={openWarning} onOpenChange={setOpenWarning}>
          <AlertDialogTrigger asChild>
            <Button emphasis="secondary">Open warning alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent status="warning">
            <AlertDialogHeader>
              <AlertDialogTitle>Proceed with caution</AlertDialogTitle>
              <AlertDialogDescription>
                This action may have unintended side effects. Please review
                carefully before confirming.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpenWarning(false)}>
                Proceed anyway
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>

      <Row label="destructive">
        <AlertDialog open={openDestructive} onOpenChange={setOpenDestructive}>
          <AlertDialogTrigger asChild>
            <Button emphasis="primary" status="destructive">Open destructive alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent status="destructive">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpenDestructive(false)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    </FixtureBody>
  );
}
