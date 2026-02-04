import type { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  className?: string;
};

export const AppLoader: FC<Props> = ({ className }) => (
  <View className={`flex-1 items-center justify-center bg-background ${className ?? ''}`}>
    <ActivityIndicator
      size="large"
      color="#E87A73"
    />
  </View>
);
