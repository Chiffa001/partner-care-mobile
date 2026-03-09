import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TextStyle } from 'react-native';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { TitledCard } from '@/components/titled-card';

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
    <View className="mb-2 flex-row border-b border-[#E5DADD] pb-2">
      <Text className="w-[54px] font-semibold text-[12px] leading-[18px] text-[#9C9296]">
        #
      </Text>
      <Text
        className="flex-1 text-right font-semibold text-[12px] leading-[18px] text-[#9C9296]"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.78}
      >
        {t('childbirthScreen.contractions.durationLabel')}
      </Text>
      <Text
        className="ml-2 flex-1 text-right font-semibold text-[12px] leading-[18px] text-[#9C9296]"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.78}
      >
        {t('childbirthScreen.contractions.intervalLabel')}
      </Text>
      <Text className="ml-2 flex-1 text-right font-semibold text-[12px] leading-[18px] text-[#9C9296]">
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
          className="absolute inset-0 bg-black/30"
          onPress={onClose}
        />
        <TitledCard
          headerContent={(
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-[18px] leading-[24px] text-[#675F67]">
                {t('childbirthScreen.contractions.historyTitle')}
              </Text>
              <Pressable
                className="h-8 w-8 items-center justify-center rounded-full bg-[#EFDCD5]"
                onPress={onClose}
                hitSlop={8}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="#8F757B"
                />
              </Pressable>
            </View>
          )}
          headerBackgroundColor="#F2E6E2"
          bodyBackgroundColor="#F8F3F3"
          outerClassName="w-full max-w-[440px]"
          innerClassName="rounded-[24px] border border-[#DED7D8]"
          headerClassName="border-b border-[#DED7D8] px-6 py-3.5"
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
                      className="flex-row items-center border-b border-[#EFE5E8] py-2.5"
                    >
                      <Text className="w-[54px] font-sans text-[13px] leading-[18px] text-[#8F757B]">
                        {item.index}
                      </Text>
                      <Text
                        className="flex-1 text-right font-semibold text-[15px] leading-[20px] text-[#8F757B]"
                        style={timerValueStyle}
                      >
                        {item.durationText}
                      </Text>
                      <Text
                        className="ml-3 flex-1 text-right font-semibold text-[15px] leading-[20px] text-[#8F757B]"
                        style={timerValueStyle}
                      >
                        {item.intervalText}
                      </Text>
                      <Text
                        className="ml-3 flex-1 text-right font-semibold text-[15px] leading-[20px] text-[#8F757B]"
                        style={timerValueStyle}
                      >
                        {item.averageText}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <Text className="py-6 text-center font-sans text-[14px] leading-[20px] text-[#8F757B]">
                {t('childbirthScreen.contractions.historyEmpty')}
              </Text>
            )}
          </View>
        </TitledCard>
      </View>
    </Modal>
  );
};
