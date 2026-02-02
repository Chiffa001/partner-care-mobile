import type { FC, ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ScreenContainer: FC<Props> = ({ children, className }) => (
  <View className={`flex h-full w-full flex-col items-center justify-center bg-background ${className}`}>
    {children}
  </View>
);
