import React from 'react';
import { Flex, Badge } from '@chakra-ui/react';

type DateTimeProps = {
  date: string;
  time: string;
};
export default function DateAndTimeInfo({ date, time }: DateTimeProps) {
  return (
    <>
      <Flex w="10%" justifyContent={'center'}>
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {date}
        </Badge>
      </Flex>
      <Flex w="12%" justifyContent={'center'}>
        <Badge textAlign="center" rounded="md" fontSize={'md'}>
          {time}
        </Badge>
      </Flex>
    </>
  );
}
