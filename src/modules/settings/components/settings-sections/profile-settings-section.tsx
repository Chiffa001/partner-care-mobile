import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { CommunicationToneModal } from '@/modules/settings/components/communication-tone-modal';
import { DueDateModal } from '@/modules/settings/components/due-date-modal';
import { SettingsRow } from '@/modules/settings/components/settings-row';
import { SettingsSwitch } from '@/modules/settings/components/settings-switch';
import {
  type CommunicationTone,
  getCommunicationToneOptions,
  isCommunicationTone,
} from '@/modules/settings/lib/communication-tone-options';
import { getDefaultDueDate } from '@/modules/settings/lib/due-date/get-default-due-date';
import { getWeeksFromDueDate } from '@/modules/settings/lib/due-date/get-weeks-from-due-date';
import { Colors } from '@/shared/config/colors';

type ProfileSettingsSectionProps = {
  isLivingTogether: boolean;
  onLivingTogetherChange: (nextValue: boolean) => void;
  isFirstPregnancy: boolean;
  onFirstPregnancyChange: (nextValue: boolean) => void;
};

type AppLanguage = 'ru' | 'en' | 'pl' | 'es';
const supportedLanguages: AppLanguage[] = ['ru', 'en', 'pl', 'es'];

export const ProfileSettingsSection: FC<ProfileSettingsSectionProps> = ({
  isLivingTogether,
  onLivingTogetherChange,
  isFirstPregnancy,
  onFirstPregnancyChange,
}) => {
  const { t, i18n } = useTranslation();
  const closeToneModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [isDueDateModalVisible, setIsDueDateModalVisible] = useState(false);
  const [communicationTone, setCommunicationTone] =
    useState<CommunicationTone>('soft');
  const [isCommunicationToneModalVisible, setIsCommunicationToneModalVisible] =
    useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const communicationToneOptions = getCommunicationToneOptions(t);
  const languageOptions = useMemo(
    () =>
      supportedLanguages.map((language) => ({
        value: language,
        title: t(`settingsScreen.language.options.${language}`),
      })),
    [t],
  );
  const pregnancyWeeks = getWeeksFromDueDate(dueDate);
  const pregnancyWeeksLabel = `${pregnancyWeeks} ${t('settingsScreen.values.weeksForms.one')}`;
  const currentLanguage = supportedLanguages.includes(
    i18n.resolvedLanguage as AppLanguage,
  )
    ? (i18n.resolvedLanguage as AppLanguage)
    : 'ru';

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

  const handleSelectLanguage = (value: string) => {
    if (!supportedLanguages.includes(value as AppLanguage)) {
      return;
    }

    void i18n.changeLanguage(value);
    setIsLanguageModalVisible(false);
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
      <Text
        className="mb-3 ml-1 font-semibold text-[16px] leading-[24px]"
        style={{ color: Colors.textSecondary }}
      >
        {t('settingsScreen.sections.profile')}
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
          title={t('settingsScreen.rows.pregnancyTerm')}
          value={pregnancyWeeksLabel}
          withChevron
          withDivider
          onPress={() => setIsDueDateModalVisible(true)}
          leftIcon={(
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={27}
              color={Colors.iconMint}
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.livingTogether')}
          withDivider
          rightControl={(
            <SettingsSwitch
              testID="switch-living-together"
              value={isLivingTogether}
              onValueChange={onLivingTogetherChange}
            />
          )}
          leftIcon={(
            <MaterialCommunityIcons
              name="home-heart"
              size={29}
              color={Colors.iconSky}
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.firstPregnancy')}
          withDivider
          rightControl={(
            <SettingsSwitch
              testID="switch-first-pregnancy"
              value={isFirstPregnancy}
              onValueChange={onFirstPregnancyChange}
            />
          )}
          leftIcon={(
            <MaterialCommunityIcons
              name="heart"
              size={28}
              color={Colors.accentMuted}
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.communicationStyle')}
          value={t(
            `settingsScreen.communicationTone.options.${communicationTone}.title`,
          )}
          withDivider
          withChevron
          onPress={() => setIsCommunicationToneModalVisible(true)}
          leftIcon={(
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={29}
              color={Colors.iconWarm}
            />
          )}
        />
        <SettingsRow
          title={t('settingsScreen.rows.language')}
          value={t(`settingsScreen.language.options.${currentLanguage}`)}
          withChevron
          onPress={() => setIsLanguageModalVisible(true)}
          leftIcon={(
            <MaterialCommunityIcons
              name="translate"
              size={28}
              color={Colors.iconMint}
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

      <CommunicationToneModal
        visible={isLanguageModalVisible}
        title={t('settingsScreen.language.title')}
        options={languageOptions}
        selectedValue={currentLanguage}
        onClose={() => setIsLanguageModalVisible(false)}
        onSelect={handleSelectLanguage}
      />
    </>
  );
};
