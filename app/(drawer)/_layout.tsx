import { Image, StyleSheet, useColorScheme } from "react-native";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBusAlt, faCog, faExclamationCircle, faHome, faMapLocationDot, faMoneyBillTransfer, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
    const theme = useColorScheme() ?? 'light';
    const iconColor = theme === 'dark' ? '#eee' : '#777';
    const iconSize = 24;

    return (
        <GestureHandlerRootView>
            <Drawer
                drawerContent={CustomDrawerContent}
                screenOptions={{
                    //drawerHideStatusBarOnOpen: true,
                    drawerInactiveBackgroundColor: 'transparent',
                    drawerActiveBackgroundColor: theme === 'dark' ? '#1cd7' : '#1cd5',
                    drawerType: 'front',
                    drawerStyle: {
                        backgroundColor: theme === 'dark' ? '#333' : '#fff',
                        width: 250
                    },
                    drawerLabelStyle: {
                        color: iconColor,
                    },
                    headerTintColor: theme === 'dark' ? '#eee' : '#777',
                    drawerAllowFontScaling: true,
                    headerShadowVisible: false,
                    headerBackground: ({ style }) => (<ThemedView style={{flex: 1}}/>),
                }}
            >
                <Drawer.Screen
                    name="home"
                    options={{
                        drawerLabel: 'Home',
                        drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faHome} size={iconSize} color={iconColor} />),
                        headerTitle: () => (
                            <ThemedView style={styles.drawerHeader}>
                                <Image source={theme === 'dark' ? require('@/assets/images/logo_darkmode.png') : require('@/assets/images/logo_lightmode.png')} style={styles.logo} />
                            </ThemedView>
                        ),
                        headerTitleAlign: 'center',
                        swipeMinDistance: 12,
                    }}
                />

                <Drawer.Screen
                    name='profile'
                    options={{
                    drawerLabel: 'Profile',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faUser} size={iconSize} color={iconColor} />),
                    headerTitle: 'Profile',
                    }}
                />
                <Drawer.Screen
                    name='timetables'
                    options={{
                    drawerLabel: 'Timetables',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faTable} size={iconSize} color={iconColor} />),
                    headerTitle: 'Timetables',
                    }}
                />
                <Drawer.Screen
                    name='transactions'
                    options={{
                    drawerLabel: 'Transactions',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faMoneyBillTransfer} size={iconSize} color={iconColor} />),
                    headerTitle: 'Transactions',
                    }}
                />
                <Drawer.Screen
                    name='settings'
                    options={{
                    drawerLabel: 'Settings',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faCog} size={iconSize} color={iconColor} />),
                    headerTitle: 'Settings',
                    }}
                />
                <Drawer.Screen
                    name='about'
                    options={{
                    drawerLabel: 'About',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faExclamationCircle} size={iconSize} color={iconColor} />),
                    headerTitle: 'About',
                    }}
                />
                <Drawer.Screen
                    name='buses'
                    options={{
                    drawerLabel: 'Buses',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faBusAlt} size={iconSize} color={iconColor} />),
                    headerTitle: 'Buses',
                    }}
                />
                <Drawer.Screen
                    name='tracker'
                    options={{
                    drawerLabel: 'Bus Tracker',
                    drawerIcon: ({ color }) => (<FontAwesomeIcon icon={faMapLocationDot} size={iconSize} color={iconColor} />),
                    headerTitle: 'Bus Tracker',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    drawerHeader: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        gap: 10,
    },
    logo: {
        height: 60,
        width: 60,
        borderRadius: 15,
    },
});