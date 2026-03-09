import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChildbirthTabsLayout = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tabBarBottomPadding = Platform.OS === 'ios' ? 8 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#DE6760',
        tabBarInactiveTintColor: '#AA9BA2',
        tabBarLabelStyle: {
          fontSize: 13,
          marginTop: 4,
        },
        tabBarIconStyle: {
          transform: [{ scale: 1.2 }],
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarStyle: {
          backgroundColor: '#FFF7F4',
          borderTopWidth: 1,
          borderTopColor: '#E9DEDD',
          height: 62 + tabBarBottomPadding,
          paddingBottom: tabBarBottomPadding,
        },
        headerStyle: {
          backgroundColor: '#FFF7F4',
        },
        headerTitleStyle: {
          fontSize: 20,
          color: '#676565',
          fontWeight: '500',
        },
        headerLeft: () => (
          <Pressable
            className="pl-2 pr-4"
            onPress={() => router.replace('/(tabs)/today')}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#8F757B"
            />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="contractions"
        options={{
          title: t('childbirthScreen.tabs.contractions'),
          tabBarLabel: t('childbirthScreen.tabs.contractions'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="she-is-tired"
        options={{
          title: t('childbirthScreen.tabs.sheIsTired'),
          tabBarLabel: t('childbirthScreen.tabs.sheIsTired'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="briefcase-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="to-hospital"
        options={{
          title: t('childbirthScreen.tabs.toHospital'),
          tabBarLabel: t('childbirthScreen.tabs.toHospital'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="briefcase"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="doctor"
        options={{
          title: t('childbirthScreen.tabs.doctor'),
          tabBarLabel: t('childbirthScreen.tabs.doctor'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="headset-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default ChildbirthTabsLayout;
