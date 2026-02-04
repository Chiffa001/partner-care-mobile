import type { FC,ReactNode  } from 'react';
import { Text } from 'react-native';

type Props = {
  children: ReactNode;
  size?: 'lg' | 'xl';
  color?: 'primary' | 'secondary';
};

export const Subtitle: FC<Props> = ({ children, size = 'lg', color = 'primary' }) => (
  <Text className={`font-medium ${color === 'primary' ? 'text-paragraphs-primary' : 'text-paragraphs-secondary'} text-center ${size === 'lg' ? 'text-lg' : 'text-xl'}`}>
    {children}
  </Text>
);
