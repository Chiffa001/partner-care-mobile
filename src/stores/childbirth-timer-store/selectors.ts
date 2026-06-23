import type { ChildbirthTimerState, LaborPhase } from './types';

export const selectIsContractionActive = (
  state: ChildbirthTimerState,
): boolean => state.activeContractionStartAt !== null;

export const selectIsTimerPaused = (state: ChildbirthTimerState): boolean =>
  state.isPaused;

export const selectCurrentDurationSec = (
  state: ChildbirthTimerState,
): number => {
  if (state.activeContractionStartAt === null) {
    return state.contractions.at(-1)?.durationSec ?? 0;
  }

  return (state.now - state.activeContractionStartAt) / 1000;
};

export const selectLatestIntervalSec = (state: ChildbirthTimerState): number =>
  (() => {
    if (state.activeContractionStartAt !== null) {
      return (
        state.activeContractionIntervalSec ??
        state.contractions.at(-1)?.intervalSec ??
        0
      );
    }

    const lastContraction = state.contractions.at(-1);

    if (!lastContraction) {
      return 0;
    }

    const lastContractionEndAt =
      lastContraction.startAt + lastContraction.durationSec * 1000;

    return Math.max(0, (state.now - lastContractionEndAt) / 1000);
  })();

export const selectAverageIntervalSec = (
  state: ChildbirthTimerState,
): number => {
  const intervals = state.contractions
    .map((record) => record.intervalSec)
    .filter((value): value is number => value !== null);

  if (state.activeContractionStartAt !== null) {
    const activeInterval = state.activeContractionIntervalSec;
    const allIntervals =
      activeInterval !== null ? [...intervals, activeInterval] : intervals;

    if (!allIntervals.length) {
      return 0;
    }

    return (
      allIntervals.reduce((sum, item) => sum + item, 0) / allIntervals.length
    );
  }

  const latestIntervalSec = selectLatestIntervalSec(state);

  if (!intervals.length) {
    return latestIntervalSec;
  }

  const intervalsSum = intervals.reduce((sum, item) => sum + item, 0);

  return (intervalsSum + latestIntervalSec) / (intervals.length + 1);
};

export const selectIsUrgent = (state: ChildbirthTimerState): boolean => {
  if (state.contractions.length < 3) {
    return false;
  }

  const intervals = state.contractions
    .map((c) => c.intervalSec)
    .filter((v): v is number => v !== null);

  const avgInterval =
    intervals.reduce((sum, v) => sum + v, 0) / intervals.length;

  if (avgInterval > 300) {
    return false;
  }

  const avgDuration =
    state.contractions.reduce((sum, c) => sum + c.durationSec, 0) /
    state.contractions.length;

  return avgDuration >= 60;
};

export const selectToggleTimer = (state: ChildbirthTimerState) =>
  state.toggleTimer;

export const selectTickNow = (state: ChildbirthTimerState) => state.tickNow;

export const selectResetTimer = (state: ChildbirthTimerState) =>
  state.resetTimer;

export const selectPauseTimer = (state: ChildbirthTimerState) =>
  state.pauseTimer;

export const selectStartAfterPause = (state: ChildbirthTimerState) =>
  state.startAfterPause;

export const selectHasTimerData = (state: ChildbirthTimerState): boolean =>
  state.activeContractionStartAt !== null || state.contractions.length > 0;

export const selectContractions = (state: ChildbirthTimerState) =>
  state.contractions;

export const selectLaborPhase = (state: ChildbirthTimerState): LaborPhase => {
  const intervals = state.contractions
    .map((c) => c.intervalSec)
    .filter((v): v is number => v !== null);

  if (intervals.length === 0) {
    return 'noData';
  }

  const avgInterval =
    intervals.reduce((sum, v) => sum + v, 0) / intervals.length;

  if (avgInterval > 420) {
    return 'early';
  }

  if (avgInterval >= 180) {
    return 'active';
  }

  return 'transition';
};
