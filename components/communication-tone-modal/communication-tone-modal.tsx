import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { Colors } from '@/constants/colors';

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
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: Colors.overlay }}
      onPress={onClose}
    >
      <Pressable
        className="w-full max-w-[440px] overflow-hidden rounded-[24px]"
        style={{ backgroundColor: Colors.bgSettings }}
        onPress={(event) => event.stopPropagation()}
      >
        <View
          className="border-b px-6 py-3.5"
          style={{ borderBottomColor: Colors.borderModal, backgroundColor: Colors.bgModalHeader }}
        >
          <Text
            className="font-semibold text-[18px] leading-[24px]"
            style={{ color: Colors.textDark }}
          >
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
                      <View
                        className="h-8 w-8 items-center justify-center rounded-full"
                        style={{ backgroundColor: Colors.accentMuted }}
                      >
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={Colors.white}
                        />
                      </View>
                    ) : (
                      <View
                        className="h-8 w-8 rounded-full border-2"
                        style={{ borderColor: Colors.borderSubtle }}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text
                      className="font-sans text-[17px] leading-[22px]"
                      style={{ color: Colors.textDark }}
                    >
                      {optionTitle}
                    </Text>
                    {description ? (
                      <Text
                        className="mt-0.5 font-sans text-[15px] leading-[20px]"
                        style={{ color: Colors.textSecondary }}
                      >
                        {description}
                      </Text>
                    ) : null}
                  </View>

                  {isSelected ? (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={Colors.accentMuted}
                    />
                  ) : null}
                </AnimatedPressable>
                {hasDivider ? (
                  <View
                    className="h-px"
                    style={{ backgroundColor: Colors.borderModal }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);
