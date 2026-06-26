import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import coupleImg from '@/assets/images/bg/intro.webp';
import { Button } from '@/shared/ui/button';
import { InfoScreenContainer } from '@/shared/ui/info-screen-container';
import { Subtitle } from '@/shared/ui/subtitle';
import { Title } from '@/shared/ui/title';

const Value = () => {
  const { t } = useTranslation();
  const { replace } = useRouter();

  const handleStart = () => {
    replace('/onboarding');
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
      <View className="my-5 aspect-[327/407] w-full overflow-hidden rounded-3xl">
        <Image
          source={coupleImg}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </View>
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
