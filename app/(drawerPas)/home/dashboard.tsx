import { ThemedText } from "@/components/CommonModules/ThemedText";
import { Href, router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Ticket } from "@/controller/Ticket";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { AvailableTicketView } from "@/components/UIComponents/AvailableTicketView";
import FullTicketView from "@/components/UIComponents/FullTicketView";
import StringToDate from "@/components/CommonModules/StringToDateTime";

type AvailableTicket = {
  refNo: string;
  date: string;
  from: string;
  to: string;
  departure: string;
  fromT: string;
  toT: string;
  seats: string;
  full: string;
  half: string;
  price: string;
  regNo: string;
  org: string;
  service: string;
  route: string;
  tracking: boolean;
  cancel: boolean;
};

export default function Dashboard() {
  const [availableTickets, setAvailableTickets] = useState<AvailableTicket[]>(
    []
  );
  // const [availableTickets, setAvailableTickets] = useState<AvailableTicket[]>([
  //   {
  //     ticketNo: "001",
  //     date: "2024-10-06",
  //     from: "Colombo",
  //     to: "Galle",
  //     departure: "08:00",
  //     fromT: "20:15",
  //     toT: "1:30",
  //     seats: "A1, A2",
  //     full: "1",
  //     half: "0",
  //     price: "1500",
  //     regNo: "AB1234",
  //     org: "SLTB",
  //     service: "Luxury",
  //     route: "E01 Colombo - Galle",
  //     tracking: false,
  //     cancel: false,
  //   },
  //   {
  //     ticketNo: "002",
  //     date: "2024-10-06",
  //     from: "Galle",
  //     to: "Colombo",
  //     departure: "18:00",
  //     fromT: "12:45",
  //     toT: "2:51",
  //     seats: "B1, B2",
  //     full: "2",
  //     half: "1",
  //     price: "1200",
  //     regNo: "CD5678",
  //     org: "SLTB",
  //     service: "Standard",
  //     route: "E01 Colombo - Galle",
  //     tracking: true,
  //     cancel: true,
  //   },
  // ]);
  const [loading, setLoading] = useState(false);
  const { baseURL, credits, myTickets, setMyTickets, id } = useAppContext();
  const [ticket, setTicket] = useState<Ticket>();

  // Function to fetch available tickets
  const fetchAvailableTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/tickets/tkt4`, {
        data: id,
      });

      if (response.status === 200) {
        const fetchedTickets: AvailableTicket[] = response.data; // Ensure the response data matches the Ticket interface
        setAvailableTickets(fetchedTickets);
        console.log(fetchedTickets);
        // Fetch details for each available ticket concurrently
        await fetchTicketDetailsForAll(fetchedTickets);
      } else {
        Alert.alert("Error", "Failed to fetch tickets");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch detailed ticket information for all available tickets
  const fetchTicketDetailsForAll = async (tickets: AvailableTicket[]) => {
    const updatedTickets = new Map(myTickets); // Create a copy of myTickets
    const fetchPromises = tickets.map(async (availableTicket) => {
      const { refNo, org, fromT, toT, tracking, cancel } = availableTicket; // Assuming these properties exist
      try {
        const response = await axios.get(`${baseURL}/tickets/tkt2`, {
          params: { refNo },
        });
        const ticket = new Ticket(
          response.data.ticketNo,
          StringToDate(response.data.issuedDate, response.data.issuedTime),
          response.data.vehicleNo,
          org,
          response.data.type,
          response.data.routeNo,
          response.data.route,
          StringToDate(response.data.date, response.data.time),
          response.data.from,
          response.data.to,
          fromT,
          toT,
          response.data.distance,
          response.data.price,
          response.data.discount,
          response.data.unitPrice,
          response.data.transID,
          response.data.full,
          response.data.half,
          response.data.seatNos,
          response.data.status,
          tracking,
          cancel
        );
        updatedTickets.set(refNo, ticket); // Add the fetched ticket
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        Alert.alert(
          "Error",
          "An error occurred while fetching ticket details for " +
            availableTicket.refNo
        );
      }
    });

    // Wait for all fetch requests to complete
    await Promise.all(fetchPromises);
    setMyTickets(updatedTickets); // Update the state with the new map after all tickets have been fetched
  };

  // Function to fetch recentTicket details by reference string
  // const fetchTicketDetails = async (
  //   ticketNo: string,
  //   org: string,
  //   fromT: string,
  //   toT: string,
  //   tracking: boolean,
  //   cancel: boolean
  // ) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${baseURL}/tickets/tkt2`, {
  //       params: { ticketNo },
  //     });
  //     const ticket = new Ticket(
  //       response.data.ticketNo,
  //       StringToDate(response.data.issuedDate, response.data.issuedTime),
  //       response.data.vehicleNo, // Corrected typo
  //       org,
  //       response.data.type,
  //       response.data.routeNo,
  //       response.data.route,
  //       StringToDate(response.data.date, response.data.time),
  //       response.data.from,
  //       response.data.to,
  //       fromT,
  //       toT,
  //       response.data.distance,
  //       response.data.price,
  //       response.data.discount,
  //       response.data.unitPrice,
  //       response.data.transID,
  //       response.data.full,
  //       response.data.half,
  //       response.data.seatNos,
  //       response.data.status,
  //       tracking,
  //       cancel
  //     );
  //     const updatedTickets = new Map(myTickets); // Create a copy of myTickets
  //     updatedTickets.set(ticketNo, ticket); // Add the fetched ticket
  //     setMyTickets(updatedTickets); // Update the state with the new map
  //   } catch (err) {
  //     console.error("Error fetching ticket details:", err); // Updated error message
  //     Alert.alert(
  //       "Error",
  //       "An error occurred while fetching the ticket details" // Updated error message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // UseEffect to fetch tickets on component mount
  // useEffect(() => {
  //   fetchAvailableTickets(); // Fetch available tickets when the component mounts
  // }, []);

  // // UseEffect to fetch ticket details when availableTickets updates
  // useEffect(() => {
  //   const fetchDetailsForAvailableTickets = async () => {
  //     if (availableTickets.length > 0) {
  //       for (const ticket of availableTickets) {
  //         await fetchTicketDetails(
  //           ticket.ticketNo,
  //           ticket.org || "",
  //           ticket.fromT || "",
  //           ticket.toT || "",
  //           ticket.tracking || false,
  //           ticket.cancel || false
  //         );
  //       }
  //     }
  //   };

  //   fetchDetailsForAvailableTickets();
  // }, [availableTickets]);

  return (
    <ScreenWrapper>
      <View style={styles.mainBody}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 20,
            paddingVertical: 3,
            paddingHorizontal: 5,
            marginHorizontal: "10%",
          }}
        >
          <ThemedText
            type={"h4"}
            lightColor={"#fff"}
            darkColor={"#fff"}
            style={{ marginLeft: 5 }}
          >
            Rs. {credits}
          </ThemedText>
          <Pressable
            style={[
              styles.rechargeButton,
              {
                borderColor: "#fff",
                borderWidth: 2,
              },
            ]}
            onPress={() => router.replace("/index" as Href<string>)}
          >
            <ThemedText type="h6" lightColor={"#fff"} darkColor={"#fff"}>
              Recharge
            </ThemedText>
          </Pressable>
        </View>

        <ThemedText
          type={"h4"}
          style={styles.cardHeader}
          lightColor="#fff"
          darkColor="#fff"
        >
          Available Tickets
        </ThemedText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 12 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : myTickets ? ( // Check if there are tickets in myTickets
              Array.from(myTickets.entries()).map(
                (
                  [ticketNo, ticket] // Use entries to get key-value pairs
                ) => (
                  <AvailableTicketView
                    key={ticketNo} // Use ticketNo as the unique key
                    ticket={ticket}
                  />
                )
              )
            ) : (
              <ThemedText type="s5" lightColor={'#777'} style={{alignSelf: 'center', marginVertical: 50}}>No tickets are available</ThemedText>
            )}

            <Button title="Refresh Tickets" onPress={fetchAvailableTickets} />
          </View>

          <Pressable
            style={{
              backgroundColor: "#a8f",
              borderWidth: 0,
              borderRadius: 10,
              marginHorizontal: 10,
              padding: 10,
              marginTop: 10,
            }}
            onPress={fetchAvailableTickets}
          >
            <ThemedText
              type={"s5"}
              style={{ textAlign: "center" }}
              lightColor="#fff"
              darkColor="#fff"
            >
              Quick Ticket
            </ThemedText>
          </Pressable>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  rechargeButton: {
    alignItems: "center",
    backgroundColor: "#fff2",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  cardBody: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 3,
  },
  cardHeader: {
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15,
    backgroundColor: "transparent",
  },
  drawerHeader: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 10,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
});
