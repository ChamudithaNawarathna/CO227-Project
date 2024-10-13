import { Ticket } from "@/controller/Ticket";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  useColorScheme,
} from "react-native";
import StringToDate from "../CommonModules/StringToDateTime";
import { useAppContext } from "@/context/AppContext";
import Modal from "react-native-modal";
import { DateToString, TimeToString } from "../CommonModules/DateTimeToString";
import { ThemedText } from "../CommonModules/ThemedText";
import { faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import QRCode from "react-native-qrcode-svg";

type Props = {
  isVisible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  ticket: Ticket;
};

const FullTicketView = ({ isVisible, onClose, ticket }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Modal isVisible={isVisible}>
      <Pressable style={styles.cancelIcon} onPress={onClose}>
        <FontAwesomeIcon icon={faXmark} size={32} color={"#ccc"} />
      </Pressable>
      <View
        style={{
          backgroundColor: theme === "dark" ? "#555" : "#fff",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#f91",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <QRCode
            value={`${ticket.vehicalNo}|${TimeToString(ticket.departure)}|${ticket.from?.split(",")[0]?.trim()}|${ticket.to?.split(",")[0]?.trim()}|${ticket.seatNos}|${ticket.full}|${ticket.half}`}
            size={70}
            color="#fff"
            backgroundColor="transparent"
          />
          <View>
            <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
              Reference No: {ticket.ticketNo}
            </ThemedText>
            <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
              Departure: {DateToString(ticket.departure)}
              {` / `}
              {TimeToString(ticket.departure)}
            </ThemedText>
            <ThemedText type="h6" lightColor="#fff" darkColor="#fff">
              Booked on: {DateToString(ticket.bookedDate)}
              {` / `}
              {TimeToString(ticket.bookedDate)}
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View>
            <ThemedText type="h6" darkColor="#fff">
              Origin
            </ThemedText>
            <ThemedText type="h4" darkColor="#fff">
              {ticket.fromT}
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <ThemedText type="h4" darkColor="#fff">
                {ticket.from?.split(",")[0]?.trim()}
              </ThemedText>
            </View>
          </View>
          <View>
            <ThemedText type="h6" darkColor="#fff">
              Destination
            </ThemedText>
            <ThemedText type="h4" darkColor="#fff">
              {ticket.toT}
            </ThemedText>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <ThemedText type="h4" darkColor="#fff">
                {ticket.to?.split(",")[0]?.trim()}
              </ThemedText>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <ThemedText type="h5" lightColor="#575050" darkColor="#ddd">
              Bus
            </ThemedText>
            <ThemedText type="s5" lightColor="#888" darkColor="#aaa">
              {ticket.vehicalNo}
            </ThemedText>
          </View>

          <View style={{ alignItems: "center" }}>
            <ThemedText type="h5" lightColor="#575050" darkColor="#ddd">
              Type
            </ThemedText>
            <ThemedText type="s5" lightColor="#888" darkColor="#aaa">
              {ticket.type}
            </ThemedText>
          </View>

          <View style={{ alignItems: "center" }}>
            <ThemedText type="h5" lightColor="#575050" darkColor="#ddd">
              Distance
            </ThemedText>
            <ThemedText type="s5" lightColor="#888" darkColor="#aaa">
              {ticket.distance} km
            </ThemedText>
          </View>

          <View style={{ alignItems: "center" }}>
            <ThemedText type="h5" lightColor="#575050" darkColor="#ddd">
              Route
            </ThemedText>
            <ThemedText type="s5" lightColor="#888" darkColor="#aaa">
              {ticket.routeNo}
            </ThemedText>
          </View>
        </View>

        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Route:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              {ticket.routeNo} {ticket.route}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Organization:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              {ticket.org}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Adults:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              {ticket.full}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Children:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              {ticket.half}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Unit Price:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              LKR {ticket.unitPrice}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Discount:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              {ticket.discount} %
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ThemedText type="h5">Price:</ThemedText>
            <ThemedText type="h5" lightColor="#666" darkColor="#c0c0c0">
              LKR {ticket.price}
            </ThemedText>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <ThemedText type="h4" darkColor="#fff">
            Seat No(s): {ticket.seatNos}
          </ThemedText>
        </View>

        {ticket.tracking && (
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} size={14} color={"#f91"} />
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "#f91" }}>
              Tracking is available
            </Text>
          </View>
        )}
        {!ticket.tracking && (
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} size={14} color={"#f91"} />
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "#f91" }}>
              Tracking is available 5 min before the bus departure
            </Text>
          </View>
        )}

        <View
          style={{
            margin: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <QRCode
            value={`${ticket.vehicalNo}|${TimeToString(ticket.departure)}|${ticket.from?.split(",")[0]?.trim()}|${ticket.to?.split(",")[0]?.trim()}|${ticket.seatNos}|${ticket.full}|${ticket.half}`}
            size={200}
            color={theme === "dark" ? "#fff" : "#000"}
            backgroundColor="transparent"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cancelIcon: {
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default FullTicketView;
