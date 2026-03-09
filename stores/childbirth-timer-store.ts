import { create } from 'zustand';

type ContractionRecord = {
  startAt: number;
  durationSec: number;
  intervalSec: number | null;
};

type ChildbirthTimerState = {
  activeContractionStartAt: number | null;
  activeContractionIntervalSec: number | null;
  isPaused: boolean;
  contractions: ContractionRecord[];
  now: number;
  tickNow: () => void;
  toggleTimer: () => void;
  pauseTimer: () => void;
  startAfterPause: () => void;
  resetTimer: () => void;
};

export const useChildbirthTimerStore = create<ChildbirthTimerState>((set, get) => ({
  activeContractionStartAt: null,
  activeContractionIntervalSec: null,
  isPaused: false,
  contractions: [],
  now: Date.now(),
  tickNow: () => set({ now: Date.now() }),
  pauseTimer: () => {
    const {
      activeContractionStartAt,
      activeContractionIntervalSec,
      contractions,
    } = get();
    const currentTimestamp = Date.now();

    if (activeContractionStartAt === null) {
      set({ now: currentTimestamp, isPaused: true });

      return;
    }

    set({
      now: currentTimestamp,
      isPaused: true,
      activeContractionStartAt: null,
      activeContractionIntervalSec: null,
      contractions: [
        ...contractions,
        {
          startAt: activeContractionStartAt,
          durationSec: (currentTimestamp - activeContractionStartAt) / 1000,
          intervalSec: activeContractionIntervalSec,
        },
      ],
    });
  },
  startAfterPause: () => {
    const currentTimestamp = Date.now();

    set({
      now: currentTimestamp,
      activeContractionStartAt: currentTimestamp,
      activeContractionIntervalSec: null,
      isPaused: false,
      contractions: [],
    });
  },
  resetTimer: () =>
    set({
      now: Date.now(),
      activeContractionStartAt: null,
      activeContractionIntervalSec: null,
      isPaused: false,
      contractions: [],
    }),
  toggleTimer: () => {
    const { activeContractionStartAt, activeContractionIntervalSec, contractions } = get();
    const currentTimestamp = Date.now();

    if (activeContractionStartAt === null) {
      const previousContraction = contractions.at(-1);
      const nextIntervalSec = previousContraction
        ? (currentTimestamp - (previousContraction.startAt + (previousContraction.durationSec * 1000))) / 1000
        : null;

      set({
        now: currentTimestamp,
        activeContractionStartAt: currentTimestamp,
        activeContractionIntervalSec: nextIntervalSec,
        isPaused: false,
      });

      return;
    }

    set({
      now: currentTimestamp,
      activeContractionStartAt: null,
      activeContractionIntervalSec: null,
      isPaused: false,
      contractions: [
        ...contractions,
        {
          startAt: activeContractionStartAt,
          durationSec: (currentTimestamp - activeContractionStartAt) / 1000,
          intervalSec: activeContractionIntervalSec,
        },
      ],
    });
  },
}));

export const selectIsContractionActive = (state: ChildbirthTimerState) => state.activeContractionStartAt !== null;
export const selectIsTimerPaused = (state: ChildbirthTimerState) => state.isPaused;

export const selectCurrentDurationSec = (state: ChildbirthTimerState) => {
  if (state.activeContractionStartAt === null) {
    return state.contractions.at(-1)?.durationSec ?? 0;
  }

  return (state.now - state.activeContractionStartAt) / 1000;
};

export const selectLatestIntervalSec = (state: ChildbirthTimerState) => (
  (() => {
    if (state.activeContractionStartAt !== null) {
      return state.activeContractionIntervalSec ?? state.contractions.at(-1)?.intervalSec ?? 0;
    }

    const lastContraction = state.contractions.at(-1);

    if (!lastContraction) {
      return 0;
    }

    const lastContractionEndAt = lastContraction.startAt + (lastContraction.durationSec * 1000);

    return Math.max(0, (state.now - lastContractionEndAt) / 1000);
  })()
);

export const selectAverageIntervalSec = (state: ChildbirthTimerState) => {
  const intervals = state.contractions
    .map((record) => record.intervalSec)
    .filter((value): value is number => value !== null);

  if (state.activeContractionStartAt !== null) {
    if (state.activeContractionIntervalSec === null) {
      if (!intervals.length) {
        return 0;
      }

      return intervals.reduce((sum, item) => sum + item, 0) / intervals.length;
    }

    const intervalsSum = intervals.reduce((sum, item) => sum + item, 0);

    return (intervalsSum + state.activeContractionIntervalSec) / (intervals.length + 1);
  }

  const latestIntervalSec = selectLatestIntervalSec(state);

  if (!intervals.length) {
    return latestIntervalSec;
  }

  const intervalsSum = intervals.reduce((sum, item) => sum + item, 0);

  return (intervalsSum + latestIntervalSec) / (intervals.length + 1);
};

export const selectToggleTimer = (state: ChildbirthTimerState) => state.toggleTimer;

export const selectTickNow = (state: ChildbirthTimerState) => state.tickNow;

export const selectResetTimer = (state: ChildbirthTimerState) => state.resetTimer;
export const selectPauseTimer = (state: ChildbirthTimerState) => state.pauseTimer;
export const selectStartAfterPause = (state: ChildbirthTimerState) => state.startAfterPause;

export const selectHasTimerData = (state: ChildbirthTimerState) => (
  state.activeContractionStartAt !== null || state.contractions.length > 0
);

export const selectContractions = (state: ChildbirthTimerState) => state.contractions;
