/** @type {import('tailwindcss').Config} */
import nativewindPreset from "nativewind/preset";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
