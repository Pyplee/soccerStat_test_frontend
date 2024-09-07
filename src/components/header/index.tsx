import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
  Badge,
} from '@chakra-ui/react';
import ButtonChangeTheme from './ButtonChangeTheme';
import MenuChangeLanguage from './MenuChangeLanguage';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { INavItem } from '../../interfaces/INavItem';
import getColorActivePage from './getColorsActivePage';
import { NavLink } from './NavLink';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageNavigation = pathname.split('/')[1] ?? '';
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const { t } = useTranslation();

  const NAV_ITEMS: Array<INavItem> = [
    {
      label: t('navbar.competitions'),
      href: '/competitions',
      id: 'competitions',
    },
    {
      label: t('navbar.сommands'),
      href: '/commands',
      id: 'commands',
    },
  ];

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.600')} px={4}>
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
            <ButtonChangeTheme />
            <MenuChangeLanguage />
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
