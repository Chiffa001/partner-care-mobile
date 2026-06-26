import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  ImageSourcePropType,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { Animated, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import coupleImg from '@/assets/images/bg/onboarding-1.webp';
import hospitalImg from '@/assets/images/bg/onboarding-2.webp';
import calendarImg from '@/assets/images/bg/onboarding-3.webp';
import { OnboardingDots } from '@/modules/onboarding/components/onboarding-dots';
import { ONBOARDING_STORAGE_KEY } from '@/shared/config/storage';
import { Button } from '@/shared/ui/button';
import { ScreenContainer } from '@/shared/ui/screen-container';
import { Subtitle } from '@/shared/ui/subtitle';
import { Title } from '@/shared/ui/title';

const slides: { key: string; image: ImageSourcePropType }[] = [
  { key: '1', image: coupleImg },
  { key: '2', image: hospitalImg },
  { key: '3', image: calendarImg },
];

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const widthRef = useRef(0);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const isLast = index === slides.length - 1;

  useEffect(() => {
    const id = scrollX.addListener(({ value }) => {
      const pageWidth = widthRef.current;

      if (pageWidth > 0) {
        const next = Math.round(value / pageWidth);
        setIndex((prev) => (prev === next ? prev : next));
      }
    });

    return () => scrollX.removeListener(id);
  }, [scrollX]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.width;
    widthRef.current = next;
    setWidth(next);
  };

  const handleNext = () => {
    if (!isLast) {
      scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });

      return;
    }

    AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    router.replace('/(tabs)/today');
  };

  return (
    <ScreenContainer
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View
        className="h-full w-full flex-col pb-12 pt-16"
        onLayout={handleLayout}
      >
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          className="flex-1"
        >
          {slides.map((slide, slideIndex) => (
            <View
              key={slide.key}
              style={{ width }}
              className="h-full flex-col px-6"
            >
              <View className="h-[160px] justify-center gap-4">
                <Title>
                  {t(`onboarding${slideIndex + 1}.title`)}
                </Title>
                <Subtitle
                  size="xl"
                  color="primary"
                >
                  {t(`onboarding${slideIndex + 1}.description`)}
                </Subtitle>
              </View>
              <View className="my-5 w-full flex-1 overflow-hidden rounded-3xl">
                <Image
                  source={slide.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <OnboardingDots
          scrollX={scrollX}
          count={slides.length}
          itemWidth={width}
          className="my-6"
        />

        <View className="w-full items-center px-6">
          <Button
            onPress={handleNext}
            className="w-[85%] py-4"
          >
            {t(`onboarding${index + 1}.button`)}
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default OnboardingScreen;
