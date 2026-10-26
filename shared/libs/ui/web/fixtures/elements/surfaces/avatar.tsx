import { Avatar, AvatarFallback } from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function AvatarFixture() {
  return (
    <FixtureBody>
      <Row label="scale">
        <Avatar scale="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
        <Avatar scale="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
        <Avatar scale="md"><AvatarFallback>MD</AvatarFallback></Avatar>
        <Avatar scale="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
      </Row>

      <Row label='fallback initials — scale="md"'>
        <Avatar scale="md"><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar scale="md"><AvatarFallback>PA</AvatarFallback></Avatar>
        <Avatar scale="md"><AvatarFallback>AB</AvatarFallback></Avatar>
      </Row>
    </FixtureBody>
  );
}
