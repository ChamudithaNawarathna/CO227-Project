import { Ticket } from "@/controller/classes";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Pressable, StyleSheet, View , Image } from "react-native";
import { useState } from "react";
import QRCode from 'react-native-qrcode-svg';

type Props = {
    ticket: Ticket;
};

export const TicketView = ({ ticket }: Props) => {
    const [fullTicket, setFullTicket] = useState(false);
    
    return (
        <Pressable style={styles.ticketBody} onPress={() => setFullTicket(!fullTicket)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <QRCode value={ticket.id.toString()} backgroundColor='transparent' size={60} />
                <View>
                    <ThemedText style={styles.ticketStatus} lightColor='#fff' darkColor='#fff'>
                        {ticket.status}
                    </ThemedText>
                    <ThemedText type='s6'>Ref: {ticket.id}</ThemedText>
                </View>
            </View>
            
            <View style={{ flexDirection: 'column', marginTop: -30 }}>
                <ThemedText type='h4' style={{ alignSelf: 'center' }}>{ticket.title}</ThemedText>

                <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <ThemedText type='s6'>Route: {ticket.routeNo} {ticket.departure} - {ticket.terminal}</ThemedText>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around' , alignItems: 'center' }}>
                        <ThemedText type='h6'>Seat</ThemedText>
                        <ThemedText type='s6'>{ticket.seat}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ThemedText type='h6'>Date</ThemedText>
                        <ThemedText type='s6'>{ticket.departureDate}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ThemedText type='h6'>Time</ThemedText>
                        <ThemedText type='s6'>{ticket.departureTime}</ThemedText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-around' }}>
                    <ThemedText type='h5'>{ticket.startLocation}</ThemedText>
                    <View style={styles.horizontalLine}></View>
                    <ThemedText type='h5'>{ticket.duration}</ThemedText>
                    <View style={styles.horizontalLine}></View>
                    <ThemedText type='h5'>{ticket.endLocation}</ThemedText>
                </View>
                <ThemedText type='h3' style={{ alignSelf: 'center', }}>Rs. {ticket.price}</ThemedText>
            </View>

            {fullTicket && <View style={{marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ThemedText type='s6'>Class</ThemedText>
                        <ThemedText type='s6'>{ticket.busclass}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <ThemedText type='s6'>Booked time</ThemedText>
                        <ThemedText type='s6'>{ticket.bookedTime}</ThemedText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                        <ThemedText type='s6'>Departure: {ticket.departure}</ThemedText>
                        <ThemedText type='s6'>{ticket.departureDate}</ThemedText>
                        <ThemedText type='s6'>{ticket.departureTime}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                        <ThemedText type='s6'>Terminal: {ticket.terminal}</ThemedText>
                        <ThemedText type='s6'>{ticket.terminalDate}</ThemedText>
                        <ThemedText type='s6'>{ticket.terminalTime}</ThemedText>
                    </View>
                </View>
            </View>}
        </Pressable>
    )
}

/*

            <View style={{ flexDirection: 'row'}}>
                <ThemedText style={styles.ticketStatus}>
                    {ticket.status}
                </ThemedText>
            </View>

            <ThemedText type='s6'>Reference No: {ticket.id}</ThemedText>
            <ThemedText type='h4' style={{ alignSelf: 'center', margin: 10, }}>{ticket.title}</ThemedText>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <ThemedText type='s6'>Seat: {ticket.seat}</ThemedText>
                <ThemedText type='s6'>Class: {ticket.busclass}</ThemedText>
                <ThemedText type='s6'>Route No: {ticket.routeNo}</ThemedText>
            </View>

            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-around'}}>
                <ThemedText type='h5'>{ticket.startLocation}</ThemedText>
                <View style={styles.horizontalLine}></View>
                <ThemedText>{ticket.duration}</ThemedText>
                <View style={styles.horizontalLine}></View>
                <ThemedText type='h5'>{ticket.endLocation}</ThemedText>
            </View>

            <ThemedText style={{ alignSelf: 'center', }}>Full: {ticket.ticketCount} x {ticket.priceForOne}</ThemedText>
            <ThemedText type='h5' style={{ alignSelf: 'center', }}>Total: Rs. {ticket.ticketCount*ticket.priceForOne}</ThemedText>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                    <ThemedText type='s6'>Departure: {ticket.departure}</ThemedText>
                    <ThemedText type='s6'>{ticket.departureTime}</ThemedText>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                    <ThemedText type='s6'>Terminal: {ticket.terminal}</ThemedText>
                    <ThemedText type='s6'>{ticket.terminalTime}</ThemedText>
                </View>
            </View>




*/

const styles = StyleSheet.create({
    ticketBody: {
        borderWidth: 0,
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#1cd7',
    },
    collapsedTicketBody: {
        flex: 1,
        flexDirection: 'row',
    },
    ticketStatus: {
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#2c1',
        borderRadius: 10,
    },
    horizontalLine: {
        flex: 1,
        height: 2,
        marginHorizontal: 5,
        borderWidth: 0,
        backgroundColor: '#aaa',
    },
    verticalLine: {
        flex: 0.02, 
        marginHorizontal: 5, 
        borderWidth: 0, 
        backgroundColor: '#aaa',
    },
    barcode: {
        margin: 10,
        height: 50,
        width: 300,
        alignSelf: 'center'
    }
});