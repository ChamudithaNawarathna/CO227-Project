import React from "react";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRotateBack, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { LocationObject } from "expo-location";
import { TabBar, TabView } from "react-native-tab-view";

import { useAppContext, VehicleDetails } from "@/context/AppContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import OperatorTabScreen from "@/components/UIComponents/OperatorTabScreen";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";

export default function Dashboard() {
  const { baseURL, id, setSeatNos, busScheduleDetails, setBusScheduleDetails } =
    useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#aaa" : "#777";
  const initialLayout = { width: Dimensions.get("window").width };
  const [errorPermission, setErrorPermission] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [updateInterval, setUpdateInterval] = useState<{
    label: string;
    value: number;
  }>({ label: "2 seconds", value: 2000 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [routes, setRoutes] = useState(
    busScheduleDetails.map((vehicleDetail, index) => ({
      key: `tab${index}`,
      title: `${vehicleDetail.vehicleRegNo}|${vehicleDetail.departureTime}`,
    }))
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  //================================================ Functions ===============================================//

  // Request location permissions
  const requestPermissions = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorPermission("Permission to access location was denied");
      stopTracking();
      return;
    }
    setErrorPermission(null); // Clear error if permissions are granted
  };

  // Get your current location
  const getLocation = async (): Promise<LocationObject | null> => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setErrorPermission(null);
      return location;
    } catch (error) {
      startTracking();
      return null;
    }
  };

  // Start updating location of the bus in the database
  const startTracking = async () => {
    await requestPermissions(); // Ensure permissions are requested
    if (intervalRef.current) return; // Prevent starting multiple intervals

    intervalRef.current = setInterval(async () => {
      const loc = await getLocation();
      if (loc) {
        await updateBusLocation(
          busScheduleDetails[index].vehicleRegNo,
          loc.coords.latitude,
          loc.coords.longitude,
          loc.coords.speed
        );
        console.log(
          "Updated Location:",
          loc.coords,
          "Speed:",
          loc.coords.speed
        );
      }
    }, updateInterval.value);
    setIsTracking(true);
  };

  // Stop updating location of the bus in the database
  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTracking(false);
    }
  };

  // Update "seatNos" according to the selected tab
  function updateSeats(route: { key: string; title: string }) {
    if (route) {
      let vehicleDetail = busScheduleDetails[index];
      const numberArray: number[] = vehicleDetail
        ? vehicleDetail.bookedSeats.map((str) => +str)
        : [];
      setSeatNos(numberArray);
    }
  }

  //================================================ Backend Calls ===============================================//

  // Fetch scheduled bus details for the operator
  const fetchBusDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/schedule/sdl2`, {
        id,
        date: selectedDate, // Send the selected date to the backend
      });

      if (response.status === 200 && response.data.length > 0) {
        setBusScheduleDetails(response.data);
        console.log("Fetched vehicle details:", response.data); // Log response data

        // Update the routes based on the fetched data
        const newRoutes = response.data.map(
          (vehicleDetail: VehicleDetails, index: number) => ({
            key: `tab${index}`,
            title: `${vehicleDetail.vehicleRegNo}|${vehicleDetail.departureTime}`, // Include both regNo and time
          })
        );

        setRoutes(newRoutes);
      } else {
        Alert.alert("No Data", "No scheduled buses are found for today");
      }
    } catch (error) {
      console.error(error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch vehicle details");
    } finally {
      setLoading(false);
    }
  };

  // Update bus location in the database
  const updateBusLocation = async (
    regNo: string,
    lat: number,
    lng: number,
    speed: number | null
  ) => {
    setError("");
    try {
      const response = await axios.post(`${baseURL}/tracking/trk2`, {
        regNo,
        lat,
        lng,
        speed,
      });

      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        Alert.alert("Unsuccessful", "Failed to update location successfully");
      }
    } catch (error) {
      console.error("Error sending location:", error);
      Alert.alert("Error", "Failed to send location");
      startTracking();
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch bus details on component mount
  useEffect(() => {
    fetchBusDetails();
  }, []);

  // Clean up interval on component mount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Restart trackinng when tracking time interval updates
  useEffect(() => {
    if (isTracking) {
      stopTracking();
      startTracking();
    }
  }, [updateInterval]);

  // Update "seatNos" in AppContext when tab routes updates
  useEffect(() => {
    updateSeats(routes[0]);
  }, [routes]);

  // Update "seatNos" in AppContext when tab updates
  useEffect(() => {
    updateSeats(routes[index]);
  }, [index]);

  //================================================ UI Control ===============================================//

  // Render tab screens containing bus seats and tracking options
  const renderScene = ({ route }: { route: any }) => {
    const [regNo, time] = route.title.split("|");
    const vehicleDetail = busScheduleDetails.find(
      (detail) => detail.vehicleRegNo === regNo && detail.departureTime === time
    );

    if (!vehicleDetail) {
      return (
        <View style={{ alignItems: "center", marginTop: 200 }}>
          <ThemedText type="h5" lightColor="#666" darkColor="#ccc">
            No bus schedules are available today
          </ThemedText>
        </View>
      );
    }

    return (
      <OperatorTabScreen
        updateInterval={updateInterval}
        setUpdateInterval={setUpdateInterval}
        vehicleDetail={vehicleDetail}
        fetchBusDetails={fetchBusDetails}
        isTracking={isTracking}
        startTracking={startTracking}
        stopTracking={stopTracking}
        errorPermission={errorPermission}
      />
    );
  };

  // Render tab labels for tab screens
  const renderLabel = ({
    route,
    focused,
  }: {
    route: any;
    focused: boolean;
  }) => {
    return (
      <View
        style={[styles.tab, focused ? styles.activeTab : styles.inactiveTab]}
      >
        <ThemedText type="h6" style={{ color: focused ? "white" : "black" }}>
          {route.title.split("|")[0]}
        </ThemedText>
        <ThemedText type="s7" style={{ color: focused ? "white" : "black" }}>
          {route.title.split("|")[1]}
        </ThemedText>
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchBusDetails} />;
  }

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : busScheduleDetails && busScheduleDetails.length > 0 ? (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(newIndex) => {
              setIndex(newIndex);
            }}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                activeColor="#d1f"
                indicatorStyle={{ backgroundColor: "transparent" }}
                style={{
                  backgroundColor: "white",
                  marginHorizontal: 15,
                  marginTop: 10,
                  borderRadius: 30,
                }}
                renderLabel={renderLabel}
              />
            )}
          />
        ) : (
          <View style={{ alignItems: "center", marginTop: 200 }}>
            <ThemedText type="h5" lightColor="#666" darkColor="#ccc">
              No bus schedules are available today
            </ThemedText>
            <Pressable
              style={{
                marginTop: 10,
                flexDirection: "row",
                gap: 5,
              }}
              onPress={fetchBusDetails}
            >
              <FontAwesomeIcon
                icon={faArrowRotateBack}
                size={18}
                color={iconColor}
                style={{ alignSelf: "center" }}
              />
              <ThemedText
                type="s5"
                lightColor={iconColor}
                darkColor={iconColor}
              >
                Refresh
              </ThemedText>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    padding: 5,
    borderRadius: 10,
  },
  activeTab: {
    alignItems: "center",
    backgroundColor: "blue",
  },
  inactiveTab: {
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  trackingButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#dd1",
    height: 50,
    width: 200,
    marginBottom: 20,
  },
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
  inputDropdown: {
    width: 220,
    color: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 3,
    zIndex: 2,
    margin: 12,
  },
});
