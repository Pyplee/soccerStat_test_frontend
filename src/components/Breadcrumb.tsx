import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

interface BreadcrumbInfo {
  name: string;
  link: string;
}

export default function BreadcrumbComponent({
  breadcrumbInfo,
}: {
  breadcrumbInfo: BreadcrumbInfo[];
}) {
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm" pt={5}>
      {breadcrumbInfo.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
