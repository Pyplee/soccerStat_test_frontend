import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { IErrorData } from '../interfaces/IErrorData';
import { useTranslation } from 'react-i18next';

export default function Error({ code, message }: IErrorData) {
  let codeFormated;
  let messageFormated;
  const translatedCodesArr = ['unknownError', '429', '403'];
  const { t } = useTranslation();

  if (translatedCodesArr.includes(code ?? 'unknownError')) {
    codeFormated = t(`error.${code}.title`);
    messageFormated = t(`error.${code}.message`);
  } else {
    codeFormated = code;
    messageFormated = message;
  }

  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {codeFormated}
      </Heading>
      <Text color={'gray.500'}>{messageFormated}</Text>
    </Box>
  );
}
