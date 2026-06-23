import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

type Props = {
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
};

export const ScreenContainer: FC<Props> = ({ children, className, style }) => (
  <View
    className={`flex h-full w-full flex-col items-center justify-center bg-background ${className}`}
    style={style}
  >
    {children}
  </View>
);
