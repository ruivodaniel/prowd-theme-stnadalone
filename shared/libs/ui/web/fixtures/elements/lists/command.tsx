import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function CommandFixture() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <FixtureBody>
      <Row label="inline">
        <Command className="rounded-lg border shadow-md w-80">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Mail</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Row>

      <Row label="dialog">
        <Button emphasis="secondary" onClick={() => setOpen(true)}>
          Open command dialog
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Emoji</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>Profile</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Mail</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Row>
    </FixtureBody>
  );
}
