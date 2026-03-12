import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';

import sheIsTiredImage from '@/assets/images/childbirth/she-is-tired-img.png';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';

const SheIsTiredScreen = () => {
  const { t } = useTranslation();
  const helpItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.sheIsTired.helpItems.${index}`),
    type: 'positive' as const,
  }));
  const avoidItems = [0, 1].map((index) => ({
    text: t(`childbirthScreen.sheIsTired.avoidItems.${index}`),
    type: 'negative' as const,
  }));

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        className="bg-[#FFF7F4]"
        contentContainerClassName="gap-4 px-4 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-2xl border border-[#EFE4E2] bg-[#F7EFEE] px-4 py-3">
          <Text className="font-sans text-[19px] leading-[24px] text-[#8F757B]">
            {t('childbirthScreen.sheIsTired.status')}
          </Text>
        </View>

        <InsightCard
          title={t('childbirthScreen.sheIsTired.helpTitle')}
          items={helpItems}
          titleColor="#8F757B"
          headerBackgroundColor="#FBEDE7"
          bodyBackgroundColor="#FEFAF8"
          collapsible={false}
        />

        <InsightCard
          title={t('childbirthScreen.sheIsTired.avoidTitle')}
          items={avoidItems}
          titleColor="#8F757B"
          headerBackgroundColor="#FBEDE7"
          bodyBackgroundColor="#FEFAF8"
          collapsible={false}
        />

        <Image
          source={sheIsTiredImage}
          resizeMode="contain"
          className="h-[200px] w-full"
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default SheIsTiredScreen;
