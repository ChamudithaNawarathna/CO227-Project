import { useEffect, useState } from "react";
import axios from "axios";
import { Href, router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { Ticket } from "@/controller/Ticket";
import ScreenWrapper from "@/components/ScreenWrapper";
import { AvailableTicketView } from "@/components/UIComponents/AvailableTicketView";
import StringToDate from "@/components/CommonModules/StringToDateTime";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";

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
  const { baseURL, credits, myTickets, setMyTickets, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  //================================================ Backend Calls ===============================================//

  // Fetch available tickets
  const fetchAvailableTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/tickets/tkt4`, {
        data: id,
      });

      if (response.status === 200) {
        const fetchedTickets: AvailableTicket[] = response.data;
        console.log(fetchedTickets);
        await fetchTicketDetailsForAll(fetchedTickets); // Fetch details for each available ticket concurrently
      } else {
        Alert.alert("Error", "Failed to fetch tickets");
      }
    } catch (error) {
      console.error(error);
      setError(String(error));
      Alert.alert("Error", "An error occurred while fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed ticket information for all available tickets
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
        updatedTickets.set(refNo, ticket);
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        setError(String(error));
        Alert.alert(
          "Error",
          "An error occurred while fetching ticket details for " +
            availableTicket.refNo
        );
      } finally {
        setLoading(false);
      }
    });

    await Promise.all(fetchPromises); // Wait for all fetch requests to complete
    setMyTickets(updatedTickets); // Update the state with the new map after all tickets have been fetched
  };

  //================================================ Use Effects ===============================================//

  // Fetch tickets on component mount
  useEffect(() => {
    fetchAvailableTickets();
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchAvailableTickets} />;
  }

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
            Balance: LKR {credits}
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
              Refresh
            </ThemedText>
          </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 12 }}>
            {loading ? (
              <View style={{ marginTop: 200, alignItems: "center" }}>
              <ActivityIndicator
                size={70}
                color={theme === "dark" ? "#ddd" : "#777"}
              />
            </View>
            ) : myTickets ? (
              Array.from(myTickets.entries()).map(([ticketNo, ticket]) => (
                <AvailableTicketView key={ticketNo} ticket={ticket} />
              ))
            ) : (
              <ThemedText
                type="s5"
                lightColor={"#777"}
                style={{ alignSelf: "center", marginTop: 250 }}
              >
                No tickets are available
              </ThemedText>
            )}
          </View>
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
