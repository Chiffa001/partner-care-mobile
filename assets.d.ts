declare module '*.ttf' {
  const value: FontSource;
  export default value;
}

declare module '*.png' {
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.webp' {
  const value: ImageSourcePropType;
  export default value;
}

// Global stylesheet side-effect imports (e.g. NativeWind's global.css). Expo
// declares this via expo/types, but expo-env.d.ts is gitignored and absent in
// CI, so declare it here too.
declare module '*.css';
