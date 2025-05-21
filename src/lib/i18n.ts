import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';
import nlTranslations from '../locales/nl.json';

const resources = {
  en: {
    translation: enTranslations
  },
  de: {
    translation: deTranslations
  },
  es: {
    translation: esTranslations
  },
  fr: {
    translation: frTranslations
  },
  nl: {
    translation: nlTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Set English as default
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;