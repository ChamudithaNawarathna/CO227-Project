import { ThemedText } from "@/components/CommonModules/ThemedText";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { AppContext, useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { EarningsGraph } from "@/components/UIComponents/EarningGraph";
import { faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dropdown } from "react-native-element-dropdown"; // Ensure to install this or another dropdown package

// Define the income data structure for type safety
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

// Define the dropdown options
const dropdownOptions = [
  { label: "Total Earnings", value: "earningData" },
  { label: "Total Refunds", value: "refundData" },
  { label: "Total Received", value: "receivedData" },
];

export default function Analytics() {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#aaa" : "#777";

  const [incomeData, setIncomeData] = useState<IncomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // State for selected data types for each graph
  const [selectedWeeklyData, setSelectedWeeklyData] =
    useState<string>("earningData");
  const [selectedMonthlyData, setSelectedMonthlyData] =
    useState<string>("earningData");
  const [selectedAnnualData, setSelectedAnnualData] =
    useState<string>("earningData");

  const fetchIncomeData = async () => {
    try {
      const response = await axios.post(`${baseURL}/bus/incomeTotal`, { id });
      setIncomeData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bus income data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  // Function to get data for weekly graph
  const getWeeklyData = (dataType: keyof IncomeData["weekly"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.weekly[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.weekly.xLabels[idx],
      value: Number(value),
    }));
  };

  // Function to get data for monthly and annual graphs
  const getMonthlyData = (dataType: keyof IncomeData["monthly"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.monthly[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.monthly.xLabels[idx],
      value: Number(value),
    }));
  };

  const getAnnualData = (dataType: keyof IncomeData["annual"]) => {
    if (!incomeData) return [];
    const earningData = incomeData.annual[dataType];
    return earningData.map((value, idx) => ({
      label: incomeData.annual.xLabels[idx],
      value: Number(value),
    }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView style={{ backgroundColor: "transparent" }}>
        <Pressable
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            gap: 5,
            alignSelf: "flex-end",
          }}
          onPress={fetchIncomeData}
        >
          <FontAwesomeIcon
            icon={faArrowRotateBack}
            size={18}
            color={iconColor}
            style={{ alignSelf: "center" }}
          />
          <ThemedText type="s5" lightColor={iconColor} darkColor={iconColor}>
            Refresh
          </ThemedText>
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
