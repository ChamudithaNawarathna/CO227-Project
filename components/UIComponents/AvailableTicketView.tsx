import { View, Text, Pressable, useColorScheme, Alert } from "react-native";
import FullTicketView from "./FullTicketView";
import { useState } from "react";
import {
  faCancel,
  faCircleInfo,
  faDeleteLeft,
  faDumpster,
  faEye,
  faInfo,
  faInfoCircle,
  faLocationDot,
  faMagnifyingGlassLocation,
  faMapLocationDot,
  faRightFromBracket,
  faTrash,
  faTrashAlt,
  faTrashArrowUp,
  faTrashCan,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { DateToString, TimeToString } from "../CommonModules/DateTimeToString";
import { TicketCancelModal } from "@/app/modals/messages/ticketCancel";
import { ThemedText } from "../CommonModules/ThemedText";
import QRCode from "react-native-qrcode-svg";
import { Ticket } from "@/controller/Ticket";

type Props = {
  ticket: Ticket;
};

interface RefundData {
  refNo: string;
  billingDate: string;
  billingTime: string;
  cancelDate: string;
  cancelTime: string;
  duration: string;
  amount: string;
  refund: string;
}

export const AvailableTicketView = ({ ticket }: Props) => {
  const { baseURL, busData } = useAppContext();
  const [displayFullTicket, setDisplayFullTicket] = useState(false);
  const [displayTicketCancel, setDisplayTicketCancel] = useState(false);
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#ccc" : "#777";
  const disabledIconColor = theme === "dark" ? "#666" : "#ccc";
  const iconSize = 20;
  const iconTitleSize = 10;
  const [refundData, setRefundData] = useState<RefundData | null>(null); // Refund Info
  const [loading, setLoading] = useState<boolean>(false); // Loading State

  const handleRefundRequest = async () => {
    setLoading(true);
    let cancelDate = DateToString(new Date());
    let cancelTime = TimeToString(new Date());

    try {
      const response = await axios.post(`${baseURL}/tickets/tkt5`, {
        data: {
          refNo: ticket.ticketNo,
          cancelDate,
          cancelTime,
        },
      });
      setRefundData(response.data);
    } catch (err) {
      Alert.alert(
        "Error",
        "There was an issue processing the refund. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          backgroundColor: theme === "dark" ? "#f91" : "#f91",
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
          <ThemedText type="h6">Origin</ThemedText>
          <ThemedText type="h4">{ticket.fromT}</ThemedText>
          <ThemedText type="h4">
            {ticket.from?.split(",")[0]?.trim()}
          </ThemedText>
        </View>
        <View>
          <ThemedText type="h6">Destination</ThemedText>
          <ThemedText type="h4">{ticket.toT}</ThemedText>
          <ThemedText type="h4">{ticket.to?.split(",")[0]?.trim()}</ThemedText>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
        <ThemedText type="s6" lightColor="#999" darkColor="#ddd">
          {ticket.vehicalNo} | {ticket.org} | {ticket.type} | {ticket.routeNo}{" "}
          {ticket.route}
        </ThemedText>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
          marginBottom: 5,
        }}
      >
        <View>
          <ThemedText type="h6">Price: LKR {ticket.price}</ThemedText>
          <ThemedText type="h6">Seat No(s): {ticket.seatNos}</ThemedText>
        </View>
        <View>
          <ThemedText type="h6">
            Adult: {ticket.full} | Child: {ticket.half}
          </ThemedText>
        </View>
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
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: theme === "dark" ? "#444" : "#eee",
        }}
      >
        <Pressable
          style={{
            padding: 5,
            alignItems: "center",
          }}
          onPress={handleRefundRequest}
          pointerEvents={ticket.cancel ? "auto" : "none"}
        >
          {ticket.cancel ? (
            <FontAwesomeIcon icon={faTrash} size={iconSize} color={iconColor} />
          ) : (
            <FontAwesomeIcon
              icon={faTrash}
              size={iconSize}
              color={disabledIconColor}
            />
          )}
          <Text
            style={{
              fontSize: iconTitleSize,
              color: ticket.cancel ? iconColor : disabledIconColor,
            }}
          >
            Cancel
          </Text>
        </Pressable>
        <Pressable
          style={{
            padding: 5,
            alignItems: "center",
          }}
          onPress={() => setDisplayFullTicket(true)}
        >
          {ticket.tracking ? (
            <FontAwesomeIcon
              icon={faMapLocationDot}
              size={iconSize}
              color={iconColor}
            />
          ) : (
            <FontAwesomeIcon
              icon={faMapLocationDot}
              size={iconSize}
              color={disabledIconColor}
            />
          )}
          <Text
            style={{
              fontSize: iconTitleSize,
              color: ticket.tracking ? iconColor : disabledIconColor,
            }}
          >
            Track Location
          </Text>
        </Pressable>
        <Pressable
          style={{
            padding: 5,
            alignItems: "center",
          }}
          onPress={() => setDisplayFullTicket(true)}
        >
          <FontAwesomeIcon icon={faEye} size={iconSize} color={iconColor} />
          <Text style={{ fontSize: iconTitleSize, color: iconColor }}>
            Full ticket
          </Text>
        </Pressable>
      </View>
      {refundData && (
        <TicketCancelModal
          isVisible={displayTicketCancel}
          onClose={() => setDisplayTicketCancel(false)}
          refNo={refundData.refNo}
          billingDate={refundData.billingDate}
          billingTime={refundData.billingTime}
          cancelDate={refundData.cancelDate}
          cancelTime={refundData.cancelTime}
          duration={refundData.duration}
          amount={refundData.amount}
          refund={refundData.refund}
        />
      )}

      <FullTicketView
        isVisible={displayFullTicket}
        onClose={() => setDisplayFullTicket(false)}
        key={ticket.ticketNo}
        ticket={ticket}
      />
    </View>
  );
};
