import { Icon, List, ListItem, ListItemAction, ListItemContent, ListItemDescription, ListItemIcon, ListItemTitle, type IconName } from "@libs/web-components";
import { FixtureBody, FixtureContainer } from "../../_chrome";

/** Pattern: a list of files — icon, title and description, a chevron action. List parts, nothing else. */
const ITEMS: { icon: IconName; title: string; description: string }[] = [
  { icon: "file", title: "Document.pdf", description: "2.4 MB" },
  { icon: "image", title: "Photo.jpg", description: "1.2 MB" },
  { icon: "folder", title: "Projects", description: "12 items" },
  { icon: "fileText", title: "Notes.txt", description: "4 KB" },
];

export default function ListSimpleFixture() {
  return (
    <FixtureBody>
      <FixtureContainer>
        <List className="w-full">
          {ITEMS.map((it) => (
            <ListItem key={it.title}>
              <ListItemIcon><Icon name={it.icon} /></ListItemIcon>
              <ListItemContent>
                <ListItemTitle>{it.title}</ListItemTitle>
                <ListItemDescription>{it.description}</ListItemDescription>
              </ListItemContent>
              <ListItemAction><Icon name="chevronRight" size="sm" /></ListItemAction>
            </ListItem>
          ))}
        </List>
      </FixtureContainer>
    </FixtureBody>
  );
}
