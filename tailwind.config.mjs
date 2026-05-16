/** @type {import('tailwindcss').Config} */
import fs from 'node:fs';
import path from 'node:path';

import nativewindPreset from 'nativewind/preset';

const colorsSource = fs.readFileSync(
  path.join(process.cwd(), 'constants/colors.ts'),
  'utf8',
);

const Colors = Object.fromEntries(
  [...colorsSource.matchAll(/(\w+):\s*'([^']+)'/g)].map(([, key, value]) => [
    key,
    value,
  ]),
);

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: Colors.bgBase,
        },
        cards: {
          emotional: Colors.bgCardEmotional,
          positive: Colors.bgCardPositive,
          warning: Colors.bgCardWarning,
        },
        paragraphs: {
          primary: Colors.textParagraphPrimary,
          secondary: Colors.textParagraphSecondary,
          title: Colors.textParagraphTitle,
        },
        buttons: {
          primary: {
            bg: Colors.accentStrong,
            text: Colors.white,
          },
        },
      },
      fontFamily: {
        sans: ['Poppins-Regular', 'System'],
        medium: ['Poppins-Medium', 'System'],
        semibold: ['Poppins-SemiBold', 'System'],
      },
    },
  },
  plugins: [],
};
