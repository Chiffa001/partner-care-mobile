import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';

import sadWomanImage from '@/assets/images/bg/sad-woman.png';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import { Colors } from '@/constants/colors';
import { usePreloadAssets } from '@/hooks/use-preload-assets';
import { selectDueDate, useProfileStore } from '@/stores/profile-store';
import { getWeeksFromDueDate } from '@/utils/due-date/get-weeks-from-due-date';
import { getTrimesterFromWeek } from '@/utils/pregnancy/get-trimester';
import { buildTodayCards } from '@/utils/today-cards';
import { getTrimesterCardOverrides } from '@/utils/today-cards-overrides';

const todayScreenImages = [sadWomanImage];

const Today = () => {
  const { t } = useTranslation();
  const isStateCardImageReady = usePreloadAssets(todayScreenImages);
  const dueDate = useProfileStore(selectDueDate);

  const week = useMemo(
    () => (dueDate === null ? null : getWeeksFromDueDate(new Date(dueDate))),
    [dueDate],
  );

  const overrides = useMemo(
    () =>
      week === null
        ? undefined
        : getTrimesterCardOverrides(t, getTrimesterFromWeek(week)),
    [t, week],
  );

  const { stateCard, actionsCard, dontsCard } = useMemo(
    () => buildTodayCards(t, overrides),
    [t, overrides],
  );

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        contentContainerClassName="gap-4 px-4 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        {week !== null && (
          <Text
            className="px-1 font-sans text-[15px] leading-[20px]"
            style={{ color: Colors.textSubtle }}
          >
            {t('todayScreen.weekLabel', { week })}
          </Text>
        )}

        <InsightCard
          {...stateCard}
          imageSource={sadWomanImage}
          isLoading={!isStateCardImageReady}
          collapsible={false}
        />

        <InsightCard {...actionsCard} />

        <InsightCard {...dontsCard} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Today;
