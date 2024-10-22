import { useEffect, useState } from "react";
import axios from "axios";
import { faArrowRotateBack, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dropdown } from "react-native-element-dropdown";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { EarningsGraph } from "@/components/UIComponents/EarningGraph";
import ErrorScreen from "@/components/CommonScreens/ErrorScreen";

interface IncomeData {
  weekly: {
    receivedData: number[];
    refundData: number[];
    earningData: number[];
    xLabels: string[];
  };
  monthly: {
    receivedData: number[];
    refundData: number[];
    earningData: number[];
    xLabels: string[];
  };
  annual: {
    receivedData: number[];
    refundData: number[];
    earningData: number[];
    xLabels: string[];
  };
}

export default function Analytics() {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#aaa" : "#777";
  const dropdownOptions = [
    { label: "Total Earnings", value: "earningData" },
    { label: "Total Refunds", value: "refundData" },
    { label: "Total Received", value: "receivedData" },
  ];
  const [incomeData, setIncomeData] = useState<IncomeData | null>(null);
  const [selectedWeeklyData, setSelectedWeeklyData] =
    useState<string>("earningData");
  const [selectedMonthlyData, setSelectedMonthlyData] =
    useState<string>("earningData");
  const [selectedAnnualData, setSelectedAnnualData] =
    useState<string>("earningData");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //============================================== Functions ===============================================//

  // Function to get data for weekly graph
  const getWeeklyData = (dataType: keyof IncomeData["weekly"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.weekly[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.weekly.xLabels[idx],
      value: Number(value),
    }));
  };

  // Function to transform data for monthly graph
  const getMonthlyData = (dataType: keyof IncomeData["monthly"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.monthly[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.monthly.xLabels[idx],
      value: Number(value),
    }));
  };

  // Function to transform data for annual graph
  const getAnnualData = (dataType: keyof IncomeData["annual"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.annual[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.annual.xLabels[idx],
      value: Number(value),
    }));
  };

  //============================================== Backend Calls ===============================================//

  // Fetch total income data
  const fetchIncomeData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/bus/incomeTotal`, { id });
      setIncomeData(response.data);
    } catch (error) {
      console.error("Error fetching total bus income data:", error);
      setError(String(error));
      Alert.alert("Error", "Failed to fetch total income data");
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch total income data on component mount
  useEffect(() => {
    fetchIncomeData();
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchIncomeData} />;
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "transparent" }}>
      <Pressable
        style={{
          backgroundColor: theme === "dark" ? "#555" : "#fff",
          alignSelf: 'flex-end',
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
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

        {incomeData && (
          <View style={{ marginHorizontal: 5 }}>
            <View
              style={{
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-start",
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
              <EarningsGraph
                data={getWeeklyData(
                  selectedWeeklyData as keyof IncomeData["weekly"]
                )}
              />
            </View>

            <View
              style={{
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-start",
                }}
              >
                <ThemedText style={styles.title}>Monthly</ThemedText>
                <Dropdown
                  style={styles.inputDropdown}
                  placeholderStyle={{ color: "gray" }}
                  data={dropdownOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Data Type"
                  value={selectedMonthlyData}
                  onChange={(item) => {
                    setSelectedMonthlyData(item.value); // Update selected data type for monthly
                  }}
                />
              </View>
              <EarningsGraph
                data={getMonthlyData(
                  selectedMonthlyData as keyof IncomeData["monthly"]
                )}
              />
            </View>

            <View
              style={{
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-start",
                  marginHorizontal: 10,
                }}
              >
                <ThemedText style={styles.title}>Annual</ThemedText>
                <Dropdown
                  style={styles.inputDropdown}
                  placeholderStyle={{ color: "gray" }}
                  data={dropdownOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Data Type"
                  value={selectedAnnualData}
                  onChange={(item) => {
                    setSelectedAnnualData(item.value); // Update selected data type for annual
                  }}
                />
              </View>
              <EarningsGraph
                data={getAnnualData(
                  selectedAnnualData as keyof IncomeData["annual"]
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputDropdown: {
    height: 40,
    width: 150,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
