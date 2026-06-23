import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TextStyle } from 'react-native';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { ChildbirthHistoryModal } from '@/modules/childbirth/components/childbirth-history-modal';
import { useChildbirthTimer } from '@/modules/childbirth/hooks/use-childbirth-timer';
import { formatTime } from '@/modules/childbirth/lib/format-time';
import { Colors } from '@/shared/config/colors';
import { Button } from '@/shared/ui/button';
import { TitledCard } from '@/shared/ui/titled-card';

const timerValueStyle: TextStyle = {
  fontVariant: ['tabular-nums'],
  fontFamily: 'Nunito-SemiBold',
};

export const ChildbirthTimer = () => {
  const { t } = useTranslation();
  const {
    isActive,
    isPaused,
    isUrgent,
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
      pressBlockedUntilRef.current = Date.now() + 100;
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

  const primaryButtonLabel =
    isActive && !isPaused
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
        intervalText:
          record.intervalSec === null ? '—' : formatTime(record.intervalSec),
        averageText:
          intervalsCount === 0
            ? '—'
            : formatTime(sumIntervals / intervalsCount),
      };
    });
  }, [contractions]);

  return (
    <>
      <TitledCard
        headerContent={(
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text
                className="font-semibold text-[22px] leading-[28px]"
                style={{ color: Colors.textPrimary }}
              >
                {t('childbirthScreen.contractions.timerTitle')}
              </Text>
              {isPaused && (
                <View
                  className="rounded-full px-2 py-0.5"
                  style={{ backgroundColor: Colors.accentPause }}
                >
                  <Text
                    className="font-semibold text-[11px] leading-[16px]"
                    style={{ color: Colors.white }}
                  >
                    {t('childbirthScreen.contractions.pauseLabel')}
                  </Text>
                </View>
              )}
            </View>
            <Pressable
              testID="btn-timer-history"
              className="h-9 w-9 items-center justify-center rounded-full"
              disabled={!hasTimerData}
              onPress={() => setHistoryVisible(true)}
              style={{
                opacity: hasTimerData ? 1 : 0.45,
                backgroundColor: Colors.bgButtonMuted,
              }}
              hitSlop={8}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={Colors.textPrimary}
              />
            </Pressable>
          </View>
        )}
        headerBackgroundColor={Colors.bgHeaderCard}
        bodyBackgroundColor={Colors.bgCardBody}
        outerClassName="rounded-[22px] border"
        outerStyle={{ borderColor: Colors.borderTimerCard }}
      >
        <View className="px-5 py-4">
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text
                className="font-sans text-[14px]"
                style={{ color: Colors.textLabel }}
              >
                {t('childbirthScreen.contractions.durationLabel')}
              </Text>
              <View className="w-[84px] shrink-0 items-end">
                <Text
                  className="text-right font-semibold text-[20px] leading-[24px]"
                  style={[timerValueStyle, { color: Colors.textPrimary }]}
                >
                  {formatTime(currentDurationSec)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text
                className="font-sans text-[14px]"
                style={{ color: Colors.textLabel }}
              >
                {t('childbirthScreen.contractions.intervalLabel')}
              </Text>
              <View className="w-[84px] shrink-0 items-end">
                <Text
                  className="text-right font-semibold text-[20px] leading-[24px]"
                  style={[timerValueStyle, { color: Colors.textPrimary }]}
                >
                  {formatTime(latestIntervalSec)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text
                className="font-sans text-[14px]"
                style={{ color: Colors.textLabel }}
              >
                {t('childbirthScreen.contractions.averageIntervalLabel')}
              </Text>
              <View className="w-[84px] shrink-0 items-end">
                <Text
                  className="text-right font-semibold text-[20px] leading-[24px]"
                  style={[timerValueStyle, { color: Colors.textPrimary }]}
                >
                  {formatTime(averageIntervalSec)}
                </Text>
              </View>
            </View>
          </View>

          {isUrgent && (
            <View
              className="mt-3 rounded-[10px] px-3 py-2.5"
              style={{ backgroundColor: Colors.bgUrgent }}
            >
              <Text
                className="font-semibold text-[13px] leading-[18px]"
                style={{ color: Colors.textDanger }}
              >
                {t('childbirthScreen.contractions.urgentWarning')}
              </Text>
            </View>
          )}

          <View className="mt-4 flex-row items-center justify-center">
            <Button
              testID="btn-timer-primary"
              className="h-11 w-[138px] items-center justify-center overflow-hidden rounded-full"
              fullWidth={false}
              style={{ backgroundColor: Colors.accentStrong }}
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
                  backgroundColor: Colors.accent,
                }}
              />
              <View className="h-full w-full items-center justify-center px-3">
                <Text
                  className="text-center font-semibold text-[18px] leading-[22px]"
                  style={{ color: Colors.white }}
                  numberOfLines={1}
                >
                  {primaryButtonLabel}
                </Text>
              </View>
            </Button>

            <Button
              testID="btn-timer-reset"
              className="ml-2 w-auto rounded-full px-4 py-[8px] shadow-none"
              fullWidth={false}
              disabled={!hasTimerData}
              style={{ backgroundColor: Colors.transparent }}
              onPress={onReset}
            >
              <Text
                className="font-semibold text-[18px] leading-[22px]"
                style={{ color: Colors.textSecondary }}
              >
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
