import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faArrowRight, faChevronRight, faC, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, useColorScheme } from "react-native";
import { Ticket } from "@/controller/classes";
import { TicketView } from "@/components/TicketComponents/TicketView";
import { Dropdown } from "react-native-element-dropdown";
import { useRef, useState } from "react";
import { SearchBar } from 'react-native-elements';
import { SearchInput } from "@/components/FormComponents/FormInputField";
import React from "react";

var ticketsAvailable = true;
const ticket = new Ticket();


export default function Booking() {
    const theme = useColorScheme() ?? 'light';
    const iconColor = theme === 'dark' ? '#eee' : '#777';
    const iconSize = 15;

    const credits = 500.25;

    const dataList = [
        { label: 'item 1', value: '1' },
        { label: 'item 2', value: '2' },
        { label: 'item 3', value: '3' },
    ];

    const [input, setInput] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const inputRefs = useRef(Array.from({ length: 2 }, () => React.createRef<TextInput>()));
    
    return (
        <ThemedView style={styles.mainBody}>
            <SearchInput 
                ref={inputRefs.current[0]} 
                nextFocus={inputRefs.current[1]}
                input={from} 
                setInput={setFrom} 
                placeholder="From" 
                layer={3}
                />

            <SearchInput
                ref={inputRefs.current[1]}
                input={to}
                setInput={setTo}
                placeholder="To"
                layer={2}
            />

            <Pressable style={{ backgroundColor: '#1cde', borderWidth: 0, borderRadius: 10, marginHorizontal: 10, padding: 10, marginTop: 20 }} onPress={() => router.replace("@/components/TicketComponents/Booking")}>
                <ThemedText type={'s5'} style={{ textAlign: 'center' }} lightColor='#fff' darkColor='#fff'>
                    Where is my bus?
                </ThemedText>
            </Pressable>

            <ThemedText type={'s4'} style={styles.cardHeader}>
                PURCHASE NEW TICKETS
            </ThemedText>
            <Pressable style={{ backgroundColor: '#1cde', borderWidth: 0, borderRadius: 10, marginHorizontal: 10, padding: 10, }} onPress={() => router.replace("@/components/TicketComponents/Booking")}>
                <ThemedText type={'s5'} style={{ textAlign: 'center' }} lightColor='#fff' darkColor='#fff'>
                    Purchase Tickets
                </ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        padding: 10,
        flex: 1,
        zIndex: 1,
        position: 'relative',
    },
    inputDropdown: {
        width: 280,
        color: '#333',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: -10,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 3,
    },
    rechargeButton: {
        alignContent: 'center',
        backgroundColor: '#a8f5',
        paddingHorizontal: 6,
        borderRadius: 10,
    },
    cardBody: {
        borderWidth: 0,
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 3,
    },
    cardHeader: {
        marginTop: 25,
        marginBottom: 5,
        marginHorizontal: 15,
        backgroundColor: 'transparent',
    },
    ticketBody: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        backgroundColor: '#1cd7',
    },
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