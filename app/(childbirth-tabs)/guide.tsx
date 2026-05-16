import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';

import sheIsTiredImage from '@/assets/images/childbirth/she-is-tired-img.png';
import { InsightCard } from '@/components/insight-card';
import { ScreenContainer } from '@/components/screen-container';
import { Colors } from '@/constants/colors';

const GuideScreen = () => {
  const { t } = useTranslation();

  const helpItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.sheIsTired.helpItems.${index}`),
    type: 'positive' as const,
  }));
  const avoidItems = [0, 1].map((index) => ({
    text: t(`childbirthScreen.sheIsTired.avoidItems.${index}`),
    type: 'negative' as const,
  }));
  const toHospitalItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.toHospital.items.${index}`),
    type: 'positive' as const,
  }));
  const doctorItems = [0, 1, 2].map((index) => ({
    text: t(`childbirthScreen.doctor.items.${index}`),
    type: 'positive' as const,
  }));

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 px-4 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="rounded-2xl border px-4 py-3"
          style={{
            borderColor: Colors.borderCard,
            backgroundColor: Colors.bgCard,
          }}
        >
          <Text
            className="font-sans text-[19px] leading-[24px]"
            style={{ color: Colors.textPrimary }}
          >
            {t('childbirthScreen.sheIsTired.status')}
          </Text>
        </View>

        <InsightCard
          title={t('childbirthScreen.sheIsTired.helpTitle')}
          items={helpItems}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
        />

        <InsightCard
          title={t('childbirthScreen.sheIsTired.avoidTitle')}
          items={avoidItems}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
        />

        <Image
          source={sheIsTiredImage}
          resizeMode="contain"
          className="h-[200px] w-full"
        />

        <View
          className="rounded-2xl border px-4 py-3"
          style={{
            borderColor: Colors.borderCard,
            backgroundColor: Colors.bgCard,
          }}
        >
          <Text
            className="font-sans text-[19px] leading-[24px]"
            style={{ color: Colors.textPrimary }}
          >
            {t('childbirthScreen.toHospital.status')}
          </Text>
        </View>

        <InsightCard
          title={t('childbirthScreen.toHospital.title')}
          items={toHospitalItems}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
        />

        <View
          className="rounded-2xl border px-4 py-3"
          style={{
            borderColor: Colors.borderCard,
            backgroundColor: Colors.bgCard,
          }}
        >
          <Text
            className="font-sans text-[19px] leading-[24px]"
            style={{ color: Colors.textPrimary }}
          >
            {t('childbirthScreen.doctor.status')}
          </Text>
        </View>

        <InsightCard
          title={t('childbirthScreen.doctor.title')}
          items={doctorItems}
          titleColor={Colors.textPrimary}
          headerBackgroundColor={Colors.bgHeaderCard}
          bodyBackgroundColor={Colors.bgCardBody}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default GuideScreen;
