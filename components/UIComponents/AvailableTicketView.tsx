import { View, Text, Pressable, useColorScheme, Alert } from "react-native";
import FullTicketView from "./FullTicketView";
import { useState } from "react";
import {
  faDumpster,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { DateToString, TimeToString } from "../CommonModules/DateTimeToString";
import { TicketCancelModal } from "@/app/modals/messages/ticketCancel";

type Props = {
  refNo: string;
  date: string;
  from: string;
  to: string;
  departure: string;
  fromT: string;
  toT: string;
  seats: string;
  full: string;
  half: string;
  price: string;
  regNo: string;
  org: string;
  service: string;
  route: string;
  tracking: boolean;
  cancel: boolean;
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

export const AvailableTicketView = ({
  refNo,
  date,
  from,
  to,
  departure,
  fromT,
  toT,
  seats,
  full,
  half,
  price,
  regNo,
  org,
  service,
  route,
  tracking,
  cancel,
}: Props) => {
  const { baseURL, busData } = useAppContext();
  const [displayFullTicket, setDisplayFullTicket] = useState(false);
  const [displayTicketCancel, setDisplayTicketCancel] = useState(false);
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 24;
  const [refundData, setRefundData] = useState<RefundData | null>(null); // Refund Info
  const [loading, setLoading] = useState<boolean>(false); // Loading State

  const handleRefundRequest = async () => {
    setLoading(true);
    let cancelDate = DateToString(new Date());
    let cancelTime = TimeToString(new Date());

    try {
      const response = await axios.post(`${baseURL}/tickets/tkt5`, {
        data: {
          refNo,
          cancelDate,
          cancelTime,
        },
      });

      setRefundData(response.data); // Store refund data
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
    <Pressable
      style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
      onPress={() => setDisplayFullTicket(true)}
    >
      <Text style={{ fontWeight: "bold" }}>Ticket No: {refNo}</Text>
      <Text>Date: {date}</Text>
      <Text>
        From: {from} - To: {to}
      </Text>
      <Text>
        From: {fromT} - To: {toT}
      </Text>
      <Text>Departure: {departure}</Text>
      <Text>Seats: {seats}</Text>
      <Text>Price: {price}</Text>
      <Text>Vehicle Reg No: {regNo}</Text>
      <Text>Organization: {org}</Text>
      <Text>Service: {service}</Text>
      <Text>Route: {route}</Text>
      <Text>
        Full: {full} Half: {half}
      </Text>
      <Text>Tracking Enabled: {tracking ? "Yes" : "No"}</Text>
      <Text>Can Cancel: {cancel ? "Yes" : "No"}</Text>

      <View style={{ flexDirection: "row", backgroundColor: "green" }}>
        <Pressable
          style={{
            padding: 15,
          }}
          onPress={handleRefundRequest}
          pointerEvents={cancel ? "auto" : "none"}
        >
          {cancel ? (
            <FontAwesomeIcon
              icon={faDumpster}
              size={iconSize}
              color={iconColor}
            />
          ) : (
            <FontAwesomeIcon icon={faDumpster} size={iconSize} color={"gray"} />
          )}
        </Pressable>
        <Pressable
          style={{
            padding: 15,
          }}
          onPress={() => setDisplayFullTicket(true)}
        >
          <Text>Tracking {tracking ? "Available" : "Not available"}</Text>
        </Pressable>
        <Pressable
          style={{
            padding: 15,
          }}
          onPress={() => setDisplayFullTicket(true)}
        >
          <Text>Full ticket</Text>
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
        key={refNo}
        refNo={refNo}
        org={org}
        fromT={fromT}
        toT={toT}
        tracking={tracking}
        cancel={cancel}
      />
    </Pressable>
  );
};
