import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ProfileState } from './types';

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      dueDate: null,
      isLivingTogether: true,
      isFirstPregnancy: true,
      isPushEnabled: true,
      communicationTone: 'soft',
      setDueDate: (dueDate) => set({ dueDate }),
      setLivingTogether: (isLivingTogether) => set({ isLivingTogether }),
      setFirstPregnancy: (isFirstPregnancy) => set({ isFirstPregnancy }),
      setPushEnabled: (isPushEnabled) => set({ isPushEnabled }),
      setCommunicationTone: (communicationTone) => set({ communicationTone }),
    }),
    {
      name: 'profile',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
