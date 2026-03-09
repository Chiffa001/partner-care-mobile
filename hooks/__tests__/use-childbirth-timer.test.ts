import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useChildbirthTimer } from '../use-childbirth-timer';

const {
  focusCallbacks,
  effectCleanups,
  storeState,
  useCallbackMock,
  useEffectMock,
  useFocusEffectMock,
  useStoreMock,
} = vi.hoisted(() => ({
  focusCallbacks: [] as (() => void)[],
  effectCleanups: [] as ((() => void) | void)[],
  useCallbackMock: vi.fn((callback: () => void) => callback),
  useEffectMock: vi.fn((effect: () => void | (() => void)) => {
    const cleanup = effect();
    effectCleanups.push(cleanup);
  }),
  useFocusEffectMock: vi.fn((callback: () => void) => {
    focusCallbacks.push(callback);
    callback();
  }),
  useStoreMock: vi.fn((selector: (state: typeof storeState) => unknown) => selector(storeState)),
  storeState: {
    isActive: false,
    currentDurationSec: 0,
    latestIntervalSec: 0,
    averageIntervalSec: 0,
    hasTimerData: false,
    toggleTimer: vi.fn(),
    resetTimer: vi.fn(),
    tickNow: vi.fn(),
  },
}));

vi.mock('react', () => ({
  useCallback: useCallbackMock,
  useEffect: useEffectMock,
}));

vi.mock('@react-navigation/native', () => ({
  useFocusEffect: useFocusEffectMock,
}));

vi.mock('@/stores/childbirth-timer-store', () => ({
  useChildbirthTimerStore: useStoreMock,
  selectIsContractionActive: (state: typeof storeState) => state.isActive,
  selectCurrentDurationSec: (state: typeof storeState) => state.currentDurationSec,
  selectLatestIntervalSec: (state: typeof storeState) => state.latestIntervalSec,
  selectAverageIntervalSec: (state: typeof storeState) => state.averageIntervalSec,
  selectHasTimerData: (state: typeof storeState) => state.hasTimerData,
  selectToggleTimer: (state: typeof storeState) => state.toggleTimer,
  selectResetTimer: (state: typeof storeState) => state.resetTimer,
  selectTickNow: (state: typeof storeState) => state.tickNow,
}));

describe('useChildbirthTimer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    focusCallbacks.length = 0;
    effectCleanups.length = 0;

    storeState.isActive = false;
    storeState.currentDurationSec = 0;
    storeState.latestIntervalSec = 0;
    storeState.averageIntervalSec = 0;
    storeState.hasTimerData = false;
    storeState.toggleTimer = vi.fn();
    storeState.resetTimer = vi.fn();
    storeState.tickNow = vi.fn();
  });

  it('returns timer data and actions from store selectors', () => {
    storeState.isActive = true;
    storeState.currentDurationSec = 11;
    storeState.latestIntervalSec = 7;
    storeState.averageIntervalSec = 9;
    storeState.hasTimerData = true;

    const result = useChildbirthTimer();

    expect(result).toEqual({
      isActive: true,
      currentDurationSec: 11,
      latestIntervalSec: 7,
      averageIntervalSec: 9,
      hasTimerData: true,
      onPress: storeState.toggleTimer,
      onReset: storeState.resetTimer,
    });
  });

  it('syncs immediately on focus and starts 1s ticking when timer has data', () => {
    storeState.hasTimerData = true;

    const intervalCallbacks: (() => void)[] = [];
    const setIntervalSpy = vi
      .spyOn(globalThis, 'setInterval')
      .mockImplementation(((callback: TimerHandler) => {
        intervalCallbacks.push(callback as () => void);

        return 321 as unknown as ReturnType<typeof setInterval>;
      }) as typeof setInterval);
    const clearIntervalSpy = vi
      .spyOn(globalThis, 'clearInterval')
      .mockImplementation(() => undefined);

    useChildbirthTimer();

    expect(storeState.tickNow).toHaveBeenCalledTimes(2);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalCallbacks).toHaveLength(1);

    intervalCallbacks[0]();
    expect(storeState.tickNow).toHaveBeenCalledTimes(3);

    const cleanup = effectCleanups[0];
    expect(typeof cleanup).toBe('function');
    (cleanup as () => void)();
    expect(clearIntervalSpy).toHaveBeenCalledWith(321);

    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  it('does not tick or start interval when timer has no data', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    useChildbirthTimer();

    expect(storeState.tickNow).not.toHaveBeenCalled();
    expect(setIntervalSpy).not.toHaveBeenCalled();

    setIntervalSpy.mockRestore();
  });
});
