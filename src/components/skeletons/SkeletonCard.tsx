import React from 'react';
import {
  Box,
  Center,
  Stack,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SkeletonCard(): JSX.Element {
  return (
    <Center pt={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        minW={'130px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.500')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Skeleton height={230} width={282} borderRadius={'lg'} />
        <Stack pt={5} align={'center'}>
          <Skeleton height={'72px'} width={'85%'} borderRadius={'md'} />
          <Skeleton height={'21px'} width={'60%'} borderRadius={'md'} />
        </Stack>
      </Box>
    </Center>
  );
}
