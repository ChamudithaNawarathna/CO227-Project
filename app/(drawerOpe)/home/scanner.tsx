import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, Pressable } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import TicketScan from "@/app/modals/messages/ticketScan";
import { useAppContext } from "@/context/AppContext";

export default function Scanner() {
  const { busScheduleDetails } = useAppContext();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermission();
  }, []);

  const handleBarCodeScanned = (result: BarCodeScanningResult) => {
    const data: string = result.data;
    const splitData = data.split("|");

    if (splitData.length >= 5) {
      // Convert seat numbers from string to array of numbers
      const scannedSeatNos = splitData[4]
        .split(",")
        .map((seat: string) => parseInt(seat?.trim().replace(/['"]/g, ""), 10)); // Convert to numbers

      // Find the bus with the same vehicle registration number
      const bus = busScheduleDetails.find(
        (bus) =>
          bus.vehicleRegNo === splitData[0] && // Compare vehicle registration number
          bus.departureTime === splitData[1] // Compare departure time
      );

      // If bus is found, check if the seat numbers match
      if (bus) {
        // Log individual items for debugging
        console.log("Scanned Seat Nos (as Numbers):");
        scannedSeatNos.forEach((seat, index) => {
          console.log(`Index ${index}: ${seat}`);
        });

        console.log("Booked Seats in Bus (as Numbers):");
        const bookedSeatNumbers = bus.bookedSeats.map((seat) =>
          parseInt(seat, 10)
        ); // Convert booked seats to numbers
        bookedSeatNumbers.forEach((seat, index) => {
          console.log(`Index ${index}: ${seat}`); // Log actual booked seat numbers
        });

        // Check if every scanned seat number is included in the booked seats
        const seatsMatch = scannedSeatNos.every((seat: number) =>
          bookedSeatNumbers.includes(seat)
        );

        setValid(seatsMatch);
      } else {
        setValid(false);
      }

      setScanned(true);
      setScannedData(splitData); // Update scannedData here after everything is checked
    } else {
      console.error("Scanned data is incomplete:", splitData);
      setValid(false);
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={{ alignItems: "center", marginTop: 200 }}>
        <ThemedText type="h5" lightColor="#666" darkColor="#ccc">
          Requesting camera permission...
        </ThemedText>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ alignItems: "center", marginTop: 200 }}>
        <ThemedText type="h5" lightColor="#666" darkColor="#ccc">
          No access to camera
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Pressable
          style={{ backgroundColor: "#db1", borderRadius: 10, padding: 5 }}
          onPress={() => setScanned(false)}
        >
          <ThemedText lightColor="#fff">Tap to Scan Again</ThemedText>
        </Pressable>
      )}
      <TicketScan
        isVisible={scanned}
        onClose={() => setScanned(false)}
        valid={valid}
        regNo={scannedData[0]}
        departureTime={scannedData[1]}
        from={scannedData[2]}
        to={scannedData[3]}
        seatNos={scannedData[4]}
        full={scannedData[5]}
        half={scannedData[6]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    color: "#000",
  },
});
