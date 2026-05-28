import type { CommunicationTone } from '@/utils/communication-tone-options';

export type ProfileState = {
  dueDate: number | null;
  isLivingTogether: boolean;
  isFirstPregnancy: boolean;
  isPushEnabled: boolean;
  communicationTone: CommunicationTone;
  setDueDate: (dueDate: number) => void;
  setLivingTogether: (value: boolean) => void;
  setFirstPregnancy: (value: boolean) => void;
  setPushEnabled: (value: boolean) => void;
  setCommunicationTone: (tone: CommunicationTone) => void;
};
