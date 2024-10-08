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
//   Text,
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

//   const renderTicket = ({ item }: { item: newTicket }) => {
//     return (
//       <NewTicketView
//         refNo={item.refNo}
//         date={item.date}
//         from={item.from}
//         to={item.to}
//         departure={item.departure}
//         fromT={item.fromT}
//         toT={item.toT}
//         seats={item.seats}
//         full={item.full}
//         half={item.half}
//         price={item.price}
//         regNo={item.regNo}
//         org={item.org}
//         service={item.service}
//         route={item.route}
//         tracking={item.tracking}
//         cancel={item.cancel}
//       />
//     );
//   };

//   return (
//     <ScreenWrapper>
//       <View style={styles.mainBody}>
//         <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
//           Available Tickets
//         </Text>

//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : tickets.length > 0 ? (
//           <FlatList
//             data={tickets}
//             renderItem={renderTicket}
//             keyExtractor={(item) => item.refNo}
//           />
//         ) : (
//           <Text>No tickets available</Text>
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
} from "react-native";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

interface TicketDetails {
  ticketNo: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  issuedDate: string;
  issuedTime: string;
  vehicleNo: string;
  type: string;
  routeNo: string;
  route: string;
  date: string;
  time: string;
  from: string;
  to: string;
  distance: number;
  price: string;
  full: number;
  half: number;
  seatNos: string;
  status: string;
  discount: number;
  unitPrice: string;
  transID: string;
}

const TicketDetailsComponent: React.FC = () => {
  const { baseURL } = useAppContext();
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const refNo = "0000054";

  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/tickets/tkt2`, {
        params: { refNo },
      });
      setTicket(response.data);
    } catch (err) {
      setError("Error fetching ticket details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading ticket details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ticket Details</Text>
      {ticket && (
        <View>
          <Text style={styles.label}>Ticket No: {ticket.ticketNo}</Text>
          <Text style={styles.label}>Customer Name: {ticket.customerName}</Text>
          <Text style={styles.label}>Email: {ticket.customerEmail}</Text>
          <Text style={styles.label}>Mobile: {ticket.customerMobile}</Text>
          <Text style={styles.label}>Issued Date: {ticket.issuedDate}</Text>
          <Text style={styles.label}>Issued Time: {ticket.issuedTime}</Text>
          <Text style={styles.label}>Vehicle No: {ticket.vehicleNo}</Text>
          <Text style={styles.label}>Service Type: {ticket.type}</Text>
          <Text style={styles.label}>Route No: {ticket.routeNo}</Text>
          <Text style={styles.label}>Route: {ticket.route}</Text>
          <Text style={styles.label}>Journey Date: {ticket.date}</Text>
          <Text style={styles.label}>Departure Time: {ticket.time}</Text>
          <Text style={styles.label}>From: {ticket.from}</Text>
          <Text style={styles.label}>To: {ticket.to}</Text>
          <Text style={styles.label}>Distance: {ticket.distance} km</Text>
          <Text style={styles.label}>Price: {ticket.price} LKR</Text>
          <Text style={styles.label}>Full Seats: {ticket.full}</Text>
          <Text style={styles.label}>Half Seats: {ticket.half}</Text>
          <Text style={styles.label}>Seat Numbers: {ticket.seatNos}</Text>
          <Text style={styles.label}>Status: {ticket.status}</Text>
          <Text style={styles.label}>Discount: {ticket.discount} LKR</Text>
          <Text style={styles.label}>Unit Price: {ticket.unitPrice} LKR</Text>
          <Text style={styles.label}>Transaction ID: {ticket.transID}</Text>
        </View>
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
});

export default TicketDetailsComponent;
