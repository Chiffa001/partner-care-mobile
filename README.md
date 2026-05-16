# Partner Care

Мобильное приложение для партнёра, поддерживающего женщину во время беременности и родов.

## Что умеет приложение

- **Ежедневные рекомендации** — что делать и чего избегать партнёру в текущий день беременности
- **Трекер схваток** — таймер с паузой, история схваток, расчёт интервалов и длительности
- **Фазы родов** — автоматическое определение ранней, активной и переходной фазы по паттерну схваток
- **Гид для партнёра** — обучающий контент о родах и роли поддерживающего

## Стек

- **React Native** + **Expo** (~54) — кроссплатформенная сборка (iOS / Android)
- **Expo Router** — файловая маршрутизация
- **Zustand** — стейт-менеджмент с селекторами
- **NativeWind** — Tailwind CSS для React Native
- **i18next** — локализация (ru, en, pl, es)
- **React Native Reanimated** — анимации
- **Vitest** — юнит-тесты для сторов и хуков
- **TypeScript** — строгая типизация

## Запуск

```bash
npm install
npx expo start
```

Далее открыть в iOS-симуляторе, Android-эмуляторе или Expo Go.

## Тесты

```bash
# Юнит-тесты
npm test

# Проверка типов
npm run typecheck
```

## E2E-тесты (Maestro)

Тесты лежат в `e2e/flows/`. Покрывают онбординг, таб Today, трекер схваток, гид и настройки.

**Требования:** установленный [Maestro](https://maestro.mobile.dev) и запущенный Android-эмулятор с установленным APK.

```bash
# Установить Maestro (один раз)
curl -Ls "https://get.maestro.mobile.dev" | bash

# Собрать и установить APK на эмулятор
npx expo run:android

# Запустить все e2e-тесты
maestro test --app-id com.partnercare e2e/flows/

# Запустить один флоу
maestro test --app-id com.partnercare e2e/flows/03-childbirth-timer.yaml
```

CI запускает e2e автоматически на каждый пуш в `main` через GitHub Actions (Android-эмулятор на бесплатном Ubuntu runner).
