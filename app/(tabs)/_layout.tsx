import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

enum TabCode {
  TODAY = 'today',
  YEARS = 'years',
  SETTINGS = 'settings',
}

const TabsLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#DE6760',
        tabBarInactiveTintColor: '#7D7886',
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
        },
        headerStyle: {
          backgroundColor: '#FFF7F4',
        },
        headerTitleStyle: {
          fontSize: 20,
          color: '#676565',
        }
      }}
    >
      <Tabs.Screen
        name={TabCode.TODAY}
        options={{
          title: t(`tabs.${TabCode.TODAY}`),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={TabCode.YEARS}
        options={{
          title: t(`tabs.${TabCode.YEARS}`),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="office-building"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={TabCode.SETTINGS}
        options={{
          title: t(`tabs.${TabCode.SETTINGS}`),
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
