import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TextStyle } from 'react-native';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ChildbirthHistoryModal } from '@/components/childbirth-history-modal';
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
    isPaused,
    currentDurationSec,
    latestIntervalSec,
    averageIntervalSec,
    hasTimerData,
    contractions,
    onPress,
    onReset,
    onPause,
    onStartAfterPause,
  } = useChildbirthTimer();
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const holdProgress = useRef(new Animated.Value(0)).current;
  const pauseTriggeredByHold = useRef(false);
  const pressBlockedUntilRef = useRef(0);

  useEffect(() => {
    holdProgress.stopAnimation();
    holdProgress.setValue(0);
    pauseTriggeredByHold.current = false;
  }, [holdProgress, isActive, isPaused]);

  const startPauseHoldAnimation = () => {
    if (!isActive || isPaused) {
      return;
    }

    holdProgress.stopAnimation();
    holdProgress.setValue(0);

    Animated.timing(holdProgress, {
      toValue: 1,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!finished) {
        return;
      }

      pauseTriggeredByHold.current = true;
      pressBlockedUntilRef.current = Date.now() + 900;
      onPause();
    });
  };

  const cancelPauseHoldAnimation = () => {
    if (pauseTriggeredByHold.current) {
      return;
    }

    holdProgress.stopAnimation();
    Animated.timing(holdProgress, {
      toValue: 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handlePrimaryButtonPress = () => {
    if (Date.now() < pressBlockedUntilRef.current) {
      return;
    }

    if (pauseTriggeredByHold.current) {
      pauseTriggeredByHold.current = false;

      return;
    }

    if (isPaused) {
      onStartAfterPause();

      return;
    }

    onPress();
  };

  const primaryButtonLabel = isPaused
    ? t('childbirthScreen.contractions.startButton')
    : isActive
      ? t('childbirthScreen.contractions.stopButton')
      : t('childbirthScreen.contractions.startButton');

  const holdFillWidth = holdProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const historyRows = useMemo(() => {
    let sumIntervals = 0;
    let intervalsCount = 0;

    return contractions.map((record, index) => {
      if (record.intervalSec !== null) {
        sumIntervals += record.intervalSec;
        intervalsCount += 1;
      }

      return {
        key: `${record.startAt}-${index}`,
        index: index + 1,
        durationText: formatTime(record.durationSec),
        intervalText: record.intervalSec === null ? '—' : formatTime(record.intervalSec),
        averageText: intervalsCount === 0 ? '—' : formatTime(sumIntervals / intervalsCount),
      };
    });
  }, [contractions]);

  return (
    <>
      <TitledCard
        headerContent={(
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-[22px] leading-[28px] text-[#8F757B]">
              {t('childbirthScreen.contractions.timerTitle')}
            </Text>
            <Pressable
              className="h-9 w-9 items-center justify-center rounded-full bg-[#EFDCD5]"
              disabled={!hasTimerData}
              onPress={() => setHistoryVisible(true)}
              style={{ opacity: hasTimerData ? 1 : 0.45 }}
              hitSlop={8}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color="#8F757B"
              />
            </Pressable>
          </View>
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
              className="h-11 w-[138px] items-center justify-center overflow-hidden rounded-full bg-[#F3A27B]"
              fullWidth={false}
              onPress={handlePrimaryButtonPress}
              onPressIn={startPauseHoldAnimation}
              onPressOut={cancelPauseHoldAnimation}
            >
              <Animated.View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: holdFillWidth,
                  backgroundColor: '#D37852',
                }}
              />
              <View className="h-full w-full items-center justify-center px-3">
                <Text
                  className="text-center font-semibold text-[18px] leading-[22px] text-white"
                  numberOfLines={1}
                >
                  {primaryButtonLabel}
                </Text>
              </View>
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

      <ChildbirthHistoryModal
        visible={isHistoryVisible}
        rows={historyRows}
        onClose={() => setHistoryVisible(false)}
      />
    </>
  );
};
