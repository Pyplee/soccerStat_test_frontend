import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, useColorModeValue, Badge } from '@chakra-ui/react';
import { INavItem } from '../../interfaces/INavItem';
import getColorActivePage from './getColorsActivePage';

const NavLink: React.FC<INavItem & React.HTMLAttributes<HTMLAnchorElement>> = ({
  id,
  label,
  href,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageNavigation = pathname.split('/')[1] ?? '';
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.800'),
      }}
      href={href}
    >
      <Badge
        colorScheme={getColorActivePage(id, currentPageNavigation)}
        ml="1"
        p="1"
        pr="3"
        pl="3"
        textAlign="center"
        rounded="xl"
      >
        {label}
      </Badge>
    </Box>
  );
};

export { NavLink };
