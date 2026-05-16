import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Animated, ScrollView, Text, View } from 'react-native';

import { ChildbirthTimer } from '@/components/childbirth-timer';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import { Colors } from '@/constants/colors';
import { useLaborPhase } from '@/hooks/use-labor-phase';
import { usePulseScale } from '@/hooks/use-pulse-scale';
import {
  selectHasTimerData,
  selectIsContractionActive,
  useChildbirthTimerStore,
} from '@/stores/childbirth-timer-store';

const TimerScreen = () => {
  const { t } = useTranslation();
  const isContractionActive = useChildbirthTimerStore(selectIsContractionActive);
  const hasTimerData = useChildbirthTimerStore(selectHasTimerData);
  const {
    phase,
    label: phaseLabel,
    dilation: phaseDilation,
    description: phaseDescription,
    items: phaseItems,
  } = useLaborPhase();
  const waitingIconScale = usePulseScale({ enabled: !isContractionActive, duration: 700 });
  const activeIconScale = usePulseScale({ enabled: isContractionActive, duration: 550 });
  const statusText = !hasTimerData
    ? t('childbirthScreen.contractions.timerNotStartedHint')
    : isContractionActive
      ? t('childbirthScreen.contractions.statusActive')
      : t('childbirthScreen.contractions.statusIdle');

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 px-4 pb-5 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="justify-center rounded-2xl border px-4 py-3"
          style={{ borderColor: Colors.borderCard, backgroundColor: Colors.bgCard }}
        >
          <View className="flex-row items-center justify-center">
            {isContractionActive ? (
              <Animated.View style={{ transform: [{ scale: activeIconScale }] }}>
                <Ionicons
                  name="radio-button-on"
                  size={20}
                  color={Colors.accentTimer}
                />
              </Animated.View>
            ) : (
              <Animated.View style={{ transform: [{ scale: waitingIconScale }] }}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={Colors.textPrimary}
                />
              </Animated.View>
            )}
            <Text
              className="ml-2 text-center font-sans text-[19px] leading-[24px]"
              style={{ color: Colors.textPrimary }}
            >
              {statusText}
            </Text>
          </View>
        </View>

        <ChildbirthTimer />

        <View
          className="rounded-2xl border px-4 py-3"
          style={{ borderColor: Colors.borderCard, backgroundColor: Colors.bgCard }}
        >
          <View className="flex-row items-center justify-between">
            <Text
              className="font-sans text-[17px] font-medium leading-[22px]"
              style={{ color: Colors.textPrimary }}
            >
              {phaseLabel}
            </Text>
            {phaseDilation !== '—' && (
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: Colors.bgHeaderCard }}
              >
                <Text
                  className="font-sans text-[13px] font-medium"
                  style={{ color: Colors.accentTimer }}
                >
                  {phaseDilation}
                </Text>
              </View>
            )}
          </View>
          <Text
            className="mt-1 font-sans text-[14px] leading-[20px]"
            style={{ color: Colors.textSubtle }}
          >
            {phaseDescription}
          </Text>
        </View>

        <InsightCard
          key={phase}
          title={t('childbirthScreen.contractions.whatToDoTitle')}
          items={phaseItems}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default TimerScreen;
