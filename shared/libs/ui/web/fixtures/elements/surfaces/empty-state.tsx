import { Button, EmptyState, Icon } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function EmptyStateFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <EmptyState
          scale="sm"
          title="No results"
          description="Try adjusting your filters."
          action={<Button emphasis="secondary" scale="sm">Clear filters</Button>}
        />
        <EmptyState
          scale="md"
          title="No results"
          description="Try adjusting your filters."
          action={<Button emphasis="secondary" scale="sm">Clear filters</Button>}
        />
        <EmptyState
          scale="lg"
          title="No results"
          description="Try adjusting your filters."
          action={<Button emphasis="secondary" scale="sm">Clear filters</Button>}
        />
      </Row>
      <Row label="with icon">
        <EmptyState
          scale="md"
          icon={<Icon name="search" />}
          title="Nothing here"
          description="Start by creating something."
          action={<Button emphasis="secondary" scale="sm">Create new</Button>}
        />
      </Row>
    </FixtureBody>
  );
}
