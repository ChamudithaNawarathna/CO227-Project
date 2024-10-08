import { router } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";
import { ThemedText } from "../CommonModules/ThemedText";
import { useAppContext } from "@/context/AppContext";

type SeatProps = {
  index: number;
  reserved?: boolean;
};

const seatColors = new Map<String, string>([
  ["Available", "#999a"],
  ["Selected", "#0af"],
  ["Not-Available", "#f30e"],
  ["Reserved", "#f90"],
]);

export default function Seat({ index, reserved = false }: SeatProps) {
  const theme = useColorScheme() ?? "light";
  const { seatNos, setSeatNos, seatStatus, setSeatStatus } = useAppContext();

  const updateStatus = () => {
    if (reserved) {
      return null;
    } else {
      setSeatStatus(() => {
        const newSeatStatus = [...seatStatus];
        const newSeatNos = [...seatNos];
        // Check if the seat number is already in seatNos, if it is not available returns -1
        const seatIndex = seatNos.indexOf(index);

        // If seat is "Available", make it "Selected" and insert the seat nummber in seatNos
        // If seat is "Selected", make it "Available" and remove the seat number from seatNos
        if (newSeatStatus[index] === "Available") {
          newSeatStatus[index] = "Selected";
          if (seatIndex === -1) {
            newSeatNos.push(index);
          }
        } else if (newSeatStatus[index] === "Selected") {
          newSeatStatus[index] = "Available";
          if (seatIndex !== -1) {
            newSeatNos.splice(seatIndex, 1);
          }
        }

        setSeatNos(newSeatNos);
        setSeatStatus(newSeatStatus);
        return newSeatStatus;
      });
    }
  };

  return (
    <Pressable
      style={[
        styles.seatButton,
        {
          backgroundColor: reserved
            ? seatColors.get("Reserved")
            : seatColors.get(seatStatus[index]),
        },
      ]}
      onPress={updateStatus}
    >
      <ThemedText type="h4" lightColor="#fff">
        {index}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seatButton: {
    margin: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center",
  },
  cancelIcon: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});
