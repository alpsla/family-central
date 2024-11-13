import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';

// Initialize i18next
const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en }
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });

  return i18n;
};

export const i18nInstance = initI18n();
export default i18nInstance;