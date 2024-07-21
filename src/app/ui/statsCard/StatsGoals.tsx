"use client";
import { Flex, Badge } from "@chakra-ui/react";

type GoalsProps = {
  result: string;
};
export default function StatsGoals({ result }: GoalsProps) {
  return (
    <>
      <Flex w="10%" justifyContent={"center"}>
        <Badge
          colorScheme={"gray"}
          textAlign="center"
          rounded="md"
          fontSize={"md"}
          textColor={"gray.700"}
        >
          {result}
        </Badge>
      </Flex>
    </>
  );
}
