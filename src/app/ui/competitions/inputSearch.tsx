"use client";
import {
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function InputSearch() {
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
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Search database"
            icon={<CloseIcon w={3} h={3} />}
            w="97%"
            h="95%"
            rounded="xl"
          />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
