import { Skeleton } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function SkeletonFixture() {
  return (
    <FixtureBody>
      <Row label="text lines">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 rounded" style={{ width: 200 }} />
          <Skeleton className="h-4 rounded" style={{ width: 300 }} />
          <Skeleton className="h-4 rounded" style={{ width: 150 }} />
        </div>
      </Row>

      <Row label="avatar + text combo">
        <div className="flex gap-3 items-center w-full">
          <Skeleton className="rounded-full shrink-0" style={{ width: 40, height: 40 }} />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 rounded" style={{ width: 160 }} />
            <Skeleton className="h-4 rounded" style={{ width: 100 }} />
          </div>
        </div>
      </Row>
    </FixtureBody>
  );
}
