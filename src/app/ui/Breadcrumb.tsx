"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface BreadcrumbInfo {
  name: string;
  link: string;
}

export default function BreadcrumbComponent({
  breadcrumbInfo,
}: {
  breadcrumbInfo: BreadcrumbInfo[];
}) {
  const [firstEl, secondEl] = breadcrumbInfo;
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink href={firstEl.link}>{firstEl.name}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={secondEl.link}>{secondEl.name}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
