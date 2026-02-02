import type { FC, ReactNode } from 'react';
import type { PressableProps} from 'react-native';
import { Pressable,Text } from 'react-native';

type Props = {
  children: ReactNode;
} & Pick<PressableProps, 'onPress' | 'disabled' | 'className'>;

export const Button: FC<Props> = ({ children, className, ...others }) => {
  const content = typeof children === 'object' ? children : <Text className='font-sans text-buttons-primary-text text-center text-2xl'>{children}</Text>;

  return (
    <Pressable {...others} className={`w-full px-16 py-4 rounded-full shadow-md active:opacity-80 bg-buttons-primary-bg ${className}`}>
      {content}
    </Pressable>
  );
};
