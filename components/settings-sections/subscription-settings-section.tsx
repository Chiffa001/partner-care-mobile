import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { SettingsRow } from '@/components/settings-row';
import { SubscriptionStatus } from '@/components/subscription-status';

type SubscriptionSettingsSectionProps = {
  hasActiveSubscription: boolean;
};

export const SubscriptionSettingsSection: FC<SubscriptionSettingsSectionProps> = ({
  hasActiveSubscription,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Text className="mb-3 ml-1 font-semibold text-[16px] leading-[24px] text-[#8A828A]">
        {t('settingsScreen.sections.subscription')}
      </Text>

      <View
        className="overflow-hidden rounded-[22px] bg-[#F8F3F3] px-4"
        style={{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <SettingsRow
          title={t('settingsScreen.rows.mySubscription')}
          rightControl={<SubscriptionStatus isActive={hasActiveSubscription} />}
          leftIcon={(
            <MaterialCommunityIcons
              name="wallet-membership"
              size={28}
              color="#85AF8A"
            />
          )}
        />
      </View>
    </>
  );
};
