import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

export default function SkeletonDateBlock() {
  return (
    <Flex align="center" justify="start" p={2}>
      <Skeleton
        borderRadius={'md'}
        size="md"
        w="440px"
        height="40px"
        p={2}
        className="adaptive-input-date"
      />
    </Flex>
  );
}
