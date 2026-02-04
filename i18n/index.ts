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
          description: 'Поддержка - от первого триместра\n до самого рождения',
          button: 'Начать',
        },
        onboarding1: {
          title: 'Ты рядом — и это важно',
          description: 'Даже если ты сомневаешься в себе',
          button: 'Далее',
        },
        onboarding2: {
          title: 'Подсказки для\n реальных ситуаций',
          description: 'Когда важно не навредить, а помочь',
          button: 'Далее',
        },
        onboarding3: {
          title: 'Один день — один фокус',
          description: 'На чём стоит сосредоточиться сейчас',
          button: 'Начать',
        },
      },
    },
    en: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Поддержка - от первого триместра\n до самого рождения',
          button: 'Начать',
        },
        onboarding1: {
          title: 'Ты рядом — и это важно',
          description: 'Даже если ты сомневаешься в себе',
          button: 'Далее',
        },
        onboarding2: {
          title: 'Подсказки для\n реальных ситуаций',
          description: 'Когда важно не навредить, а помочь',
          button: 'Далее',
        },
        onboarding3: {
          title: 'Один день — один фокус',
          description: 'На чём стоит сосредоточиться сейчас',
          button: 'Начать',
        },
      },
    },
    pl: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Поддержка - от первого триместра\n до самого рождения',
          button: 'Начать',
        },
        onboarding1: {
          title: 'Ты рядом — и это важно',
          description: 'Даже если ты сомневаешься в себе',
          button: 'Далее',
        },
        onboarding2: {
          title: 'Подсказки для\n реальных ситуаций',
          description: 'Когда важно не навредить, а помочь',
          button: 'Далее',
        },
        onboarding3: {
          title: 'Один день — один фокус',
          description: 'На чём стоит сосредоточиться сейчас',
          button: 'Начать',
        },
      },
    },
    es: {
      translation: {
        value: {
          title: 'Помогаем быть полезным во время беременности',
          description: 'Поддержка - от первого триместра\n до самого рождения',
          button: 'Начать',
        },
        onboarding1: {
          title: 'Ты рядом — и это важно',
          description: 'Даже если ты сомневаешься в себе',
          button: 'Далее',
        },
        onboarding2: {
          title: 'Подсказки для\n реальных ситуаций',
          description: 'Когда важно не навредить, а помочь',
          button: 'Далее',
        },
        onboarding3: {
          title: 'Один день — один фокус',
          description: 'На чём стоит сосредоточиться сейчас',
          button: 'Начать',
        },
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
