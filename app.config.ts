import type { ExpoConfig } from 'expo/config';
import fs from 'node:fs';
import path from 'node:path';

const colorsSource = fs.readFileSync(
  path.join(process.cwd(), 'src/shared/config/colors.ts'),
  'utf8',
);

const Colors = Object.fromEntries(
  [...colorsSource.matchAll(/(\w+):\s*'([^']+)'/g)].map(([, key, value]) => [
    key,
    value,
  ]),
) as Record<string, string>;

const config: ExpoConfig = {
  name: 'partner-care',
  slug: 'partner-care',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'partnercare',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.partnercare',
  },
  android: {
    package: 'com.partnercare',
    adaptiveIcon: {
      backgroundColor: Colors.bgAdaptiveIcon,
      foregroundImage: './src/assets/images/android-icon-foreground.png',
      backgroundImage: './src/assets/images/android-icon-background.png',
      monochromeImage: './src/assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/splash-icon.png',
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
