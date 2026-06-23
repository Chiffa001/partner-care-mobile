import type { FC, ReactNode } from 'react';
import { Platform, View } from 'react-native';

import { Colors } from '@/constants/colors';

type Props = {
  children: ReactNode;
};

// Web-only chrome (analogous to tg-svelte-ui's PhoneMask): on desktop widths
// the app renders inside a centered phone-sized frame; on mobile web — and on
// native, where it is a no-op — it fills the screen.
export const PhoneFrame: FC<Props> = ({ children }) => {
  if (Platform.OS !== 'web') {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <View
      className="min-h-[100dvh] w-full flex-1 items-center justify-center"
      style={{ backgroundColor: Colors.bgPhoneBackdrop }}
    >
      <View
        className="h-full w-full flex-1 overflow-hidden sm:h-[760px] sm:max-h-[94vh] sm:w-[380px] sm:max-w-[94vw] sm:flex-none sm:rounded-[44px] sm:border-[8px]"
        style={{
          borderColor: Colors.phoneBezel,
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.22)',
        }}
      >
        {children}
      </View>
    </View>
  );
};
