import type { FC, ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, Text } from 'react-native';

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  disabledOpacity?: number;
  style?: StyleProp<ViewStyle>;
} & Pick<PressableProps, 'onPress' | 'disabled' | 'className'>;

export const Button: FC<Props> = ({
  children,
  className,
  disabled,
  disabledOpacity = 0.5,
  fullWidth = true,
  style,
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
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : 'w-auto'} rounded-full bg-buttons-primary-bg shadow-md active:opacity-80 ${className}`}
      style={[style, { opacity: disabled ? disabledOpacity : 1 }]}
    >
      {content}
    </Pressable>
  );
};
