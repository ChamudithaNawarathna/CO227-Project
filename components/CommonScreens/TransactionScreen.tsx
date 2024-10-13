import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAppContext } from "@/context/AppContext";
import { DateToString } from "@/components/CommonModules/DateTimeToString";
import axios from "axios";

interface TransactionData {
  id: string;
  date: string;
  time: string;
  description: string;
  amount: string;
}

export default function TransactionScreen() {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconSize = 20;
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const fetchTransactionHistory = async () => {
    const data: TransactionData[] = [
      {
        id: "000018",
        date: "2024-09-17",
        time: "20:21",
        description: "The ticket refund",
        amount: "90.00",
      },
      {
        id: "000019",
        date: "2024-09-18",
        time: "14:35",
        description: "Grocery shopping",
        amount: "150.00",
      },
      {
        id: "000020",
        date: "2024-09-19",
        time: "09:15",
        description: "Online subscription",
        amount: "12.99",
      },
      {
        id: "000021",
        date: "2024-09-20",
        time: "18:45",
        description: "Dinner at restaurant",
        amount: "45.50",
      },
      {
        id: "000022",
        date: "2024-09-21",
        time: "11:00",
        description: "Book purchase",
        amount: "25.00",
      },
    ];
    setTransactions(data);
    console.log(data);
    return;

    try {
      // const response = await axios.get(`${baseURL}/transactions/trans1`, {
      //   params: {
      //     data: id,
      //   },
      // });
      // if (response.status === 200) {
      //   setTransactions(response.data.transaction);
      // }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      Alert.alert(
        "Error",
        "Failed to fetch transaction history. Please try again."
      );
    }
  };

  useEffect(() => {
    if (transactions.length == 0) {
      fetchTransactionHistory();
    }
  }, []);

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Pressable
        onPress={fetchTransactionHistory}
        style={{
          backgroundColor: "#77f",
          alignItems: "center",
          borderRadius: 15,
          paddingVertical: 5,
          marginVertical: 15,
        }}
      >
        <ThemedText type="h5" lightColor="#fff">
          Refresh
        </ThemedText>
      </Pressable>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
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
                backgroundColor: "#2af",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                Reference No: {item.id}
              </ThemedText>
              <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                {item.date}
                {` / `}
                {item.time}
              </ThemedText>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}
            >
              <ThemedText type="h5">{item.description}</ThemedText>
              <ThemedText type="h5">LKR {item.amount}</ThemedText>
            </View>
          </View>
        )}
      />
    </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#aaa4",
  },
});
