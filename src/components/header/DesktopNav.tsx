import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import getColorActivePage from './getColorsActivePage';
import DesktopSubNav from './DesktopSubNav';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  id: string;
  currentPageNavigation?: string | undefined;
}

interface Props {
  currentPageNavigation: string;
  NAV_ITEMS: NavItem[];
}

export default function DesktopNav({
  currentPageNavigation = '',
  NAV_ITEMS,
}: Props) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} alignItems="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link to={navItem.href ?? '#'}>
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
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
}
