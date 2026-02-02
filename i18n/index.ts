import * as Localization from 'expo-localization';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

const supportedLanguages = ['ru', 'en', 'pl', 'es'] as const;
const fallbackLanguage = 'ru';
const deviceLanguageCode = Localization.getLocales()[0]?.languageCode;
const initialLanguage =
  deviceLanguageCode &&
  supportedLanguages.includes(
    deviceLanguageCode as (typeof supportedLanguages)[number],
  )
    ? deviceLanguageCode
    : fallbackLanguage;


const i18nOptions: InitOptions = {
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages,
  resources: {
    ru: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Каждый день - что делать и чего не делать',
          start: 'Начать',
        }
      },
    },
    en: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Каждый день - что делать и чего не делать',
          start: 'Начать',
        }
      },
    },
    pl: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Каждый день - что делать и чего не делать',
          start: 'Начать',
        }
      },
    },
    es: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Каждый день - что делать и чего не делать',
          start: 'Начать',
        }
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
};

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init(i18nOptions);

export default i18n;
