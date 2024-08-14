import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
  Badge,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { INavItem } from '../../interfaces/INavItem';
import getColorActivePage from './getColorsActivePage';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HiMiniLanguage } from 'react-icons/hi2';
import { NavLink } from './NavLink';
import Logo from './Logo';

export default function WithAction() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageNavigation = pathname.split('/')[1] ?? '';
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.800')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Logo />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {NAV_ITEMS.map((navItem) => (
                <Link key={navItem.id} href={navItem.href ?? '#'}>
                  <Box
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    <Badge
                      colorScheme={getColorActivePage(
                        navItem.id,
                        currentPageNavigation,
                      )}
                      ml="1"
                      p="1"
                      pr="3"
                      pl="3"
                      textAlign="center"
                      rounded="xl"
                    >
                      {navItem.label}
                    </Badge>
                  </Box>
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                pl={4}
                borderColor="none"
              >
                <Icon as={HiMiniLanguage} boxSize={5} />
              </MenuButton>
              <MenuList>
                <MenuItem>Lng 1</MenuItem>
                <MenuItem>Lng 2</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {NAV_ITEMS.map((navItem) => (
                <NavLink
                  key={navItem.id}
                  label={navItem.label}
                  id={navItem.id}
                  href={navItem.href}
                ></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

const NAV_ITEMS: Array<INavItem> = [
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
