import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { CommunicationToneModal } from '@/components/communication-tone-modal';
import { DueDateModal } from '@/components/due-date-modal';
import { SettingsRow } from '@/components/settings-row';
import { SettingsSwitch } from '@/components/settings-switch';
import { Colors } from '@/constants/colors';
import {
  selectCommunicationTone,
  selectDueDate,
  selectIsFirstPregnancy,
  selectIsLivingTogether,
  selectSetCommunicationTone,
  selectSetDueDate,
  selectSetFirstPregnancy,
  selectSetLivingTogether,
  useProfileStore,
} from '@/stores/profile-store';
import {
  getCommunicationToneOptions,
  isCommunicationTone,
} from '@/utils/communication-tone-options';
import { getDefaultDueDate } from '@/utils/due-date/get-default-due-date';
import { getWeeksFromDueDate } from '@/utils/due-date/get-weeks-from-due-date';

type AppLanguage = 'ru' | 'en' | 'pl' | 'es';
const supportedLanguages: AppLanguage[] = ['ru', 'en', 'pl', 'es'];

export const ProfileSettingsSection: FC = () => {
  const { t, i18n } = useTranslation();
  const closeToneModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const storedDueDate = useProfileStore(selectDueDate);
  const setStoredDueDate = useProfileStore(selectSetDueDate);
  const isLivingTogether = useProfileStore(selectIsLivingTogether);
  const setLivingTogether = useProfileStore(selectSetLivingTogether);
  const isFirstPregnancy = useProfileStore(selectIsFirstPregnancy);
  const setFirstPregnancy = useProfileStore(selectSetFirstPregnancy);
  const communicationTone = useProfileStore(selectCommunicationTone);
  const setCommunicationTone = useProfileStore(selectSetCommunicationTone);
  const dueDate = useMemo(
    () =>
      storedDueDate === null ? getDefaultDueDate() : new Date(storedDueDate),
    [storedDueDate],
  );
  const [isDueDateModalVisible, setIsDueDateModalVisible] = useState(false);
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
              onValueChange={setLivingTogether}
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
              onValueChange={setFirstPregnancy}
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
          setStoredDueDate(nextDueDate.getTime());
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
