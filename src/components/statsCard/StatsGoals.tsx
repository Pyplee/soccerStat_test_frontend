import React from 'react';
import { Flex, Badge } from '@chakra-ui/react';

type GoalsProps = {
  result: string;
};
export default function StatsGoals({ result }: GoalsProps) {
  return (
    <>
      <Flex w="10%" justifyContent={'center'}>
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {result}
        </Badge>
      </Flex>
    </>
  );
}
