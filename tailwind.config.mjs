/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}',],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFF7F4',
        },
        cards: {
          emotional: "#FDECEA",
          positive: "#EEF7F1",
          warning: "#FFF1EB"
        },
        paragraphs: {
          primary: "#4A4A4A",
          secondary: "#7A7A7A",
          title: "#3E3E3E"
        },
        buttons: {
          primary: {
            bg: "#E87A73",
            text: "#FFFFFF",
          },
        }
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
