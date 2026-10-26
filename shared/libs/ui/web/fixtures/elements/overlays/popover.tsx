import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  Button,
  Input,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function PopoverFixture() {
  return (
    <FixtureBody>
      <Row label="basic">
        <Popover>
          <PopoverTrigger asChild>
            <Button emphasis="secondary">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover title</PopoverTitle>
              <PopoverDescription>
                This is a basic popover with a title and some descriptive text
                inside.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </Row>

      <Row label="form-like">
        <Popover>
          <PopoverTrigger asChild>
            <Button emphasis="secondary">Open form popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Quick edit</PopoverTitle>
              <PopoverDescription>
                Update the value below and press enter to save.
              </PopoverDescription>
            </PopoverHeader>
            <Input scale="md" placeholder="Enter a value..." />
          </PopoverContent>
        </Popover>
      </Row>
    </FixtureBody>
  );
}
