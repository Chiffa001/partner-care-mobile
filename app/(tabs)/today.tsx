import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import sadWomanImage from '@/assets/images/bg/sad-woman.png';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import { usePreloadAssets } from '@/hooks/use-preload-assets';
import type { TodayCardsOverrides } from '@/utils/today-cards';
import { buildTodayCards } from '@/utils/today-cards';

const todayScreenImages = [sadWomanImage];

const Today = () => {
  const { t } = useTranslation();
  const isStateCardImageReady = usePreloadAssets(todayScreenImages);

  const backendOverrides: TodayCardsOverrides | undefined = undefined;

  const { stateCard, actionsCard, dontsCard } = useMemo(
    () => buildTodayCards(t, backendOverrides),
    [t, backendOverrides],
  );

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        contentContainerClassName="gap-4 px-4 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <InsightCard
          {...stateCard}
          imageSource={sadWomanImage}
          isLoading={!isStateCardImageReady}
        />

        <InsightCard
          {...actionsCard}
        />

        <InsightCard
          {...dontsCard}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Today;
