import React from 'react';
import { Box, Flex, Stack, Skeleton } from '@chakra-ui/react';
import { getCountItemsPerPage } from '../../scripts/pagination';
import SkeletonDateBlock from './SkeletonDateBlock';
import SkeletonPagination from './SkeletonPagination';
import SkeletonStatsCard from './SkeletonStatsCard';

export function SkeletonInfo() {
  const n = getCountItemsPerPage();
  const keys = [...Array(n).keys()].map((i) => i + 1);
  return (
    <Box w="90%">
      <Stack pt={5}>
        <Skeleton borderRadius={'md'} size="md" w="250px" height="21px" />
      </Stack>
      <Skeleton
        borderRadius={'md'}
        size="md"
        w="150px"
        height="36px"
        mt={6}
        mb={2}
      />
      <SkeletonDateBlock />
      <Flex
        align="start"
        justify="start"
        p={10}
        direction={{ base: 'column', md: 'column' }}
        minW="100%"
      >
        {keys.map((item: number) => (
          <SkeletonStatsCard key={item} />
        ))}
      </Flex>
      <Flex align="center" justify="center" p={10}>
        <SkeletonPagination />
      </Flex>
    </Box>
  );
}
