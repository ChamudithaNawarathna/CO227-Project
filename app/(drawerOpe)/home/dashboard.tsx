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
//   Dimensions,
//   FlatList,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   useWindowDimensions,
//   View,
// } from "react-native";
// import { Ticket } from "@/controller/Ticket";
// import ScreenWrapper from "@/components/ScreenWrapper";
// import { useAppContext } from "@/context/AppContext";
// import { requestPermissions } from "@/components/LocationUpdate";
// import { useEffect, useRef, useState } from "react";
// import * as Location from "expo-location";
// import BusList from "@/components/BusList";
// import axios from "axios";
// import {
//   OperatorSeatLegend,
//   Seat54Layout,
// } from "@/components/UIComponents/SeatLayouts";
// import { LocationObject } from "expo-location";
// import { Picker } from "@react-native-picker/picker";
// import { SceneMap, TabBar, TabView } from "react-native-tab-view";

// var ticketsAvailable = true;

// interface user {
//   userType: string;
//   empType: string;
//   fName: string;
//   lName: string;
//   email: string;
//   mobile: string;
//   nic: string;
//   birthDay: string;
//   ntc: string;
//   licence: string;
//   accName: string;
//   accNo: string;
//   bank: string;
//   branch: string;
// }

// // Type definition for vehicle details
// interface VehicleDetails {
//   vehicleRegNo: string;
//   date: string;
//   departureTime: string;
//   bookedSeats: string;
// }

// export default function Dashboard() {
//   const dummyVehicleDetails: VehicleDetails[] = [
//     {
//       vehicleRegNo: "ABC123",
//       date: "2024-10-10",
//       departureTime: "10:00 AM",
//       bookedSeats: "12, 14, 16",
//     },
//     {
//       vehicleRegNo: "XYZ789",
//       date: "2024-10-11",
//       departureTime: "11:00 AM",
//       bookedSeats: "1, 3, 5",
//     },
//   ];
//   const [location, setLocation] = useState<LocationObject | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [isTracking, setIsTracking] = useState<boolean>(false);
//   const [updateInterval, setUpdateInterval] = useState<number>(2000); // Default to 2 seconds
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // Correct typing

//   // Request location permissions
//   const requestPermissions = async (): Promise<void> => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }
//     setErrorMsg(null); // Clear error if permissions are granted
//   };

//   // Get current location
//   const getLocation = async (): Promise<LocationObject | null> => {
//     try {
//       let location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       setErrorMsg(null); // Clear error on success
//       return location;
//     } catch (error) {
//       setErrorMsg("Error getting location: " + error);
//       return null;
//     }
//   };

//   // Update bus location in the database
//   const updateBusLocation = async (
//     regNo: string,
//     lat: number,
//     lng: number,
//     speed: number | null
//   ) => {
//     try {
//       const response = await axios.post(`${baseURL}/bus/location`, {
//         regNo,
//         lat,
//         lng,
//         speed,
//       });

//       if (response.status === 200) {
//         console.log(response.data.message);
//         alert("Location updated successfully!");
//       } else {
//         alert("Failed to update location.");
//       }
//     } catch (error) {
//       console.error("Error updating location:", error);
//       alert("An error occurred while updating the location.");
//     }
//   };

//   // Start tracking location at the selected interval
//   const startTracking = async () => {
//     await requestPermissions(); // Ensure permissions are requested
//     if (intervalRef.current) return; // Prevent starting multiple intervals

//     intervalRef.current = setInterval(async () => {
//       const loc = await getLocation();
//       if (loc) {
//         setLocation(loc);
//         // Send the updated location and speed to the server
//         await updateBusLocation(
//           "NA-5083",
//           loc.coords.latitude,
//           loc.coords.longitude,
//           loc.coords.speed
//         ); // Update with your bus registration number
//         console.log(
//           "Updated Location:",
//           loc.coords,
//           "Speed:",
//           loc.coords.speed
//         );
//       }
//     }, updateInterval); // Use the selected interval
//     setIsTracking(true);
//   };

//   // Stop tracking location
//   const stopTracking = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//       setIsTracking(false);
//     }
//   };

//   // Manually refresh the location in case of an error
//   const refreshLocation = async () => {
//     const loc = await getLocation();
//     setLocation(loc);
//     if (loc) {
//       console.log("Refreshed Location:", loc.coords);
//       // Optionally, send the refreshed location to the server
//       await updateBusLocation(
//         "NA-5083",
//         loc.coords.latitude,
//         loc.coords.longitude,
//         loc.coords.speed
//       ); // Update with your bus registration number
//     }
//   };

//   // Clean up interval on unmount
//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   // Update the interval and restart tracking if necessary
//   useEffect(() => {
//     if (isTracking) {
//       stopTracking(); // Stop the current tracking
//       startTracking(); // Restart tracking with the new interval
//     }
//   }, [updateInterval]); // Trigger effect when updateInterval changes

//   const [busScheduleDetails, setBusScheduleDetails] =
//     useState<VehicleDetails[]>(dummyVehicleDetails);
//   const [loading, setLoading] = useState<boolean>(false);
//   // const [selectedDate, setSelectedDate] = useState<string>(
//   //   new Date().toISOString().split("T")[0]
//   // ); // Default to today's date

//   const [selectedDate, setSelectedDate] = useState<string>("2024-10-21"); // Default to today's date

//   const fetchVehicleDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${baseURL}/schedule/sdl2`, {
//         id,
//         date: selectedDate, // Send the selected date to the backend
//       });

//       if (response.status === 200 && response.data.length > 0) {
//         setBusScheduleDetails(response.data);
//         console.log("Fetched vehicle details:", response.data); // Log response data

//         // Update the routes based on the fetched data
//         const newRoutes = response.data.map(
//           (vehicleDetail: VehicleDetails, index: number) => ({
//             key: `tab${index}`,
//             title: vehicleDetail.vehicleRegNo,
//           })
//         );

//         setRoutes(newRoutes);
//       } else {
//         Alert.alert(
//           "No Data",
//           "No vehicle details found for the selected date."
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to fetch vehicle details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchVehicleDetails(); // Fetch vehicle details on component mount or when the date changes
//   // }, []);

//   const { baseURL, id, credits, myTickets } = useAppContext();
//   const theme = useColorScheme() ?? "light";

//   const [index, setIndex] = useState(0); // To manage the active tab index
//   const [routes, setRoutes] = useState(
//     busScheduleDetails.map((vehicleDetail, index) => ({
//       key: `tab${index}`,
//       title: vehicleDetail.vehicleRegNo,
//     }))
//   );
//   const initialLayout = { width: Dimensions.get("window").width };
//   const layout = useWindowDimensions();

//   // const renderScene = ({ route }: { route: any }) => {
//   //   // Debugging: Log the route.title and busScheduleDetails array
//   //   console.log("Current route:", route.title);
//   //   console.log("Available vehicle details:", busScheduleDetails);

//   //   // Ensure the route.title is exactly as expected
//   //   const vehicleDetail = busScheduleDetails.find(
//   //     (detail) => detail.vehicleRegNo.trim() === route.title.trim() // Ensure matching vehicleRegNo
//   //   );

//   //   if (!vehicleDetail) {
//   //     return <Text>No details found for this bus.</Text>;
//   //   }

//   //   return (
//   //     <View style={{ padding: 16, marginBottom: 10 }}>
//   //       <Text>Vehicle Reg No: {vehicleDetail.vehicleRegNo}</Text>
//   //       <Text>Date: {vehicleDetail.date}</Text>
//   //       <Text>Departure Time: {vehicleDetail.departureTime}</Text>
//   //       <Text>Booked Seats: {vehicleDetail.bookedSeats}</Text>
//   //     </View>
//   //   );
//   // };

//   const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
//       <Text>First Tab</Text>
//     </View>
//   );

//   const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
//       <Text>Second Tab</Text>
//     </View>
//   );

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   return (
//     <ScreenWrapper>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* Display error message if any */}
//           {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

//           {/* Display current location */}
//           {location && (
//             <Text style={styles.locationText}>
//               Current location: Latitude: {location.coords.latitude}, Longitude:{" "}
//               {location.coords.longitude}, Speed:{" "}
//               {location.coords.speed !== null
//                 ? location.coords.speed.toFixed(2)
//                 : "N/A"}{" "}
//               m/s
//             </Text>
//           )}

//           {/* Start/Stop tracking button */}
//           <Pressable
//             style={styles.button}
//             onPress={isTracking ? stopTracking : startTracking}
//           >
//             <Text style={styles.buttonText}>
//               {isTracking ? "Stop Tracking" : "Start Tracking"}
//             </Text>
//           </Pressable>

//           {/* Refresh button */}
//           <Pressable style={styles.button} onPress={refreshLocation}>
//             <Text style={styles.buttonText}>Refresh Location</Text>
//           </Pressable>

//           {/* Dropdown for selecting update interval */}
//           <Text style={styles.pickerLabel}>
//             Select Location Update Interval (ms)
//           </Text>
//           <Picker
//             selectedValue={updateInterval}
//             style={styles.picker}
//             onValueChange={(itemValue) => setUpdateInterval(itemValue)}
//           >
//             <Picker.Item label="1000 ms (1 sec)" value={1000} />
//             <Picker.Item label="2000 ms (2 sec)" value={2000} />
//             <Picker.Item label="5000 ms (5 sec)" value={5000} />
//             <Picker.Item label="10000 ms (10 sec)" value={10000} />
//           </Picker>
//         </View>
//         <View style={styles.mainBody}>
//           {/* <View style={{ flex: 1 }}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//               <TabView
//                 navigationState={{ index, routes }} // Use the dynamically updated routes
//                 renderScene={renderScene}
//                 onIndexChange={setIndex}
//                 initialLayout={initialLayout}
//                 renderTabBar={(props) => (
//                   <TabBar
//                     {...props}
//                     indicatorStyle={{ backgroundColor: "blue" }}
//                     style={{ backgroundColor: "white" }}
//                     labelStyle={{ color: "black" }}
//                   />
//                 )}
//               />
//             )}
//           </View> */}

//           <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: layout.width }}
//             renderTabBar={(props) => <TabBar {...props} scrollEnabled />}
//           />

// <Button title="Refresh" onPress={fetchVehicleDetails} />

// <View
//   style={{
//     marginHorizontal: 40,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   }}
// >
//   <Seat54Layout />
//   <OperatorSeatLegend />
// </View>
//         </View>
//       </ScrollView>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   pickerLabel: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   picker: {
//     height: 50,
//     width: 200,
//     marginBottom: 20,
//   },
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
//   scene: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

interface VehicleDetails {
  vehicleRegNo: string;
  seats: number;
  date: string;
  departureTime: string;
  bookedSeats: string[];
}

import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faArrowRight,
  faChevronRight,
  faC,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Ticket } from "@/controller/Ticket";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import BusList from "@/components/BusList";
import axios from "axios";
import {
  OperatorSeatLegend,
  Seat44Layout,
  Seat54Layout,
} from "@/components/UIComponents/SeatLayouts";
import { LocationObject } from "expo-location";
import { Picker } from "@react-native-picker/picker";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import React from "react";
import { Scene } from "react-native-tab-view/lib/typescript/src/types";
import { Dropdown } from "react-native-element-dropdown";

export default function Dashboard() {
  const dummyVehicleDetails: VehicleDetails[] = [
    {
      vehicleRegNo: "ABC123",
      seats: 54,
      date: "2024-10-10",
      departureTime: "10:00",
      bookedSeats: ["12", "14", "16"],
    },
    {
      vehicleRegNo: "XYZ789",
      seats: 54,
      date: "2024-10-11",
      departureTime: "11:00",
      bookedSeats: ["10", "30", "25"],
    },
    {
      vehicleRegNo: "XYZ789",
      seats: 42,
      date: "2024-10-11",
      departureTime: "21:00",
      bookedSeats: ["12", "15"],
    },
  ];
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [updateInterval, setUpdateInterval] = useState<{
    label: string;
    value: number;
  }>({ label: "2 seconds", value: 2000 }); // Default to 2 seconds
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // Correct typing
  const {
    baseURL,
    id,
    seatNos,
    setSeatNos,
    busScheduleDetails,
    setBusScheduleDetails,
  } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#aaa" : "#777";
  const [index, setIndex] = useState(0); // To manage the active tab index
  const initialLayout = { width: Dimensions.get("window").width };
  const [loading, setLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState(
    busScheduleDetails.map((vehicleDetail, index) => ({
      key: `tab${index}`,
      title: `${vehicleDetail.vehicleRegNo}|${vehicleDetail.departureTime}`,
    }))
  );
  // const [selectedDate, setSelectedDate] = useState<string>(
  //   new Date().toISOString().split("T")[0]
  // );
  const [selectedDate, setSelectedDate] = useState<string>("2024-10-12"); // Default to today's date
  const dropdownData = [
    { label: "1 second", value: 1000 },
    { label: "2 seconds", value: 2000 },
    { label: "5 seconds", value: 5000 },
    { label: "10 seconds", value: 10000 },
  ];

  // Request location permissions
  const requestPermissions = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      stopTracking();
      return;
    }
    setErrorMsg(null); // Clear error if permissions are granted
  };

  // Get current location
  const getLocation = async (): Promise<LocationObject | null> => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setErrorMsg(null); // Clear error on success
      return location;
    } catch (error) {
      startTracking();
      return null;
    }
  };

  // Update bus location in the database
  const updateBusLocation = async (
    regNo: string,
    lat: number,
    lng: number,
    speed: number | null
  ) => {
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
        alert("Failed to update location.");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      alert("An error occurred while updating the location.");
      startTracking();
    }
  };

  // Start tracking location at the selected interval
  const startTracking = async () => {
    await requestPermissions(); // Ensure permissions are requested
    if (intervalRef.current) return; // Prevent starting multiple intervals

    intervalRef.current = setInterval(async () => {
      const loc = await getLocation();
      if (loc) {
        // Send the updated location and speed to the server
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

  // Stop tracking location
  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTracking(false);
    }
  };

  const fetchVehicleDetails = async () => {
    setLoading(true);
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
        Alert.alert(
          "No Data",
          "No vehicle details found for the selected date."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch vehicle details.");
    } finally {
      setLoading(false);
    }
  };

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
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Dropdown
                style={styles.inputDropdown}
                placeholderStyle={{ color: "gray" }}
                data={dropdownData}
                labelField="label"
                valueField="value"
                placeholder="Select a time interval"
                value={updateInterval} // Use the state variable directly
                onChange={(item) => {
                  setUpdateInterval(item); // Update the state with the selected object
                }}
              />
              <Pressable
                style={styles.trackingButton}
                onPress={isTracking ? stopTracking : startTracking}
              >
                <Text style={styles.buttonText}>
                  {isTracking && !errorMsg ? "Stop Tracking" : "Start Tracking"}
                </Text>
              </Pressable>
            </View>
            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

            <View
              style={{
                marginHorizontal: 40,
                backgroundColor: "#fff",
                borderRadius: 20,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <Pressable
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    gap: 5,
                    alignSelf: "flex-end",
                  }}
                  onPress={fetchVehicleDetails}
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
              {vehicleDetail.seats == 42 && <Seat44Layout />}
              {vehicleDetail.seats == 54 && <Seat54Layout />}
              <OperatorSeatLegend />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

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
        <Text style={{ color: focused ? "white" : "black" }}>
          {route.title.split("|")[0]}
        </Text>
        <Text style={{ color: focused ? "white" : "black" }}>
          {route.title.split("|")[1]}
        </Text>
      </View>
    );
  };

  function updateSeats(route: { key: string; title: string }) {
    if (route) {
      // const [regNo, time] = route.title.split("|");
      // const vehicleDetail = busScheduleDetails.find(
      //   (detail) =>
      //     detail.vehicleRegNo === regNo && detail.departureTime === time
      // );
      let vehicleDetail = busScheduleDetails[index];
      const numberArray: number[] = vehicleDetail
        ? vehicleDetail.bookedSeats.map((str) => +str)
        : [];
      setSeatNos(numberArray);
    }
  }

  // useEffect(() => {
  //   fetchVehicleDetails();
  // }, []);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Update the interval and restart tracking if necessary
  useEffect(() => {
    if (isTracking) {
      stopTracking(); // Stop the current tracking
      startTracking(); // Restart tracking with the new interval
    }
  }, [updateInterval]); // Trigger effect when updateInterval changes

  useEffect(() => {
    updateSeats(routes[0]);
  }, [routes]);

  useEffect(() => {
    updateSeats(routes[index]);
  }, [index]);

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : busScheduleDetails && busScheduleDetails.length > 0 ? ( // Check if busScheduleDetails has elements
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
              onPress={fetchVehicleDetails}
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
    padding: 10,
    borderRadius: 20,
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
