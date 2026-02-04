import type { FC } from 'react';
import { View } from 'react-native';

type Props = {
  totalSteps: number;
  currentStep: number;
  className?: string;
};

export const OnboardingStepIndicator: FC<Props> = ({
  totalSteps,
  currentStep,
  className,
}) => {
  if (totalSteps <= 0) {
    return null;
  }

  const safeCurrent = Math.min(Math.max(1, currentStep), totalSteps);

  return (
    <View className={`flex-row items-center justify-center gap-2 ${className ?? ''}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index + 1 === safeCurrent;

        return (
          <View
            key={`onboarding-step-${index + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-buttons-primary-bg' : 'bg-paragraphs-secondary/30'}`}
          />
        );
      })}
    </View>
  );
};
