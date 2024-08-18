import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

export default function SkeletonBreadcrumb() {
  return (
    <Stack pt={5}>
      <Skeleton
        borderRadius={'md'}
        size="md"
        w="250px"
        height="21px"
        className="adaptive-input"
      />
    </Stack>
  );
}
