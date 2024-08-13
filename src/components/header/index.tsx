import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageNavigation = pathname.split('/')[1] ?? '';
  return (
    <Box mb="1%">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'end', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            <img
              src="/logo.svg"
              width={100}
              height={36}
              alt="Picture of the author"
            />
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav
              currentPageNavigation={currentPageNavigation}
              NAV_ITEMS={NAV_ITEMS}
            />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav
          currentPageNavigation={currentPageNavigation}
          NAV_ITEMS={NAV_ITEMS}
        />
      </Collapse>
    </Box>
  );
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  id: string;
  currentPageNavigation?: string | undefined;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Лиги',
    href: '/competitions',
    id: 'competitions',
  },
  {
    label: 'Команды',
    href: '/commands',
    id: 'commands',
  },
];
