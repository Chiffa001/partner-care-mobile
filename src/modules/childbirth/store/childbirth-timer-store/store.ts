import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ChildbirthTimerState } from './types';

export const useChildbirthTimerStore = create<ChildbirthTimerState>()(
  persist(
    (set, get) => ({
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
        const {
          activeContractionStartAt,
          activeContractionIntervalSec,
          contractions,
        } = get();
        const currentTimestamp = Date.now();

        if (activeContractionStartAt === null) {
          const previousContraction = contractions.at(-1);
          const nextIntervalSec = previousContraction
            ? (currentTimestamp -
                (previousContraction.startAt +
                  previousContraction.durationSec * 1000)) /
              1000
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
    }),
    {
      name: 'childbirth-timer',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeContractionStartAt: state.activeContractionStartAt,
        activeContractionIntervalSec: state.activeContractionIntervalSec,
        isPaused: state.isPaused,
        contractions: state.contractions,
      }),
    },
  ),
);
