import type { ProfileState } from './types';

export const selectDueDate = (state: ProfileState) => state.dueDate;

export const selectIsLivingTogether = (state: ProfileState) =>
  state.isLivingTogether;

export const selectIsFirstPregnancy = (state: ProfileState) =>
  state.isFirstPregnancy;

export const selectIsPushEnabled = (state: ProfileState) => state.isPushEnabled;

export const selectCommunicationTone = (state: ProfileState) =>
  state.communicationTone;

export const selectSetDueDate = (state: ProfileState) => state.setDueDate;

export const selectSetLivingTogether = (state: ProfileState) =>
  state.setLivingTogether;

export const selectSetFirstPregnancy = (state: ProfileState) =>
  state.setFirstPregnancy;

export const selectSetPushEnabled = (state: ProfileState) =>
  state.setPushEnabled;

export const selectSetCommunicationTone = (state: ProfileState) =>
  state.setCommunicationTone;
