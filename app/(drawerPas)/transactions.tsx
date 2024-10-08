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
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAppContext } from "@/context/AppContext";
import { DateToString } from "@/components/CommonModules/DateTimeToString";
import axios from "axios";

interface TransactionData {
id: string, date: string, time: string, description: string, amount: string
}

export default function Transactions() {
  const { baseURL, id } = useAppContext();
  const theme = useColorScheme() ?? "light";
  const iconSize = 20;
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(`${baseURL}/transactions/trans1`, {
        params: {
          data: id,
        },
      });

      if (response.status === 200) {
        setTransactions(response.data.transaction);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      Alert.alert('Error', 'Failed to fetch transaction history. Please try again.');
    }
  };

  useEffect(() => {
    if (transactions.length == 0) {
fetchTransactionHistory();
    }
  }, []);


  return (
    <View style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 20, marginBottom: 10 }}>Transaction History</ThemedText>
      
      <ThemedText>User ID:</ThemedText>
      <Button title="Refresh" onPress={fetchTransactionHistory} />

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, padding: 10, borderWidth: 1 }}>
            <ThemedText>ID: {item.id}</ThemedText>
            <ThemedText>Date: {item.date}</ThemedText>
            <ThemedText>Time: {item.time}</ThemedText>
            <ThemedText>Description: {item.description}</ThemedText>
            <ThemedText>Amount: LKR {item.amount}</ThemedText>
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
