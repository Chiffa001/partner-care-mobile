import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

type TitledCardProps = {
  headerContent: ReactNode;
  headerBackgroundColor: string;
  bodyBackgroundColor: string;
  children?: ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  headerClassName?: string;
  outerStyle?: StyleProp<ViewStyle>;
};

export const TitledCard: FC<TitledCardProps> = ({
  headerContent,
  headerBackgroundColor,
  bodyBackgroundColor,
  children,
  outerClassName,
  innerClassName,
  headerClassName = 'px-5 py-2.5',
  outerStyle,
}) => (
  <View
    className={outerClassName}
    style={outerStyle}
  >
    <View
      className={`overflow-hidden rounded-[22px] ${innerClassName ?? ''}`}
      style={{ backgroundColor: bodyBackgroundColor }}
    >
      <View
        className={headerClassName}
        style={{ backgroundColor: headerBackgroundColor }}
      >
        {headerContent}
      </View>
      {children}
    </View>
  </View>
);
