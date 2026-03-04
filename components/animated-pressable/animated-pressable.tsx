import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import Animated, {
  type AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimatedPressableProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  activeScale?: number;
  activeOpacity?: number;
};

export const AnimatedPressable: FC<AnimatedPressableProps> = ({
  children,
  className,
  style,
  disabled = false,
  onPress,
  activeScale = 0.985,
  activeOpacity = 0.92,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatePressedIn = () => {
    scale.value = withTiming(activeScale, { duration: 110 });
    opacity.value = withTiming(activeOpacity, { duration: 110 });
  };

  const animatePressedOut = () => {
    scale.value = withTiming(1, { duration: 130 });
    opacity.value = withTiming(1, { duration: 130 });
  };

  const animatedPressableStyle: AnimatedStyle<StyleProp<ViewStyle>> = [
    style,
    animatedStyle,
  ];

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      className={className}
      style={animatedPressableStyle}
      disabled={disabled}
      onPress={onPress}
      onPressIn={animatePressedIn}
      onPressOut={animatePressedOut}
    >
      {children}
    </AnimatedPressable>
  );
};
