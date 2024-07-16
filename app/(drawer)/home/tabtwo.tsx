import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser , faArrowRight, faChevronRight, faC } from '@fortawesome/free-solid-svg-icons';
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { Reservation } from "@/controller/classes";
import { Ticket } from "@/components/TicketComponents/Ticket";

const res = new Reservation();

export default function TabTwo() {
  const theme = useColorScheme() ?? 'light';
  const iconColor = theme === 'dark' ? '#eee' : '#777';
  const iconSize = 15;
  const ticketsAvailable = true;
  const moreTickets = true;

  return (
    <ThemedView style={styles.mainBody}>
      <ThemedText type={'s4'} style={styles.cardHeader}>Available Tickets</ThemedText>
      <ThemedView style={[styles.cardBody,{backgroundColor: theme === 'dark' ? '#555' : '#fff'}]}>
        {ticketsAvailable && <Ticket res={res}/>}
        {!ticketsAvailable && moreTickets && <ThemedText style={{alignSelf: 'center'}}>No tickets are available</ThemedText>}
        {moreTickets && (
          <Pressable style={styles.cardBottomButton} onPress={() => router.replace("/index")}>
            <ThemedText lightColor={iconColor} darkColor={iconColor}>
              See all tickets
            </ThemedText>
            <FontAwesomeIcon icon={faChevronRight} size={iconSize} color={iconColor} />
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    paddingTop: 30,
    flex: 1,
    flexDirection:'column',
  },
  cardBody: {
    borderWidth: 0,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    elevation: 3,
  },
  cardHeader: {
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: 'transparent',
  },
  cardBottomButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
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