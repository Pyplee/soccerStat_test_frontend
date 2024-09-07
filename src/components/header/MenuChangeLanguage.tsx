import React, { useEffect, useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react';
import { HiMiniLanguage } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const MenuChangeLanguage = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  function handleLngChange(newLang: string) {
    if (newLang !== lang) {
      i18n.changeLanguage(newLang);
    }
  }
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
        pl={4}
        borderColor="none"
        leftIcon={<HiMiniLanguage />}
        aria-label="Language"
      ></MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleLngChange('en')}>
          English
          <Image src="/en-flag.svg" boxSize={7} pl={1} />
        </MenuItem>
        <MenuItem onClick={() => handleLngChange('ru')}>
          Русский
          <Image src="/ru-flag.svg" boxSize={7} pl={1} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuChangeLanguage;
