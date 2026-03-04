import { type FC,memo, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type SettingsSwitchProps = {
  value: boolean;
  onValueChange: (nextValue: boolean) => void;
};

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 26;
const THUMB_TOP = (TRACK_HEIGHT - THUMB_SIZE) / 2;
const THUMB_LEFT = 2;
const MAX_TRANSLATE_X = TRACK_WIDTH - THUMB_SIZE - THUMB_LEFT * 2;

const SettingsSwitchComponent: FC<SettingsSwitchProps> = ({ value, onValueChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const progress = useSharedValue(localValue ? 1 : 0);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    progress.value = withTiming(localValue ? 1 : 0, { duration: 140 });
  }, [localValue, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#D7D2D5', '#8FB482'],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: THUMB_TOP,
    left: THUMB_LEFT,
    transform: [{ translateX: progress.value * MAX_TRANSLATE_X }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: localValue }}
      onPress={() => {
        const nextValue = !localValue;
        setLocalValue(nextValue);
        onValueChange(nextValue);
      }}
    >
      <Animated.View
        className="w-[50px] rounded-full"
        style={[trackStyle, { height: TRACK_HEIGHT }]}
      >
        <Animated.View style={thumbStyle}>
          <View className="h-[26px] w-[26px] rounded-full bg-[#F8F5F3]" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const SettingsSwitch = memo(SettingsSwitchComponent);
