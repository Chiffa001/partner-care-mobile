import './global.css';
import '@/i18n';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import introImg from '@/assets/images/bg/intro.png';
import coupleImg from '@/assets/images/bg/onboarding-1.png';
import hospitalImg from '@/assets/images/bg/onboarding-2.png';
import calendarImg from '@/assets/images/bg/onboarding-3.png';
import { AppLoader } from '@/components/app-loader';
import { useCustomFonts } from '@/hooks/use-custom-fonts';
import { usePreloadAssets } from '@/hooks/use-preload-assets';

const onboardingImages = [coupleImg, hospitalImg, calendarImg, introImg];

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const imagesReady = usePreloadAssets(
    onboardingImages,
    { blocking: true }
  );

  if (!fontsLoaded || !imagesReady) {
    return (
      <SafeAreaProvider>
        <AppLoader />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View
        className="flex-1"
      >
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: 'none' }}
          />
          <Stack.Screen
            name="value/index"
            options={{ headerShown: false, animation: 'none' }}
          />
          <Stack.Screen
            name="(onboarding)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
};

export default RootLayout;
