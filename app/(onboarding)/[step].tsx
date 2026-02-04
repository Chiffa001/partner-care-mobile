import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import type { ImageSourcePropType} from 'react-native';
import { Image, View } from 'react-native';

import coupleImg from '@/assets/images/bg/onboarding-1.png';
import hospitalImg from '@/assets/images/bg/onboarding-2.png';
import calendarImg from '@/assets/images/bg/onboarding-3.png';
import { Button } from '@/components/button';
import { InfoScreenContainer } from '@/components/info-screen-container';
import { OnboardingStepIndicator } from '@/components/onboarding-step-indicator';
import { Subtitle } from '@/components/subtitle';
import { Title } from '@/components/title';
import { ONBOARDING_STORAGE_KEY } from '@/constants/storage';

type Step = `${number}`;

const steps: Record<Step, {
  image: ImageSourcePropType;
  scale: number;
}> = {
  1: {
    image: coupleImg,
    scale: 1.1,
  },
  2: {
    image: hospitalImg,
    scale: 1.1,
  },
  3: {
    image: calendarImg,
    scale: 1.3,
  },
};

const OnboardingStep = () => {
  const { step } = useLocalSearchParams<{ step: Step }>();
  const { t } = useTranslation();
  const router = useRouter();
  const totalSteps = Object.keys(steps).length;
  const currentStep = Number(step) || 1;

  const handleNext = () => {
    const nextStep = String(Number(step) + 1) as Step;
    const next = steps[nextStep];

    if (next) {
      router.replace(`/(onboarding)/${nextStep}`);

      return;
    }

    AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    router.replace('/(tabs)/today');
  };

  const {scale, image} = steps[step];

  return (
    <InfoScreenContainer>
      <View className="gap-5">
        <Title>
          {t(`onboarding${step}.title`)}
        </Title>
        <Subtitle
          size="xl"
          color="primary"
        >
          {t(`onboarding${step}.description`)}
        </Subtitle>
      </View>
      <Image
        style={{ transform: [{ scale }] }}
        source={image}
        resizeMode='center'
        className="w-full flex-1"
      />
      <OnboardingStepIndicator
        totalSteps={totalSteps}
        currentStep={currentStep}
        className="mb-8"
      />
      <View className="mt-auto w-[85%]">
        <Button
          onPress={handleNext}
        >
          {t(`onboarding${step}.button`)}
        </Button>
      </View>
    </InfoScreenContainer>
  );
};

export default OnboardingStep;
