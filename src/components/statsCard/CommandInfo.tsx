import React from 'react';
import { Flex, Badge, Text } from '@chakra-ui/react';

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
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {commandA}
        </Badge>
        <Text textAlign="center">-</Text>
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {commandB}
        </Badge>
      </Flex>
    </>
  );
}
