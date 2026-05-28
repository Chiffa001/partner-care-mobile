import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { SettingsRow } from '@/components/settings-row';
import { SettingsSwitch } from '@/components/settings-switch';
import { Colors } from '@/constants/colors';
import {
  selectIsPushEnabled,
  selectSetPushEnabled,
  useProfileStore,
} from '@/stores/profile-store';

export const NotificationSettingsSection: FC = () => {
  const { t } = useTranslation();
  const isPushEnabled = useProfileStore(selectIsPushEnabled);
  const setPushEnabled = useProfileStore(selectSetPushEnabled);

  return (
    <>
      <Text
        className="mb-3 ml-1 font-semibold text-[16px] leading-[24px]"
        style={{ color: Colors.textSecondary }}
      >
        {t('settingsScreen.sections.notifications')}
      </Text>

      <View
        className="mb-7 overflow-hidden rounded-[22px] px-4"
        style={{
          backgroundColor: Colors.bgSettings,
          shadowColor: Colors.black,
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
              onValueChange={setPushEnabled}
            />
          )}
          leftIcon={(
            <Ionicons
              name="notifications"
              size={27}
              color={Colors.iconWarm}
            />
          )}
        />
      </View>
    </>
  );
};
