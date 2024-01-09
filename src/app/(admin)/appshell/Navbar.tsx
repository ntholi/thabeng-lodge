import { NavLink } from "@mantine/core";
import {
  IconBed,
  IconCalendarEvent,
  IconChevronRight,
  IconHome,
  IconInfoCircle,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <NavLink
        label="Rooms"
        component={Link}
        href={"/admin/rooms"}
        leftSection={<IconBed size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      />
      <NavLink
        label="Restaurant"
        childrenOffset={28}
        leftSection={<IconToolsKitchen2 size="1rem" stroke={1.5} />}
      >
        <NavLink
          label="Menu"
          component={Link}
          href={"/admin/restaurant/menu"}
          rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        />
        <NavLink
          label="Page"
          component={Link}
          href={"/admin/restaurant/page"}
          rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        />
      </NavLink>
      <NavLink
        label="Events"
        component={Link}
        href={"/admin/events"}
        leftSection={<IconCalendarEvent size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      />
      <NavLink
        label="Home Page"
        href={"/admin/home"}
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      />
      <NavLink
        label="About Us"
        href={"/admin/about-us"}
        leftSection={<IconInfoCircle size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      />
    </nav>
  );
}
