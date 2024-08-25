import { StringDate, StringTime } from "@/components/Common/StringDateTime";
import {
  DateTimeInput,
  SearchInput,
} from "@/components/FormComponents/FormInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Owner } from "@/controller/Owner";
import { Bus } from "@/controller/Bus";
import { Transaction } from "@/controller/Transaction";
import {
  faArrowDown,
  faArrowLeft,
  faArrowLeftLong,
  faArrowRight,
  faArrowRightLong,
  faArrowRotateBack,
  faArrowRotateBackward,
  faArrowTrendDown,
  faArrowTrendUp,
  faArrowUp,
  faArrowUp19,
  faCalendarDays,
  faLocationCrosshairs,
  faLocationDot,
  faRotateBack,
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

export default function Transactions() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 20;

  const data = [
    new Transaction(
      "srdtf234546",
      'payment',
      120,
      new Bus(
        "srdtf234546",
        "Badulla",
        new Date(),
        "Colombo",
        new Date(),
        new Map(),
        new Owner("123abc", 1200)
      ),
      new Date()
    ),
    new Transaction(
      "srdtf234546",
      'recharge',
      190,
      new Bus(
        "srdtf24509",
        "Colombo",
        new Date(),
        "Kandy",
        new Date(),
        new Map(),
        new Owner("123abc", 1200)
      ),
      new Date()
    ),
    new Transaction(
      "srdtf234546",
      'payment',
      1000,
      new Bus(
        "s35hh34546",
        "Anuradapura",
        new Date(),
        "Hambantota",
        new Date(),
        new Map(),
        new Owner("123fgc", 8000)
      ),
      new Date()
    ),
    new Transaction(
      "srdtf234546",
      'return',
      500,
      new Bus(
        "s35hh34546",
        "Anuradapura",
        new Date(),
        "Hambantota",
        new Date(),
        new Map(),
        new Owner("123fgc", 8000)
      ),
      new Date()
    ),
    new Transaction(
      "srdtf234546",
      'payment',
      125.5,
      new Bus(
        "srdtf234546",
        "Badulla",
        new Date(),
        "Colombo",
        new Date(),
        new Map(),
        new Owner("123abc", 1200)
      ),
      new Date()
    ),
  ];

  return (
    <ThemedView style={styles.mainBody}>
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.searchResult}>
            <View style={{ width: 60, backgroundColor: theme === "dark" ? "#000" : "#fff", alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
              {item.type == 'recharge' && (
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  size={iconSize}
                  color={theme === "dark" ? "#4f8" : "#4c8"}
                  style={{ alignSelf: "center" }}
                />
              )}
              {item.type == 'payment' && (
                <FontAwesomeIcon
                  icon={faArrowLeftLong}
                  size={iconSize}
                  color={theme === "dark" ? "#f85" : "#f85"}
                  style={{ alignSelf: "center" }}
                />
              )}
              {item.type == 'return' && (
                <FontAwesomeIcon
                  icon={faArrowRotateBack}
                  size={iconSize}
                  color={theme === "dark" ? "#fe4" : "#fb4"}
                  style={{ alignSelf: "center" }}
                />
              )}
              <ThemedText type="s7" style={{ textAlign: "right" }} lightColor="#666" darkColor="#ccc">
                {item.type}
              </ThemedText>
            </View>

            <View
            >
              <View style={{justifyContent: "space-between" }}>
              <ThemedText type="s5" style={{ textAlign: "right" }}>
                Rs. {item.amount}
              </ThemedText>
              <ThemedText type="s6" style={{ textAlign: "right" }} lightColor="#666" darkColor="#aaa">
                {StringDate(item.date)}
              </ThemedText>
              </View>
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
    position: "relative",
  },
  flatList: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  searchResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#aaa4",
  },
});
