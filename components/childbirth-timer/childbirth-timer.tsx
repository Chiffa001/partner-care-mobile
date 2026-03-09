import { useTranslation } from 'react-i18next';
import type { TextStyle } from 'react-native';
import { Text, View } from 'react-native';

import { Button } from '@/components/button';
import { TitledCard } from '@/components/titled-card';
import { useChildbirthTimer } from '@/hooks/use-childbirth-timer';
import { formatTime } from '@/utils/format-time';

const timerValueStyle: TextStyle = {
  fontVariant: ['tabular-nums'],
  fontFamily: 'Nunito-SemiBold',
};

export const ChildbirthTimer = () => {
  const { t } = useTranslation();
  const {
    isActive,
    currentDurationSec,
    latestIntervalSec,
    averageIntervalSec,
    hasTimerData,
    onPress,
    onReset,
  } = useChildbirthTimer();

  return (
    <TitledCard
      headerContent={(
        <Text className="font-semibold text-[22px] leading-[28px] text-[#8F757B]">
          {t('childbirthScreen.contractions.timerTitle')}
        </Text>
      )}
      headerBackgroundColor="#FBEDE7"
      bodyBackgroundColor="#FEFAF8"
      outerClassName="rounded-[22px] border border-[#F2E4DE]"
    >
      <View className="px-5 py-4">
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-sans text-[14px] text-[#9A858A]">
              {t('childbirthScreen.contractions.durationLabel')}
            </Text>
            <View className="w-[84px] shrink-0 items-end">
              <Text
                className="text-right font-semibold text-[20px] leading-[24px] text-[#8F757B]"
                style={timerValueStyle}
              >
                {formatTime(currentDurationSec)}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-sans text-[14px] text-[#9A858A]">
              {t('childbirthScreen.contractions.intervalLabel')}
            </Text>
            <View className="w-[84px] shrink-0 items-end">
              <Text
                className="text-right font-semibold text-[20px] leading-[24px] text-[#8F757B]"
                style={timerValueStyle}
              >
                {formatTime(latestIntervalSec)}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-sans text-[14px] text-[#9A858A]">
              {t('childbirthScreen.contractions.averageIntervalLabel')}
            </Text>
            <View className="w-[84px] shrink-0 items-end">
              <Text
                className="text-right font-semibold text-[20px] leading-[24px] text-[#8F757B]"
                style={timerValueStyle}
              >
                {formatTime(averageIntervalSec)}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-center">
          <Button
            className="h-11 w-[138px] items-center justify-center rounded-full bg-[#F3A27B] px-3 shadow-none"
            fullWidth={false}
            onPress={onPress}
          >
            <Text
              className="text-center font-semibold text-[18px] leading-[22px] text-white"
              numberOfLines={1}
            >
              {isActive
                ? t('childbirthScreen.contractions.stopButton')
                : t('childbirthScreen.contractions.startButton')}
            </Text>
          </Button>

          <Button
            className="ml-2 w-auto rounded-full bg-transparent px-4 py-[8px] shadow-none"
            fullWidth={false}
            disabled={!hasTimerData}
            onPress={onReset}
          >
            <Text className="font-semibold text-[18px] leading-[22px] text-[#8A828A]">
              {t('childbirthScreen.contractions.resetButton')}
            </Text>
          </Button>
        </View>
      </View>
    </TitledCard>
  );
};
