import type { ExpoConfig } from 'expo/config';
import fs from 'node:fs';
import path from 'node:path';

const colorsSource = fs.readFileSync(
  path.join(process.cwd(), 'constants/colors.ts'),
  'utf8',
);

const Colors = Object.fromEntries(
  [...colorsSource.matchAll(/(\w+):\s*'([^']+)'/g)].map(([, key, value]) => [key, value]),
) as Record<string, string>;

const config: ExpoConfig = {
  name: 'partner-care',
  slug: 'partner-care',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'partnercare',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: Colors.bgAdaptiveIcon,
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: Colors.white,
        dark: {
          backgroundColor: Colors.black,
        },
      },
    ],
    'expo-localization',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
