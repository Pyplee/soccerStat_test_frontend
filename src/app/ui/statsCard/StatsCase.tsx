"use client";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export default function StatsCase({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
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
          {children}
        </Flex>
      </Box>
    </>
  );
}
