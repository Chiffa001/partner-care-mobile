import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Animated, Image, ScrollView, Text, View } from 'react-native';

import laborContractionsImage from '@/assets/images/childbirth/labor-contractions-img.png';
import { ChildbirthTimer } from '@/components/childbirth-timer';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import { Colors } from '@/constants/colors';
import { usePulseScale } from '@/hooks/use-pulse-scale';
import {
  selectHasTimerData,
  selectIsContractionActive,
  useChildbirthTimerStore,
} from '@/stores/childbirth-timer-store';

const ContractionsScreen = () => {
  const { t } = useTranslation();
  const isContractionActive = useChildbirthTimerStore(
    selectIsContractionActive,
  );
  const hasTimerData = useChildbirthTimerStore(selectHasTimerData);
  const waitingIconScale = usePulseScale({
    enabled: !isContractionActive,
    duration: 700,
  });
  const activeIconScale = usePulseScale({
    enabled: isContractionActive,
    duration: 550,
  });
  const statusText = !hasTimerData
    ? t('childbirthScreen.contractions.timerNotStartedHint')
    : isContractionActive
      ? t('childbirthScreen.contractions.statusActive')
      : t('childbirthScreen.contractions.statusIdle');
  const whatToDoItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.contractions.whatToDoItems.${index}`),
    type: 'positive' as const,
  }));
  const howToRecognizeItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.contractions.howToRecognizeItems.${index}`),
    type: 'positive' as const,
  }));

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 px-4 pb-5 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <InsightCard
          title={t('childbirthScreen.contractions.howToRecognizeTitle')}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
          items={howToRecognizeItems}
        />

        <View
          className="justify-center rounded-2xl border px-4 py-3"
          style={{
            borderColor: Colors.borderCard,
            backgroundColor: Colors.bgCard,
          }}
        >
          <View className="flex-row items-center justify-center">
            {isContractionActive ? (
              <Animated.View
                style={{ transform: [{ scale: activeIconScale }] }}
              >
                <Ionicons
                  name="radio-button-on"
                  size={20}
                  color={Colors.accentTimer}
                />
              </Animated.View>
            ) : (
              <Animated.View
                style={{ transform: [{ scale: waitingIconScale }] }}
              >
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

        <InsightCard
          title={t('childbirthScreen.contractions.whatToDoTitle')}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
          items={whatToDoItems}
        />

        <View
          className="w-full overflow-hidden rounded-[20px]"
          style={{ height: 220 }}
        >
          <Image
            source={laborContractionsImage}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ContractionsScreen;
