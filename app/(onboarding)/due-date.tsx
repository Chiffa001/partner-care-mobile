import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { DueDateModal } from '@/components/due-date-modal';
import { InfoScreenContainer } from '@/components/info-screen-container';
import { Subtitle } from '@/components/subtitle';
import { Title } from '@/components/title';
import { Colors } from '@/constants/colors';
import { ONBOARDING_STORAGE_KEY } from '@/constants/storage';
import { selectSetDueDate, useProfileStore } from '@/stores/profile-store';
import { getDefaultDueDate } from '@/utils/due-date/get-default-due-date';
import { getWeeksFromDueDate } from '@/utils/due-date/get-weeks-from-due-date';

const OnboardingDueDate = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const setDueDate = useProfileStore(selectSetDueDate);
  const [selectedDate, setSelectedDate] = useState(getDefaultDueDate);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(selectedDate);
  const weeks = getWeeksFromDueDate(selectedDate);

  const handleConfirm = () => {
    setDueDate(selectedDate.getTime());
    AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    router.replace('/(tabs)/today');
  };

  return (
    <InfoScreenContainer>
      <View className="gap-5">
        <Title>
          {t('onboardingDueDate.title')}
        </Title>
        <Subtitle
          size="xl"
          color="primary"
        >
          {t('onboardingDueDate.description')}
        </Subtitle>
      </View>

      <View className="mt-10 flex-1">
        <Pressable
          className="flex-row items-center justify-between rounded-2xl border px-4 py-4"
          style={{
            borderColor: Colors.borderCard,
            backgroundColor: Colors.bgCard,
          }}
          onPress={() => setIsModalVisible(true)}
        >
          <View>
            <Text
              className="font-sans text-[13px] leading-[18px]"
              style={{ color: Colors.textSubtle }}
            >
              {t('onboardingDueDate.fieldLabel')}
            </Text>
            <Text
              className="mt-1 font-medium font-sans text-[18px] leading-[24px]"
              style={{ color: Colors.textPrimary }}
            >
              {formattedDate}
            </Text>
          </View>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={Colors.textPrimary}
          />
        </Pressable>

        <Text
          className="mt-3 px-1 font-sans text-[15px] leading-[20px]"
          style={{ color: Colors.textSubtle }}
        >
          {t('todayScreen.weekLabel', { week: weeks })}
        </Text>
      </View>

      <View className="mt-auto w-[85%]">
        <Button
          onPress={handleConfirm}
          className="py-4"
        >
          {t('onboardingDueDate.button')}
        </Button>
      </View>

      <DueDateModal
        visible={isModalVisible}
        selectedDate={selectedDate}
        onClose={() => setIsModalVisible(false)}
        onConfirm={(nextDate) => {
          setSelectedDate(nextDate);
          setIsModalVisible(false);
        }}
      />
    </InfoScreenContainer>
  );
};

export default OnboardingDueDate;
