import { Ionicons } from '@expo/vector-icons';
import { type FC, type ReactNode, useMemo, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, Text, View } from 'react-native';

import { parseWidthPercent } from '@/utils/parse-width-percent';

export type InsightItem = {
  text: string;
  type: 'positive' | 'negative';
};

export type InsightCardProps = {
  title: string;
  titleColor: string;
  headerBackgroundColor: string;
  bodyBackgroundColor: string;
  isLoading?: boolean;
  description?: string;
  items?: InsightItem[];
  imageSource?: ImageSourcePropType;
  imageScale?: number;
  imageOffsetY?: number;
  imageOffsetX?: number;
  descriptionMaxWidthPercent?: number | string;
};

export const InsightCard: FC<InsightCardProps> = ({
  title,
  titleColor,
  headerBackgroundColor,
  bodyBackgroundColor,
  isLoading = false,
  description,
  items,
  imageSource,
  imageScale = 1,
  imageOffsetY = 0,
  imageOffsetX = 0,
  descriptionMaxWidthPercent = 63,
}) => {
  const [descriptionAreaWidth, setDescriptionAreaWidth] = useState(0);
  const normalizedDescriptionWidthPercent = useMemo(
    () => parseWidthPercent(descriptionMaxWidthPercent),
    [descriptionMaxWidthPercent],
  );
  const hasItems = Array.isArray(items) && items.length > 0;
  const hasDescription = Boolean(description);
  const hasImage = Boolean(imageSource);
  const skeletonColor = '#E8E1DE';
  const skeletonSecondaryColor = '#EDE7E4';
  const headerContent: ReactNode = isLoading ? (
    <View
      className="h-7 rounded-full"
      style={{ width: '58%', backgroundColor: skeletonColor }}
    />
  ) : (
    <Text
      className="font-semibold text-[22px] leading-[28px]"
      style={{ color: titleColor }}
    >
      {title}
    </Text>
  );
  let descriptionSection: ReactNode = null;
  let itemsSection: ReactNode = null;

  if (isLoading && hasDescription) {
    descriptionSection = (
      <View className="min-h-[148px] px-5 py-4">
        <View
          className="mb-3 h-5 rounded-full"
          style={{ width: '66%', backgroundColor: skeletonColor }}
        />
        <View
          className="mb-3 h-5 rounded-full"
          style={{ width: '52%', backgroundColor: skeletonColor }}
        />
        <View
          className="h-5 rounded-full"
          style={{ width: '60%', backgroundColor: skeletonColor }}
        />
      </View>
    );
  }

  if (isLoading && hasItems) {
    itemsSection = (
      <View className="px-5 py-1">
        {[0, 1, 2].map((index) => (
          <View key={`skeleton-item-${index}`}>
            <View className="flex-row items-center py-2.5">
              <View
                className="mr-3 h-6 w-6 rounded-full"
                style={{ backgroundColor: skeletonSecondaryColor }}
              />
              <View
                className="h-5 rounded-full"
                style={{
                  width: index === 1 ? '62%' : '74%',
                  backgroundColor: skeletonColor,
                }}
              />
            </View>
            {index < 2 ? (
              <View className="h-px bg-[#D9D2CF]" />
            ) : null}
          </View>
        ))}
      </View>
    );
  }

  if (isLoading && !hasDescription && !hasItems) {
    descriptionSection = (
      <View className="min-h-[148px] px-5 py-4">
        <View
          className="mb-3 h-5 rounded-full"
          style={{ width: '66%', backgroundColor: skeletonColor }}
        />
        <View
          className="h-5 rounded-full"
          style={{ width: '52%', backgroundColor: skeletonColor }}
        />
      </View>
    );
  }

  if (!isLoading && hasDescription) {
    descriptionSection = (
      <View
        className="relative min-h-[148px] px-5 py-4"
        onLayout={(event) => setDescriptionAreaWidth(event.nativeEvent.layout.width)}
      >
        {hasImage ? (
          <Image
            source={imageSource}
            resizeMode="contain"
            className="absolute -right-1 top-1"
            style={{
              width: 178 * imageScale,
              height: 178 * imageScale,
              top: 4 + imageOffsetY,
              right: -4 + imageOffsetX,
            }}
          />
        ) : null}
        <Text
          className="pr-2 font-sans text-[16px] leading-[24px] text-paragraphs-primary"
          style={{
            maxWidth: descriptionAreaWidth
              ? (descriptionAreaWidth * normalizedDescriptionWidthPercent) / 100
              : undefined,
          }}
        >
          {description}
        </Text>
      </View>
    );
  }

  if (!isLoading && hasItems) {
    itemsSection = (
      <View className="px-5 py-1">
        {items.map(({ text, type }, index) => {
          const isNegative = type === 'negative';
          const iconName = isNegative ? 'close' : 'checkmark';
          const iconBgColor = isNegative ? '#D86B66' : '#7AAF68';
          const showDivider = index < items.length - 1;

          return (
            <View key={`${type}-${text}-${index}`}>
              <View className="flex-row items-center py-2.5">
                <View
                  className="mr-3 h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: iconBgColor }}
                >
                  <Ionicons
                    name={iconName}
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
                <Text className="flex-1 font-sans text-[16px] leading-[24px] text-paragraphs-primary">
                  {text}
                </Text>
              </View>
              {showDivider ? (
                <View className="h-px bg-[#D9D2CF]" />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View
      className="rounded-[22px]"
      style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
      }}
    >
      <View
        className="overflow-hidden rounded-[22px]"
        style={{ backgroundColor: bodyBackgroundColor }}
      >
        <View
          className="px-5 py-2.5"
          style={{ backgroundColor: headerBackgroundColor }}
        >
          {headerContent}
        </View>

        {descriptionSection}
        {itemsSection}
      </View>
    </View>
  );
};
