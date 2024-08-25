import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBusAlt, faCartArrowDown, faCartFlatbed, faCartShopping, faCarTunnel, faCircleDollarToSlot, faCog, faDollar, faExclamationCircle, faFileInvoiceDollar, faHome, faMapLocationDot, faMoneyBillTransfer, faMoneyCheckDollar, faPieChart, faSearch, faSearchLocation, faTable, faTicket, faTicketAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
    }}>
        <Tabs.Screen
            name='dashboard'
            options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={faPieChart} size={28} color={color} />
            ),
            }}
        />
          <Tabs.Screen
              name='tickets'
              options={{
                  title: 'Tickets',
                  tabBarIcon: ({ color, focused }) => (
                    <FontAwesomeIcon icon={faTicket} size={28} color={color} />
                  ),
              }}
          />
        <Tabs.Screen
            name='tracker'
            options={{
            title: 'Tracker',
            tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={faSearchLocation} size={28} color={color} />
            ),
            }}
        />
    </Tabs>
  );
}
