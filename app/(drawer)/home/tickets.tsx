import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLocationDot,
  faLocationCrosshairs,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useRef, useState } from "react";
import {
  DateTimeInput,
  SearchInput,
} from "@/components/FormComponents/FormInputField";
import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { StringTime } from "@/components/Common/StringDateTime";
import { Owner } from "@/controller/Owner";
import { Bus } from "@/controller/Bus";
import { Ticket } from "@/controller/Ticket";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function Tickets() {
  var ticketsAvailable = true;
  const ticket = new Ticket();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 20;

  var cost = 0;

  const dataList = [
    { label: "item 1", cost: "1" },
    { label: "item 2", cost: "2" },
    { label: "item 3", cost: "3" },
  ];

  const [input, setInput] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const inputRefs = useRef(
    Array.from({ length: 2 }, () => React.createRef<TextInput>())
  );

  const data = [
    new Bus(
      "srdtf234546",
      "Badulla",
      new Date(),
      "Colombo",
      new Date(),
      new Map(),
      new Owner("123abc", 1200)
    ),
    new Bus(
      "srdtf24509",
      "Colombo",
      new Date(),
      "Kandy",
      new Date(),
      new Map(),
      new Owner("123abc", 1200)
    ),
    new Bus(
      "s35hh34546",
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Map(),
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh34546",
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Map(),
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh34546",
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Map(),
      new Owner("123fgc", 8000)
    ),
  ];

  return (
    <View style={styles.mainBody}>
      <SearchInput
        ref={inputRefs.current[0]}
        nextFocus={inputRefs.current[1]}
        input={from}
        setInput={setFrom}
        placeholder="From"
        iconName={faLocationCrosshairs}
        layer={3}
      />

      <SearchInput
        ref={inputRefs.current[1]}
        input={to}
        setInput={setTo}
        placeholder="To"
        iconName={faLocationDot}
        layer={2}
      />

      <View style={{ backgroundColor: "transparent" }}>
        <DateTimeInput
          input={date}
          setInput={setDate}
          iconName={faCalendarDays}
          placeholder={"Date"}
          type={"Date"}
          setOpenPicker={setOpenDate}
        />

        {openDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (event.type === "set" && selectedDate) {
                setDate(selectedDate);
              }
              setOpenDate(false);
            }}
          />
        )}

        <DateTimeInput
          input={time}
          setInput={setTime}
          iconName={faClock}
          placeholder={"Time"}
          type={"Time"}
          setOpenPicker={setOpenTime}
        />

        {openTime && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
              if (event.type === "set" && selectedDate) {
                setTime(selectedDate);
              }
              setOpenTime(false);
            }}
          />
        )}
      </View>

      {/********************************************* Search Result ****************************************************/}

      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.searchResult}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 5, marginBottom: 12 }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size={iconSize}
                    color={"#4c4"}
                    style={{ alignSelf: "center" }}
                  />
                  <View style={styles.horizontalLine}></View>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size={iconSize}
                    color={"#4af"}
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <View
                  style={{ justifyContent: "space-between", marginTop: -5 }}
                >
                  <View>
                    <ThemedText type="s4" lightColor="#000" darkColor="#fff">
                      {item.departure}
                    </ThemedText>
                    <ThemedText type="s7" lightColor="#666" darkColor="#ccc">
                      Departure
                    </ThemedText>
                  </View>
                  <View>
                    <ThemedText type="s4" lightColor="#000" darkColor="#fff">
                      {item.terminal}
                    </ThemedText>
                    <ThemedText type="s7" lightColor="#666" darkColor="#ccc">
                      Terminal
                    </ThemedText>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "space-between" }}>
                <ThemedText
                  type="h4"
                  lightColor="#000"
                  darkColor="#fff"
                  style={{ textAlign: "right" }}
                >
                  Rs. 200
                </ThemedText>
                <ThemedText type="s5" style={{ textAlign: "right" }}>
                  Depart at: {StringTime(item.departureTime)}
                </ThemedText>
                <Pressable
                  style={{
                    backgroundColor: "#e28",
                    borderWidth: 0,
                    borderRadius: 50,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                  onPress={() =>
                    router.replace(
                      "@/components/TicketComponents/Booking" as Href<string>
                    )
                  }
                >
                  <ThemedText
                    type={"s4"}
                    style={{ textAlign: "center" }}
                    lightColor="#fff"
                    darkColor="#fff"
                  >
                    Buy Ticket
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </ThemedView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
    zIndex: 1,
    position: "relative",
  },
  inputDropdown: {
    width: 280,
    color: "#333",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: -10,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  flatList: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  searchResult: {
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fc55",
  },
  horizontalLine: {
    flex: 1,
    width: 2,
    height: 40,
    margin: 5,
    borderWidth: 0,
    backgroundColor: "#aaa",
    alignSelf: "center",
  },
});
