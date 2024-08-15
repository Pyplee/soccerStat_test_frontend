import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

type InputSearchProps = {
  searchChange: (value: string) => void;
};

export default function InputSearch({ searchChange }: InputSearchProps) {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    searchChange(value);
  };

  const handleClearInput = () => {
    setInputValue('');
    searchChange('');
  };

  return (
    <Stack spacing={4} pt="1rem">
      <InputGroup size="md" w="350px" className="adaptive-input">
        <Input
          placeholder={t('input.placeholder')}
          variant="outline"
          colorScheme="black"
          rounded="xl"
          pr="3rem"
          bg={useColorModeValue('white', 'gray.800')}
          value={inputValue}
          onChange={handleInputChange}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Сбросить поиск"
            icon={<CloseIcon w={3} h={3} />}
            w="97%"
            h="95%"
            rounded="xl"
            onClick={() => {
              handleClearInput();
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
