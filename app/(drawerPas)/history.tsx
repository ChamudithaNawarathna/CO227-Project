import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  useColorScheme,
  Pressable,
} from "react-native";
import axios from "axios";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";
import {
  faTrash,
  faMapLocationDot,
  faEye,
  faExclamationCircle,
  faThumbsUp,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RatingModal from "../modals/ratingModal";
import ReportModal from "../modals/reportModal";

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
  const iconSize = 20;
  const iconTitleSize = 10;
  const iconColor = theme === "dark" ? "#ccc" : "#777";
  const disabledIconColor = theme === "dark" ? "#666" : "#ccc";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [displayRatingModal, setDisplayRatingModal] = useState(false);
  const [displayReportModdal, setDisplayReportModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  //================================================ Backend Calls ===============================================//

  // Fetch ticket history
  const fetchTicketHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/tickets/tkt1`, {
        data: id,
      });
      console.log(response);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Error fetching ticket history:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch ticket history");
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch ticket history on component mount
  useEffect(() => {
    fetchTicketHistory();
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchTicketHistory} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={{
          backgroundColor: theme === "dark" ? "#555" : "#fff",
          alignSelf: 'flex-end',
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
          borderRadius: 50,
          elevation: 5
        }}
        onPress={fetchTicketHistory}
      >
       <FontAwesomeIcon
                icon={faArrowsRotate}
                size={20}
                color={theme === "dark" ? "#ccc" : "#444"}
              />
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
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: "#0003",
                }}
              >
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
                marginBottom: 10,
              }}
            >
              <ThemedText type="h4">Price: LKR {ticket.amount}</ThemedText>
            </View>

            <View
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
                backgroundColor: theme === "dark" ? "#444" : "#eee",
              }}
            >
              <Pressable
                style={{
                  padding: 5,
                  alignItems: "center",
                }}
                onPress={() => setDisplayRatingModal(true)}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size={iconSize}
                  color={iconColor}
                />
                <Text
                  style={{
                    fontSize: iconTitleSize,
                    color: iconColor,
                  }}
                >
                  Feedback
                </Text>
              </Pressable>

              <Pressable
                style={{
                  padding: 5,
                  alignItems: "center",
                }}
                onPress={() => setDisplayReportModal(true)}
              >
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={iconSize}
                  color={iconColor}
                />
                <Text style={{ fontSize: iconTitleSize, color: iconColor }}>
                  Report
                </Text>
              </Pressable>
            </View>
            <RatingModal
              isVisible={displayRatingModal}
              onClose={() => setDisplayRatingModal(false)}
              refNo={ticket.id}
            />
            <ReportModal
              isVisible={displayReportModdal}
              onClose={() => setDisplayReportModal(false)}
              refNo={ticket.id}
            />
          </View>
        ))
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginTop: 250 }}>
          <ThemedText type="h5" lightColor="#777" darkColor="#ddd">
            No tickets found
          </ThemedText>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
