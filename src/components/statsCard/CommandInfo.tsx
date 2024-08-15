import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

type CommandProps = {
  commandA: string;
  commandB: string;
};

export default function CommandInfo({ commandA, commandB }: CommandProps) {
  return (
    <>
      <Flex
        justifyContent={'center'}
        className="adaptive-stat-command"
        w={'40%'}
        align={'center'}
      >
        {commandA}
        <Text textAlign="center" pr={1} pl={1}>
          -
        </Text>
        {commandB}
      </Flex>
    </>
  );
}
