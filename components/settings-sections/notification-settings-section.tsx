import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { SettingsRow } from '@/components/settings-row';
import { SettingsSwitch } from '@/components/settings-switch';

type NotificationSettingsSectionProps = {
  isPushEnabled: boolean;
  onPushEnabledChange: (nextValue: boolean) => void;
};

export const NotificationSettingsSection: FC<NotificationSettingsSectionProps> = ({
  isPushEnabled,
  onPushEnabledChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Text className="mb-3 ml-1 font-semibold text-[16px] leading-[24px] text-[#8A828A]">
        {t('settingsScreen.sections.notifications')}
      </Text>

      <View
        className="mb-7 overflow-hidden rounded-[22px] bg-[#F8F3F3] px-4"
        style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <SettingsRow
          title={t('settingsScreen.rows.pushNotifications')}
          rightControl={(
            <SettingsSwitch
              value={isPushEnabled}
              onValueChange={onPushEnabledChange}
            />
          )}
          leftIcon={(
            <Ionicons
              name="notifications"
              size={27}
              color="#D8B178"
            />
          )}
        />
      </View>
    </>
  );
};
