import {
  Avatar,
  AvatarFallback,
  Badge,
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemIcon,
  ListItemTitle,
} from "@libs/web-components";
import { FixtureBody, Row } from "../_chrome";

export default function ListFixture() {
  return (
    <FixtureBody>
      <Row label="basic">
        <List style={{ maxWidth: 400 }}>
          <ListItem className="justify-between">
            <span element="type--body">Alice Johnson</span>
            <Badge status="success" scale="sm">Active</Badge>
          </ListItem>
          <ListItem className="justify-between">
            <span element="type--body">Bob Smith</span>
            <Badge status="neutral" scale="sm">Invited</Badge>
          </ListItem>
          <ListItem className="justify-between">
            <span element="type--body">Carol White</span>
            <Badge status="warning" scale="sm">Pending</Badge>
          </ListItem>
        </List>
      </Row>

      <Row label="with avatar">
        <List style={{ maxWidth: 400 }}>
          <ListItem className="gap-3">
            <ListItemIcon>
              <Avatar scale="sm"><AvatarFallback>AJ</AvatarFallback></Avatar>
            </ListItemIcon>
            <ListItemContent>
              <ListItemTitle><span element="type--body">Alice Johnson</span></ListItemTitle>
              <ListItemDescription><span element="type--body-small" emphasis="quiet">alice@example.com</span></ListItemDescription>
            </ListItemContent>
            <Badge status="success" scale="sm" className="ml-auto">Active</Badge>
          </ListItem>
          <ListItem className="gap-3">
            <ListItemIcon>
              <Avatar scale="sm"><AvatarFallback>BS</AvatarFallback></Avatar>
            </ListItemIcon>
            <ListItemContent>
              <ListItemTitle><span element="type--body">Bob Smith</span></ListItemTitle>
              <ListItemDescription><span element="type--body-small" emphasis="quiet">bob@example.com</span></ListItemDescription>
            </ListItemContent>
            <Badge status="neutral" scale="sm" className="ml-auto">Invited</Badge>
          </ListItem>
        </List>
      </Row>
    </FixtureBody>
  );
}
