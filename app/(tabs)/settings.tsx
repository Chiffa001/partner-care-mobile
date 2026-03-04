import { useState } from 'react';
import { ScrollView } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import {
  NotificationSettingsSection,
  ProfileSettingsSection,
  SubscriptionSettingsSection,
} from '@/components/settings-sections';

const Settings = () => {
  const [isLivingTogether, setIsLivingTogether] = useState(true);
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(true);
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  const [hasActiveSubscription] = useState<boolean>(true);

  return (
    <ScreenContainer className="items-stretch justify-start">
      <ScrollView
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <ProfileSettingsSection
          isLivingTogether={isLivingTogether}
          onLivingTogetherChange={setIsLivingTogether}
          isFirstPregnancy={isFirstPregnancy}
          onFirstPregnancyChange={setIsFirstPregnancy}
        />

        <NotificationSettingsSection
          isPushEnabled={isPushEnabled}
          onPushEnabledChange={setIsPushEnabled}
        />

        <SubscriptionSettingsSection hasActiveSubscription={hasActiveSubscription} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default Settings;
