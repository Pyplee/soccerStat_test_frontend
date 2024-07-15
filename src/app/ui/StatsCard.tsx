"use client";
import { Box, Flex, Badge, Text, useColorModeValue } from "@chakra-ui/react";
import { toZonedTime } from "date-fns-tz";
import "../globals.css";

type StatsProps = {
  dateAndTime: string;
  commandA: string;
  commandB: string;
  resultStatGoals: string;
  status: string;
};

export default function StatsCard({
  dateAndTime,
  commandA,
  commandB,
  resultStatGoals,
  status,
}: StatsProps) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(dateAndTime, userTimeZone);
  const formattedDate = zonedDate.toLocaleString("ru-Ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: userTimeZone,
    timeZoneName: "short",
  });
  const [dateFromatted, timeFormatted] = formattedDate.split(",");
  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={"2"}
      shadow={"xl"}
      border={"2px solid"}
      borderColor={useColorModeValue("gray.300", "gray.500")}
      rounded={"lg"}
      mb={5}
      className="adaptive-stats-card"
      w="100%"
    >
      <Flex
        justifyContent={"center"}
        align={"center"}
        direction={{ base: "column", md: "row" }}
        className="adaptive-flex-stats-card"
      >
        <Flex w="10%" justifyContent={"center"}>
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {dateFromatted}
          </Badge>
        </Flex>
        <Flex w="12%" justifyContent={"center"}>
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {timeFormatted}
          </Badge>
        </Flex>
        <Flex w="12%" justifyContent={"center"} align={"center"}>
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {status}
          </Badge>
        </Flex>
        <Flex
          justifyContent={"center"}
          className="adaptive-stat-command"
          w={"40%"}
          align={"center"}
        >
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {commandA}
          </Badge>
          <Text textAlign="center">-</Text>
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {commandB}
          </Badge>
        </Flex>
        <Flex w="10%" justifyContent={"center"}>
          <Badge
            colorScheme={"gray"}
            textAlign="center"
            rounded="md"
            fontSize={"md"}
            textColor={"gray.700"}
          >
            {resultStatGoals}
            {/* X:Y (Z:G) (N:M) */}
          </Badge>
        </Flex>
      </Flex>
    </Box>
  );
}
