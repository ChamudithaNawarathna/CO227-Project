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
  const [availableTickets, setAvailableTickets] = useState<AvailableTicket[]>([
    {
      refNo: "001",
      date: "2024-10-06",
      from: "Colombo",
      to: "Galle",
      departure: "08:00",
      fromT: "20:15",
      toT: "1:30",
      seats: "A1, A2",
      full: "1",
      half: "0",
      price: "1500",
      regNo: "AB1234",
      org: "Express",
      service: "Luxury",
      route: "E01 Colombo - Galle",
      tracking: true,
      cancel: false,
    },
    {
      refNo: "002",
      date: "2024-10-06",
      from: "Galle",
      to: "Colombo",
      departure: "18:00",
      fromT: "12:45",
      toT: "2:51",
      seats: "B1, B2",
      full: "2",
      half: "1",
      price: "1200",
      regNo: "CD5678",
      org: "Rapid",
      service: "Standard",
      route: "E01 Colombo - Galle",
      tracking: true,
      cancel: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { baseURL, credits, myTickets, setMyTickets, id } = useAppContext();

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
      } else {
        Alert.alert("Error", "Failed to fetch tickets");
      }
    } catch (error) {
      console.error(error);
      // Alert.alert("Error", "An error occurred while fetching tickets");
    }

    setLoading(false);
  };

  // UseEffect to fetch tickets on component mount
  // useEffect(() => {
  //   fetchAvailableTickets();
  // }, []);

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

        <ScrollView>
          <View style={{ padding: 20 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : availableTickets.length > 0 ? (
              availableTickets.map((ticket) => (
                <AvailableTicketView
                  key={ticket.refNo}
                  refNo={ticket.refNo}
                  date={ticket.date}
                  from={ticket.from}
                  to={ticket.to}
                  departure={ticket.departure}
                  fromT={ticket.fromT}
                  toT={ticket.toT}
                  seats={ticket.seats}
                  full={ticket.full}
                  half={ticket.half}
                  price={ticket.price}
                  regNo={ticket.regNo}
                  org={ticket.org}
                  service={ticket.service}
                  route={ticket.route}
                  tracking={ticket.tracking}
                  cancel={ticket.cancel}
                />
              ))
            ) : (
              <Text>No tickets are available</Text>
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
    padding: 10,
    flex: 1,
  },
  flatList: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
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
