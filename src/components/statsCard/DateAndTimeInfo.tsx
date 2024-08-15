import React from 'react';
import { Flex } from '@chakra-ui/react';

type DateTimeProps = {
  date: string;
  time: string;
};
export default function DateAndTimeInfo({ date, time }: DateTimeProps) {
  return (
    <>
      <Flex w="10%" justifyContent={'center'}>
        {date}
      </Flex>
      <Flex w="12%" justifyContent={'center'}>
        {time}
      </Flex>
    </>
  );
}
