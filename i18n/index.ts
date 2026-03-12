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
          childbirth: 'Роды',
          settings: 'Настройки',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Схватки',
            sheIsTired: 'Она устала',
            toHospital: 'В роддом',
            doctor: 'Врач',
          },
          contractions: {
            statusActive: 'Схватки начались',
            statusIdle: 'Ожидание следующей схватки',
            timerTitle: 'Таймер схваток',
            startButton: 'Начать',
            startConfirmButton: 'Подтвердить',
            stopButton: 'Стоп',
            resetButton: 'Сброс',
            timerNotStartedHint: 'Таймер еще не запускался',
            durationLabel: 'Длительность',
            intervalLabel: 'Интервал',
            averageIntervalLabel: 'Средний интервал',
            historyTitle: 'История схваток',
            historyEmpty: 'Пока нет записей',
            historyClose: 'Закрыть',
            whatToDoTitle: 'Что делать сейчас',
            whatToDoItems: [
              'Напомни ей дышать',
              'Помоги выбрать удобную позу',
              'Говори спокойно',
            ],
            howToRecognizeTitle: 'Как распознать схватки',
            howToRecognizeItems: [
              'Появляются регулярно и становятся чаще',
              'Боль усиливается и не проходит в покое',
              'Схватка длится около 30-60 секунд',
            ],
          },
          sheIsTired: {
            status: 'Нужен отдых',
            helpTitle: 'Как помочь',
            helpItems: [
              'Позаботиться о тишине',
              'Сделать ей лёгкий перекус или предложить воду',
              'Дать ей расслабиться и отдохнуть',
            ],
            avoidTitle: 'Чего не делать',
            avoidItems: [
              'Не просить об активности',
              'Не тревожить по пустякам',
            ],
          },
          toHospital: {
            status: 'Пора ехать в роддом',
            title: 'Сборы в роддом',
            items: [
              'Проверь документы и обменную карту',
              'Возьми заранее собранную сумку',
              'Вызови такси или подготовь машину',
            ],
          },
          doctor: {
            status: 'Нужна связь с врачом',
            title: 'Когда звонить врачу',
            items: [
              'Схватки идут часто и усиливаются',
              'Отошли воды или есть необычные выделения',
              'Появилась сильная боль или тревожные симптомы',
            ],
          },
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
            language: 'Язык',
            pushNotifications: 'Push-уведомления',
            mySubscription: 'Моя подписка',
          },
          values: {
            pregnancyWeeks: '17 недель',
            weeksForms: {
              one: 'неделя',
              few: 'недели',
              many: 'недель',
            },
          },
          dueDate: {
            title: 'Предполагаемая дата родов',
            cancel: 'Отмена',
            confirm: 'Сохранить',
          },
          language: {
            title: 'Выберите язык',
            options: {
              ru: 'Русский',
              en: 'English',
              pl: 'Polski',
              es: 'Español',
            },
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
          title: 'Helping you be supportive during pregnancy',
          description: 'Support from the first trimester\n to birth',
          button: 'Start',
        },
        onboarding1: {
          title: 'You are there — and it matters',
          description: 'Even if you doubt yourself',
          button: 'Next',
        },
        onboarding2: {
          title: 'Tips for\n real-life situations',
          description: 'When it matters to help, not harm',
          button: 'Next',
        },
        onboarding3: {
          title: 'One day — one focus',
          description: 'What to focus on right now',
          button: 'Start',
        },
        todayCards: {
          state: {
            title: 'What she is feeling now',
            description: 'Pregnancy is not “24/7 joy”.\nAnxiety and \nfatigue are possible.',
          },
          actions: {
            title: 'What to do today',
            items: [
              'Ask: “How can I help?”',
              'Take over small household tasks',
              'Be there, even when she is quiet',
            ],
          },
          donts: {
            title: 'What not to do',
            items: [
              "Don't expect enthusiasm",
              "Don't say “everything will be fine”",
              "Don't demand explanations",
            ],
          },
        },
        tabs: {
          today: 'Today',
          childbirth: 'Childbirth',
          settings: 'Settings',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Contractions',
            sheIsTired: 'She is tired',
            toHospital: 'To hospital',
            doctor: 'Doctor',
          },
          contractions: {
            statusActive: 'Contractions have started',
            statusIdle: 'Waiting for the next contraction',
            timerTitle: 'Contraction timer',
            startButton: 'Start',
            startConfirmButton: 'Confirm',
            stopButton: 'Stop',
            resetButton: 'Reset',
            timerNotStartedHint: 'Timer has not been started yet',
            durationLabel: 'Duration',
            intervalLabel: 'Interval',
            averageIntervalLabel: 'Average interval',
            historyTitle: 'Contractions history',
            historyEmpty: 'No records yet',
            historyClose: 'Close',
            whatToDoTitle: 'What to do now',
            whatToDoItems: [
              'Remind her to breathe',
              'Help her find a comfortable position',
              'Speak calmly',
            ],
            howToRecognizeTitle: 'How to recognize contractions',
            howToRecognizeItems: [
              'They appear regularly and become more frequent',
              'Pain increases and does not go away at rest',
              'Each contraction lasts around 30-60 seconds',
            ],
          },
          sheIsTired: {
            status: 'She needs rest',
            helpTitle: 'How to help',
            helpItems: [
              'Keep the room quiet',
              'Prepare a light snack or offer water',
              'Let her relax and rest',
            ],
            avoidTitle: 'What not to do',
            avoidItems: [
              'Do not ask for activity',
              'Do not disturb her over minor things',
            ],
          },
          toHospital: {
            status: 'Time to go to the hospital',
            title: 'Going to the hospital',
            items: [
              'Check documents and maternity records',
              'Take the prepared hospital bag',
              'Call a taxi or get the car ready',
            ],
          },
          doctor: {
            status: 'Contact with a doctor is needed',
            title: 'When to call a doctor',
            items: [
              'Contractions are frequent and intensifying',
              'Water broke or unusual discharge appeared',
              'Severe pain or alarming symptoms started',
            ],
          },
        },
        settingsScreen: {
          sections: {
            profile: 'Profile',
            notifications: 'Notifications',
            subscription: 'Subscription',
          },
          rows: {
            pregnancyTerm: 'Pregnancy term',
            livingTogether: 'Living together',
            firstPregnancy: 'First pregnancy',
            communicationStyle: 'How to talk to you',
            language: 'Language',
            pushNotifications: 'Push notifications',
            mySubscription: 'My subscription',
          },
          values: {
            pregnancyWeeks: '17 weeks',
            weeksForms: {
              one: 'week',
              few: 'weeks',
              many: 'weeks',
            },
          },
          dueDate: {
            title: 'Estimated due date',
            cancel: 'Cancel',
            confirm: 'Save',
          },
          language: {
            title: 'Choose language',
            options: {
              ru: 'Russian',
              en: 'English',
              pl: 'Polish',
              es: 'Spanish',
            },
          },
          communicationTone: {
            title: 'How to talk to you',
            options: {
              soft: {
                title: 'Gentle',
                description: 'With support and explanations',
              },
              direct: {
                title: 'Direct',
                description: 'Short and to the point',
              },
              brief: {
                title: 'Very brief',
                description: 'Only the essentials',
              },
            },
          },
        },
      },
    },
    pl: {
      translation: {
        value: {
          title: 'Pomagamy być wsparciem w czasie ciąży',
          description: 'Wsparcie od pierwszego trymestru\n aż do porodu',
          button: 'Start',
        },
        onboarding1: {
          title: 'Jesteś obok — i to ważne',
          description: 'Nawet jeśli w siebie wątpisz',
          button: 'Dalej',
        },
        onboarding2: {
          title: 'Wskazówki do\n prawdziwych sytuacji',
          description: 'Gdy ważne jest pomóc, a nie zaszkodzić',
          button: 'Dalej',
        },
        onboarding3: {
          title: 'Jeden dzień — jeden cel',
          description: 'Na czym warto skupić się teraz',
          button: 'Start',
        },
        todayCards: {
          state: {
            title: 'Co się z nią dzieje teraz',
            description: 'Ciąża to nie „radość 24/7”.\nMożliwy jest niepokój i \nzmęczenie.',
          },
          actions: {
            title: 'Co zrobić dzisiaj',
            items: [
              'Zapytaj: „Jak mogę pomóc?”',
              'Przejmij drobne domowe obowiązki',
              'Bądź obok, nawet gdy milczy',
            ],
          },
          donts: {
            title: 'Czego nie robić',
            items: [
              'Nie oczekuj entuzjazmu',
              'Nie mów „wszystko będzie dobrze”',
              'Nie wymagaj wyjaśnień',
            ],
          },
        },
        tabs: {
          today: 'Dzisiaj',
          childbirth: 'Poród',
          settings: 'Ustawienia',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Skurcze',
            sheIsTired: 'Jest zmęczona',
            toHospital: 'Do szpitala',
            doctor: 'Lekarz',
          },
          contractions: {
            statusActive: 'Skurcze się zaczęły',
            statusIdle: 'Oczekiwanie na kolejny skurcz',
            timerTitle: 'Timer skurczów',
            startButton: 'Start',
            startConfirmButton: 'Potwierdź',
            stopButton: 'Stop',
            resetButton: 'Reset',
            timerNotStartedHint: 'Timer nie został jeszcze uruchomiony',
            durationLabel: 'Czas trwania',
            intervalLabel: 'Interwał',
            averageIntervalLabel: 'Średni interwał',
            historyTitle: 'Historia skurczów',
            historyEmpty: 'Brak zapisów',
            historyClose: 'Zamknij',
            whatToDoTitle: 'Co robić teraz',
            whatToDoItems: [
              'Przypomnij jej o oddychaniu',
              'Pomóż wybrać wygodną pozycję',
              'Mów spokojnie',
            ],
            howToRecognizeTitle: 'Jak rozpoznać skurcze',
            howToRecognizeItems: [
              'Pojawiają się regularnie i są coraz częstsze',
              'Ból narasta i nie ustępuje w spoczynku',
              'Skurcz trwa około 30-60 sekund',
            ],
          },
          sheIsTired: {
            status: 'Potrzebuje odpoczynku',
            helpTitle: 'Jak pomóc',
            helpItems: [
              'Zadbaj o ciszę',
              'Przygotuj lekką przekąskę lub zaproponuj wodę',
              'Pozwól jej się rozluźnić i odpocząć',
            ],
            avoidTitle: 'Czego nie robić',
            avoidItems: [
              'Nie proś o aktywność',
              'Nie niepokój jej drobiazgami',
            ],
          },
          toHospital: {
            status: 'Czas jechać do szpitala',
            title: 'Wyjazd do szpitala',
            items: [
              'Sprawdź dokumenty i kartę ciąży',
              'Weź wcześniej spakowaną torbę',
              'Zamów taksówkę lub przygotuj samochód',
            ],
          },
          doctor: {
            status: 'Potrzebny kontakt z lekarzem',
            title: 'Kiedy dzwonić do lekarza',
            items: [
              'Skurcze są częste i coraz silniejsze',
              'Odeszły wody lub pojawiła się nietypowa wydzielina',
              'Wystąpił silny ból lub niepokojące objawy',
            ],
          },
        },
        settingsScreen: {
          sections: {
            profile: 'Profil',
            notifications: 'Powiadomienia',
            subscription: 'Subskrypcja',
          },
          rows: {
            pregnancyTerm: 'Czas trwania ciąży',
            livingTogether: 'Mieszkamy razem',
            firstPregnancy: 'Pierwsza ciąża',
            communicationStyle: 'Jak z Tobą rozmawiać',
            language: 'Język',
            pushNotifications: 'Powiadomienia push',
            mySubscription: 'Moja subskrypcja',
          },
          values: {
            pregnancyWeeks: '17 tygodni',
            weeksForms: {
              one: 'tydzień',
              few: 'tygodnie',
              many: 'tygodni',
            },
          },
          dueDate: {
            title: 'Przewidywana data porodu',
            cancel: 'Anuluj',
            confirm: 'Zapisz',
          },
          language: {
            title: 'Wybierz język',
            options: {
              ru: 'Rosyjski',
              en: 'Angielski',
              pl: 'Polski',
              es: 'Hiszpański',
            },
          },
          communicationTone: {
            title: 'Jak z Tobą rozmawiać',
            options: {
              soft: {
                title: 'Łagodnie',
                description: 'Ze wsparciem i wyjaśnieniami',
              },
              direct: {
                title: 'Wprost',
                description: 'Krótko i na temat',
              },
              brief: {
                title: 'Bardzo krótko',
                description: 'Tylko najważniejsze',
              },
            },
          },
        },
      },
    },
    es: {
      translation: {
        value: {
          title: 'Ayudamos a ser útil durante el embarazo',
          description: 'Apoyo desde el primer trimestre\n hasta el nacimiento',
          button: 'Empezar',
        },
        onboarding1: {
          title: 'Estás a su lado — y eso importa',
          description: 'Incluso si dudas de ti',
          button: 'Siguiente',
        },
        onboarding2: {
          title: 'Consejos para\n situaciones reales',
          description: 'Cuando es importante ayudar y no hacer daño',
          button: 'Siguiente',
        },
        onboarding3: {
          title: 'Un día — un enfoque',
          description: 'En qué conviene centrarse ahora',
          button: 'Empezar',
        },
        todayCards: {
          state: {
            title: 'Cómo se siente ahora',
            description: 'El embarazo no es “alegría 24/7”.\nPuede haber ansiedad \ny cansancio.',
          },
          actions: {
            title: 'Qué hacer hoy',
            items: [
              'Pregunta: «¿Cómo puedo ayudar?»',
              'Encárgate de pequeñas tareas del hogar',
              'Quédate cerca, aunque esté callada',
            ],
          },
          donts: {
            title: 'Qué no hacer',
            items: [
              'No esperes entusiasmo',
              'No digas «todo estará bien»',
              'No exijas explicaciones',
            ],
          },
        },
        tabs: {
          today: 'Hoy',
          childbirth: 'Parto',
          settings: 'Ajustes',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Contracciones',
            sheIsTired: 'Ella está cansada',
            toHospital: 'Al hospital',
            doctor: 'Médico',
          },
          contractions: {
            statusActive: 'Las contracciones comenzaron',
            statusIdle: 'Esperando la siguiente contracción',
            timerTitle: 'Temporizador de contracciones',
            startButton: 'Iniciar',
            startConfirmButton: 'Confirmar',
            stopButton: 'Detener',
            resetButton: 'Restablecer',
            timerNotStartedHint: 'El temporizador aún no se ha iniciado',
            durationLabel: 'Duración',
            intervalLabel: 'Intervalo',
            averageIntervalLabel: 'Intervalo medio',
            historyTitle: 'Historial de contracciones',
            historyEmpty: 'Aún no hay registros',
            historyClose: 'Cerrar',
            whatToDoTitle: 'Qué hacer ahora',
            whatToDoItems: [
              'Recuérdale que respire',
              'Ayúdala a encontrar una postura cómoda',
              'Habla con calma',
            ],
            howToRecognizeTitle: 'Cómo reconocer contracciones',
            howToRecognizeItems: [
              'Aparecen de forma regular y cada vez más frecuentes',
              'El dolor aumenta y no cede en reposo',
              'Cada contracción dura alrededor de 30-60 segundos',
            ],
          },
          sheIsTired: {
            status: 'Necesita descansar',
            helpTitle: 'Cómo ayudar',
            helpItems: [
              'Procura que haya silencio',
              'Prepárale un snack ligero u ofrécele agua',
              'Déjala relajarse y descansar',
            ],
            avoidTitle: 'Qué no hacer',
            avoidItems: [
              'No le pidas actividad',
              'No la molestes por cosas sin importancia',
            ],
          },
          toHospital: {
            status: 'Es hora de ir al hospital',
            title: 'Salida al hospital',
            items: [
              'Revisa documentos y tarjeta de embarazo',
              'Lleva la bolsa ya preparada',
              'Pide un taxi o prepara el coche',
            ],
          },
          doctor: {
            status: 'Se necesita contacto con el médico',
            title: 'Cuándo llamar al médico',
            items: [
              'Las contracciones son frecuentes y más intensas',
              'Se rompió la bolsa o hay flujo inusual',
              'Apareció dolor fuerte o síntomas alarmantes',
            ],
          },
        },
        settingsScreen: {
          sections: {
            profile: 'Perfil',
            notifications: 'Notificaciones',
            subscription: 'Suscripción',
          },
          rows: {
            pregnancyTerm: 'Tiempo de embarazo',
            livingTogether: 'Vivimos juntos',
            firstPregnancy: 'Primer embarazo',
            communicationStyle: 'Cómo hablar contigo',
            language: 'Idioma',
            pushNotifications: 'Notificaciones push',
            mySubscription: 'Mi suscripción',
          },
          values: {
            pregnancyWeeks: '17 semanas',
            weeksForms: {
              one: 'semana',
              few: 'semanas',
              many: 'semanas',
            },
          },
          dueDate: {
            title: 'Fecha probable de parto',
            cancel: 'Cancelar',
            confirm: 'Guardar',
          },
          language: {
            title: 'Elegir idioma',
            options: {
              ru: 'Ruso',
              en: 'Inglés',
              pl: 'Polaco',
              es: 'Español',
            },
          },
          communicationTone: {
            title: 'Cómo hablar contigo',
            options: {
              soft: {
                title: 'Suave',
                description: 'Con apoyo y explicaciones',
              },
              direct: {
                title: 'Directo',
                description: 'Corto y al grano',
              },
              brief: {
                title: 'Muy breve',
                description: 'Solo lo esencial',
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
