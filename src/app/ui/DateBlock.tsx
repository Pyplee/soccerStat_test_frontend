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
  errorDate: {
    errordate1: boolean;
    errordate2: boolean;
  };
  setErrorDate: (value: { errordate1: boolean; errordate2: boolean }) => void;
};

const validateDateError = (
  dateStartCheck: string,
  dateEndCheck: string,
  setErrorDate: (value: { errordate1: boolean; errordate2: boolean }) => void,
) => {
  const a = dateStartCheck === "";
  const b = dateEndCheck === "";
  if (a === b) {
    const date1Parts = dateStartCheck.split("-").map((item) => Number(item));
    const date2Parts = dateEndCheck.split("-").map((item) => Number(item));
    const date1 = new Date(date1Parts[0], date1Parts[2] - 1, date1Parts[1]);
    const date2 = new Date(date2Parts[0], date2Parts[2] - 1, date2Parts[1]);
    if (date1 > date2) {
      setErrorDate({ errordate1: false, errordate2: true });
      return;
    }
    setErrorDate({ errordate1: false, errordate2: false });
  }
  if (a && !b) {
    setErrorDate({ errordate1: true, errordate2: false });
    return;
  }
  if (!a && b) {
    setErrorDate({ errordate1: false, errordate2: true });
    return;
  }
};

export default function DateSelect({
  setDateStart,
  setDateEnd,
  dateStart,
  dateEnd,
  errorDate,
  setErrorDate,
}: DateRangeProps) {
  const updateStartDate = (e: React.FormEvent<HTMLInputElement>) => {
    const newStartDate = (e.target as HTMLInputElement).value;
    validateDateError(newStartDate, dateEnd, setErrorDate);
    setDateStart(newStartDate);
  };

  const updateEndDate = (e: React.FormEvent<HTMLInputElement>) => {
    const newEndDate = (e.target as HTMLInputElement).value;
    validateDateError(dateStart, newEndDate, setErrorDate);
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
          borderColor={errorDate.errordate1 ? "red.500" : "gray.200"}
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
          borderColor={errorDate.errordate2 ? "red.500" : "gray.200"}
          value={dateEnd}
        />
      </Box>
    </Flex>
  );
}
