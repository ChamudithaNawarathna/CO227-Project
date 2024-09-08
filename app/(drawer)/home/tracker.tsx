import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function Tracker() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destination, setDestination] = useState<{ latitude: number, longitude: number } | null>(null);
  
  const requestPermissions = async (): Promise<void> => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  };

  const getLocation = async (): Promise<LocationObject | null> => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      return location;
    } catch (error) {
      setErrorMsg('Error getting location: ' + error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      await requestPermissions();
      let loc = await getLocation();
      setLocation(loc);
      if (loc) {
        // Set a sample destination for demonstration purposes
        setDestination({
          latitude: loc.coords.latitude + 0.04, // Adjust as needed
          longitude: loc.coords.longitude + 0.009, // Adjust as needed
        });
        console.log('Current Location:', loc.coords);
        console.log('Destination:', {
          latitude: loc.coords.latitude + 0.01,
          longitude: loc.coords.longitude + 0.01,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        location && (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
            {destination && (
              <>
                <Marker
                  coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                  }}
                  pinColor="blue"
                />
                <MapViewDirections
                  origin={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  destination={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                  }}
                  apikey="AIzaSyAe0QzwhP9SW5wsLN_XekECNUdZJwLieK8"
                  strokeWidth={6}
                  strokeColor="hotpink"
                />
              </>
            )}
          </MapView>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
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