import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faArrowRight, faChevronRight, faC } from '@fortawesome/free-solid-svg-icons';
import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { Ticket } from "@/controller/Ticket";
import { TicketView } from "@/components/TicketComponents/TicketView";

var ticketsAvailable = true;
const ticket = new Ticket();

export default function Dashboard() {
  const theme = useColorScheme() ?? 'light';
  const iconColor = theme === 'dark' ? '#eee' : '#777';
  const iconSize = 15;

  const credits = 500.25;


  return (
    <ThemedView style={styles.mainBody} lightColor='#5df' darkColor='#5df'>
      <ThemedView style={[styles.cardBody, { flexDirection: 'row', gap: 10, justifyContent: 'space-between', backgroundColor: theme === 'dark' ? '#555' : '#fff' }]}>
        <ThemedText type={'s6'} >
          Credits: Rs. {credits}
        </ThemedText>
        <Pressable style={styles.rechargeButton} onPress={() => router.replace("/index" as Href<string>)}>
          <ThemedText lightColor={iconColor} darkColor={iconColor}>
            RECHARGE
          </ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedText type={'s4'} style={styles.cardHeader}>
        AVAILABLE TICKETS
      </ThemedText>
      {ticketsAvailable && <TicketView ticket={ticket} />}
      {!ticketsAvailable && <ThemedText style={{ alignSelf: 'center' }}>No tickets are available</ThemedText>}

      <Pressable style={{ backgroundColor: '#1cde', borderWidth: 0, borderRadius: 10, marginHorizontal: 10, padding: 10, marginTop: 20}} onPress={() => router.replace("@/components/TicketComponents/Booking" as Href<string>)}>
        <ThemedText type={'s5'} style={{ textAlign: 'center' }} lightColor='#fff' darkColor='#fff'>
          Find my bus
        </ThemedText>
      </Pressable>
      <Pressable style={{ backgroundColor: '#a8f', borderWidth: 0, borderRadius: 10, marginHorizontal: 10, padding: 10, marginTop: 10}} onPress={() => router.replace("@/components/TicketComponents/Booking" as Href<string>)}>
        <ThemedText type={'s5'} style={{ textAlign: 'center' }} lightColor='#fff' darkColor='#fff'>
          Buy Tickets
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
  },
  rechargeButton: {
    alignItems: 'center',
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