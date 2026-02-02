import { useFonts } from 'expo-font';
import { Text, TextInput } from 'react-native';

import PoppinsMedium from '@/assets/fonts/poppins/Poppins-Medium.ttf';
import PoppinsRegular from '@/assets/fonts/poppins/Poppins-Regular.ttf';
import PoppinsSemiBold from '@/assets/fonts/poppins/Poppins-SemiBold.ttf';

export const useCustomFonts = () => {
  const [loaded] = useFonts({
    'Poppins-Regular': PoppinsRegular,
    'Poppins-Medium': PoppinsMedium,
    'Poppins-SemiBold': PoppinsSemiBold,
  });

  if (!loaded) {
    return false;
  }

  const TextComponent = Text as typeof Text & {
    defaultProps?: { style?: unknown };
  };
  TextComponent.defaultProps = TextComponent.defaultProps || {};
  TextComponent.defaultProps.style = [
    TextComponent.defaultProps.style,
    { fontFamily: 'Poppins-Regular' },
  ];

  const TextInputComponent = TextInput as typeof TextInput & {
    defaultProps?: { style?: unknown };
  };
  TextInputComponent.defaultProps = TextInputComponent.defaultProps || {};
  TextInputComponent.defaultProps.style = [
    TextInputComponent.defaultProps.style,
    { fontFamily: 'Poppins-Regular' },
  ];

  return true;
};
