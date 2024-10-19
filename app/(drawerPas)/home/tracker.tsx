import React, { useState, useEffect } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import * as Location from "expo-location";

import PasBusLocation from "@/components/UIComponents/PasBusLocation";
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

  return <View style={styles.container}>{location && <PasBusLocation />}</View>;
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

// import { Image, StyleSheet, Pressable } from "react-native";
// import { Link } from "expo-router";

// import { ThemedText } from "@/components/CommonModules/ThemedText";
// import { ThemedView } from "@/components/CommonModules/ThemedView";
// import { TextInput } from "react-native-gesture-handler";
// import GPTScrollView from "@/components/GPTScrollView";
// import ParallaxScrollView from "@/components/GPTScrollView";

// export default function Tracker() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={

//          require("@/assets/images/partial-react-logo.png")

//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

// import { Image, StyleSheet, Pressable } from "react-native";
// import { Link } from "expo-router";

// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/CommonModules/ThemedText";
// import { ThemedView } from "@/components/CommonModules/ThemedView";
// import { TextInput } from "react-native-gesture-handler";

// export default function Tracker() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
