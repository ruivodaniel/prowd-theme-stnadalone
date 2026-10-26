import { Button } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

/**
 * Button fixture — every meaningful prop combination on the live Button
 * component. When the component changes, the variants here adapt automatically.
 */
export default function ButtonFixture() {
  return (
    <FixtureBody>
      <Row label="emphasis">
        <Button emphasis="primary">Primary</Button>
        <Button emphasis="secondary">Secondary</Button>
        <Button emphasis="tertiary">Tertiary</Button>
        <Button emphasis="quiet">Quiet Bro</Button>
      </Row>

      <Row label='scale — emphasis="primary"'>
        <Button emphasis="primary" scale="xs">XS</Button>
        <Button emphasis="primary" scale="sm">SM</Button>
        <Button emphasis="primary" scale="md">MD</Button>
        <Button emphasis="primary" scale="lg">LG</Button>
        <Button emphasis="primary" scale="xl">XL</Button>
      </Row>

      <Row label="status primary">
        <Button emphasis="primary" status="error">Error</Button>
        <Button emphasis="primary" status="warning">Warning</Button>
        <Button emphasis="primary" status="success">Success</Button>
        <Button emphasis="primary" status="destructive">Destructive</Button>
      </Row>

      <Row label="status secondary">
        <Button emphasis="secondary" status="error">Error</Button>
        <Button emphasis="secondary" status="warning">Warning</Button>
        <Button emphasis="secondary" status="success">Success</Button>
        <Button emphasis="secondary" status="destructive">Destructive</Button>
      </Row>

      <Row label="state">
        <Button emphasis="primary">Default</Button>
        <Button emphasis="primary" {...{ state: "selected" }}>Selected</Button>
        <Button emphasis="primary" disabled>Disabled</Button>
        <Button emphasis="primary" disabled disabledReason="You don't have permission to do this">
          Disabled + reason
        </Button>
      </Row>

      <Row label="icon-text (left icon)">
        <Button buttonType="icon-text" startIcon="add">Add</Button>
        <Button buttonType="icon-text" startIcon="edit" emphasis="secondary">Edit</Button>
        <Button buttonType="icon-text" startIcon="delete" status="destructive">Delete</Button>
        <Button buttonType="icon-text" startIcon="download" emphasis="tertiary">Download</Button>
      </Row>

      <Row label="text-icon (right icon)">
        <Button buttonType="text-icon" endIcon="arrowRight">Continue</Button>
        <Button buttonType="text-icon" endIcon="externalLink" emphasis="secondary">Open link</Button>
        <Button buttonType="text-icon" endIcon="chevronDown" emphasis="tertiary">Options</Button>
      </Row>

      <Row label="icon-text-icon (both)">
        <Button buttonType="icon-text-icon" startIcon="filter" endIcon="chevronDown">Filter</Button>
        <Button buttonType="icon-text-icon" startIcon="search" endIcon="close" emphasis="secondary">
          Search
        </Button>
      </Row>

      <Row label="icon only">
        <Button buttonType="icon" startIcon="add" />
        <Button buttonType="icon" startIcon="edit" emphasis="secondary" />
        <Button buttonType="icon" startIcon="delete" status="destructive" />
        <Button buttonType="icon" startIcon="close" emphasis="quiet" />
        <Button buttonType="icon" startIcon="refresh" emphasis="tertiary" />
      </Row>

      <Row label="icon background">
        <Button buttonType="icon-text" startIcon="add" iconBackground="light">Light bg</Button>
        <Button buttonType="icon-text" startIcon="add" iconBackground="dark">Dark bg</Button>
      </Row>

      <Row label="icon bleed">
        <Button buttonType="icon-text" startIcon="add" iconBleed>Left bleed</Button>
        <Button buttonType="text-icon" endIcon="arrowRight" iconBleed>Right bleed</Button>
      </Row>

      <Row label="fill">
        <div className="w-72">
          <Button emphasis="primary" fill>Fill container</Button>
        </div>
      </Row>
    </FixtureBody>
  );
}
