import { Stack } from 'expo-router';

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 200,
      }}
    />
  );
};

export default OnboardingLayout;
