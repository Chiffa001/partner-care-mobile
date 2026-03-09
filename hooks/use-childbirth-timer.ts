import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

import {
  selectAverageIntervalSec,
  selectContractions,
  selectCurrentDurationSec,
  selectHasTimerData,
  selectIsContractionActive,
  selectLatestIntervalSec,
  selectResetTimer,
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
  const contractions = useChildbirthTimerStore(selectContractions);
  const onPress = useChildbirthTimerStore(selectToggleTimer);
  const onReset = useChildbirthTimerStore(selectResetTimer);
  const tickNow = useChildbirthTimerStore(selectTickNow);

  useFocusEffect(useCallback(() => {
    if (hasTimerData) {
      tickNow();
    }
  }, [hasTimerData, tickNow]));

  useEffect(() => {
    if (!hasTimerData) {
      return undefined;
    }

    tickNow();

    const intervalId = setInterval(() => {
      tickNow();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasTimerData, tickNow]);

  return {
    isActive,
    currentDurationSec,
    latestIntervalSec,
    averageIntervalSec,
    hasTimerData,
    contractions,
    onPress,
    onReset,
  };
};
