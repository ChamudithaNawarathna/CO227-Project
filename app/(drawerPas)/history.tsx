// import { ThemedText } from "@/components/CommonModules/ThemedText";
// import { ThemedView } from "@/components/CommonModules/ThemedView";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {
//   faUser,
//   faArrowRight,
//   faChevronRight,
//   faC,
// } from "@fortawesome/free-solid-svg-icons";
// import { Href, router } from "expo-router";
// import {
//   ActivityIndicator,
//   Alert,
//   Button,
//   FlatList,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   ThemedText,
//   useColorScheme,
//   View,
// } from "react-native";
// import { Ticket } from "@/controller/Ticket";
// import { TicketView } from "@/components/UIComponents/TicketView";
// import ScreenWrapper from "@/components/ScreenWrapper";
// import { useAppContext } from "@/context/AppContext";
// import { requestPermissions } from "@/components/LocationUpdate";
// import { useEffect, useState } from "react";
// import * as Location from "expo-location";
// import BusList from "@/components/BusList";
// import axios from "axios";
// import { NewTicketView } from "@/components/UIComponents/NewTicketView";
// import CustomAlert from "@/components/UIComponents/CustomAlert";

// export default function History() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAlertVisible, setAlertVisible] = useState(false); // State for alert visibility

//   // Function to fetch available tickets
//   const fetchTickets = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.post(`${baseURL}/tickets/tkt4`, {
//         data: 12,
//       });

//       if (response.status === 200) {
//         setTickets(response.data);
//       } else {
//         //Alert.alert("Error", "Failed to fetch tickets");
//         setAlertVisible(true); // Show alert on error
//       }
//     } catch (error) {
//       console.error(error);
//       //Alert.alert("Error", "An error occurred while fetching tickets");
//       setAlertVisible(true); // Show alert on error
//     }

//     setLoading(false);
//   };

//   // UseEffect to fetch tickets on component mount
//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const { baseURL, credits, myTickets } = useAppContext();

//   interface newTicket {
//     refNo: string;
//     date: string;
//     from: string;
//     to: string;
//     departure: string;
//     fromT: string;
//     toT: string;
//     seats: string;
//     full: boolean;
//     half: boolean;
//     price: string;
//     regNo: string;
//     org: string;
//     service: string;
//     route: string;
//     tracking: boolean;
//     cancel: boolean;
//   }

//   const renderTicket = ({ ticket }: { ticket: newTicket }) => {
//     return (
//       <NewTicketView
//         refNo={ticket.refNo}
//         date={ticket.date}
//         from={ticket.from}
//         to={ticket.to}
//         departure={ticket.departure}
//         fromT={ticket.fromT}
//         toT={ticket.toT}
//         seats={ticket.seats}
//         full={ticket.full}
//         half={ticket.half}
//         price={ticket.price}
//         regNo={ticket.regNo}
//         org={ticket.org}
//         service={ticket.service}
//         route={ticket.route}
//         tracking={ticket.tracking}
//         cancel={ticket.cancel}
//       />
//     );
//   };

//   return (
//     <ScreenWrapper>
//       <View style={styles.mainBody}>
//         <ThemedText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
//           Available Tickets
//         </ThemedText>

//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : tickets.length > 0 ? (
//           <FlatList
//             data={tickets}
//             renderItem={renderTicket}
//             keyExtractor={(ticket) => ticket.refNo}
//           />
//         ) : (
//           <ThemedText>No tickets available</ThemedText>
//         )}

//         <Button title="Refresh Tickets" onPress={fetchTickets} />
//       </View>
//       <CustomAlert isVisible={isAlertVisible} onClose={() => setAlertVisible(false)} />
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   mainBody: {
//     padding: 10,
//     flex: 1,
//   },
//   flatList: {
//     margin: 10,
//     borderRadius: 12,
//     backgroundColor: "transparent",
//   },
//   rechargeButton: {
//     alignItems: "center",
//     backgroundColor: "#fff2",
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   cardBody: {
//     borderWidth: 0,
//     borderRadius: 10,
//     marginHorizontal: 10,
//     elevation: 3,
//   },
//   cardHeader: {
//     marginTop: 15,
//     marginBottom: 5,
//     marginHorizontal: 15,
//     backgroundColor: "transparent",
//   },
//   drawerHeader: {
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     gap: 10,
//   },
//   logo: {
//     height: 60,
//     width: 60,
//     borderRadius: 15,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  useColorScheme,
  Pressable,
} from "react-native";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";

type Ticket = {
  id: string;
  date: string;
  from: string;
  to: string;
  status: string;
  amount: string;
};

const TicketDetailsComponent: React.FC = () => {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch ticket history from the backend API
  const fetchTicketHistory = async () => {
    //setLoading(true);

    const demoTickets = [
      {
        id: "000076",
        date: "2024-05-12",
        from: "Kurunduwatta,Kandy,Srilanka",
        to: "Peradeniya,Kandy,SriLanka",
        status: "Available",
        amount: "30.50",
      },
      {
        id: "000056",
        date: "2024-05-23",
        from: "Kandy Hospital,Kandy,Srilanka",
        to: "Peradeniya,Kandy,SriLanka",
        status: "Refunded",
        amount: "80.00",
      },
      {
        id: "000077",
        date: "2024-06-01",
        from: "Colombo Fort,Colombo,SriLanka",
        to: "Galle Face,Colombo,SriLanka",
        status: "Booked",
        amount: "50.00",
      },
      {
        id: "000078",
        date: "2024-06-15",
        from: "Nugegoda,Colombo,SriLanka",
        to: "Bambalapitiya,Colombo,SriLanka",
        status: "Cancelled",
        amount: "45.00",
      },
      {
        id: "000079",
        date: "2024-07-10",
        from: "Matara,Matara,SriLanka",
        to: "Galle,Galle,SriLanka",
        status: "Available",
        amount: "60.00",
      },
      {
        id: "000080",
        date: "2024-07-20",
        from: "Jaffna,Jaffna,SriLanka",
        to: "Kilinochchi,Kilinochchi,SriLanka",
        status: "Booked",
        amount: "75.00",
      },
    ];
    console.log(demoTickets);
    setTickets(demoTickets);
    return;

    try {
      const response = await axios.post(`${baseURL}/tickets/tkt1`, {
        data: id,
      });
      console.log(response);
      //setTicketHistory(response.data);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Error fetching ticket history:", error);
      Alert.alert("Error", "Failed to fetch ticket history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText>Loading ticket details...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title}>Ticket Details</ThemedText>
      <Pressable
        style={{
          backgroundColor: "green",
          alignItems: "center",
          paddingVertical: 10,
          marginBottom: 10,
        }}
        onPress={fetchTicketHistory}
      >
        <ThemedText type="h6">Refresh</ThemedText>
      </Pressable>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <View
            key={ticket.id}
            style={{
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: theme === "dark" ? "#555" : "#fff",
              elevation: 5,
            }}
          >
            <View
              style={{
                backgroundColor: theme === "dark" ? "#f91" : "#f91",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, backgroundColor: '#0003'}}>
              <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                {ticket.status}
              </ThemedText>
              </View>

              <View>
                <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                  Reference No: {ticket.id}
                </ThemedText>
                <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                  Booked on: {ticket.date}
                </ThemedText>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View>
                <ThemedText type="h6">Origin</ThemedText>

                <ThemedText type="h4">
                  {ticket.from?.split(",")[0]?.trim()}
                </ThemedText>
              </View>
              <View>
                <ThemedText type="h6">Destination</ThemedText>

                <ThemedText type="h4">
                  {ticket.to?.split(",")[0]?.trim()}
                </ThemedText>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                marginBottom: 10
              }}
            >
              <ThemedText type="h4">Price: LKR {ticket.amount}</ThemedText>
            </View>
          </View>
        ))
      ) : (
        <ThemedText>No tickets found</ThemedText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  ticketBody: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default TicketDetailsComponent;
