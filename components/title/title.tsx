import type { FC, ReactNode } from 'react';
import { Text } from 'react-native';

type Props = {
  children: ReactNode;
};

export const Title: FC<Props> = ({ children }) => (
  <Text className="text-center font-medium text-3xl leading-snug text-paragraphs-title">
    {children}
  </Text>
);
