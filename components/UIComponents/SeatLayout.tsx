import { router } from "expo-router";
import { useState } from "react";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";
import Seat from "./Seat";
import { ThemedText } from "../CommonModules/ThemedText";
import { useAppContext } from "@/context/AppContext";

export default function SeatLayout() {
  const theme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(true);
  const [status, setStatus] = useState(Array(50).fill("Available"));
  const { seatNo } = useAppContext();

  const closeModal = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <View>
        <Seat index={1} />
        <Seat index={4} />
        <Seat index={7} />
        <Seat index={10} />
        <Seat index={13} />
        <Seat index={16} />
        <Seat index={19} />
        <Seat index={22} />
        <Seat index={25} />
        <Seat index={28} />
      </View>
      <View>
        <Seat index={2} />
        <Seat index={5} />
        <Seat index={8} />
        <Seat index={11} />
        <Seat index={14} />
        <Seat index={17} />
        <Seat index={20} />
        <Seat index={23} />
        <Seat index={26} />
        <Seat index={29} />
      </View>
      <View>
        <Seat index={3} />
        <Seat index={6} />
        <Seat index={9} />
        <Seat index={12} />
        <Seat index={15} />
        <Seat index={18} />
        <Seat index={21} />
        <Seat index={24} />
        <Seat index={27} />
        <Seat index={30} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBody: {
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 30,
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
