import type {FC, ReactNode} from 'react';
import { View } from 'react-native';

import { ScreenContainer } from '../screen-container';

type Props = {
  children: ReactNode;
};

export const InfoScreenContainer: FC<Props> = ({ children }) => (
  <ScreenContainer className='px-6'>
    <View className='h-full w-full flex flex-col pt-24 pb-24 items-center'>
      {children}
    </View>
  </ScreenContainer>
);
