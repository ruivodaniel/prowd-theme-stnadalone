import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function TooltipFixture() {
  return (
    <FixtureBody>
      <TooltipProvider>
        <Row label="sides">
          <div className="flex items-center gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button emphasis="secondary" scale="sm">
                  Top
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Tooltip on top
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button emphasis="secondary" scale="sm">
                  Right
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Tooltip on right
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button emphasis="secondary" scale="sm">
                  Bottom
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Tooltip on bottom
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button emphasis="secondary" scale="sm">
                  Left
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Tooltip on left
              </TooltipContent>
            </Tooltip>
          </div>
        </Row>

        <Row label="with button">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              This tooltip appears above the button
            </TooltipContent>
          </Tooltip>
        </Row>
      </TooltipProvider>
    </FixtureBody>
  );
}
