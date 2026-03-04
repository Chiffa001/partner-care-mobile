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
        todayCards: {
          state: {
            title: 'Что с ней сейчас',
            description: 'Беременность - это не «радость 24/7».\nВозможна тревожность и \nусталость.',
          },
          actions: {
            title: 'Что сделать сегодня',
            items: [
              'Спроси: «Как я могу помочь?»',
              'Возьми на себя мелкие бытовые дела',
              'Будь рядом, даже если она молчит',
            ],
          },
          donts: {
            title: 'Чего не делать',
            items: [
              'Не ждать энтузиазма',
              'Не говорить «всё будет хорошо»',
              'Не требовать объяснений',
            ],
          },
        },
        tabs: {
          today: 'Сегодня',
          years: 'Роды',
          settings: 'Настройки',
        },
        settingsScreen: {
          sections: {
            profile: 'Профиль',
            notifications: 'Уведомления',
            subscription: 'Подписка',
          },
          rows: {
            pregnancyTerm: 'Срок беременности',
            livingTogether: 'Живём вместе',
            firstPregnancy: 'Первая беременность',
            communicationStyle: 'Как с тобой говорить',
            pushNotifications: 'Push-уведомления',
            mySubscription: 'Моя подписка',
          },
          values: {
            pregnancyWeeks: '17 недель',
          },
          communicationTone: {
            title: 'Как с тобой говорить',
            options: {
              soft: {
                title: 'Мягко',
                description: 'С поддержкой и объяснениями',
              },
              direct: {
                title: 'Прямо',
                description: 'Коротко и по делу',
              },
              brief: {
                title: 'Очень коротко',
                description: 'Только главное',
              },
            },
          },
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
        todayCards: {
          state: {
            title: 'Что с ней сейчас',
            description: 'Беременность - это не «радость 24/7».\nВозможна тревожность и \nусталость.',
          },
          actions: {
            title: 'Что сделать сегодня',
            items: [
              'Спроси: «Как я могу помочь?»',
              'Возьми на себя мелкие бытовые дела',
              'Будь рядом, даже если она молчит',
            ],
          },
          donts: {
            title: 'Чего не делать',
            items: [
              'Не ждать энтузиазма',
              'Не говорить «всё будет хорошо»',
              'Не требовать объяснений',
            ],
          },
        },
        tabs: {
          today: 'Сегодня',
          years: 'Роды',
          settings: 'Настройки',
        },
        settingsScreen: {
          sections: {
            profile: 'Профиль',
            notifications: 'Уведомления',
            subscription: 'Подписка',
          },
          rows: {
            pregnancyTerm: 'Срок беременности',
            livingTogether: 'Живём вместе',
            firstPregnancy: 'Первая беременность',
            communicationStyle: 'Как с тобой говорить',
            pushNotifications: 'Push-уведомления',
            mySubscription: 'Моя подписка',
          },
          values: {
            pregnancyWeeks: '17 недель',
          },
          communicationTone: {
            title: 'Как с тобой говорить',
            options: {
              soft: {
                title: 'Мягко',
                description: 'С поддержкой и объяснениями',
              },
              direct: {
                title: 'Прямо',
                description: 'Коротко и по делу',
              },
              brief: {
                title: 'Очень коротко',
                description: 'Только главное',
              },
            },
          },
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
        todayCards: {
          state: {
            title: 'Что с ней сейчас',
            description: 'Беременность - это не «радость 24/7».\nВозможна тревожность и \nусталость.',
          },
          actions: {
            title: 'Что сделать сегодня',
            items: [
              'Спроси: «Как я могу помочь?»',
              'Возьми на себя мелкие бытовые дела',
              'Будь рядом, даже если она молчит',
            ],
          },
          donts: {
            title: 'Чего не делать',
            items: [
              'Не ждать энтузиазма',
              'Не говорить «всё будет хорошо»',
              'Не требовать объяснений',
            ],
          },
        },
        tabs: {
          today: 'Сегодня',
          years: 'Роды',
          settings: 'Настройки',
        },
        settingsScreen: {
          sections: {
            profile: 'Профиль',
            notifications: 'Уведомления',
            subscription: 'Подписка',
          },
          rows: {
            pregnancyTerm: 'Срок беременности',
            livingTogether: 'Живём вместе',
            firstPregnancy: 'Первая беременность',
            communicationStyle: 'Как с тобой говорить',
            pushNotifications: 'Push-уведомления',
            mySubscription: 'Моя подписка',
          },
          values: {
            pregnancyWeeks: '17 недель',
          },
          communicationTone: {
            title: 'Как с тобой говорить',
            options: {
              soft: {
                title: 'Мягко',
                description: 'С поддержкой и объяснениями',
              },
              direct: {
                title: 'Прямо',
                description: 'Коротко и по делу',
              },
              brief: {
                title: 'Очень коротко',
                description: 'Только главное',
              },
            },
          },
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
        todayCards: {
          state: {
            title: 'Что с ней сейчас',
            description: 'Беременность - это не «радость 24/7».\nВозможна тревожность \nи усталость.',
          },
          actions: {
            title: 'Что сделать сегодня',
            items: [
              'Спроси: «Как я могу помочь?»',
              'Возьми на себя мелкие бытовые дела',
              'Будь рядом, даже если она молчит',
            ],
          },
          donts: {
            title: 'Чего не делать',
            items: [
              'Не ждать энтузиазма',
              'Не говорить «всё будет хорошо»',
              'Не требовать объяснений',
            ],
          },
        },
        tabs: {
          today: 'Сегодня',
          years: 'Роды',
          settings: 'Настройки',
        },
        settingsScreen: {
          sections: {
            profile: 'Профиль',
            notifications: 'Уведомления',
            subscription: 'Подписка',
          },
          rows: {
            pregnancyTerm: 'Срок беременности',
            livingTogether: 'Живём вместе',
            firstPregnancy: 'Первая беременность',
            communicationStyle: 'Как с тобой говорить',
            pushNotifications: 'Push-уведомления',
            mySubscription: 'Моя подписка',
          },
          values: {
            pregnancyWeeks: '17 недель',
          },
          communicationTone: {
            title: 'Как с тобой говорить',
            options: {
              soft: {
                title: 'Мягко',
                description: 'С поддержкой и объяснениями',
              },
              direct: {
                title: 'Прямо',
                description: 'Коротко и по делу',
              },
              brief: {
                title: 'Очень коротко',
                description: 'Только главное',
              },
            },
          },
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
