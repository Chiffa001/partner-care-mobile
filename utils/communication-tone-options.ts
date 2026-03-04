import type { TFunction } from 'i18next';

import type { CommunicationToneOption } from '@/components/communication-tone-modal';

export type CommunicationTone = 'soft' | 'direct' | 'brief';

const communicationToneValues: CommunicationTone[] = ['soft', 'direct', 'brief'];

export const isCommunicationTone = (value: string): value is CommunicationTone => (
  communicationToneValues.includes(value as CommunicationTone)
);

export const getCommunicationToneOptions = (
  t: TFunction,
): CommunicationToneOption[] => communicationToneValues.map((value) => ({
  value,
  title: t(`settingsScreen.communicationTone.options.${value}.title`),
  description: t(`settingsScreen.communicationTone.options.${value}.description`),
}));
