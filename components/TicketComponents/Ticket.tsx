import { Reservation } from "@/controller/classes";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, View } from "react-native";

type Props = {
    res: Reservation;
};

export const Ticket = ({ res }: Props) => {
    return (
        <ThemedView style={styles.ticketBody}>
            <View style={styles.ticketStatus}>
                <ThemedText>
                    {res.status}
                </ThemedText>
            </View>
            <ThemedText type='h4' style={{ alignSelf: 'center', margin: 10, }}>{res.title}</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <ThemedText type='s6'>Class: {res.busclass}</ThemedText>
                <ThemedText type='s6'>Seat: {res.seat}</ThemedText>
                <ThemedText type='s6'>Date: {res.date}</ThemedText>
                <ThemedText type='s6'>Time: {res.bookedTime}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <ThemedText type='s6'>Reference Number: {res.id}</ThemedText>
                <ThemedText>Distancs: {res.distance} km</ThemedText>
                <ThemedText type='s6'>Route: {res.routeNo} {res.departure} {res.terminal}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10,}}>
                <ThemedText type='h5'>{res.start}</ThemedText>
                <ThemedText type='h5'>{res.destination}</ThemedText>
            </View>
            <ThemedText style={{ alignSelf: 'center', }}>Full: {res.ticketCount} x {res.priceForOne}</ThemedText>
            <ThemedText type='h5' style={{ alignSelf: 'center', }}>Total: Rs. {res.ticketCount*res.priceForOne}</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                    <ThemedText type='s6'>Departure: {res.departure}</ThemedText>
                    <ThemedText type='s6'>{res.departureTime}</ThemedText>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                    <ThemedText type='s6'>Terminal: {res.terminal}</ThemedText>
                    <ThemedText type='s6'>{res.terminalTime}</ThemedText>
                </View>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    ticketBody: {
        borderWidth: 0,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        backgroundColor: '#1cd7',
    },
    ticketStatus: {
        right: 10,
        position: 'absolute',
        backgroundColor: '#2c1',
        paddingHorizontal: 6,
        borderRadius: 10,
    }
});