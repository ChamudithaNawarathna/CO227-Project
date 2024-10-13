import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAppContext } from "@/context/AppContext";
import MyBusView from "@/components/UIComponents/MyBusView";
import axios from "axios";
import { AirbnbRating } from "react-native-ratings";
import { ScrollView } from "react-native-gesture-handler";

interface Bus {
  id: string;
  regNo: string;
  service: string;
  seats: number;
  rides: number;
  ridesIncrement: number;
  earning: number;
  earningIncrement: number;
  rating: number;
  insuranceExp: string;
  VRL_Exp: string;
}

export default function Buses() {
  const { myBuses } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const { baseURL, id } = useAppContext();

  function openAddBusForm() {
    router.navigate("/modals/addBusModal" as Href<string>);
  }

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/bus/mybuses`, { id });
      console.log(response.data);
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
      Alert.alert("Error", "Failed to retrieve bus data!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={theme == "dark" ? "#ddd" : "#555"}
        />
        <ThemedText>Loading bus details...</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.mainBody}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable
            style={[styles.addButton, { backgroundColor: "#19e" }]}
            onPress={openAddBusForm}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 10,
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size={25}
                color={theme === "dark" ? "#fff" : "#fff"}
                style={{ alignSelf: "center" }}
              />
              <ThemedText type="s4" lightColor={"#fff"} darkColor={"#fff"}>
                Add
              </ThemedText>
            </View>
          </Pressable>
        </View>
        {buses.length > 0 ? (
          buses.map((bus) => (
            <View
              key={bus.regNo}
              style={{ margin: 10, backgroundColor: "#0005" }}
            >
              <ThemedText>
                Bus: {bus.regNo} ({bus.service})
              </ThemedText>
              <ThemedText>Seats: {bus.seats}</ThemedText>
              <ThemedText>
                Rides: {bus.rides} ({bus.ridesIncrement >= 0 ? "+" : ""}
                {bus.ridesIncrement}%)
              </ThemedText>
              <ThemedText>
                Earnings: Rs. {bus.earning.toFixed(2)} (
                {bus.earningIncrement >= 0 ? "+" : ""}
                {bus.earningIncrement}%)
              </ThemedText>
              <AirbnbRating
                count={5}
                defaultRating={bus.rating}
                size={20}
                showRating={false}
                isDisabled={true}
              />
              <ThemedText>Insurance Exp: {bus.insuranceExp}</ThemedText>
              <ThemedText>VRL Exp: {bus.VRL_Exp}</ThemedText>
            </View>
          ))
        ) : (
          <ThemedText>No buses found</ThemedText>
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
    backgroundColor: "#aac4",
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
  stars: {
    backgroundColor: "#55a",
    borderRadius: 10,
    color: "#ddd",
  },
});
