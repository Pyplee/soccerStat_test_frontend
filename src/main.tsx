import React from 'react';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme/theme';
import './locales/i18n';

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>,
);
