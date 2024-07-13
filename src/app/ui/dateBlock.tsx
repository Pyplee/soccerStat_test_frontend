"use client";
import React from "react";
import { Input } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import "../globals.css";

type DateRangeProps = {
  setDateStart: (value: string) => void;
  setDateEnd: (value: string) => void;
  dateStart: string;
  dateEnd: string;
  errorDate: string;
  setErrorDate: (value: string) => void;
};

export default function DateSelect({
  setDateStart,
  setDateEnd,
  dateStart,
  dateEnd,
  errorDate,
  setErrorDate,
}: DateRangeProps) {
  const validateDateIsError = (
    dateStartCheck: string,
    dateEndCheck: string,
  ) => {
    const a = dateStartCheck === "";
    const b = dateEndCheck === "";
    if (a === b) {
      const date1Parts = dateStartCheck.split("-").map((item) => Number(item));
      const date2Parts = dateEndCheck.split("-").map((item) => Number(item));
      const date1 = new Date(date1Parts[0], date1Parts[2] - 1, date1Parts[1]);
      const date2 = new Date(date2Parts[0], date2Parts[2] - 1, date2Parts[1]);
      if (date1 > date2) {
        setErrorDate("first");
        return;
      }
      setErrorDate("");
    }
    if (a && !b) {
      setErrorDate("first");
      return;
    }
    if (!a && b) {
      setErrorDate("second");
      return;
    }
  };

  const updateStartDate = (e: React.FormEvent<HTMLInputElement>) => {
    const newStartDate = (e.target as HTMLInputElement).value;
    validateDateIsError(newStartDate, dateEnd);
    setDateStart(newStartDate);
  };

  const updateEndDate = (e: React.FormEvent<HTMLInputElement>) => {
    const newEndDate = (e.target as HTMLInputElement).value;
    validateDateIsError(dateStart, newEndDate);
    setDateEnd(newEndDate);
  };

  return (
    <Flex align="center" justify="start" p={2}>
      <Text color={"black"} as="samp" size="xl" fontSize="xl" p={2}>
        с
      </Text>
      <Box>
        <Input
          placeholder="Выберите начальную дату"
          size="md"
          type="date"
          maxW="250px"
          className="adaptive-input-date"
          onChange={updateStartDate}
          borderColor={errorDate === "first" ? "red.500" : "gray.200"}
          value={dateStart}
        />
      </Box>
      <Text color={"black"} as="samp" size="xl" fontSize="xl" p={2}>
        по
      </Text>
      <Box>
        <Input
          placeholder="Выберите конечную дату"
          size="md"
          type="date"
          maxW="250px"
          className="adaptive-input-date"
          onChange={updateEndDate}
          borderColor={errorDate === "second" ? "red.500" : "gray.200"}
          value={dateEnd}
        />
      </Box>
    </Flex>
  );
}
