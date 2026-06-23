import { Ionicons } from '@expo/vector-icons';
import {
  type FC,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';

import { Colors } from '@/shared/config/colors';
import { useCollapsibleContent } from '@/shared/hooks/use-collapsible-content';
import { parseWidthPercent } from '@/shared/lib/parse-width-percent';
import { TitledCard } from '@/shared/ui/titled-card';

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
  const [contentHeight, setContentHeight] = useState(0);
  const headerPressProgress = useRef(new Animated.Value(0)).current;
  const chevronRotationProgress = useRef(new Animated.Value(0)).current;
  const collapseProgress = useRef(new Animated.Value(1)).current;
  const normalizedDescriptionWidthPercent = useMemo(
    () => parseWidthPercent(descriptionMaxWidthPercent),
    [descriptionMaxWidthPercent],
  );
  const hasItems = Array.isArray(items) && items.length > 0;
  const hasDescription = Boolean(description);
  const hasImage = Boolean(imageSource);
  const canCollapse = collapsible && !isLoading && (hasDescription || hasItems);
  const { isCollapsed, toggleCollapsed } = useCollapsibleContent({
    enabled: canCollapse,
  });
  const skeletonColor = Colors.skeletonPrimary;
  const skeletonSecondaryColor = Colors.skeletonSecondary;

  useEffect(() => {
    Animated.timing(chevronRotationProgress, {
      toValue: isCollapsed ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [chevronRotationProgress, isCollapsed]);

  useEffect(() => {
    Animated.timing(collapseProgress, {
      toValue: isCollapsed ? 0 : 1,
      duration: 220,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [collapseProgress, isCollapsed]);

  const chevronAnimatedStyle = {
    transform: [
      {
        rotate: chevronRotationProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const contentAnimatedStyle = {
    opacity: collapseProgress,
    transform: [
      {
        translateY: collapseProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [-6, 0],
        }),
      },
    ],
    height:
      contentHeight > 0
        ? collapseProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          })
        : undefined,
  };

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
          backgroundColor: Colors.black,
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
        <Animated.View style={chevronAnimatedStyle}>
          <Ionicons
            name="chevron-up"
            size={18}
            color={Colors.textPrimary}
          />
        </Animated.View>
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
              <View
                className="my-1 h-px"
                style={{ backgroundColor: Colors.borderDividerSoft }}
              />
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
        onLayout={(event) =>
          setDescriptionAreaWidth(event.nativeEvent.layout.width)
        }
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
            maxWidth:
              descriptionAreaWidth && normalizedDescriptionWidthPercent < 100
                ? (descriptionAreaWidth * normalizedDescriptionWidthPercent) /
                  100
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
          const iconBgColor = isNegative
            ? Colors.statusDanger
            : Colors.statusSuccess;
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
                    color={Colors.white}
                  />
                </View>
                <Text
                  className="flex-1 font-sans text-[16px] leading-[20px] text-paragraphs-primary"
                  style={{
                    textAlignVertical: 'center',
                    includeFontPadding: false,
                  }}
                >
                  {text}
                </Text>
              </View>
              {showDivider ? (
                <View
                  className="my-1 h-px"
                  style={{ backgroundColor: Colors.borderDividerSoft }}
                />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  const contentSection = (
    <View>
      {descriptionSection}
      {itemsSection}
    </View>
  );

  return (
    <TitledCard
      headerContent={headerContent}
      headerBackgroundColor={headerBackgroundColor}
      bodyBackgroundColor={bodyBackgroundColor}
      headerClassName="p-0"
      outerClassName="rounded-[22px]"
      outerStyle={{
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 4,
      }}
    >
      {canCollapse ? (
        <View className="relative">
          <View
            className="absolute left-0 right-0 opacity-0"
            pointerEvents="none"
            importantForAccessibility="no-hide-descendants"
            onLayout={(event) => {
              const nextHeight = event.nativeEvent.layout.height;

              if (Math.abs(nextHeight - contentHeight) <= 1) {
                return;
              }

              setContentHeight(nextHeight);
            }}
          >
            {contentSection}
          </View>

          <Animated.View
            style={[{ overflow: 'hidden' }, contentAnimatedStyle]}
            pointerEvents={isCollapsed ? 'none' : 'auto'}
          >
            {contentSection}
          </Animated.View>
        </View>
      ) : (
        contentSection
      )}
    </TitledCard>
  );
};
