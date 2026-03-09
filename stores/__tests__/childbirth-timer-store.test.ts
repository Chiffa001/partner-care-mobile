import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  selectAverageIntervalSec,
  selectCurrentDurationSec,
  selectHasTimerData,
  selectIsContractionActive,
  selectIsTimerPaused,
  selectLatestIntervalSec,
  useChildbirthTimerStore,
} from '../childbirth-timer-store';

const setNow = (timestamp: number) => {
  vi.setSystemTime(new Date(timestamp));
};

const readState = () => useChildbirthTimerStore.getState();

const resetStoreState = (timestamp: number) => {
  setNow(timestamp);
  useChildbirthTimerStore.setState({
    activeContractionStartAt: null,
    activeContractionIntervalSec: null,
    isPaused: false,
    contractions: [],
    now: timestamp,
  });
};

describe('childbirth-timer-store', () => {
  const baseTime = new Date(2026, 2, 9, 10, 0, 0, 0).getTime();

  beforeEach(() => {
    vi.useFakeTimers();
    resetStoreState(baseTime);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('has correct initial selector values', () => {
    const state = readState();

    expect(selectIsContractionActive(state)).toBe(false);
    expect(selectIsTimerPaused(state)).toBe(false);
    expect(selectHasTimerData(state)).toBe(false);
    expect(selectCurrentDurationSec(state)).toBe(0);
    expect(selectLatestIntervalSec(state)).toBe(0);
    expect(selectAverageIntervalSec(state)).toBe(0);
  });

  it('starts contraction and updates duration on tick', () => {
    const { toggleTimer, tickNow } = readState();

    toggleTimer();

    const startedState = readState();
    expect(selectIsContractionActive(startedState)).toBe(true);
    expect(selectHasTimerData(startedState)).toBe(true);
    expect(selectLatestIntervalSec(startedState)).toBe(0);
    expect(selectAverageIntervalSec(startedState)).toBe(0);

    setNow(baseTime + 5_000);
    tickNow();

    const runningState = readState();
    expect(selectCurrentDurationSec(runningState)).toBe(5);
  });

  it('stops first contraction and starts live interval and average', () => {
    const { toggleTimer, tickNow } = readState();

    toggleTimer();
    setNow(baseTime + 8_000);
    tickNow();
    toggleTimer();

    const stoppedState = readState();
    expect(selectIsContractionActive(stoppedState)).toBe(false);
    expect(stoppedState.contractions).toHaveLength(1);
    expect(stoppedState.contractions[0].durationSec).toBe(8);
    expect(stoppedState.contractions[0].intervalSec).toBeNull();

    setNow(baseTime + 11_000);
    tickNow();

    const inPauseState = readState();
    expect(selectLatestIntervalSec(inPauseState)).toBe(3);
    expect(selectAverageIntervalSec(inPauseState)).toBe(3);
  });

  it('freezes interval during active contraction after second start', () => {
    const { toggleTimer, tickNow } = readState();

    toggleTimer();
    setNow(baseTime + 10_000);
    toggleTimer();

    setNow(baseTime + 17_000);
    tickNow();
    toggleTimer();

    const secondStartedState = readState();
    expect(selectIsContractionActive(secondStartedState)).toBe(true);
    expect(secondStartedState.activeContractionIntervalSec).toBe(7);
    expect(selectLatestIntervalSec(secondStartedState)).toBe(7);
    expect(selectAverageIntervalSec(secondStartedState)).toBe(7);

    setNow(baseTime + 23_000);
    tickNow();

    const stillActiveState = readState();
    expect(selectLatestIntervalSec(stillActiveState)).toBe(7);
    expect(selectAverageIntervalSec(stillActiveState)).toBe(7);
    expect(selectCurrentDurationSec(stillActiveState)).toBe(6);
  });

  it('recomputes average with live interval when inactive', () => {
    const { toggleTimer, tickNow } = readState();

    toggleTimer();
    setNow(baseTime + 10_000);
    toggleTimer();

    setNow(baseTime + 17_000);
    toggleTimer();

    setNow(baseTime + 21_000);
    toggleTimer();

    const afterSecondStop = readState();
    expect(afterSecondStop.contractions).toHaveLength(2);
    expect(afterSecondStop.contractions[1].intervalSec).toBe(7);
    expect(selectLatestIntervalSec(afterSecondStop)).toBe(0);
    expect(selectAverageIntervalSec(afterSecondStop)).toBe(3.5);

    setNow(baseTime + 26_000);
    tickNow();

    const withLivePause = readState();
    expect(selectLatestIntervalSec(withLivePause)).toBe(5);
    expect(selectAverageIntervalSec(withLivePause)).toBe(6);
  });

  it('resets timer state completely', () => {
    const { toggleTimer, resetTimer } = readState();

    toggleTimer();
    setNow(baseTime + 2_000);
    toggleTimer();

    resetTimer();

    const state = readState();
    expect(selectIsContractionActive(state)).toBe(false);
    expect(selectIsTimerPaused(state)).toBe(false);
    expect(selectHasTimerData(state)).toBe(false);
    expect(state.activeContractionIntervalSec).toBeNull();
    expect(state.contractions).toEqual([]);
    expect(selectCurrentDurationSec(state)).toBe(0);
    expect(selectLatestIntervalSec(state)).toBe(0);
    expect(selectAverageIntervalSec(state)).toBe(0);
  });

  it('handles active state with historical intervals but no current interval snapshot', () => {
    useChildbirthTimerStore.setState({
      activeContractionStartAt: baseTime + 30_000,
      activeContractionIntervalSec: null,
      isPaused: false,
      now: baseTime + 35_000,
      contractions: [
        {
          startAt: baseTime,
          durationSec: 10,
          intervalSec: null,
        },
        {
          startAt: baseTime + 20_000,
          durationSec: 4,
          intervalSec: 10,
        },
        {
          startAt: baseTime + 40_000,
          durationSec: 5,
          intervalSec: 16,
        },
      ],
    });

    const state = readState();
    expect(selectLatestIntervalSec(state)).toBe(16);
    expect(selectAverageIntervalSec(state)).toBe(13);
  });

  it('pauses timer without wiping data and restarts from clean state on startAfterPause', () => {
    const { toggleTimer, pauseTimer, startAfterPause, tickNow } = readState();

    toggleTimer();
    setNow(baseTime + 9_000);
    tickNow();
    toggleTimer();

    const beforePause = readState();
    expect(beforePause.contractions).toHaveLength(1);

    setNow(baseTime + 13_000);
    pauseTimer();

    const pausedState = readState();
    expect(selectIsTimerPaused(pausedState)).toBe(true);
    expect(selectHasTimerData(pausedState)).toBe(true);
    expect(pausedState.contractions).toHaveLength(1);
    expect(selectLatestIntervalSec(pausedState)).toBe(4);
    expect(selectAverageIntervalSec(pausedState)).toBe(4);

    setNow(baseTime + 20_000);
    startAfterPause();

    const restartedState = readState();
    expect(selectIsTimerPaused(restartedState)).toBe(false);
    expect(selectIsContractionActive(restartedState)).toBe(true);
    expect(restartedState.contractions).toEqual([]);
    expect(restartedState.activeContractionIntervalSec).toBeNull();
    expect(selectCurrentDurationSec(restartedState)).toBe(0);
  });

  it('stores active contraction in history when paused during running contraction', () => {
    const { toggleTimer, pauseTimer, tickNow } = readState();

    toggleTimer();
    setNow(baseTime + 6_000);
    tickNow();
    pauseTimer();

    const pausedState = readState();
    expect(selectIsTimerPaused(pausedState)).toBe(true);
    expect(selectIsContractionActive(pausedState)).toBe(false);
    expect(pausedState.contractions).toHaveLength(1);
    expect(pausedState.contractions[0].durationSec).toBe(6);
    expect(pausedState.contractions[0].intervalSec).toBeNull();
  });
});
