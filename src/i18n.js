import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { tr } from './translations/tr';
import { en } from './translations/en';

const resources = {
  tr: tr,
  en: en
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 