import { ScrollView } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import {
  NotificationSettingsSection,
  ProfileSettingsSection,
  SubscriptionSettingsSection,
} from '@/components/settings-sections';

const Settings = () => {
  const hasActiveSubscription = true;

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <ProfileSettingsSection />

        <NotificationSettingsSection />

        <SubscriptionSettingsSection
          hasActiveSubscription={hasActiveSubscription}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Settings;
