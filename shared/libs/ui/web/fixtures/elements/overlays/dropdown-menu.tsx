import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function DropdownMenuFixture() {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [showBilling, setShowBilling] = useState<boolean>(false);

  const [plan, setPlan] = useState<string>("pro");

  return (
    <FixtureBody>
      <Row label="basic">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button emphasis="secondary">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Delete account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>

      <Row label="with checkbox items">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button emphasis="secondary">View options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showProfile}
              onCheckedChange={setShowProfile}
            >
              Profile
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showSettings}
              onCheckedChange={setShowSettings}
            >
              Settings
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showBilling}
              onCheckedChange={setShowBilling}
            >
              Billing
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>

      <Row label="with radio items">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button emphasis="secondary">Select plan</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Subscription plan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={plan} onValueChange={setPlan}>
              <DropdownMenuRadioItem value="free">Free</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pro">Pro</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="enterprise">
                Enterprise
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </FixtureBody>
  );
}
