import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';

export type CommunicationToneOption = {
  value: string;
  title: string;
  description?: string;
};

type CommunicationToneModalProps = {
  visible: boolean;
  title: string;
  options: CommunicationToneOption[];
  selectedValue: string;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export const CommunicationToneModal: FC<CommunicationToneModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onClose,
  onSelect,
}) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}
  >
    <Pressable
      className="flex-1 items-center justify-center bg-black/30 px-6"
      onPress={onClose}
    >
      <Pressable
        className="w-full max-w-[440px] overflow-hidden rounded-[24px] bg-[#F8F3F3]"
        onPress={(event) => event.stopPropagation()}
      >
        <View className="border-b border-[#DED7D8] bg-[#F2E6E2] px-6 py-3.5">
          <Text className="font-semibold text-[18px] leading-[24px] text-[#675F67]">
            {title}
          </Text>
        </View>

        <View className="px-4 py-0.5">
          {options.map(({ value, title: optionTitle, description }, index) => {
            const isSelected = selectedValue === value;
            const hasDivider = index < options.length - 1;

            return (
              <View key={value}>
                <AnimatedPressable
                  className="flex-row items-center py-2"
                  onPress={() => onSelect(value)}
                  activeScale={0.99}
                  activeOpacity={0.95}
                >
                  <View className="mr-3">
                    {isSelected ? (
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-[#E09AA0]">
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color="#FFFFFF"
                        />
                      </View>
                    ) : (
                      <View className="h-8 w-8 rounded-full border-2 border-[#BDB3B7]" />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="font-sans text-[17px] leading-[22px] text-[#675F67]">
                      {optionTitle}
                    </Text>
                    {description ? (
                      <Text className="mt-0.5 font-sans text-[15px] leading-[20px] text-[#8A828A]">
                        {description}
                      </Text>
                    ) : null}
                  </View>

                  {isSelected ? (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color="#E09AA0"
                    />
                  ) : null}
                </AnimatedPressable>
                {hasDivider ? (
                  <View className="h-px bg-[#DED7D8]" />
                ) : null}
              </View>
            );
          })}
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);
