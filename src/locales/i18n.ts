import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './translation.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    // lng: 'en',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
