"use client";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import MobileNavItem from "@/app/ui/header/MobileNavItem";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  id: string;
  currentPageNavigation?: string | undefined;
}

interface Props {
  currentPageNavigation: string;
  NAV_ITEMS: NavItem[];
}

export default function MobileNav({
  currentPageNavigation = "",
  NAV_ITEMS,
}: Props) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          currentPageNavigation={currentPageNavigation}
        />
      ))}
    </Stack>
  );
}
