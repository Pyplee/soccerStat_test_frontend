"use client";

import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type InputSearchProps = {
  searchChange: (value: string) => void;
};

export default function InputSearch({ searchChange }: InputSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    searchChange(value);
  };

  const handleClearInput = () => {
    setInputValue("");
    searchChange("");
  };

  return (
    <Stack spacing={4}>
      <InputGroup size="md" w="20%">
        <Input
          placeholder="поиск"
          variant="outline"
          colorScheme="black"
          rounded="xl"
          pr="3rem"
          bg="white"
          value={inputValue} // Связывание состояния с инпутом
          onChange={handleInputChange}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Сбросить поиск"
            icon={<CloseIcon w={3} h={3} />}
            w="97%"
            h="95%"
            rounded="xl"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              handleClearInput();
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
