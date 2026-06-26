import './global.css';
import '@/shared/i18n';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import introImg from '@/assets/images/bg/intro.webp';
import coupleImg from '@/assets/images/bg/onboarding-1.webp';
import hospitalImg from '@/assets/images/bg/onboarding-2.webp';
import calendarImg from '@/assets/images/bg/onboarding-3.webp';
import { useCustomFonts } from '@/shared/hooks/use-custom-fonts';
import { usePreloadAssets } from '@/shared/hooks/use-preload-assets';
import { AppLoader } from '@/shared/ui/app-loader';
import { PhoneFrame } from '@/shared/ui/phone-frame';

const onboardingImages = [coupleImg, hospitalImg, calendarImg, introImg];

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();
  const imagesReady = usePreloadAssets(onboardingImages, { blocking: true });

  if (!fontsLoaded || !imagesReady) {
    return (
      <SafeAreaProvider>
        <PhoneFrame>
          <AppLoader />
        </PhoneFrame>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <View className="flex-1">
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
            <Stack.Screen
              name="(childbirth-tabs)"
              options={{ headerShown: false }}
            />
          </Stack>
        </View>
      </PhoneFrame>
    </SafeAreaProvider>
  );
};

export default RootLayout;
