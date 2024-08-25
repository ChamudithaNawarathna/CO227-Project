import { Ticket } from "@/controller/Ticket";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { StringDate, StringTime } from "../Common/StringDateTime";

type Props = {
  ticket: Ticket;
};

export const CreditCardView = ({ ticket }: Props) => {
  const theme = useColorScheme() ?? "light";
  const creditCardType = require("credit-card-type");

  const cardNumber = "3411111111111111";
  const cardInfo = creditCardType(cardNumber);

  const logos : any = {
    'visa': require('@/assets/logos/V.png'),
    'mastercard': require('@/assets/logos/MA.png'),
   'american-express': require('@/assets/logos/AXP.png'),
  };

  return (
    <View
      style={[
        styles.ticketBody,
        { backgroundColor: theme === "dark" ? "#444e" : "#fff" },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <QRCode
          value={ticket.id.toString()}
          backgroundColor="transparent"
          size={60}
          color={theme === "dark" ? "#ccc" : "#555"}
        />
        <View>
          <ThemedText
            style={styles.ticketStatus}
            lightColor="#fff"
            darkColor="#fff"
          >
            {ticket.status}
            {cardInfo[0].type}
          </ThemedText>
          <ThemedText type="s6">Ref: {ticket.id}</ThemedText>
        </View>
      </View>

      <View style={{ flexDirection: "column", marginTop: -30 }}>
        <ThemedText type="h4" style={{ alignSelf: "center" }}>
          {ticket.title}
        </ThemedText>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <ThemedText type="s6">
            Route: {ticket.routeNo} {ticket.departure} - {ticket.terminal}
          </ThemedText>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <ThemedText type="h6">Seat</ThemedText>
            <ThemedText type="s6">{ticket.seat}</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <ThemedText type="h6">Date</ThemedText>
            <ThemedText type="s6">
              {StringDate(ticket.departureTime)}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <ThemedText type="h6">Time</ThemedText>
            <ThemedText type="s6">
              {StringTime(ticket.departureTime)}
            </ThemedText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <ThemedText type="h5">{ticket.startLocation}</ThemedText>
          <View style={styles.horizontalLine}></View>
          <ThemedText type="h5">{ticket.duration}</ThemedText>
          <View style={styles.horizontalLine}></View>
          <ThemedText type="h5">{ticket.endLocation}</ThemedText>
        </View>
        <ThemedText type="h3" style={{ alignSelf: "center" }}>
          Rs. {ticket.price}
        </ThemedText>
        <Image
      source={logos[cardInfo[0].type]}
      style={styles.logo}
    />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketBody: {
    elevation: 3,
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  collapsedTicketBody: {
    flex: 1,
    flexDirection: "row",
  },
  ticketStatus: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#2c1",
    borderRadius: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 5,
    borderWidth: 0,
    backgroundColor: "#aaa",
  },
  verticalLine: {
    flex: 0.02,
    marginHorizontal: 5,
    borderWidth: 0,
    backgroundColor: "#aaa",
  },
  barcode: {
    margin: 10,
    height: 50,
    width: 300,
    alignSelf: "center",
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 35,
    backgroundColor: '#000'
  },
});
