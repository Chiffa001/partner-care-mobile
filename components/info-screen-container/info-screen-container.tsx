import type {FC, ReactNode} from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenContainer } from '../screen-container';

type Props = {
  children: ReactNode;
};

export const InfoScreenContainer: FC<Props> = ({ children }) => (
  <SafeAreaView className='px-6 bg-background'>
    <ScreenContainer>
      <View className='h-full w-full flex flex-col pt-24 pb-24 items-center'>
        {children}
      </View>
    </ScreenContainer>
  </SafeAreaView>
);
