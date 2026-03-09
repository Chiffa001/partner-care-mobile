import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

type UseCollapsibleContentOptions = {
  enabled: boolean;
};

export const useCollapsibleContent = ({ enabled }: UseCollapsibleContentOptions) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const collapseProgress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!enabled) {
      collapseProgress.stopAnimation();
      collapseProgress.setValue(1);

      return;
    }

    Animated.timing(collapseProgress, {
      toValue: isCollapsed ? 0 : 1,
      duration: 260,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [enabled, collapseProgress, isCollapsed]);

  const handleContentLayout = useCallback((height: number) => {
    if (isCollapsed) {
      return;
    }

    if (height <= contentHeight + 1) {
      return;
    }

    setContentHeight(height);
  }, [contentHeight, isCollapsed]);

  const toggleCollapsed = useCallback(() => {
    if (!enabled) {
      return;
    }

    setIsCollapsed((previous) => !previous);
  }, [enabled]);

  const contentAnimatedStyle = useMemo(() => ({
    height: contentHeight > 0
      ? collapseProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
      })
      : undefined,
    opacity: collapseProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  }), [collapseProgress, contentHeight]);

  return {
    isCollapsed,
    toggleCollapsed,
    handleContentLayout,
    contentAnimatedStyle,
  };
};
