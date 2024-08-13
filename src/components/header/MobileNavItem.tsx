import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import getColorActivePage from './getColorsActivePage';
import { INavItem } from '../../interfaces/INavItem';

export default function MobileNavItem({
  label,
  children,
  href,
  id,
  currentPageNavigation,
}: INavItem) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link to={href ?? '#'}>
        <Box
          py={2}
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            <Badge
              colorScheme={getColorActivePage(id, currentPageNavigation ?? '')}
              ml="1"
              p="1"
              pr="2"
              pl="2"
              textAlign="center"
              rounded="xl"
            >
              {label}
            </Badge>
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Box>
      </Link>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
