import React, { useState, useEffect } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import * as Location from "expo-location";

import OwnBusLocation from "@/components/UIComponents/OwnBusLocation";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";

export default function Tracker() {
  const theme = useColorScheme() ?? "light";
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorPermission, setErrorPermission] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  //================================================ Functions ===============================================//

  // Request location permission
  const requestPermissions = async (): Promise<boolean> => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorPermission("Permission to access location was denied");
      return false;
    }
    return true;
  };

  // Get your current location
  const getLocation = async (): Promise<void> => {
    try {
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc);
    } catch (error) {
      setErrorPermission("Error getting location: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Reload your current location
  const reloadLocation = async (): Promise<void> => {
    (async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        // Adding a slight delay before getting the location
        setTimeout(async () => {
          await getLocation();
        }, 1000);
      } else {
        setLoading(false);
      }
    })();
  };

  //================================================ Use Effects ===============================================//

  // Request permission and start tracking on component mount
  useEffect(() => {
    (async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        // Adding a slight delay before getting the location
        setTimeout(async () => {
          await getLocation();
        }, 1000);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={reloadLocation} />;
  }

  return <View style={styles.container}>{location && <OwnBusLocation />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reloadButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
});
