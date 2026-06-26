import type { FC } from 'react';
import { Animated, View } from 'react-native';

import { Colors } from '@/shared/config/colors';

type Props = {
  scrollX: Animated.Value;
  count: number;
  itemWidth: number;
  className?: string;
};

export const OnboardingDots: FC<Props> = ({
  scrollX,
  count,
  itemWidth,
  className,
}) => {
  if (count <= 0) {
    return null;
  }

  const safeWidth = itemWidth > 0 ? itemWidth : 1;

  return (
    <View
      className={`flex-row items-center justify-center gap-2 ${className ?? ''}`}
    >
      {Array.from({ length: count }).map((_, index) => {
        const inputRange = [
          (index - 1) * safeWidth,
          index * safeWidth,
          (index + 1) * safeWidth,
        ];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [10, 28, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`onboarding-dot-${index + 1}`}
            style={{
              width,
              opacity,
              height: 10,
              borderRadius: 5,
              backgroundColor: Colors.accentStrong,
            }}
          />
        );
      })}
    </View>
  );
};
