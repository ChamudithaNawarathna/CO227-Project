import {
    Modal,
    Pressable,
    StyleSheet,
    useColorScheme,
    View,
  } from "react-native";
  import { ThemedView } from "@/components/CommonModules/ThemedView";
  import { ThemedText } from "@/components/CommonModules/ThemedText";
  import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
  import { faXmark } from "@fortawesome/free-solid-svg-icons";
  import { router } from "expo-router";
  import { useState } from "react";
  import {Seat44Layout, Seat54Layout} from "@/components/UIComponents/SeatLayouts";
  import { AppProvider, useAppContext } from "@/context/AppContext";
  import { Ticket } from "@/controller/Ticket";
  
  export default function QuickTicketModal() {
    
    return (
      <View></View>
    );
  }
  
  const styles = StyleSheet.create({
    pageBody: {
      flex: 1,
      paddingHorizontal: 10,
      borderRadius: 30,
    },
    titleContainer: {
      backgroundColor: "transparent",
      padding: 10,
      alignItems: "center",
    },
    cancelIcon: {
      marginHorizontal: 10,
      marginTop: 10,
      flexDirection: "row",
      alignSelf: "flex-end",
    },
  });
  