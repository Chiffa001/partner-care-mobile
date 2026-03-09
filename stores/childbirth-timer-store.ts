import { create } from 'zustand';

type ContractionRecord = {
  startAt: number;
  durationSec: number;
  intervalSec: number | null;
};

type ChildbirthTimerState = {
  activeContractionStartAt: number | null;
  contractions: ContractionRecord[];
  now: number;
  tickNow: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
};

export const useChildbirthTimerStore = create<ChildbirthTimerState>((set, get) => ({
  activeContractionStartAt: null,
  contractions: [],
  now: Date.now(),
  tickNow: () => set({ now: Date.now() }),
  resetTimer: () =>
    set({
      now: Date.now(),
      activeContractionStartAt: null,
      contractions: [],
    }),
  toggleTimer: () => {
    const { activeContractionStartAt, contractions } = get();
    const currentTimestamp = Date.now();

    if (activeContractionStartAt === null) {
      set({
        now: currentTimestamp,
        activeContractionStartAt: currentTimestamp,
      });

      return;
    }

    const previousContraction = contractions.at(-1);
    const intervalSec = previousContraction
      ? (activeContractionStartAt - previousContraction.startAt) / 1000
      : null;

    set({
      now: currentTimestamp,
      activeContractionStartAt: null,
      contractions: [
        ...contractions,
        {
          startAt: activeContractionStartAt,
          durationSec: (currentTimestamp - activeContractionStartAt) / 1000,
          intervalSec,
        },
      ],
    });
  },
}));

export const selectIsContractionActive = (state: ChildbirthTimerState) => state.activeContractionStartAt !== null;

export const selectCurrentDurationSec = (state: ChildbirthTimerState) => {
  if (state.activeContractionStartAt === null) {
    return state.contractions.at(-1)?.durationSec ?? 0;
  }

  return (state.now - state.activeContractionStartAt) / 1000;
};

export const selectLatestIntervalSec = (state: ChildbirthTimerState) => (
  state.contractions.at(-1)?.intervalSec ?? 0
);

export const selectAverageIntervalSec = (state: ChildbirthTimerState) => {
  const intervals = state.contractions
    .map((record) => record.intervalSec)
    .filter((value): value is number => value !== null);

  if (!intervals.length) {
    return 0;
  }

  return intervals.reduce((sum, item) => sum + item, 0) / intervals.length;
};

export const selectToggleTimer = (state: ChildbirthTimerState) => state.toggleTimer;

export const selectTickNow = (state: ChildbirthTimerState) => state.tickNow;

export const selectResetTimer = (state: ChildbirthTimerState) => state.resetTimer;

export const selectHasTimerData = (state: ChildbirthTimerState) => (
  state.activeContractionStartAt !== null || state.contractions.length > 0
);
