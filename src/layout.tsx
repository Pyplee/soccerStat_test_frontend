import React from 'react';
import Header from './components/header';
import Footer from './components/Footer';
import { Box, useColorModeValue, useColorMode } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorMode } = useColorMode();
  console.log(colorMode); // Должен выводить 'light' или 'dark'

  return (
    <div id="layout-container">
      <Header />
      <Box
        as="main"
        bg={useColorModeValue('gray.200', 'gray.700')}
        id="main-container"
      >
        {children}
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
