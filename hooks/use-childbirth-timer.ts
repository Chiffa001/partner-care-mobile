import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

import {
  selectAverageIntervalSec,
  selectContractions,
  selectCurrentDurationSec,
  selectHasTimerData,
  selectIsContractionActive,
  selectIsTimerPaused,
  selectLatestIntervalSec,
  selectPauseTimer,
  selectResetTimer,
  selectStartAfterPause,
  selectTickNow,
  selectToggleTimer,
  useChildbirthTimerStore,
} from '@/stores/childbirth-timer-store';

export const useChildbirthTimer = () => {
  const isActive = useChildbirthTimerStore(selectIsContractionActive);
  const currentDurationSec = useChildbirthTimerStore(selectCurrentDurationSec);
  const latestIntervalSec = useChildbirthTimerStore(selectLatestIntervalSec);
  const averageIntervalSec = useChildbirthTimerStore(selectAverageIntervalSec);
  const hasTimerData = useChildbirthTimerStore(selectHasTimerData);
  const isPaused = useChildbirthTimerStore(selectIsTimerPaused);
  const contractions = useChildbirthTimerStore(selectContractions);
  const onPress = useChildbirthTimerStore(selectToggleTimer);
  const onReset = useChildbirthTimerStore(selectResetTimer);
  const onPause = useChildbirthTimerStore(selectPauseTimer);
  const onStartAfterPause = useChildbirthTimerStore(selectStartAfterPause);
  const tickNow = useChildbirthTimerStore(selectTickNow);

  useFocusEffect(useCallback(() => {
    if (hasTimerData && !isPaused) {
      tickNow();
    }
  }, [hasTimerData, isPaused, tickNow]));

  useEffect(() => {
    if (!hasTimerData || isPaused) {
      return undefined;
    }

    tickNow();

    const intervalId = setInterval(() => {
      tickNow();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasTimerData, isPaused, tickNow]);

  return {
    isActive,
    isPaused,
    currentDurationSec,
    latestIntervalSec,
    averageIntervalSec,
    hasTimerData,
    contractions,
    onPress,
    onReset,
    onPause,
    onStartAfterPause,
  };
};
