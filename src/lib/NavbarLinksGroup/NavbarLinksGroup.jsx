"use client";

import useLayoutStore from "@/stores/layoutStore";
import useRoleStore from "@/stores/role";
import { Box, Button, Collapse, Group, Popover, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import classes from "./NavbarLinksGroup.module.css";

export default function NavbarLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}) {
  const pathname = usePathname();
  const hasLinks = Array.isArray(links);
  const { isSidebarOpened } = useLayoutStore();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const {role} = useRoleStore();

  const handleClickMenuItem = () => {
    setOpened((prev) => !prev);
  };

  const handlePopoverToggle = () => {
    setPopoverOpened((prev) => !prev);
  };

  const items = (hasLinks ? links : []).map((item) => {
    if (item?.role?.includes(role)) {
      return (
        <Link
          className={`${classes.link_item} ${pathname === item.link ? classes.link_active : ""}`}
          href={item.link}
          key={item.label}
        >
          {item.label}
        </Link>
      );
    }
  });

  const popoverItems = (hasLinks ? links : []).map((item) => (
    <Link href={item.link} key={item.label}>
      <Button
        variant="white"
        className={`${classes.link} ${pathname === item.link ? classes.link_active : ""}`}
      >
        {item.label}
      </Button>
    </Link>
  ));

  return (
    <>
      <Popover
        withArrow
        opened={popoverOpened}
        onClose={() => setPopoverOpened(false)}
        position="right-start"
      >
        <Link
          href={hasLinks ? "#" : link}
          className={`${classes.link} ${pathname.includes(link) ? classes.link_active : ""}`}
        >
          <Popover.Target>
            <Group
              className={classes.group}
              onClick={
                isSidebarOpened ? handleClickMenuItem : handlePopoverToggle
              }
            >
              <Box className={classes.box}>
                <Icon className={classes.icon} size="18" />

                {isSidebarOpened && <Box>{label}</Box>}
              </Box>
              {hasLinks && isSidebarOpened && (
                <IconChevronRight
                  size="18"
                  className={classes.chevron}
                  stroke={1.5}
                  style={{
                    width: rem(14),
                    height: rem(14),
                    transform: opened ? "rotate(-90deg)" : "none",
                  }}
                />
              )}
            </Group>
          </Popover.Target>
        </Link>
        {hasLinks && !isSidebarOpened && (
          <Popover.Dropdown p="6" ml="10">
            <Box style={{ display: "flex", flexDirection: "column" }}>
              {popoverItems}
            </Box>
          </Popover.Dropdown>
        )}
        {hasLinks && isSidebarOpened ? (
          <Collapse in={opened}>{items}</Collapse>
        ) : null}
      </Popover>
    </>
  );
}
