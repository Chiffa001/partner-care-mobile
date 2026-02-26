import type { TFunction } from 'i18next';

import type { InsightCardProps } from '@/components/insight-card';

type CardConfig = Omit<InsightCardProps, 'imageSource'>;

type TodayCardTextContent = {
  title?: string;
  description?: string;
  items?: string[];
};

export type TodayCardsOverrides = {
  state?: TodayCardTextContent;
  actions?: TodayCardTextContent;
  donts?: TodayCardTextContent;
};

const getText = (value: string | undefined, fallback: string) => (
  value?.trim() ? value : fallback
);

const getItems = (value: string[] | undefined, fallback: string[]) => (
  value && value.length > 0 ? value : fallback
);

export const buildTodayCards = (
  t: TFunction,
  overrides?: TodayCardsOverrides,
) => {
  const stateFallbackDescription = t('todayCards.state.description');
  const stateDescription = getText(overrides?.state?.description, stateFallbackDescription);

  const actionsFallbackItems = [
    t('todayCards.actions.items.0'),
    t('todayCards.actions.items.1'),
    t('todayCards.actions.items.2'),
  ];
  const dontsFallbackItems = [
    t('todayCards.donts.items.0'),
    t('todayCards.donts.items.1'),
    t('todayCards.donts.items.2'),
  ];

  const stateCard: CardConfig = {
    title: getText(overrides?.state?.title, t('todayCards.state.title')),
    titleColor: '#B56A6C',
    headerBackgroundColor: '#F3D7D3',
    bodyBackgroundColor: '#F7EFED',
    description: stateDescription,
    imageScale: 1.2,
    imageOffsetY: -18,
    imageOffsetX: -22,
    descriptionMaxWidthPercent: '100%',
  };

  const actionsCard: CardConfig = {
    title: getText(overrides?.actions?.title, t('todayCards.actions.title')),
    titleColor: '#4F7E78',
    headerBackgroundColor: '#DDE9E6',
    bodyBackgroundColor: '#EDF3F1',
    items: getItems(overrides?.actions?.items, actionsFallbackItems)
      .map((text) => ({ text, type: 'positive' as const })),
  };

  const dontsCard: CardConfig = {
    title: getText(overrides?.donts?.title, t('todayCards.donts.title')),
    titleColor: '#B56A6C',
    headerBackgroundColor: '#F3DACE',
    bodyBackgroundColor: '#F9EEE8',
    items: getItems(overrides?.donts?.items, dontsFallbackItems)
      .map((text) => ({ text, type: 'negative' as const })),
  };

  return {
    stateCard,
    actionsCard,
    dontsCard,
  };
};
