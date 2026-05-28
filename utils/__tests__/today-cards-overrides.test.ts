import { describe, expect, it } from 'vitest';

import { getTrimesterCardOverrides } from '../today-cards-overrides';

const translations: Record<string, unknown> = {
  'todayCards.trimesters.2.state.description': 'Second trimester description',
  'todayCards.trimesters.2.actions.items': ['A1', 'A2', 'A3'],
  'todayCards.trimesters.2.donts.items': ['D1', 'D2'],
};

const t = ((key: string) => translations[key] ?? key) as never;

describe('getTrimesterCardOverrides', () => {
  it('maps trimester translations into card overrides', () => {
    const overrides = getTrimesterCardOverrides(t, 2);

    expect(overrides.state?.description).toBe('Second trimester description');
    expect(overrides.actions?.items).toEqual(['A1', 'A2', 'A3']);
    expect(overrides.donts?.items).toEqual(['D1', 'D2']);
  });

  it('returns undefined items when translation is not an array', () => {
    const overrides = getTrimesterCardOverrides(t, 1);

    expect(overrides.actions?.items).toBeUndefined();
    expect(overrides.donts?.items).toBeUndefined();
  });
});
