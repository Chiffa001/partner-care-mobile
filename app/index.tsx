import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

import { AppLoader } from '@/components/app-loader';
import { ONBOARDING_STORAGE_KEY } from '@/constants/storage';

const Index = () => {
  const [step, setStep] = useState<'tabs' | 'onboarding' | null>(null);

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_SKIP_REDIRECTS) {
      setStep('onboarding');

      return;
    }

    AsyncStorage
      .getItem(ONBOARDING_STORAGE_KEY)
      .then((value) => {
        setStep(value
          ? 'tabs'
          : 'onboarding'
        );
    });
  }, []);

  if (!step) {
    return <AppLoader />;
  }

  if (step === 'tabs') {
    return <Redirect href="/(tabs)/today" />;
  }

  return <Redirect href="/value" />;
};

export default Index;
