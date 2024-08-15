import React from 'react';
import { Flex } from '@chakra-ui/react';

type GoalsProps = {
  result: string;
};
export default function StatsGoals({ result }: GoalsProps) {
  return (
    <>
      <Flex w="10%" justifyContent={'center'}>
        {result}
      </Flex>
    </>
  );
}
