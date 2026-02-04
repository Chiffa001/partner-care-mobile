import './global.css';
import '@/i18n';

import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useCustomFonts } from '@/hooks/use-custom-fonts';

const RootLayout = () => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-1 bg-background">
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="value/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(onboarding)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
