import type { TFunction } from 'i18next';

import type { Trimester } from '@/utils/pregnancy/get-trimester';
import type { TodayCardsOverrides } from '@/utils/today-cards';

const getItems = (t: TFunction, key: string): string[] | undefined => {
  const value = t(key, { returnObjects: true });

  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter((item): item is string => typeof item === 'string');
};

export const getTrimesterCardOverrides = (
  t: TFunction,
  trimester: Trimester,
): TodayCardsOverrides => {
  const base = `todayCards.trimesters.${trimester}`;

  return {
    state: { description: t(`${base}.state.description`) },
    actions: { items: getItems(t, `${base}.actions.items`) },
    donts: { items: getItems(t, `${base}.donts.items`) },
  };
};
