import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { View } from 'react-native';

type SubscriptionStatusProps = {
  isActive: boolean;
};

export const SubscriptionStatus: FC<SubscriptionStatusProps> = ({ isActive }) => (
  <View
    className="h-6 w-6 items-center justify-center rounded-full"
    style={{ backgroundColor: isActive ? '#7AAF68' : '#D86B66' }}
  >
    <Ionicons
      name={isActive ? 'checkmark' : 'close'}
      size={14}
      color="#FFFFFF"
    />
  </View>
);
