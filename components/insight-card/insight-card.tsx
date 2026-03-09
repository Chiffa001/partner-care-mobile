import { Ionicons } from '@expo/vector-icons';
import {
  type FC,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ImageSourcePropType } from 'react-native';
import {
  Animated,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import { TitledCard } from '@/components/titled-card';
import { useCollapsibleContent } from '@/hooks/use-collapsible-content';
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
  collapsible?: boolean;
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
  collapsible = true,
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
  const headerPressProgress = useRef(new Animated.Value(0)).current;
  const normalizedDescriptionWidthPercent = useMemo(
    () => parseWidthPercent(descriptionMaxWidthPercent),
    [descriptionMaxWidthPercent],
  );
  const hasItems = Array.isArray(items) && items.length > 0;
  const hasDescription = Boolean(description);
  const hasImage = Boolean(imageSource);
  const canCollapse = collapsible && !isLoading && (hasDescription || hasItems);
  const {
    isCollapsed,
    toggleCollapsed,
    handleContentLayout,
    contentAnimatedStyle,
  } = useCollapsibleContent({ enabled: canCollapse });
  const skeletonColor = '#E8E1DE';
  const skeletonSecondaryColor = '#EDE7E4';
  const animateHeaderPressIn = () => {
    if (!canCollapse) {
      return;
    }

    Animated.timing(headerPressProgress, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };
  const animateHeaderPressOut = () => {
    if (!canCollapse) {
      return;
    }

    Animated.timing(headerPressProgress, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const headerContent: ReactNode = isLoading ? (
    <View className="px-5 py-2.5">
      <View
        className="h-7 rounded-full"
        style={{ width: '58%', backgroundColor: skeletonColor }}
      />
    </View>
  ) : (
    <Pressable
      className="w-full flex-row items-center justify-between px-5 py-2.5"
      disabled={!canCollapse}
      onPress={toggleCollapsed}
      onPressIn={animateHeaderPressIn}
      onPressOut={animateHeaderPressOut}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: '#000000',
          opacity: headerPressProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.06],
          }),
        }}
      />
      <Text
        className="mr-5 flex-1 font-semibold text-[22px] leading-[28px]"
        style={{ color: titleColor }}
      >
        {title}
      </Text>
      {canCollapse ? (
        <Ionicons
          name={isCollapsed ? 'chevron-down' : 'chevron-up'}
          size={18}
          color="#8F757B"
        />
      ) : null}
    </Pressable>
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
            <View className="flex-row items-center py-2">
              <View
                className="mr-3 h-6 w-6 rounded-full"
                style={{ backgroundColor: skeletonSecondaryColor }}
              />
              <View
                className="h-4.5 rounded-full"
                style={{
                  width: index === 1 ? '62%' : '74%',
                  backgroundColor: skeletonColor,
                }}
              />
            </View>
            {index < 2 ? (
              <View className="my-1 h-px bg-[#D9D2CF]" />
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
          className="font-sans text-[16px] leading-[24px] text-paragraphs-primary"
          style={{
            maxWidth: descriptionAreaWidth && normalizedDescriptionWidthPercent < 100
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
              <View className="flex-row items-center py-2">
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
                <Text
                  className="flex-1 font-sans text-[16px] leading-[20px] text-paragraphs-primary"
                  style={{ textAlignVertical: 'center', includeFontPadding: false }}
                >
                  {text}
                </Text>
              </View>
              {showDivider ? (
                <View className="my-1 h-px bg-[#D9D2CF]" />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <TitledCard
      headerContent={headerContent}
      headerBackgroundColor={headerBackgroundColor}
      bodyBackgroundColor={bodyBackgroundColor}
      headerClassName="p-0"
      outerClassName="rounded-[22px]"
      outerStyle={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
      }}
    >
      {canCollapse ? (
        <Animated.View
          style={{
            overflow: 'hidden',
            ...contentAnimatedStyle,
          }}
        >
          <View onLayout={(event) => handleContentLayout(event.nativeEvent.layout.height)}>
            {descriptionSection}
            {itemsSection}
          </View>
        </Animated.View>
      ) : (
        <>
          {descriptionSection}
          {itemsSection}
        </>
      )}
    </TitledCard>
  );
};
