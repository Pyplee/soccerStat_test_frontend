import React from 'react';
import { Box, Flex, Skeleton, useColorModeValue } from '@chakra-ui/react';

export default function SkeletonCard(): JSX.Element {
  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={'2'}
      shadow={'xl'}
      border={'2px solid'}
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      bg={useColorModeValue('gray.100', 'gray.600')}
      rounded={'lg'}
      mb={5}
      className="adaptive-stats-card"
      w="100%"
    >
      <Flex
        justifyContent={'center'}
        align={'center'}
        direction={{ base: 'column', md: 'row' }}
        className="adaptive-flex-stats-card"
      >
        <Box p={1}>
          <Skeleton height="24px" width="133px" borderRadius="md" />
        </Box>
        <Box p={1}>
          <Skeleton height="24px" width="160px" borderRadius="md" />
        </Box>
        <Box p={1}>
          <Skeleton height="24px" width="160px" borderRadius="md" />
        </Box>
        <Box p={1}>
          <Skeleton height="24px" width="250px" borderRadius="md" />
        </Box>
        <Box p={1}>
          <Skeleton height="24px" width="250px" borderRadius="md" />
        </Box>
        <Box p={1}>
          <Skeleton height="24px" width="133px" borderRadius="md" />
        </Box>
      </Flex>
    </Box>
  );
}
