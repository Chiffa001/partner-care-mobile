import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';

const ToHospitalScreen = () => {
  const { t } = useTranslation();
  const toHospitalItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.toHospital.items.${index}`),
    type: 'positive' as const,
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
            {t('childbirthScreen.toHospital.status')}
          </Text>
        </View>

        <InsightCard
          title={t('childbirthScreen.toHospital.title')}
          titleColor="#8F757B"
          headerBackgroundColor="#FBEDE7"
          bodyBackgroundColor="#FEFAF8"
          items={toHospitalItems}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ToHospitalScreen;
