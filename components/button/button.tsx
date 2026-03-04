import type { FC, ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, Text } from 'react-native';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
} & Pick<PressableProps, 'onPress' | 'disabled' | 'className'>;

export const Button: FC<Props> = ({
  children,
  className,
  fullWidth = true,
  ...others
}) => {
  const content = typeof children === 'object' ? children : (
    <Text className="text-center font-sans text-2xl text-buttons-primary-text">
      {children}
    </Text>
  );

  return (
    <Pressable
      {...others}
      className={`${fullWidth ? 'w-full' : 'w-auto'} rounded-full bg-buttons-primary-bg px-16 py-4 shadow-md active:opacity-80 ${className}`}
    >
      {content}
    </Pressable>
  );
};
