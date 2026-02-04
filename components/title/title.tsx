import type { FC, ReactNode } from 'react';
import { Text } from 'react-native';

type Props = {
  children: ReactNode;
}

export const Title: FC<Props> = ({children}) => (
  <Text className='font-medium text-3xl text-center text-paragraphs-title leading-snug'>
    {children}
  </Text>
);
