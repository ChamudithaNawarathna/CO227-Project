import { useEffect, useRef, useState } from "react";
import React from "react";
import * as FileSystem from "expo-file-system";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import axios from "axios";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import {
  DateTimeInputSquare,
  BusStopSearchInput,
} from "@/components/FormComponents/FormInputField";
import SeatsModal from "@/app/modals/seatsModal";
import { DateToString } from "@/components/CommonModules/DateTimeToString";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";
import QuickTicketModal from "@/app/modals/messages/quickTicketModal";

interface Schedule {
  id: string;
  from: string;
  to: string;
  regNo: string;
  service: string;
  routeType: string;
  routeNo: string;
  org: string;
  booked: string;
  seats: number;
  closing: string;
  departure: string;
  arrival: string;
  journey: string;
  price: string;
}

interface BusStop {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

type BusStopIDs = {
  fromID: string;
  toID: string;
};

export default function Tickets() {
  const { baseURL, discount } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconSize = 20;
  const folderUri = FileSystem.documentDirectory + "docs";
  const fileUri = folderUri + "/busStops.json";
  const today = new Date().toLocaleDateString("en-CA");
  const [displaySeatsModel, setDisplaySeatsModel] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [seats, setSeats] = useState(54);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [displayQTModal, setDisplayQTModal] = useState(false);
  const [busStopIDs, setBusStopIDs] = useState<BusStopIDs>({
    fromID: "",
    toID: "",
  });
  const inputRefs = useRef(
    Array.from({ length: 2 }, () => React.createRef<TextInput>())
  );

  //================================================ Functions ===============================================//

  // Find bus stop ID of a given two bus stops
  const findBusStopID = async (from: string, to: string) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const parsedData = JSON.parse(fileContent);

      // Find the bus stop with the matching 'from' name
      const fromBusStop = parsedData.find(
        (stop: any) => stop.name.toLowerCase() === from.toLowerCase()
      );

      // Find the bus stop with the matching 'to' name
      const toBusStop = parsedData.find(
        (stop: any) => stop.name.toLowerCase() === to.toLowerCase()
      );

      if (fromBusStop && toBusStop) {
        console.log(
          `From Bus Stop ID: ${fromBusStop.id}, To Bus Stop ID: ${toBusStop.id}`
        );
        setBusStopIDs({ fromID: fromBusStop.id, toID: toBusStop.id });
      } else {
        console.error("Bus stop(s) not found");
        setBusStopIDs({ fromID: "", toID: "" });
      }
    } catch (error) {
      console.error("Failed to load bus stops: ", error);
      setBusStopIDs({ fromID: "", toID: "" });
    }
  };

  // Save fetched bus stops in a JSON file
  const saveToFile = async () => {
    try {
      // Check if the 'docs' folder exists, if not, create it
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        console.log("Docs folder created");
      }

      // Convert bus stop data to JSON string
      const jsonString = JSON.stringify(busStops, null, 2);

      // Write the JSON string to a file inside the 'docs' folder
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log(`File saved successfully at: ${fileUri}`);
    } catch (error) {
      Alert.alert("Error", "Failed to save file.");
      console.error("Error writing file: ", error);
    }
  };

  // Fetch bus schedules if the inputs are given
  const handleSearch = () => {
    if (!from || !to || !date) {
      Alert.alert(
        "Error",
        "Please choose 'from' and 'to' locations and the date."
      );
      return;
    }
    fetchSchedules();
  };

  function checkQTAvailability(closingDate: string) {
    if (closingDate <= today) {
      return true;
    } else {
      return false;
    }
  }

  // Display seat layout to choose seat(s)
  const pressBuy = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setSeats(schedule.seats);
    setDisplaySeatsModel(true);
  };

  const pressQuickTicket = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setDisplayQTModal(true);
  };

  //================================================ Backend Calls ===============================================//

  // Fetch bus schedules that satisfy input conditions
  const fetchSchedules = async () => {
    setLoading(true);
    setError("");

    try {
      await findBusStopID(from, to);

      const localDate = date.toLocaleDateString("en-CA");

      const response = await axios.post(`${baseURL}/schedule/sdl1`, {
        data: {
          from: busStopIDs?.fromID,
          to: busStopIDs?.toID,
          date: localDate,
        },
      });

      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching bus schedules:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch bus schedule data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch bus stops
  const fetchBusStops = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${baseURL}/busstops/names`);
      setBusStops(response.data);
    } catch (err) {
      console.error("Error fetching bus stops:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch bus stop data");
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Save the busStops in a file when busStops updates
  useEffect(() => {
    if (busStops.length > 0) {
      saveToFile();
    }
  }, [busStops]);

  // Fetch the bus stop names on component mount
  useEffect(() => {
    if (busStops.length == 0) {
      fetchBusStops();
    }
  }, []);

  //================================================ UI Control ===============================================//

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchBusStops} />;
  }

  return (
    <View style={styles.mainBody}>
      <BusStopSearchInput
        ref={inputRefs.current[0]}
        nextFocus={inputRefs.current[1]}
        input={from}
        setInput={setFrom}
        placeholder="From"
        iconName={faLocationCrosshairs}
        layer={3}
      />

      <BusStopSearchInput
        ref={inputRefs.current[1]}
        input={to}
        setInput={setTo}
        placeholder="To"
        iconName={faLocationDot}
        layer={2}
      />

      <View style={{ backgroundColor: "transparent" }}>
        <DateTimeInputSquare
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
                console.log(selectedDate.toLocaleString()); // Converts to local string
              }
              setOpenDate(false);
            }}
          />
        )}
      </View>

      {/********************************************* Search Result ****************************************************/}

      <Pressable
        onPress={handleSearch}
        style={{
          backgroundColor: "#60c0ff",
          alignItems: "center",
          borderRadius: 10,
          paddingVertical: 10,
          marginVertical: 7,
          marginHorizontal: 7,
        }}
      >
        <ThemedText type="h5" lightColor="#fff">
          Search
        </ThemedText>
      </Pressable>

      {loading ? (
        <View style={{ marginTop: 200, alignItems: "center" }}>
          <ActivityIndicator
            size={70}
            color={theme === "dark" ? "#ddd" : "#777"}
          />
        </View>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 15,
                borderRadius: 10,
                backgroundColor: theme === "dark" ? "#555" : "#fff",
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: theme === "dark" ? "#f91" : "#f91",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                  Booking Closing Date: {item.closing}
                </ThemedText>
              </View>
              <View style={{ margin: 10 }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <ThemedText type="h6">Origin</ThemedText>
                    <ThemedText type="h4">{item.departure}</ThemedText>
                    <ThemedText type="h4">
                      {item.from?.split(",")[0]?.trim()}
                    </ThemedText>
                  </View>
                  <View>
                    <ThemedText type="h6">Destination</ThemedText>
                    <ThemedText type="h4">{item.arrival}</ThemedText>
                    <ThemedText type="h4">
                      {item.to?.split(",")[0]?.trim()}
                    </ThemedText>
                  </View>
                </View>
                <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                  <ThemedText type="s6" lightColor="#999" darkColor="#ddd">
                    {item.org} | {item.service} | {item.routeType} | Route:{" "}
                    {item.routeNo}
                  </ThemedText>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 5,
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <ThemedText type="h4">Price: LKR {item.price}</ThemedText>
                  </View>
                  <View style={{ justifyContent: "space-between" }}>
                    {checkQTAvailability(item.closing) ? (
                      <Pressable
                        style={{
                          flex: 1,
                          alignSelf: "center",
                          backgroundColor: "#59f",
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          marginVertical: 10,
                          borderRadius: 50,
                          alignItems: "center",
                        }}
                        onPress={() => pressQuickTicket(item)}
                      >
                        <ThemedText type="h4" lightColor="#fff">
                          Quick Ticket
                        </ThemedText>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={{
                          flex: 1,
                          alignSelf: "center",
                          backgroundColor: "#e28",
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          marginVertical: 10,
                          borderRadius: 50,
                          alignItems: "center",
                        }}
                        onPress={() => pressBuy(item)}
                      >
                        <ThemedText type="h4" lightColor="#fff">
                          Buy Ticket
                        </ThemedText>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
      {selectedSchedule && (
        <SeatsModal
          isVisible={displaySeatsModel}
          onClose={() => setDisplaySeatsModel(false)}
          scheduleId={selectedSchedule.id}
          seats={seats}
          departureDate={DateToString(date)}
          aproxDepT={selectedSchedule.departure}
          aproxAriT={selectedSchedule.arrival}
          journey={selectedSchedule.journey}
          fromID={busStopIDs.fromID}
          toID={busStopIDs.toID}
          unitPrice={Number(selectedSchedule.price)}
          discount={discount}
        />
      )}
      {selectedSchedule && (
        <QuickTicketModal
          isVisible={displayQTModal}
          onClose={() => setDisplayQTModal(false)}
          scheduleId={selectedSchedule.id}
          departureDate={DateToString(date)}
          aproxDepT={selectedSchedule.departure}
          aproxAriT={selectedSchedule.arrival}
          journey={selectedSchedule.journey}
          fromID={busStopIDs.fromID}
          toID={busStopIDs.toID}
          unitPrice={Number(selectedSchedule.price)}
          discount={discount}
        />
      )}

      {schedules.length == 0 && !loading && (
        <View style={{ alignSelf: "center", marginBottom: 200 }}>
          <ThemedText type="s5" lightColor="#666" darkColor="#ccc">
            No buses are available
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    marginHorizontal: 15,
    marginVertical: 5,
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
    marginTop: 10,
    marginHorizontal: 10,
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
  },
  itemSubText: {
    fontSize: 14,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  listContainer: {
    marginTop: 20,
    height: 200,
    backgroundColor: "green",
  },
  busStopItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#4565",
    borderRadius: 5,
  },
  busStopText: {
    fontSize: 16,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  scheduleItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    borderRadius: 5,
  },
  scheduleText: {
    fontSize: 16,
  },
});
