import { View } from "react-native";
import Seat from "./Seat";
import { ThemedText } from "../CommonModules/ThemedText";
import { useAppContext } from "@/context/AppContext";

export function SeatLegend() {
  const seatColors = new Map<String, string>([
    ["Available", "#999a"],
    ["Selected", "#0af"],
    ["Not-Available", "#f30e"],
    ["Reserved", "#f90"],
  ]);
  const { accountType, seatNos, setSeatNos } = useAppContext();
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 70, margin: 5 }}>
        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Available"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Available {accountType}</ThemedText>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Selected"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Selected</ThemedText>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Not-Available"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Not-Available</ThemedText>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Reserved"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Reserved</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

export function OperatorSeatLegend() {
  const seatColors = new Map<String, string>([
    ["Available", "#999a"],
    ["Booked", "#0af"],
    ["Canceled", "#f30e"],
    ["Reserved", "#f90"],
  ]);
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Available"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Available</ThemedText>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Booked"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Booked</ThemedText>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Canceled"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Canceled</ThemedText>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: seatColors.get("Reserved"),
                borderRadius: 10,
              }}
            ></View>
            <ThemedText>Reserved</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

export function Seat44Layout() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Seat index={1} reserved={true} />
            <Seat index={5} reserved={true} />
            <Seat index={9} />
            <Seat index={13} />
            <Seat index={17} />
            <Seat index={21} />
            <Seat index={25} />
            <Seat index={29} />
            <Seat index={33} />
          </View>
          <View>
            <Seat index={2} reserved={true} />
            <Seat index={6} reserved={true} />
            <Seat index={10} />
            <Seat index={14} />
            <Seat index={18} />
            <Seat index={22} />
            <Seat index={26} />
            <Seat index={30} />
            <Seat index={34} />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Seat index={3} reserved={true} />
            <Seat index={7} reserved={true} />
            <Seat index={11} />
            <Seat index={15} />
            <Seat index={19} />
            <Seat index={23} />
            <Seat index={27} />
            <Seat index={31} />
            <Seat index={35} />
            <Seat index={37} />
          </View>
          <View>
            <Seat index={4} reserved={true} />
            <Seat index={8} reserved={true} />
            <Seat index={12} />
            <Seat index={16} />
            <Seat index={20} />
            <Seat index={24} />
            <Seat index={28} />
            <Seat index={32} />
            <Seat index={36} />
            <Seat index={38} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Seat index={39} />
        <Seat index={40} />
        <Seat index={41} />
        <Seat index={42} />
        <Seat index={43} />
        <Seat index={44} />
      </View>
    </View>
  );
}

export function Seat54Layout() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Seat index={1} reserved={true} />
            <Seat index={6} reserved={true} />
            <Seat index={11} />
            <Seat index={16} />
            <Seat index={21} />
            <Seat index={26} />
            <Seat index={31} />
            <Seat index={36} />
            <Seat index={41} />
          </View>
          <View>
            <Seat index={2} reserved={true} />
            <Seat index={7} reserved={true} />
            <Seat index={12} />
            <Seat index={17} />
            <Seat index={22} />
            <Seat index={27} />
            <Seat index={32} />
            <Seat index={37} />
            <Seat index={42} />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Seat index={3} reserved={true} />
            <Seat index={8} />
            <Seat index={13} />
            <Seat index={18} />
            <Seat index={23} />
            <Seat index={28} />
            <Seat index={33} />
            <Seat index={38} />
            <Seat index={43} />
            <Seat index={46} />
          </View>
          <View>
            <Seat index={4} reserved={true} />
            <Seat index={9} />
            <Seat index={14} />
            <Seat index={19} />
            <Seat index={24} />
            <Seat index={29} />
            <Seat index={34} />
            <Seat index={39} reserved={false} />
            <Seat index={44} />
            <Seat index={47} />
          </View>
          <View>
            <Seat index={5} reserved={true} />
            <Seat index={10} />
            <Seat index={15} />
            <Seat index={20} />
            <Seat index={25} />
            <Seat index={30} />
            <Seat index={35} />
            <Seat index={40} reserved={false} />
            <Seat index={45} />
            <Seat index={48} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Seat index={49} />
        <Seat index={50} />
        <Seat index={51} />
        <Seat index={52} />
        <Seat index={53} />
        <Seat index={54} />
      </View>
    </View>
  );
}
