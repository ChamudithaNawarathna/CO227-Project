import { ThemedText } from "@/components/CommonModules/ThemedText";
import {
  faLocationDot,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  DateTimeInputSquare,
  BusStopSearchInput,
} from "@/components/FormComponents/FormInputField";
import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useAppContext } from "@/context/AppContext";
import BusView from "@/components/UIComponents/BusView";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import SeatsModal from "@/app/modals/seatsModal";
import { DateToString } from "@/components/CommonModules/DateTimeToString";

interface TicketData {
  userID: number;
  issuedDate: string;
  issuedTime: string;
  date: string;
  aproxDepT: string;
  aproxAriT: string;
  from: { id: number };
  to: { id: number };
  journey: number;
  half: number;
  full: number;
  unitPrice: number;
  totalPrice: number;
  seatNos: string[];
  scheduleId: number;
  discount: number;
}

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
  seats: string;
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
  const { baseURL} = useAppContext();
  const iconSize = 20;
  const [displaySeatsModel, setDisplaySeatsModel] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  const inputRefs = useRef(
    Array.from({ length: 2 }, () => React.createRef<TextInput>())
  );

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const folderUri = FileSystem.documentDirectory + "docs";
  const fileUri = folderUri + "/busStops.json";
  const [busStopIDs, setBusStopIDs] = useState<BusStopIDs>({
    fromID: "",
    toID: "",
  });

  const TicketBookingScreen = () => {
    const [ticketData, setTicketData] = useState<TicketData>({
      userID: 1, // Replace with actual user ID
      issuedDate: "",
      issuedTime: "",
      date: "",
      aproxDepT: "",
      aproxAriT: "",
      from: { id: 0 },
      to: { id: 0 },
      journey: 0,
      half: 0,
      full: 0,
      unitPrice: 0,
      totalPrice: 0,
      seatNos: [],
      scheduleId: 0,
      discount: 0,
    });

    const handleInputChange = (field: keyof TicketData, value: any) => {
      setTicketData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post(`${baseURL}/tickets/tkt3`, {
          data: ticketData,
        });
        if (response.data === "success") {
          Alert.alert("Success", "Ticket booked successfully!");
        } else if (response.data === "insufficient") {
          Alert.alert("Error", "Insufficient credits for booking.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to book ticket.");
      }
    };
  };

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

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      await findBusStopID(from, to);
      const response = await axios.post(`${baseURL}/schedule/sdl1`, {
        data: {
          from: busStopIDs?.fromID,
          to: busStopIDs?.toID,
          date: date.toISOString().split("T")[0], // format date as YYYY-MM-DD
        },
      });

      setSchedules(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load schedules. Please try again.");
      setLoading(false);
    }
  };

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

  const fetchBusStops = async () => {
    try {
      const response = await axios.get(`${baseURL}/busstops/names`);
      setBusStops(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load bus stop names.");
      setLoading(false);
    }
  };

  const saveToFile = async () => {
    try {
      // Step 1: Check if the 'docs' folder exists, if not, create it
      const folderInfo = await FileSystem.getInfoAsync(folderUri);
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        console.log("Docs folder created");
      }

      // Step 2: Convert bus stop data to JSON string
      const jsonString = JSON.stringify(busStops, null, 2);

      // Step 3: Write the JSON string to a file inside the 'docs' folder
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      Alert.alert("Success", `File saved successfully at: ${fileUri}`);
      console.log(`File saved successfully at: ${fileUri}`);
    } catch (error) {
      Alert.alert("Error", "Failed to save file.");
      console.error("Error writing file: ", error);
    }
  };

  const pressBuy = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setDisplaySeatsModel(true);
  };

  // Log the updated busStops after they are set
  useEffect(() => {
    if (busStops.length > 0) {
      saveToFile();
    }
  }, [busStops]);

  // Fetch the bus stops
  useEffect(() => {
    if (busStops.length == 0) {
      fetchBusStops();
    }
  }, []);

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
          backgroundColor: "#77f",
          alignItems: "center",
          borderRadius: 10,
          paddingVertical: 10,
          marginVertical: 7,
          marginHorizontal: 7
        }}
      >
        <ThemedText type="h5" lightColor="#fff">
          Search
        </ThemedText>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>
              {item.from} to {item.to}
            </Text>
            <Text style={styles.scheduleText}>Bus Reg: {item.regNo}</Text>
            <Text style={styles.scheduleText}>Departure: {item.departure}</Text>
            <Text style={styles.scheduleText}>Arrival: {item.arrival}</Text>
            <Text style={styles.scheduleText}>Journey: {item.journey} km</Text>
            <Text style={styles.scheduleText}>Price: {item.price} LKR</Text>
            <Pressable onPress={() => pressBuy(item)}>
              <Text>Buy</Text>
            </Pressable>
          </View>
        )}
      />
      {selectedSchedule && (
        <SeatsModal
          isVisible={displaySeatsModel}
          onClose={() => setDisplaySeatsModel(false)}
          scheduleId={selectedSchedule.id}
          departureDate={DateToString(date)}
          aproxDepT={selectedSchedule.departure}
          aproxAriT={selectedSchedule.arrival}
          journey={selectedSchedule.journey}
          fromID={busStopIDs.fromID}
          toID={busStopIDs.toID}
          unitPrice={Number(selectedSchedule.price)}
          discount={0} // Change accordingly
        />
      )}

      {schedules.length == 0 && (
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
