import React from 'react';
import { Grid, Box, Flex, Stack, Skeleton } from '@chakra-ui/react';
import { getCountItemsPerPage } from '../../scripts/pagination';
import SkeletonCard from './SkeletonCard';
import SkeletonPagination from './SkeletonPagination';

export function SkeletonCompAndComm() {
  const n = getCountItemsPerPage();
  const keys = [...Array(n).keys()].map((i) => i + 1);
  return (
    <Box w="90%">
      <Stack spacing={4} pt="1rem">
        <Skeleton
          borderRadius={'md'}
          size="md"
          w="350px"
          height="40px"
          className="adaptive-input"
        />
      </Stack>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        justifyItems={'center'}
      >
        {keys.map((item: number) => (
          <SkeletonCard key={item} />
        ))}
      </Grid>
      <Flex align="center" justify="center" p={10}>
        <SkeletonPagination />
      </Flex>
    </Box>
  );
}
