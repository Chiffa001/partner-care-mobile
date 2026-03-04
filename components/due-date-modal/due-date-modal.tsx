import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { Button } from '@/components/button';
import { buildCalendarDays } from '@/utils/due-date/build-calendar-days';
import { getWeekdayNames } from '@/utils/due-date/get-weekday-names';
import { isSameDay } from '@/utils/due-date/is-same-day';
import { startOfDay } from '@/utils/due-date/start-of-day';

type DueDateModalProps = {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onConfirm: (date: Date) => void;
};

export const DueDateModal: FC<DueDateModalProps> = ({
  visible,
  selectedDate,
  onClose,
  onConfirm,
}) => {
  const { t, i18n } = useTranslation();
  const minDate = startOfDay(new Date());
  const [displayedMonth, setDisplayedMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );
  const [draftDate, setDraftDate] = useState(() => startOfDay(selectedDate));

  const monthTitle = useMemo(
    () => new Intl.DateTimeFormat(i18n.language, { month: 'long', year: 'numeric' }).format(displayedMonth),
    [displayedMonth, i18n.language],
  );
  const weekdayNames = useMemo(() => getWeekdayNames(i18n.language), [i18n.language]);
  const calendarDays = useMemo(() => buildCalendarDays(displayedMonth), [displayedMonth]);

  const handleOpen = () => {
    setDraftDate(startOfDay(selectedDate));
    setDisplayedMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onShow={handleOpen}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/30 px-5"
        onPress={onClose}
      >
        <Pressable
          className="w-full max-w-[440px] overflow-hidden rounded-[24px] bg-[#F8F3F3]"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="border-b border-[#DED7D8] bg-[#F2E6E2] px-6 py-3.5">
            <Text className="font-semibold text-[18px] leading-[24px] text-[#675F67]">
              {t('settingsScreen.dueDate.title')}
            </Text>
          </View>

          <View className="px-4 py-3">
            <View className="mb-2 flex-row items-center justify-between">
              <AnimatedPressable
                className="h-9 w-9 items-center justify-center rounded-full bg-[#EFE3DF]"
                onPress={() => {
                  setDisplayedMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1));
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={18}
                  color="#8A828A"
                />
              </AnimatedPressable>

              <Text className="font-semibold text-[16px] leading-[22px] text-[#675F67]">
                {monthTitle}
              </Text>

              <AnimatedPressable
                className="h-9 w-9 items-center justify-center rounded-full bg-[#EFE3DF]"
                onPress={() => {
                  setDisplayedMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1));
                }}
              >
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#8A828A"
                />
              </AnimatedPressable>
            </View>

            <View className="mb-1 flex-row">
              {weekdayNames.map((dayName) => (
                <Text
                  key={dayName}
                  className="flex-1 text-center font-semibold text-[12px] leading-[18px] text-[#9C9296]"
                >
                  {dayName}
                </Text>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {calendarDays.map(({ date, isCurrentMonth }) => {
                const isSelected = isSameDay(date, draftDate);
                const isPastDate = date < minDate;
                const dayTextColor = isSelected
                  ? '#FFFFFF'
                  : isCurrentMonth
                    ? '#675F67'
                    : '#BDB3B7';

                return (
                  <AnimatedPressable
                    key={date.toISOString()}
                    className="items-center py-1.5"
                    style={{ width: '14.2857%' }}
                    onPress={() => {
                      if (isPastDate) {
                        return;
                      }

                      setDraftDate(startOfDay(date));
                    }}
                    disabled={isPastDate}
                    activeScale={0.94}
                    activeOpacity={isPastDate ? 1 : 0.85}
                  >
                    <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
                      {isSelected ? (
                        <View
                          style={{
                            position: 'absolute',
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            backgroundColor: '#E09AA0',
                          }}
                        />
                      ) : null}
                      <Text
                        className="font-sans text-[14px] leading-[20px]"
                        style={{ color: isPastDate ? '#CFC7CB' : dayTextColor }}
                      >
                        {date.getDate()}
                      </Text>
                    </View>
                  </AnimatedPressable>
                );
              })}
            </View>

            <View className="mt-3 flex-row justify-end">
              <Button
                className="mr-2 w-auto rounded-full bg-transparent px-4 py-[8px] shadow-none"
                fullWidth={false}
                onPress={onClose}
              >
                <Text className="font-semibold text-[14px] leading-[20px] text-[#8A828A]">
                  {t('settingsScreen.dueDate.cancel')}
                </Text>
              </Button>
              <Button
                className="w-auto rounded-full bg-[#E09AA0] px-4 py-[8px] shadow-none"
                fullWidth={false}
                onPress={() => {
                  if (draftDate < minDate) {
                    return;
                  }

                  onConfirm(draftDate);
                }}
              >
                <Text className="font-semibold text-[14px] leading-[20px] text-white">
                  {t('settingsScreen.dueDate.confirm')}
                </Text>
              </Button>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
