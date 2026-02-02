import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

import relaxCouple from '@/assets/images/bg/relax-couple.png';
import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';

const Value = () => {
  const { t } = useTranslation();
  const { replace } = useRouter();

  const handleStart = () => {
    replace('/onboarding');
  };

  return (
    <ScreenContainer className='px-6'>
      <View className='h-full w-full flex flex-col pt-24 pb-24'>
        <Text className='font-medium text-3xl text-center text-paragraphs-primary leading-snug mb-5'>{t('value.title')}</Text>
        <Text className='font-medium text-paragraphs-primary text-center text-lg'>{t('value.description')}</Text>
        <Image
          source={relaxCouple}
          resizeMode='contain'
          className="w-full scale-150 flex-1"
        />
        <Button className='mt-auto' onPress={handleStart}>{t('value.start')}</Button>
      </View>
    </ScreenContainer>
  );
};

export default Value;
