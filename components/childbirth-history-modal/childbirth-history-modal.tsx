import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TextStyle } from 'react-native';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { TitledCard } from '@/components/titled-card';
import { Colors } from '@/constants/colors';

type HistoryRow = {
  key: string;
  index: number;
  durationText: string;
  intervalText: string;
  averageText: string;
};

type ChildbirthHistoryModalProps = {
  visible: boolean;
  rows: HistoryRow[];
  onClose: () => void;
};

const timerValueStyle: TextStyle = {
  fontVariant: ['tabular-nums'],
  fontFamily: 'Nunito-SemiBold',
};

export const ChildbirthHistoryModal: FC<ChildbirthHistoryModalProps> = ({
  visible,
  rows,
  onClose,
}) => {
  const { t } = useTranslation();

  const header = useMemo(() => (
    <View
      className="mb-2 flex-row border-b pb-2"
      style={{ borderBottomColor: Colors.borderHistoryHeader }}
    >
      <Text
        className="w-[54px] font-semibold text-[12px] leading-[18px]"
        style={{ color: Colors.textTertiary }}
      >
        #
      </Text>
      <Text
        className="flex-1 text-right font-semibold text-[12px] leading-[18px]"
        style={{ color: Colors.textTertiary }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.78}
      >
        {t('childbirthScreen.contractions.durationLabel')}
      </Text>
      <Text
        className="ml-2 flex-1 text-right font-semibold text-[12px] leading-[18px]"
        style={{ color: Colors.textTertiary }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.78}
      >
        {t('childbirthScreen.contractions.intervalLabel')}
      </Text>
      <Text
        className="ml-2 flex-1 text-right font-semibold text-[12px] leading-[18px]"
        style={{ color: Colors.textTertiary }}
      >
        {t('childbirthScreen.contractions.averageIntervalLabel')}
      </Text>
    </View>
  ), [t]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center px-5">
        <Pressable
          className="absolute inset-0"
          style={{ backgroundColor: Colors.overlay }}
          onPress={onClose}
        />
        <TitledCard
          headerContent={(
            <View className="flex-row items-center justify-between">
              <Text
                className="font-semibold text-[18px] leading-[24px]"
                style={{ color: Colors.textDark }}
              >
                {t('childbirthScreen.contractions.historyTitle')}
              </Text>
              <Pressable
                className="h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: Colors.bgButtonMuted }}
                onPress={onClose}
                hitSlop={8}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
          )}
          headerBackgroundColor={Colors.bgModalHeader}
          bodyBackgroundColor={Colors.bgSettings}
          outerClassName="w-full max-w-[440px]"
          innerClassName="rounded-[24px] border"
          innerStyle={{ borderColor: Colors.borderModal }}
          headerClassName="border-b px-6 py-3.5"
          headerStyle={{ borderBottomColor: Colors.borderModal }}
        >
          <View className="px-4 py-3">
            {rows.length ? (
              <View className="h-[340px]">
                {header}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  {rows.map((item) => (
                    <View
                      key={item.key}
                      className="flex-row items-center border-b py-2.5"
                      style={{ borderBottomColor: Colors.borderHistoryRow }}
                    >
                      <Text
                        className="w-[54px] font-sans text-[13px] leading-[18px]"
                        style={{ color: Colors.textPrimary }}
                      >
                        {item.index}
                      </Text>
                      <Text
                        className="flex-1 text-right font-semibold text-[15px] leading-[20px]"
                        style={[timerValueStyle, { color: Colors.textPrimary }]}
                      >
                        {item.durationText}
                      </Text>
                      <Text
                        className="ml-3 flex-1 text-right font-semibold text-[15px] leading-[20px]"
                        style={[timerValueStyle, { color: Colors.textPrimary }]}
                      >
                        {item.intervalText}
                      </Text>
                      <Text
                        className="ml-3 flex-1 text-right font-semibold text-[15px] leading-[20px]"
                        style={[timerValueStyle, { color: Colors.textPrimary }]}
                      >
                        {item.averageText}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <Text
                className="py-6 text-center font-sans text-[14px] leading-[20px]"
                style={{ color: Colors.textPrimary }}
              >
                {t('childbirthScreen.contractions.historyEmpty')}
              </Text>
            )}
          </View>
        </TitledCard>
      </View>
    </Modal>
  );
};
