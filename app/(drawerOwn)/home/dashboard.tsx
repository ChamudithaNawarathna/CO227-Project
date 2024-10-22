import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRotateBack, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { EarningsGraph } from "@/components/UIComponents/EarningGraph";
import LoadingScreen from "@/components/CommonScreens/LoadingScreen";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";

interface IncomeData {
  vehicleRegNo: string;
  weekly: {
    receivedData: number[];
    refundData: number[];
    earningData: number[];
    xLabels: string[];
  };
}

export default function Dashboard() {
  const { baseURL, id, credits, myBuses, setMyBuses } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#aaa" : "#777";
  const dropdownOptions = [
    { label: "Earnings", value: "earningData" },
    { label: "Refunds", value: "refundData" },
    { label: "Received", value: "receivedData" },
  ];
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedWeeklyData, setSelectedWeeklyData] =
    useState<string>("earningData");

  //================================================ Functions ===============================================//

  // Transform weekly income data into a graphable form
  const getWeeklyData = (dataType: keyof IncomeData["weekly"]) => {
    if (!incomeData || incomeData.length === 0) return []; // Check for array and length
    const earningsData = incomeData[0].weekly[dataType]; // Access the weekly property of the first item
    return earningsData.map((value, idx) => ({
      label: incomeData[0].weekly.xLabels[idx],
      value: Number(value),
    }));
  };

  //================================================ Backend Calls ===============================================//

  // Fetch income data of each bus seperately
  const fetchIncomeData = async () => {
    setError("");
    try {
      const response = await axios.post(`${baseURL}/bus/incomeIndie`, { id });
      setIncomeData(response.data);
    } catch (error) {
      console.error("Error fetching bus income data:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch owned buses' details
  const fetchBuses = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/bus/mybuses`, { id });
      console.log(response.data);
      setMyBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch bus data");
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch owned buses' details on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

  // Fetch income data of the buses when myBuses updates
  useEffect(() => {
    fetchIncomeData();
  }, [myBuses]);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchBuses} />;
  }

  return (
    <View style={styles.mainBody}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 20,
          paddingVertical: 3,
          paddingHorizontal: 5,
          marginHorizontal: "10%",
        }}
      >
        <ThemedText
          type={"h4"}
          lightColor={"#000"}
          darkColor={"#fff"}
          style={{ marginLeft: 5 }}
        >
          Rs. {credits}
        </ThemedText>
        <Pressable
          style={[
            styles.rechargeButton,
            { borderColor: "#000", borderWidth: 2 },
          ]}
          onPress={() => router.replace("/index" as Href<string>)}
        >
          <ThemedText type="h6" lightColor={"#000"} darkColor={"#fff"}>
            Recharge
          </ThemedText>
        </Pressable>
      </View>
      <ScrollView>
        <View style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginVertical: 10,
            alignItems: 'center'
          }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "flex-start",
            marginHorizontal: 10,
          }}
        >
          <ThemedText style={styles.title}>Weekly</ThemedText>
          <Dropdown
            style={styles.inputDropdown}
            placeholderStyle={{ color: "gray" }}
            data={dropdownOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Data Type"
            value={selectedWeeklyData}
            onChange={(item) => {
              setSelectedWeeklyData(item.value); // Update selected data type for weekly
            }}
          />
        </View>
        <Pressable
        style={{
          backgroundColor: theme === "dark" ? "#555" : "#fff",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginTop: -20,
          borderRadius: 50,
          elevation: 5
        }}
        onPress={fetchIncomeData}
      >
       <FontAwesomeIcon
                icon={faArrowsRotate}
                size={20}
                color={theme === "dark" ? "#ccc" : "#444"}
              />
      </Pressable>
        </View>
        {incomeData.map((vehicle) => (
          <View
            key={vehicle.vehicleRegNo}
            style={{ marginHorizontal: 10, marginVertical: 15 }}
          >
            <ThemedText style={styles.title}>
              Reg No: {vehicle.vehicleRegNo}
            </ThemedText>
            <EarningsGraph
              data={getWeeklyData(
                selectedWeeklyData as keyof IncomeData["weekly"]
              )}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
  },
  rechargeButton: {
    alignItems: "center",
    backgroundColor: "#fff2",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputDropdown: {
    width: 130,
    height: 40,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
