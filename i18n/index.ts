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
        onboardingDueDate: {
          title: 'Когда ждёте малыша?',
          description: 'Подскажем, что важно именно на вашем сроке',
          fieldLabel: 'Предполагаемая дата родов',
          button: 'Готово',
        },
        todayCards: {
          state: {
            title: 'Что с ней сейчас',
            description:
              'Беременность - это не «радость 24/7».\nВозможна тревожность и \nусталость.',
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
          trimesters: {
            1: {
              state: {
                description:
                  'Первый триместр — токсикоз, усталость и перепады настроения. Ей может быть тяжело, даже если внешне всё спокойно.',
              },
              actions: {
                items: [
                  'Возьми на себя готовку и запахи, которые её раздражают',
                  'Будь терпелив к перепадам настроения',
                  'Помоги ей отдыхать — сон сейчас особенно важен',
                ],
              },
              donts: {
                items: [
                  'Не преуменьшай токсикоз и усталость',
                  'Не строй активных планов без её сил',
                  'Не настаивай на еде, если её тошнит',
                ],
              },
            },
            2: {
              state: {
                description:
                  'Второй триместр — обычно самый спокойный. Самочувствие лучше, появляется энергия и первые шевеления малыша.',
              },
              actions: {
                items: [
                  'Сходите вместе на УЗИ и к врачу',
                  'Гуляйте и проводите время вдвоём',
                  'Начните спокойно готовиться к малышу',
                ],
              },
              donts: {
                items: [
                  'Не забывай про неё за подготовкой к ребёнку',
                  'Не игнорируй её новые тревоги',
                  'Не перегружай делами «пока есть силы»',
                ],
              },
            },
            3: {
              state: {
                description:
                  'Третий триместр — тяжело физически: одышка, отёки, плохой сон и нарастающая тревога перед родами.',
              },
              actions: {
                items: [
                  'Помогай с бытом — наклоняться и носить ей тяжело',
                  'Соберите сумку в роддом заранее',
                  'Будь на связи и готов выехать в любой момент',
                ],
              },
              donts: {
                items: [
                  'Не оставляй её одну надолго',
                  'Не обесценивай страх перед родами',
                  'Не планируй дальние поездки',
                ],
              },
            },
          },
        },
        todayScreen: {
          weekLabel: 'Неделя {{week}}',
        },
        tabs: {
          today: 'Сегодня',
          childbirth: 'Роды',
          settings: 'Настройки',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Схватки',
            timer: 'Таймер',
            guide: 'Советы',
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
            pauseLabel: 'Пауза',
            urgentWarning: 'Схватки учащаются — пора ехать в роддом',
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
          timerScreen: {
            phases: {
              noData: {
                label: 'Ожидание',
                dilation: '—',
                description:
                  'Запишите хотя бы 2 схватки, чтобы определить фазу родов',
                items: [
                  'Засекайте каждую схватку',
                  'Помогите ей найти удобную позу',
                  'Следите за её дыханием',
                  'Оставайтесь спокойным — это передаётся',
                ],
              },
              early: {
                label: 'Латентная фаза',
                dilation: '1–4 см',
                description:
                  'Схватки нерегулярные, раскрытие только начинается',
                items: [
                  'Не спешите в роддом — время ещё есть',
                  'Помогите ей двигаться или отдохнуть',
                  'Подготовьте документы и сумку',
                  'Предложите воду или лёгкий перекус',
                ],
              },
              active: {
                label: 'Активная фаза',
                dilation: '4–8 см',
                description:
                  'Схватки регулярные и усиливаются — скоро в роддом',
                items: [
                  'Пора готовиться к выезду',
                  'Помогайте с дыханием во время схваток',
                  'Говорите тихо и уверенно',
                  'Держите её за руку или поддерживайте спину',
                ],
              },
              transition: {
                label: 'Фаза перехода',
                dilation: '8–10 см',
                description: 'Самые интенсивные схватки — роды совсем близко',
                items: [
                  'Немедленно едьте в роддом',
                  'Она очень устала — будьте рядом',
                  'Помогайте дышать на каждой схватке',
                  'Следуйте указаниям медперсонала',
                ],
              },
            },
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
        onboardingDueDate: {
          title: 'When is the baby due?',
          description: "We'll tailor tips to your stage of pregnancy",
          fieldLabel: 'Estimated due date',
          button: 'Done',
        },
        todayCards: {
          state: {
            title: 'What she is feeling now',
            description:
              'Pregnancy is not “24/7 joy”.\nAnxiety and \nfatigue are possible.',
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
          trimesters: {
            1: {
              state: {
                description:
                  'First trimester — nausea, fatigue and mood swings. It can be hard for her even when she looks fine.',
              },
              actions: {
                items: [
                  'Take over cooking and smells that bother her',
                  'Be patient with her mood swings',
                  'Help her rest — sleep matters most right now',
                ],
              },
              donts: {
                items: [
                  "Don't downplay her nausea and fatigue",
                  "Don't make plans beyond her energy",
                  "Don't push food when she feels sick",
                ],
              },
            },
            2: {
              state: {
                description:
                  'Second trimester — usually the calmest. She feels better, with more energy and the first kicks.',
              },
              actions: {
                items: [
                  'Go to the ultrasound and check-ups together',
                  'Take walks and spend time as a couple',
                  'Start preparing for the baby without rushing',
                ],
              },
              donts: {
                items: [
                  "Don't forget about her amid the baby prep",
                  "Don't dismiss her new worries",
                  "Don't overload her 'while she still can'",
                ],
              },
            },
            3: {
              state: {
                description:
                  'Third trimester — physically tough: shortness of breath, swelling, poor sleep and rising anxiety before birth.',
              },
              actions: {
                items: [
                  'Help with chores — bending and lifting are hard for her',
                  'Pack the hospital bag in advance',
                  'Stay reachable and ready to leave anytime',
                ],
              },
              donts: {
                items: [
                  "Don't leave her alone for long",
                  "Don't dismiss her fear of labor",
                  "Don't plan far-away trips",
                ],
              },
            },
          },
        },
        todayScreen: {
          weekLabel: 'Week {{week}}',
        },
        tabs: {
          today: 'Today',
          childbirth: 'Childbirth',
          settings: 'Settings',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Contractions',
            timer: 'Timer',
            guide: 'Guide',
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
            pauseLabel: 'Paused',
            urgentWarning: 'Contractions are frequent — time to go to hospital',
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
          timerScreen: {
            phases: {
              noData: {
                label: 'Waiting',
                dilation: '—',
                description:
                  'Record at least 2 contractions to determine the labor phase',
                items: [
                  'Time every contraction',
                  'Help her find a comfortable position',
                  'Watch her breathing',
                  'Stay calm — it is contagious',
                ],
              },
              early: {
                label: 'Latent phase',
                dilation: '1–4 cm',
                description:
                  'Contractions are irregular, dilation is just beginning',
                items: [
                  'No rush to the hospital yet',
                  'Help her walk around or rest',
                  'Get documents and the bag ready',
                  'Offer water or a light snack',
                ],
              },
              active: {
                label: 'Active phase',
                dilation: '4–8 cm',
                description:
                  'Contractions are regular and intensifying — hospital soon',
                items: [
                  'Start preparing to leave',
                  'Help with breathing during contractions',
                  'Speak quietly and reassuringly',
                  'Hold her hand or support her back',
                ],
              },
              transition: {
                label: 'Transition phase',
                dilation: '8–10 cm',
                description:
                  'The most intense contractions — birth is very close',
                items: [
                  'Head to the hospital immediately',
                  'She is exhausted — stay by her side',
                  'Help her breathe through every contraction',
                  "Follow the medical staff's instructions",
                ],
              },
            },
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
        onboardingDueDate: {
          title: 'Kiedy spodziewacie się dziecka?',
          description: 'Dopasujemy wskazówki do Waszego etapu ciąży',
          fieldLabel: 'Przewidywany termin porodu',
          button: 'Gotowe',
        },
        todayCards: {
          state: {
            title: 'Co się z nią dzieje teraz',
            description:
              'Ciąża to nie „radość 24/7”.\nMożliwy jest niepokój i \nzmęczenie.',
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
          trimesters: {
            1: {
              state: {
                description:
                  'Pierwszy trymestr — mdłości, zmęczenie i wahania nastroju. Może być jej ciężko, nawet gdy wygląda dobrze.',
              },
              actions: {
                items: [
                  'Przejmij gotowanie i zapachy, które jej przeszkadzają',
                  'Bądź cierpliwy wobec wahań nastroju',
                  'Pomóż jej odpoczywać — sen jest teraz najważniejszy',
                ],
              },
              donts: {
                items: [
                  'Nie bagatelizuj mdłości i zmęczenia',
                  'Nie planuj rzeczy ponad jej siły',
                  'Nie namawiaj do jedzenia, gdy jej niedobrze',
                ],
              },
            },
            2: {
              state: {
                description:
                  'Drugi trymestr — zwykle najspokojniejszy. Czuje się lepiej, ma więcej energii i pierwsze ruchy dziecka.',
              },
              actions: {
                items: [
                  'Idźcie razem na USG i wizyty u lekarza',
                  'Spacerujcie i spędzajcie czas we dwoje',
                  'Zacznijcie spokojnie przygotowania do dziecka',
                ],
              },
              donts: {
                items: [
                  'Nie zapominaj o niej w przygotowaniach do dziecka',
                  'Nie lekceważ jej nowych obaw',
                  'Nie obciążaj jej zadaniami „póki ma siły”',
                ],
              },
            },
            3: {
              state: {
                description:
                  'Trzeci trymestr — fizycznie trudny: zadyszka, obrzęki, gorszy sen i rosnący lęk przed porodem.',
              },
              actions: {
                items: [
                  'Pomagaj w domu — schylanie i noszenie są dla niej trudne',
                  'Spakujcie torbę do szpitala z wyprzedzeniem',
                  'Bądź pod telefonem i gotowy wyjechać w każdej chwili',
                ],
              },
              donts: {
                items: [
                  'Nie zostawiaj jej długo samej',
                  'Nie lekceważ jej lęku przed porodem',
                  'Nie planuj dalekich wyjazdów',
                ],
              },
            },
          },
        },
        todayScreen: {
          weekLabel: 'Tydzień {{week}}',
        },
        tabs: {
          today: 'Dzisiaj',
          childbirth: 'Poród',
          settings: 'Ustawienia',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Skurcze',
            timer: 'Timer',
            guide: 'Porady',
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
            pauseLabel: 'Pauza',
            urgentWarning: 'Skurcze się nasilają — czas jechać do szpitala',
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
          timerScreen: {
            phases: {
              noData: {
                label: 'Oczekiwanie',
                dilation: '—',
                description:
                  'Zapisz co najmniej 2 skurcze, aby określić fazę porodu',
                items: [
                  'Mierz czas każdego skurczu',
                  'Pomóż jej znaleźć wygodną pozycję',
                  'Obserwuj jej oddech',
                  'Zachowaj spokój — to się udziela',
                ],
              },
              early: {
                label: 'Faza utajona',
                dilation: '1–4 cm',
                description:
                  'Skurcze nieregularne, rozwarcie dopiero się zaczyna',
                items: [
                  'Nie śpiesz się do szpitala',
                  'Pomóż jej chodzić lub odpocząć',
                  'Przygotuj dokumenty i torbę',
                  'Zaproponuj wodę lub lekką przekąskę',
                ],
              },
              active: {
                label: 'Faza aktywna',
                dilation: '4–8 cm',
                description:
                  'Skurcze regularne i narastające — niedługo do szpitala',
                items: [
                  'Czas przygotować się do wyjazdu',
                  'Pomagaj z oddychaniem podczas skurczów',
                  'Mów spokojnie i pewnie',
                  'Trzymaj ją za rękę lub podpieraj plecy',
                ],
              },
              transition: {
                label: 'Faza przejściowa',
                dilation: '8–10 cm',
                description:
                  'Najintensywniejsze skurcze — poród jest bardzo blisko',
                items: [
                  'Natychmiast jedźcie do szpitala',
                  'Jest bardzo zmęczona — bądź obok',
                  'Pomagaj oddychać przy każdym skurczu',
                  'Stosuj się do wskazówek personelu medycznego',
                ],
              },
            },
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
        onboardingDueDate: {
          title: '¿Cuándo esperan al bebé?',
          description: 'Adaptaremos los consejos a tu etapa del embarazo',
          fieldLabel: 'Fecha probable de parto',
          button: 'Listo',
        },
        todayCards: {
          state: {
            title: 'Cómo se siente ahora',
            description:
              'El embarazo no es “alegría 24/7”.\nPuede haber ansiedad \ny cansancio.',
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
          trimesters: {
            1: {
              state: {
                description:
                  'Primer trimestre: náuseas, cansancio y cambios de humor. Puede costarle aunque por fuera parezca estar bien.',
              },
              actions: {
                items: [
                  'Encárgate de cocinar y de los olores que le molestan',
                  'Ten paciencia con sus cambios de humor',
                  'Ayúdala a descansar: dormir es lo más importante ahora',
                ],
              },
              donts: {
                items: [
                  'No minimices sus náuseas y su cansancio',
                  'No hagas planes que superen sus fuerzas',
                  'No insistas con la comida si tiene náuseas',
                ],
              },
            },
            2: {
              state: {
                description:
                  'Segundo trimestre: suele ser el más tranquilo. Se siente mejor, con más energía y las primeras pataditas.',
              },
              actions: {
                items: [
                  'Vayan juntos a la ecografía y a las consultas',
                  'Salgan a pasear y pasen tiempo en pareja',
                  'Empiecen a preparar la llegada del bebé sin prisa',
                ],
              },
              donts: {
                items: [
                  'No te olvides de ella entre los preparativos',
                  'No restes importancia a sus nuevas preocupaciones',
                  'No la sobrecargues «mientras puede»',
                ],
              },
            },
            3: {
              state: {
                description:
                  'Tercer trimestre: físicamente duro: falta de aire, hinchazón, mal sueño y más ansiedad ante el parto.',
              },
              actions: {
                items: [
                  'Ayuda con las tareas: agacharse y cargar le cuesta',
                  'Preparen la bolsa del hospital con antelación',
                  'Mantente localizable y listo para salir en cualquier momento',
                ],
              },
              donts: {
                items: [
                  'No la dejes sola mucho tiempo',
                  'No minimices su miedo al parto',
                  'No planifiques viajes lejos',
                ],
              },
            },
          },
        },
        todayScreen: {
          weekLabel: 'Semana {{week}}',
        },
        tabs: {
          today: 'Hoy',
          childbirth: 'Parto',
          settings: 'Ajustes',
        },
        childbirthScreen: {
          tabs: {
            contractions: 'Contracciones',
            timer: 'Temporizador',
            guide: 'Guía',
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
            pauseLabel: 'Pausa',
            urgentWarning:
              'Las contracciones son frecuentes — hora de ir al hospital',
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
          timerScreen: {
            phases: {
              noData: {
                label: 'Esperando',
                dilation: '—',
                description:
                  'Registra al menos 2 contracciones para determinar la fase del parto',
                items: [
                  'Cronometra cada contracción',
                  'Ayúdala a encontrar una postura cómoda',
                  'Observa su respiración',
                  'Mantén la calma — se contagia',
                ],
              },
              early: {
                label: 'Fase latente',
                dilation: '1–4 cm',
                description:
                  'Contracciones irregulares, la dilatación recién comienza',
                items: [
                  'No hay prisa por ir al hospital todavía',
                  'Ayúdala a caminar o descansar',
                  'Prepara documentos y la bolsa',
                  'Ofrécele agua o una merienda ligera',
                ],
              },
              active: {
                label: 'Fase activa',
                dilation: '4–8 cm',
                description:
                  'Contracciones regulares e intensas — pronto al hospital',
                items: [
                  'Es hora de prepararse para salir',
                  'Ayuda con la respiración durante las contracciones',
                  'Habla tranquilo y con seguridad',
                  'Tómale la mano o apóyale la espalda',
                ],
              },
              transition: {
                label: 'Fase de transición',
                dilation: '8–10 cm',
                description:
                  'Las contracciones más intensas — el parto está muy cerca',
                items: [
                  'Ve al hospital de inmediato',
                  'Está muy agotada — quédate a su lado',
                  'Ayúdala a respirar en cada contracción',
                  'Sigue las indicaciones del personal médico',
                ],
              },
            },
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
