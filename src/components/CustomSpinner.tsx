import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
export default function CustomSpinner() {
  return (
    <Flex
      pt="30vh"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      className="min-h-96"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}
