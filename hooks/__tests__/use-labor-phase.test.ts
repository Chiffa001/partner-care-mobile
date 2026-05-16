import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { LaborPhase } from '@/stores/childbirth-timer-store';

import { useLaborPhase } from '../use-labor-phase';

const { tMock, useStoreMock, storeState } = vi.hoisted(() => {
  const storeState = { phase: 'noData' as LaborPhase };

  return {
    tMock: vi.fn((key: string) => key),
    useStoreMock: vi.fn((selector: (state: typeof storeState) => unknown) => selector(storeState)),
    storeState,
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: tMock }),
}));

vi.mock('@/stores/childbirth-timer-store', () => ({
  useChildbirthTimerStore: useStoreMock,
  selectLaborPhase: (state: typeof storeState) => state.phase,
}));

describe('useLaborPhase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeState.phase = 'noData';
    tMock.mockImplementation((key: string) => key);
  });

  it.each<LaborPhase>(['noData', 'early', 'active', 'transition'])(
    'returns correct i18n keys for phase "%s"',
    (phase) => {
      storeState.phase = phase;

      const result = useLaborPhase();

      expect(result.phase).toBe(phase);
      expect(result.label).toBe(`childbirthScreen.timerScreen.phases.${phase}.label`);
      expect(result.dilation).toBe(`childbirthScreen.timerScreen.phases.${phase}.dilation`);
      expect(result.description).toBe(`childbirthScreen.timerScreen.phases.${phase}.description`);
    },
  );

  it.each<LaborPhase>(['noData', 'early', 'active', 'transition'])(
    'returns 4 positive items for phase "%s"',
    (phase) => {
      storeState.phase = phase;

      const { items } = useLaborPhase();

      expect(items).toHaveLength(4);
      items.forEach((item, i) => {
        expect(item.text).toBe(`childbirthScreen.timerScreen.phases.${phase}.items.${i}`);
        expect(item.type).toBe('positive');
      });
    },
  );

  it('calls t with the correct phase key when phase changes', () => {
    storeState.phase = 'active';

    useLaborPhase();

    expect(tMock).toHaveBeenCalledWith('childbirthScreen.timerScreen.phases.active.label');
    expect(tMock).toHaveBeenCalledWith('childbirthScreen.timerScreen.phases.active.dilation');
    expect(tMock).toHaveBeenCalledWith('childbirthScreen.timerScreen.phases.active.description');
    expect(tMock).toHaveBeenCalledWith('childbirthScreen.timerScreen.phases.active.items.0');
    expect(tMock).toHaveBeenCalledWith('childbirthScreen.timerScreen.phases.active.items.3');
  });
});
