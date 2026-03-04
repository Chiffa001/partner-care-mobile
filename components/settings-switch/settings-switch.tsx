import type { FC } from 'react';
import { Switch } from 'react-native';

type SettingsSwitchProps = {
  value: boolean;
  onValueChange: (nextValue: boolean) => void;
};

export const SettingsSwitch: FC<SettingsSwitchProps> = ({ value, onValueChange }) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: '#D7D2D5', true: '#8FB482' }}
    thumbColor="#F8F5F3"
    ios_backgroundColor="#D7D2D5"
  />
);
