import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';

type Options = {
  blocking?: boolean;
};

export const usePreloadAssets = (
  sources: ImageSourcePropType[],
  { blocking = true }: Options = {}
) => {
  const [ready, setReady] = useState(!blocking);

  useEffect(() => {
    let isActive = true;

    Asset.loadAsync(sources as Parameters<typeof Asset.loadAsync>[0]).then(() => {
      if (isActive) {
        setReady(true);
      }
    }).catch(() => {
      if (isActive) {
        setReady(true);
      }
    });

    return () => {
      isActive = false;
    };
  }, [sources]);

  return ready;
};
