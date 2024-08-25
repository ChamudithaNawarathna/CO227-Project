import { StringTime } from "@/components/Common/StringDateTime";
import {
  DateTimeInput,
  SearchInput,
} from "@/components/FormComponents/FormInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Owner } from "@/controller/Owner";
import { Bus } from "@/controller/Bus";
import {
  faCalendarDays,
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Href, router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export default function Timetables() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 20;

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
    <ThemedView style={styles.mainBody}>
      <SearchInput
        input={location}
        setInput={setLocation}
        placeholder="From"
        iconName={faLocationCrosshairs}
        layer={3}
      />
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

      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.searchResult}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ThemedText type="s5" style={{ textAlign: "right" }}>
                {item.departure} - {item.terminal}
              </ThemedText>
              <ThemedText type="s5" style={{ textAlign: "right" }}>
                {StringTime(item.departureTime)}
              </ThemedText>
            </View>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
    zIndex: 1,
    position: "relative",
  },
  flatList: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  searchResult: {
    marginVertical: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#4ca4",
  },
});
