import { Ionicons } from '@expo/vector-icons';
import type { FC, ReactNode } from 'react';
import { Platform, Text, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';

export type SettingsRowProps = {
  title: string;
  leftIcon: ReactNode;
  value?: string;
  withChevron?: boolean;
  withDivider?: boolean;
  rightControl?: ReactNode;
  onPress?: () => void;
};

export const SettingsRow: FC<SettingsRowProps> = ({
  title,
  leftIcon,
  value,
  withChevron = false,
  withDivider = false,
  rightControl,
  onPress,
}) => {
  const rowClassName = `flex-row items-center justify-between ${Platform.OS === 'android' ? 'h-[52px]' : 'py-3.5'}`;
  const rowContent = (
    <>
      <View className="mr-3 flex-1 flex-row items-center">
        {leftIcon}
        <Text
          className="ml-3 flex-1 font-sans text-[16px] leading-[22px] text-[#4E4A53]"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={Platform.OS === 'android' ? { includeFontPadding: false } : undefined}
        >
          {title}
        </Text>
      </View>
      {rightControl ?? (
        <View className="flex-row items-center">
          {value ? (
            <Text
              className="mr-2 font-sans text-[16px] leading-[22px] text-[#7A7580]"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={Platform.OS === 'android' ? { includeFontPadding: false } : undefined}
            >
              {value}
            </Text>
          ) : null}
          {withChevron ? (
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#B4ACB0"
            />
          ) : null}
        </View>
      )}
    </>
  );

  return (
    <>
      {onPress ? (
        <AnimatedPressable
          className={rowClassName}
          onPress={onPress}
          activeScale={0.976}
          activeOpacity={0.82}
        >
          {rowContent}
        </AnimatedPressable>
      ) : (
        <View className={rowClassName}>
          {rowContent}
        </View>
      )}
      {withDivider ? (
        <View className="h-px bg-[#DED7D8]" />
    ) : null}
    </>
  );
};
