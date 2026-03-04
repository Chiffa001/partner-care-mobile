import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { CommunicationToneModal } from '@/components/communication-tone-modal';
import { DueDateModal } from '@/components/due-date-modal';
import { SettingsRow } from '@/components/settings-row';
import { SettingsSwitch } from '@/components/settings-switch';
import {
  type CommunicationTone,
  getCommunicationToneOptions,
  isCommunicationTone,
} from '@/utils/communication-tone-options';
import { getDefaultDueDate } from '@/utils/due-date/get-default-due-date';
import { getWeeksFromDueDate } from '@/utils/due-date/get-weeks-from-due-date';

type ProfileSettingsSectionProps = {
  isLivingTogether: boolean;
  onLivingTogetherChange: (nextValue: boolean) => void;
  isFirstPregnancy: boolean;
  onFirstPregnancyChange: (nextValue: boolean) => void;
};

export const ProfileSettingsSection: FC<ProfileSettingsSectionProps> = ({
  isLivingTogether,
  onLivingTogetherChange,
  isFirstPregnancy,
  onFirstPregnancyChange,
}) => {
  const { t } = useTranslation();
  const closeToneModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [isDueDateModalVisible, setIsDueDateModalVisible] = useState(false);
  const [communicationTone, setCommunicationTone] = useState<CommunicationTone>('soft');
  const [isCommunicationToneModalVisible, setIsCommunicationToneModalVisible] = useState(false);
  const communicationToneOptions = getCommunicationToneOptions(t);
  const pregnancyWeeks = getWeeksFromDueDate(dueDate);
  const pregnancyWeeksLabel = `${pregnancyWeeks} ${t('settingsScreen.values.weeksForms.one')}`;

  const handleSelectCommunicationTone = (value: string) => {
    if (!isCommunicationTone(value)) {
      return;
    }

    setCommunicationTone(value);

    if (closeToneModalTimeoutRef.current) {
      clearTimeout(closeToneModalTimeoutRef.current);
    }

    closeToneModalTimeoutRef.current = setTimeout(() => {
      setIsCommunicationToneModalVisible(false);
    }, 35);
  };

  useEffect(
    () => () => {
      if (closeToneModalTimeoutRef.current) {
        clearTimeout(closeToneModalTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <>
      <Text className="mb-3 ml-1 font-semibold text-[16px] leading-[24px] text-[#8A828A]">
        {t('settingsScreen.sections.profile')}
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
          title={t('settingsScreen.rows.pregnancyTerm')}
          value={pregnancyWeeksLabel}
          withChevron
          withDivider
          onPress={() => setIsDueDateModalVisible(true)}
          leftIcon={(
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={27}
              color="#8FAFB4"
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.livingTogether')}
          withDivider
          rightControl={(
            <SettingsSwitch
              value={isLivingTogether}
              onValueChange={onLivingTogetherChange}
            />
          )}
          leftIcon={(
            <MaterialCommunityIcons
              name="home-heart"
              size={29}
              color="#8FB0BC"
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.firstPregnancy')}
          withDivider
          rightControl={(
            <SettingsSwitch
              value={isFirstPregnancy}
              onValueChange={onFirstPregnancyChange}
            />
          )}
          leftIcon={(
            <MaterialCommunityIcons
              name="heart"
              size={28}
              color="#E09AA0"
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.communicationStyle')}
          value={t(`settingsScreen.communicationTone.options.${communicationTone}.title`)}
          withChevron
          onPress={() => setIsCommunicationToneModalVisible(true)}
          leftIcon={(
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={29}
              color="#D8B178"
            />
          )}
        />
      </View>

      <CommunicationToneModal
        visible={isCommunicationToneModalVisible}
        title={t('settingsScreen.communicationTone.title')}
        options={communicationToneOptions}
        selectedValue={communicationTone}
        onClose={() => setIsCommunicationToneModalVisible(false)}
        onSelect={handleSelectCommunicationTone}
      />

      <DueDateModal
        visible={isDueDateModalVisible}
        selectedDate={dueDate}
        onClose={() => setIsDueDateModalVisible(false)}
        onConfirm={(nextDueDate) => {
          setDueDate(nextDueDate);
          setIsDueDateModalVisible(false);
        }}
      />
    </>
  );
};
