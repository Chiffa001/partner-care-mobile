import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import sadWomanImage from '@/assets/images/bg/sad-woman.png';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import type { TodayCardsOverrides } from '@/utils/today-cards';
import { buildTodayCards } from '@/utils/today-cards';

const Today = () => {
  const { t } = useTranslation();

  const backendOverrides: TodayCardsOverrides | undefined = undefined;

  const { stateCard, actionsCard, dontsCard } = useMemo(
    () => buildTodayCards(t, backendOverrides),
    [t, backendOverrides],
  );

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        contentContainerClassName="gap-3 px-4 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <InsightCard
          {...stateCard}
          imageSource={sadWomanImage}
        />

        <InsightCard {...actionsCard} />

        <InsightCard {...dontsCard} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Today;
