import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type UsePulseScaleOptions = {
  enabled: boolean;
  duration: number;
  maxScale?: number;
};

export const usePulseScale = ({
  enabled,
  duration,
  maxScale = 1.18,
}: UsePulseScaleOptions) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!enabled) {
      scale.stopAnimation();
      scale.setValue(1);

      return undefined;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: maxScale,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [duration, enabled, maxScale, scale]);

  return scale;
};
