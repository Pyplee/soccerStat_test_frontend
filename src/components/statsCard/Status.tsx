import React from 'react';
import { Flex, Badge } from '@chakra-ui/react';

type StatusProps = {
  status: string;
};
export default function Status({ status }: StatusProps) {
  return (
    <>
      <Flex w="12%" justifyContent={'center'} align={'center'}>
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {status}
        </Badge>
      </Flex>
    </>
  );
}
