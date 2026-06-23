import type { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenContainer } from '@/shared/ui/screen-container';

type Props = {
  children: ReactNode;
};

export const InfoScreenContainer: FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="h-full w-full flex-col items-center px-6 pb-24 pt-24">
        {children}
      </View>
    </ScreenContainer>
  );
};
