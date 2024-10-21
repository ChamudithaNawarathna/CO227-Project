import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

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
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //================================================ Backend Calls ===============================================//

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    setLoading(true);
    setError("");
    setTransactions([]); // Reset transactions before fetching

    try {
      const response = await axios.get(`${baseURL}/transactions/trans1`, {
        params: {
          data: id,
        },
      });

      if (response.status === 200) {
        // Set transactions only if available
        if (response.data.transaction && response.data.transaction.length > 0) {
          setTransactions(response.data.transaction);
        } else {
          setTransactions([]); // No transactions available
        }
      }
    } catch (error: unknown) {
      // Explicitly type the error
      if (axios.isAxiosError(error)) {
        // Handle specific Axios errors
        if (error.response && error.response.status === 404) {
          // Handle "no transactions" case
          setTransactions([]); // Ensure empty state is handled in UI
        } else {
          // Handle other Axios errors (like network issues)
          console.error("Error fetching transaction history:", error);
          setError("Failed to fetch transaction history");
          Alert.alert("Error", "Failed to fetch transaction history");
        }
      } else {
        // Handle non-Axios errors
        console.error("Unexpected error:", error);
        setError("Failed to fetch transaction history");
        Alert.alert("Error", "Failed to fetch transaction history");
      }
    } finally {
      setLoading(false);
    }
  };

  //================================================ Use Effects ===============================================//

  // Fetch transaction history on component mount
  useEffect(() => {
    if (transactions.length == 0) {
      fetchTransactionHistory();
    }
  }, []);

  //================================================ UI Control ===============================================//

  if (loading) {
    return <LoadingScreen />;
  }

  if (error !== "" && !loading) {
    return <ErrorScreen error={error} retry={fetchTransactionHistory} />;
  }

  return (
    <ScrollView>
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

        {transactions.length > 0 ? (
          transactions.map((trans) => (
            <View
              key={trans.id}
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
                  Reference No: {trans.id}
                </ThemedText>
                <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
                  {trans.date}
                  {` / `}
                  {trans.time}
                </ThemedText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <ThemedText type="h5">{trans.description}</ThemedText>
                <ThemedText type="h5">LKR {trans.amount}</ThemedText>
              </View>
            </View>
          ))
        ) : (
          <View style={{ flex: 1, alignItems: "center", marginTop: 250 }}>
            <ThemedText type="h5" lightColor="#777" darkColor="#ddd">
              No transactions found
            </ThemedText>
          </View>
        )}
      </View>
    </ScrollView>
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
