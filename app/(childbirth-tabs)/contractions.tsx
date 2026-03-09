import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing, Image, ScrollView, Text, View } from 'react-native';

import laborContractionsImage from '@/assets/images/childbirth/labor-contractions-img.png';
import { ChildbirthTimer } from '@/components/childbirth-timer';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import {
  selectHasTimerData,
  selectIsContractionActive,
  useChildbirthTimerStore,
} from '@/stores/childbirth-timer-store';

const ContractionsScreen = () => {
  const { t } = useTranslation();
  const isContractionActive = useChildbirthTimerStore(selectIsContractionActive);
  const hasTimerData = useChildbirthTimerStore(selectHasTimerData);
  const waitingIconScale = useRef(new Animated.Value(1)).current;
  const activeIconScale = useRef(new Animated.Value(1)).current;
  const statusText = !hasTimerData
    ? t('childbirthScreen.contractions.timerNotStartedHint')
    : isContractionActive
      ? t('childbirthScreen.contractions.statusActive')
      : t('childbirthScreen.contractions.statusIdle');
  const whatToDoItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.contractions.whatToDoItems.${index}`),
    type: 'positive' as const,
  }));

  useEffect(() => {
    if (isContractionActive) {
      waitingIconScale.stopAnimation();
      waitingIconScale.setValue(1);

      return undefined;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(waitingIconScale, {
          toValue: 1.18,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waitingIconScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [isContractionActive, waitingIconScale]);

  useEffect(() => {
    if (!isContractionActive) {
      activeIconScale.stopAnimation();
      activeIconScale.setValue(1);

      return undefined;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(activeIconScale, {
          toValue: 1.18,
          duration: 550,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(activeIconScale, {
          toValue: 1,
          duration: 550,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [activeIconScale, isContractionActive]);

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        className="bg-[#FFF7F4]"
        contentContainerClassName="gap-4 px-4 pb-5 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="justify-center rounded-2xl border border-[#EFE4E2] bg-[#F7EFEE] px-4 py-3">
          <View className="flex-row items-center justify-center">
            {isContractionActive ? (
              <Animated.View style={{ transform: [{ scale: activeIconScale }] }}>
                <Ionicons
                  name="radio-button-on"
                  size={20}
                  color="#DB7C55"
                />
              </Animated.View>
            ) : (
              <Animated.View style={{ transform: [{ scale: waitingIconScale }] }}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#8F757B"
                />
              </Animated.View>
            )}
            <Text className="ml-2 text-center font-sans text-[19px] leading-[24px] text-[#8F757B]">
              {statusText}
            </Text>
          </View>
        </View>

        <ChildbirthTimer />

        <InsightCard
          title={t('childbirthScreen.contractions.whatToDoTitle')}
          titleColor="#8F757B"
          headerBackgroundColor="#FBEDE7"
          bodyBackgroundColor="#FEFAF8"
          items={whatToDoItems}
        />

        <Image
          source={laborContractionsImage}
          resizeMode="cover"
          className="h-[220px] w-full rounded-[20px]"
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ContractionsScreen;
