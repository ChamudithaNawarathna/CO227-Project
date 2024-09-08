import {
  StringDate,
  StringTime,
} from "@/components/CommonModules/StringDateTime";
import {
  DateTimeInput,
  SearchInput,
} from "@/components/FormComponents/FormInputField";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import { Owner } from "@/controller/Owner";
import { Bus } from "@/controller/Bus";
import { Transaction } from "@/controller/Transaction";
import {
  faArrowCircleRight,
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
  faBusSimple,
  faCalendarDays,
  faChartColumn,
  faChartLine,
  faChevronCircleRight,
  faChevronRight,
  faCross,
  faEdit,
  faLocationCrosshairs,
  faLocationDot,
  faPlus,
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
import StarRating from "@/components/UIComponents/StarRating";

export default function Buses() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#555";
  const iconSize = 14;

  const data = [
    new Bus(
      "srdtf234546",
      "NA-345345",
      "asd1234323",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Badulla",
      new Date(),
      "Colombo",
      new Date(),
      new Map(),
      new Owner("123abc", 1200)
    ),
    new Bus(
      "srdtf24509",
      "NA-345345",
      "asd1234323",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Colombo",
      new Date(),
      "Kandy",
      new Date(),
      new Map(),
      new Owner("123abc", 1200)
    ),
    new Bus(
      "s35hh34546",
      "NA-345345",
      "asd1234323",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Map(),
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "s35hh34546",
      "NA-345345",
      "asd1234323",
      new Map([[1, "d-234466"]]),
      new Map([[1, "c-234466"]]),
      "Anuradapura",
      new Date(),
      "Hambantota",
      new Date(),
      new Map(),
      new Owner("123fgc", 8000)
    ),
    new Bus(
      "srdtf234546",
      "NA-345345",
      "asd1234323",
      new Map([
        [1, "d-234466"],
        [2, "d-234553"],
      ]),
      new Map([[1, "c-234466"]]),
      "Badulla",
      new Date(),
      "Colombo",
      new Date(),
      new Map(),
      new Owner("123abc", 1200)
    ),
  ];

  return (
    <ThemedView style={styles.mainBody}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Pressable
          style={[
            styles.addButton,
            { backgroundColor: theme === "dark" ? "#3f3a" : "#3c3" },
          ]}
          onPress={() => router.replace("/index" as Href<string>)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 10,
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size={25}
              color={theme === "dark" ? "#fff" : "#fff"}
              style={{ alignSelf: "center" }}
            />
            <ThemedText type="s4" lightColor={"#fff"} darkColor={"#fff"}>
              Add
            </ThemedText>
          </View>
        </Pressable>
      </View>
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.busDetails}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StarRating rating={1} ratingCount={100} starSize={20} />
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "flex-end",

                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  backgroundColor: "#f60c",
                  gap: 10,
                }}
                onPress={() => router.replace("/index" as Href<string>)}
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  size={iconSize}
                  color={"#fff"}
                  style={{ alignSelf: "center" }}
                />
                <ThemedText type="s6" lightColor={"#fff"} darkColor={"#fff"}>
                  Analytics
                </ThemedText>
              </Pressable>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: 10,
                  borderRadius: 15,
                }}
              >
                <View>
                  <ThemedText
                    type="s6"
                    style={{ textAlign: "left" }}
                    lightColor={iconColor}
                    darkColor={iconColor}
                  >
                    Reg: {item.regNo}
                  </ThemedText>
                  <ThemedText
                    type="s6"
                    style={{ textAlign: "left" }}
                    lightColor={iconColor}
                    darkColor={iconColor}
                  >
                    NTC: {item.ntcNo}
                  </ThemedText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <ThemedText type="h5">{item.departure}</ThemedText>
                <ThemedText type="s6">
                  {StringTime(item.departureTime)}
                </ThemedText>
              </View>

              <View style={styles.horizontalLine}></View>
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                size={18}
                color={"#aaa"}
                style={{ alignSelf: "center" }}
              />
              <View style={styles.horizontalLine}></View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <ThemedText type="h5">{item.terminal}</ThemedText>
                <ThemedText type="s6">
                  {StringTime(item.terminalTime)}
                </ThemedText>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ justifyContent: "space-between" }}>
                <ThemedText type="h6">NTC license numbers</ThemedText>
                <ThemedText
                  type="s6"
                  lightColor={iconColor}
                  darkColor={iconColor}
                >
                  Driver: {item.ntcDriver.get(1)}{" "}
                  {item.ntcDriver.size > 1 ? "  " + item.ntcDriver.get(2) : ""}
                </ThemedText>
                <ThemedText
                  type="s6"
                  lightColor={iconColor}
                  darkColor={iconColor}
                >
                  Conductor: {item.ntcConductor.get(1)}{" "}
                  {item.ntcConductor.size > 1
                    ? "  " + item.ntcConductor.get(2)
                    : ""}
                </ThemedText>
              </View>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  gap: 10,
                }}
                onPress={() => router.replace("/index" as Href<string>)}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  size={iconSize}
                  color={iconColor}
                  style={{ alignSelf: "center" }}
                />
                <ThemedText
                  type="s6"
                  lightColor={iconColor}
                  darkColor={iconColor}
                >
                  Edit
                </ThemedText>
              </Pressable>
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
  busDetails: {
    marginVertical: 5,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#aac4",
  },
  addButton: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  horizontalLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 5,
    borderWidth: 0,
    backgroundColor: "#aaa",
  },
});
