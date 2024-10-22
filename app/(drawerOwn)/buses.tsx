import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, useColorScheme, View } from "react-native";
import axios from "axios";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import StarRating from "@/components/UIComponents/StarRating";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export default function Buses() {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const { myBuses, setMyBuses } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //================================================ Backend Calls ===============================================//

  const fetchBuses = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/bus/mybuses`, { id });
      console.log(response.data);
      setMyBuses(response.data);
    } catch (error) {
      console.error("Error fetching myBuses:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch bus data");
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch owned buses' details on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchBuses} />;
  }

  return (
    <ScrollView>
      <ThemedView style={styles.mainBody}>
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
        onPress={fetchBuses}
      >
       <FontAwesomeIcon
                icon={faArrowsRotate}
                size={20}
                color={theme === "dark" ? "#ccc" : "#444"}
              />
      </Pressable>
        {myBuses.length > 0 ? (
          myBuses.map((bus) => (
            <View
              key={bus.regNo}
              style={{
                marginBottom: 15,
                borderRadius: 10,
                backgroundColor: theme === "dark" ? "#555" : "#fff",
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#38b",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <ThemedText type="h5" lightColor="#fff" darkColor="#fff">
                    {bus.regNo}
                  </ThemedText>
                  <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                    {bus.service}
                  </ThemedText>
                  <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                    {bus.seats} Seats
                  </ThemedText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <StarRating rating={bus.rating} />
                  <ThemedText type="h5" lightColor="#eee" darkColor="#eee">
                    {bus.rating}
                  </ThemedText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 10,
                  paddingTop: 10,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <ThemedText type="h5">Rides</ThemedText>
                  <ThemedText type="h6" lightColor="#888" darkColor="#ccc">
                    {bus.rides}
                  </ThemedText>
                  <ThemedText
                    type="h6"
                    lightColor={bus.ridesIncrement >= 0 ? "#2fbf0f" : "#ff2f0f"}
                    darkColor={bus.ridesIncrement >= 0 ? "#2fff5f" : "#ff500f"}
                  >
                    {bus.ridesIncrement >= 0 ? "+" : ""}
                    {bus.ridesIncrement}%
                  </ThemedText>
                </View>
                <View style={{ alignItems: "center" }}>
                  <ThemedText type="h5">Earnings</ThemedText>
                  <ThemedText type="h6" lightColor="#888" darkColor="#ccc">
                    LKR. {bus.earning.toFixed(2)}
                  </ThemedText>
                  <ThemedText
                    type="h6"
                    lightColor={
                      bus.earningIncrement >= 0 ? "#2fbf0f" : "#ff2f0f"
                    }
                    darkColor={
                      bus.earningIncrement >= 0 ? "#2fff5f" : "#ff500f"
                    }
                  >
                    {bus.earningIncrement >= 0 ? "+" : ""}
                    {bus.earningIncrement}%
                  </ThemedText>
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <ThemedText type="h6">Insurance Exp:</ThemedText>
                  <ThemedText type="h6" lightColor="#888" darkColor="#ccc">
                    {bus.insuranceExp}
                  </ThemedText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <ThemedText type="h6">VRL Exp:</ThemedText>
                  <ThemedText type="h6" lightColor="#888" darkColor="#ccc">
                    {bus.VRL_Exp}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))
        ) : (
          <ThemedText>No myBuses found</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
    position: "relative",
  },
  flatList: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  busDetails: {
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#aaf",
  },
  addButton: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 5,
    borderWidth: 0,
    backgroundColor: "#aaa",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
