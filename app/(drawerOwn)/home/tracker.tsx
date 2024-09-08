import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import MapLocation from "@/components/UIComponents/MapLocation";

export default function Tracker() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const requestPermissions = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return false;
    }
    return true;
  };

  const getLocation = async (): Promise<void> => {
    try {
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc);
    } catch (error) {
      setErrorMsg("Error getting location: " + error);
    } finally {
      setLoading(false); // Stop loading once location is fetched or failed
    }
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        await getLocation();
      } else {
        setLoading(false); // Stop loading if permissions are denied
      }
    })();
  }, []);

  const customMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        { color: "#e5e5e5" }, // Change this to your preferred background color
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text> // Show a loading message until the location is fetched
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        location && <MapLocation />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// import { Image, StyleSheet, Pressable } from "react-native";
// import { Link } from "expo-router";

// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/CommonModules/ThemedText';
// import { ThemedView } from '@/components/CommonModules/ThemedView';
// import { TextInput } from "react-native-gesture-handler";

// export default function Tracker() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <TextInput
//           style={{

//           }}
//         >

//         </TextInput>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
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
//     position: 'absolute',
//   },
// });
