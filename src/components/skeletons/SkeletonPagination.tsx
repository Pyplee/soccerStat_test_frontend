import React from 'react';
import { Skeleton, HStack } from '@chakra-ui/react';

export default function SkeletonPagination() {
  return (
    <HStack spacing={2}>
      <Skeleton borderRadius={'md'} size="md" w="333px" height="40px" />
    </HStack>
  );
}
