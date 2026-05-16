import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { View } from 'react-native';

import { Colors } from '@/constants/colors';

type SubscriptionStatusProps = {
  isActive: boolean;
};

export const SubscriptionStatus: FC<SubscriptionStatusProps> = ({
  isActive,
}) => (
  <View
    className="h-6 w-6 items-center justify-center rounded-full"
    style={{
      backgroundColor: isActive ? Colors.statusSuccess : Colors.statusDanger,
    }}
  >
    <Ionicons
      name={isActive ? 'checkmark' : 'close'}
      size={14}
      color={Colors.white}
    />
  </View>
);
