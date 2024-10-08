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
} from "react-native";
import StringToDate from "../CommonModules/StringToDateTime";
import { useAppContext } from "@/context/AppContext";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  refNo: string;
  org: string;
  fromT: string;
  toT: string;
  tracking: boolean;
  cancel: boolean;
};

const FullTicketView = ({
  isVisible,
  onClose,
  refNo,
  org,
  fromT,
  toT,
  tracking,
  cancel,
}: Props) => {
  const [ticket, setTicket] = useState<Ticket>();
  const [loading, setLoading] = useState(false);
  const { baseURL, myTickets, setMyTickets } = useAppContext();

  // Function to fetch recentTicket details by reference string
  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/tickets/tkt2`, {
        params: { refNo },
      });
      const ticket = new Ticket(
        response.data.ticketNo,
        StringToDate(response.data.issuedDate, response.data.issuedTime),
        response.data.vehicleNo, // Corrected typo
        org,
        response.data.type,
        response.data.routeNo,
        response.data.route,
        StringToDate(response.data.date, response.data.time),
        response.data.from,
        response.data.to,
        fromT,
        toT,
        response.data.distance,
        response.data.price,
        response.data.discount,
        response.data.unitPrice,
        response.data.transID,
        response.data.full,
        response.data.half,
        response.data.seatNos,
        response.data.status,
        tracking,
        cancel
      );
      const updatedTickets = new Map(myTickets);
      updatedTickets.set(refNo, ticket);
      setMyTickets(updatedTickets);
      setTicket(ticket);
    } catch (err) {
      console.error("Error fetching ticket details:", err); // Updated error message
      Alert.alert(
        "Error",
        "An error occurred while fetching the ticket details" // Updated error message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const existingTicket = myTickets ? myTickets.get(refNo) : undefined;

    // Only fetch details if the ticket does not already exist in myTickets
    if (!existingTicket) {
      fetchTicketDetails();
    } else {
      setTicket(existingTicket); // Set the existing ticket from myTickets
    }
  }, [refNo, org, fromT, toT, tracking, cancel, myTickets]);

  return (
    <Modal style={styles.container} isVisible={isVisible}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ticket ? (
        <View>
          <Pressable onPress={onClose}>
            <Text>Close</Text>
          </Pressable>
          <Text style={styles.header}>Ticket No: {ticket.ticketNo}</Text>
          <Text>Booked Time: {ticket.bookedTime?.toLocaleTimeString()}</Text>
          <Text>Vehicle No: {ticket.vehicalNo}</Text>
          <Text>Organization: {ticket.org}</Text>
          <Text>Type: {ticket.type}</Text>
          <Text>Route No: {ticket.routeNo}</Text>
          <Text>Route: {ticket.route}</Text>
          <Text>Date: {ticket.departure?.toLocaleDateString()}</Text>
          <Text>From: {ticket.from}</Text>
          <Text>To: {ticket.to}</Text>
          <Text>From Time: {ticket.fromT}</Text>
          <Text>To Time: {ticket.toT}</Text>
          <Text>Distance: {ticket.distance} km</Text>
          <Text>Price: ${ticket.price}</Text>
          <Text>Discount: {ticket.discount}%</Text>
          <Text>Unit Price: ${ticket.unitPrice}</Text>
          <Text>Transaction ID: {ticket.transID}</Text>
          <Text>Full Tickets: {ticket.full}</Text>
          <Text>Half Tickets: {ticket.half}</Text>
          <Text>Seat Nos: {ticket.seatNos}</Text>
          <Text>Status: {ticket.status}</Text>
          <Text>Tracking: {ticket.tracking ? "Enabled" : "Disabled"}</Text>
          <Text>Cancel: {ticket.cancel ? "Yes" : "No"}</Text>
        </View>
      ) : (
        <View>
          <Pressable onPress={onClose}>
            <Text>Close</Text>
          </Pressable>
          <Text>Nothing to show here</Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default FullTicketView;
