import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBusAlt, faCog, faExclamationCircle, faHome, faMapLocationDot, faMoneyBillTransfer, faTable, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
    }}>
        <Tabs.Screen
            name='tabone'
            options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
            }}
        />
          <Tabs.Screen
              name='Booking'
              options={{
                  title: 'Purchase',
                  tabBarIcon: ({ color, focused }) => (
                      <FontAwesomeIcon icon={faTicket} size={28} color={color} />
                  ),
              }}
          />
        <Tabs.Screen
            name='tabtwo'
            options={{
            title: 'Location',
            tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={faMapLocationDot} size={28} color={color} />
            ),
            }}
        />
    </Tabs>
  );
}
