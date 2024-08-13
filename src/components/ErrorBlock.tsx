import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface ErrorData {
  code: string | null;
  message: string | null;
}

function getTextError(code: string, message: string) {
  console.log(code, message);

  let newCode;
  let newMessage;
  if (code === '') {
    newCode = 'Unknown error';
  }
  if (message === '') {
    newCode = 'Ooops! Something went wrong';
  }
  switch (code) {
    case '429':
      newCode = '429 Too Many Requests';
      newMessage =
        'You have exceeded your API request quota. Try reloading the page after a few seconds.';
      break;

    case '403':
      newCode = '403 Restricted Resource';
      newMessage =
        'You tried to access a resource that exists, but is not available to you. Check api token.';
      break;

    default:
      newCode = code;
      newMessage = message;
      break;
  }
  console.log({ codeFormated: newCode, messageFormated: newMessage });
  return { codeFormated: newCode, messageFormated: newMessage };
}

export default function Error({ code, message }: ErrorData) {
  const { codeFormated, messageFormated } = getTextError(
    code ?? '',
    message ?? '',
  );
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
