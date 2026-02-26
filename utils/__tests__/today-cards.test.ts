import { describe, expect, it } from 'vitest';

import { buildTodayCards } from '../today-cards';

const translations: Record<string, string> = {
  'todayCards.state.title': 'State title',
  'todayCards.state.description': 'State description',
  'todayCards.actions.title': 'Actions title',
  'todayCards.actions.items.0': 'Action item 1',
  'todayCards.actions.items.1': 'Action item 2',
  'todayCards.actions.items.2': 'Action item 3',
  'todayCards.donts.title': 'Donts title',
  'todayCards.donts.items.0': 'Dont item 1',
  'todayCards.donts.items.1': 'Dont item 2',
  'todayCards.donts.items.2': 'Dont item 3',
};

const t = ((key: string) => translations[key] ?? key) as never;

describe('buildTodayCards', () => {
  it('builds cards from translation fallbacks when overrides are missing', () => {
    const cards = buildTodayCards(t);

    expect(cards.stateCard).toEqual({
      title: 'State title',
      titleColor: '#B56A6C',
      headerBackgroundColor: '#F3D7D3',
      bodyBackgroundColor: '#F7EFED',
      description: 'State description',
      imageScale: 1.2,
      imageOffsetY: -18,
      imageOffsetX: -22,
      descriptionMaxWidthPercent: '100%',
    });

    expect(cards.actionsCard.items).toEqual([
      { text: 'Action item 1', type: 'positive' },
      { text: 'Action item 2', type: 'positive' },
      { text: 'Action item 3', type: 'positive' },
    ]);

    expect(cards.dontsCard.items).toEqual([
      { text: 'Dont item 1', type: 'negative' },
      { text: 'Dont item 2', type: 'negative' },
      { text: 'Dont item 3', type: 'negative' },
    ]);
  });

  it('uses text overrides when they are not empty', () => {
    const cards = buildTodayCards(t, {
      state: {
        title: 'Custom state title',
        description: 'Custom state description',
      },
      actions: {
        title: 'Custom actions title',
      },
      donts: {
        title: 'Custom donts title',
      },
    });

    expect(cards.stateCard.title).toBe('Custom state title');
    expect(cards.stateCard.description).toBe('Custom state description');
    expect(cards.actionsCard.title).toBe('Custom actions title');
    expect(cards.dontsCard.title).toBe('Custom donts title');
  });

  it('falls back for empty text overrides', () => {
    const cards = buildTodayCards(t, {
      state: {
        title: '   ',
        description: '',
      },
      actions: {
        title: ' ',
      },
      donts: {
        title: '\n',
      },
    });

    expect(cards.stateCard.title).toBe('State title');
    expect(cards.stateCard.description).toBe('State description');
    expect(cards.actionsCard.title).toBe('Actions title');
    expect(cards.dontsCard.title).toBe('Donts title');
  });

  it('uses items overrides when provided and non-empty', () => {
    const cards = buildTodayCards(t, {
      actions: {
        items: ['A1', 'A2'],
      },
      donts: {
        items: ['D1'],
      },
    });

    expect(cards.actionsCard.items).toEqual([
      { text: 'A1', type: 'positive' },
      { text: 'A2', type: 'positive' },
    ]);
    expect(cards.dontsCard.items).toEqual([
      { text: 'D1', type: 'negative' },
    ]);
  });

  it('falls back to translation items when override arrays are empty', () => {
    const cards = buildTodayCards(t, {
      actions: { items: [] },
      donts: { items: [] },
    });

    expect(cards.actionsCard.items).toEqual([
      { text: 'Action item 1', type: 'positive' },
      { text: 'Action item 2', type: 'positive' },
      { text: 'Action item 3', type: 'positive' },
    ]);
    expect(cards.dontsCard.items).toEqual([
      { text: 'Dont item 1', type: 'negative' },
      { text: 'Dont item 2', type: 'negative' },
      { text: 'Dont item 3', type: 'negative' },
    ]);
  });
});
