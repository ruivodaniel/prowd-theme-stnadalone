import * as React from "react";

import { cn } from "../../lib/utils";
import type { ListProps, ListItemProps } from "./types";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";

function List({ position, className, emphasis, status, state, scale, concept, ...props }: ListProps) {
  return (
    <ul
      element="list--list"
      {...axisAttrs({ emphasis, status, scale, concept, state, position })}
      className={cn("flex flex-col", className, positionClasses(position))}
      {...props}
    />
  );
}

function ListItem({ position, className, status, state, concept, ...props }: ListItemProps) {
  return (
    <li
      element="control--list-item"
      {...axisAttrs({ status, concept, state, position })}
      className={cn("flex items-center", className, positionClasses(position))}
      {...props}
    />
  );
}

function ListItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function ListItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 min-w-0", className)}
      {...props}
    />
  );
}

function ListItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("truncate", className)}
      {...props}
    />
  );
}

function ListItemDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("truncate", className)}
      {...props}
    />
  );
}

function ListItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemAction,
};
