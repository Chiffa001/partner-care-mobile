import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/shared/config/colors';

const ChildbirthTabsLayout = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tabBarBottomPadding =
    Platform.OS === 'ios' ? 8 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSubtle,
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
          backgroundColor: Colors.bgBase,
          borderTopWidth: 1,
          borderTopColor: Colors.borderTabBar,
          height: 62 + tabBarBottomPadding,
          paddingBottom: tabBarBottomPadding,
        },
        headerStyle: {
          backgroundColor: Colors.bgBase,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: Colors.textHeader,
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
              color={Colors.textPrimary}
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
        name="timer"
        options={{
          title: t('childbirthScreen.tabs.timer'),
          tabBarLabel: t('childbirthScreen.tabs.timer'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="stopwatch-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: t('childbirthScreen.tabs.guide'),
          tabBarLabel: t('childbirthScreen.tabs.guide'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="book-outline"
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
