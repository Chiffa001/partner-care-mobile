import { Stack } from 'expo-router';

const OnboardingLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
  );
};

export default OnboardingLayout;
