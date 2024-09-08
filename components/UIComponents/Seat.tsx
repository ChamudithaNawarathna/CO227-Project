import { router } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";
import { ThemedText } from "../CommonModules/ThemedText";
import { useAppContext } from "@/context/AppContext";

type SeatProps = {
  index: number;
};

const seatColors = new Map<String, string>([
  ["Available", "#999a"],
  ["Selected", "#0af"],
  ["Not-Available", "#f30e"],
  ["Reserved", "#f90"],
]);

export default function Seat({ index }: SeatProps) {
  const theme = useColorScheme() ?? "light";
  const { seatNo, setSeatNo, seatStatus, setSeatStatus } = useAppContext();

  const updateStatus = (index: number) => {
    setSeatStatus(() => {
      const updatedStatus = [...seatStatus];
      if (seatStatus[index] == "Available") {
        updatedStatus[seatNo] = "Available";
        updatedStatus[index] = "Selected";
        setSeatNo(index);
      } else if (seatStatus[index] == "Selected") {
        updatedStatus[index] = "Available";
        setSeatNo(0);
      }
      return updatedStatus;
    });
  };

  return (
    <Pressable
      style={[
        styles.seatButton,
        { backgroundColor: seatColors.get(seatStatus[index]) },
      ]}
      onPress={() => updateStatus(index)}
    >
      <ThemedText type="h3" lightColor="#fff">
        {index}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seatButton: {
    margin: 5,
    paddingHorizontal: 10,
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
