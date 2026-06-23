import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import coupleImg from '@/assets/images/bg/intro.png';
import { Button } from '@/shared/ui/button';
import { InfoScreenContainer } from '@/shared/ui/info-screen-container';
import { Subtitle } from '@/shared/ui/subtitle';
import { Title } from '@/shared/ui/title';

const Value = () => {
  const { t } = useTranslation();
  const { replace } = useRouter();

  const handleStart = () => {
    replace('/(onboarding)/1');
  };

  return (
    <InfoScreenContainer>
      <View className="gap-5">
        <Title>
          {t('value.title')}
        </Title>
        <Subtitle>
          {t('value.description')}
        </Subtitle>
      </View>
      <Image
        source={coupleImg}
        resizeMode="contain"
        className="w-full flex-1 scale-[2]"
      />
      <View className="mt-auto w-[85%]">
        <Button
          onPress={handleStart}
          className="py-4"
        >
          {t('value.button')}
        </Button>
      </View>
    </InfoScreenContainer>
  );
};

export default Value;
