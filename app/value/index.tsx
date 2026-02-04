import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import coupleImg from '@/assets/images/bg/intro.png';
import { Button } from '@/components/button';
import { InfoScreenContainer } from '@/components/info-screen-container';
import { Subtitle } from '@/components/subtitle';
import { Title } from '@/components/title';

const Value = () => {
  const { t } = useTranslation();
  const { replace } = useRouter();

  const handleStart = () => {
    replace('/(onboarding)/1');
  };

  return (
    <InfoScreenContainer>
      <View className='gap-5'>
        <Title>
          {t('value.title')}
        </Title>
        <Subtitle>
          {t('value.description')}
        </Subtitle>
      </View>
      <Image
        source={coupleImg}
        resizeMode='contain'
        className="w-full scale-[2] flex-1"
      />
      <View className="mt-auto w-[85%]">
        <Button
          onPress={handleStart}
        >
          {t('value.button')}
        </Button>
      </View>
    </InfoScreenContainer>
  );
};
export default Value;
