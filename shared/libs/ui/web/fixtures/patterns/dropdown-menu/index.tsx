import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Icon } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: a button that opens a labelled menu with icons and a separator — DropdownMenu parts, nothing else. */
export default function DropdownMenuFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button emphasis="secondary">
              Open menu
              <Icon name="chevronDown" size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Icon name="file" size="sm" />New file</DropdownMenuItem>
            <DropdownMenuItem><Icon name="folder" size="sm" />New folder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Icon name="settings" size="sm" />Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </FixtureContainer>
    </FixtureBody>
  );
}
