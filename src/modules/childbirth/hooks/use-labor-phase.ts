import { useTranslation } from 'react-i18next';

import {
  type LaborPhase,
  selectLaborPhase,
  useChildbirthTimerStore,
} from '@/modules/childbirth/store/childbirth-timer-store';

type PhaseItem = {
  text: string;
  type: 'positive';
};

type LaborPhaseData = {
  phase: LaborPhase;
  label: string;
  dilation: string;
  description: string;
  items: PhaseItem[];
};

export const useLaborPhase = (): LaborPhaseData => {
  const { t } = useTranslation();
  const phase = useChildbirthTimerStore(selectLaborPhase);

  return {
    phase,
    label: t(`childbirthScreen.timerScreen.phases.${phase}.label`),
    dilation: t(`childbirthScreen.timerScreen.phases.${phase}.dilation`),
    description: t(`childbirthScreen.timerScreen.phases.${phase}.description`),
    items: [0, 1, 2, 3].map((i) => ({
      text: t(`childbirthScreen.timerScreen.phases.${phase}.items.${i}`),
      type: 'positive',
    })),
  };
};
