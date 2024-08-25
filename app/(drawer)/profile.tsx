import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faArrowRight,
  faChevronRight,
  faC,
} from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { Ticket } from "@/controller/Ticket";
import { TicketView } from "@/components/TicketComponents/TicketView";

var passenger = false;
var employee = false;
var owner = true;
var fName = "John";
var lName = "Doe";
var phoneNo = "0767601948";

var occupation = "Driver";
var nic = "200100001111";
var driverLicenseNo = "898998898";
var nameOnLicense = "John Doe";
var ntcLicenseNo = "d-778998";

var accHolderName = "Mr. John Doe";
var accountNo = "1234 5678 0000 9876";
var bankName = "People's bank";
var branchName = "Peradeniya";

export default function Profile() {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 15;

  const credits = 500.25;

  return (
    <ThemedView style={styles.mainBody}>
      <ThemedView
        style={[
          styles.cardBody,
          {
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
            backgroundColor: theme === "dark" ? "#555" : "#fff",
          },
        ]}
      >
        <ThemedView
          style={[
            styles.cardBody,
            {
              flexDirection: "column",
              gap: 10,
              justifyContent: "space-around",
              backgroundColor: "transparent",
            },
          ]}
        >
          <ThemedText type={"s3"}>
            {fName} {lName}
          </ThemedText>
          <ThemedText type={"s4"}>Phone number: {phoneNo}</ThemedText>
          {(employee || owner) && (
            <ThemedText type={"s5"}>NIC: {nic}</ThemedText>
          )}
          {employee && (
            <ThemedText type={"s5"}>Works as: {occupation}</ThemedText>
          )}
          {employee && (
            <ThemedText type={"s5"}>
              NTC license number: {ntcLicenseNo}
            </ThemedText>
          )}
          {employee &&
            (occupation == "Driver" ||
              occupation == "Driver and Conductor") && (
              <ThemedText type={"s5"}>
                Name on the driver's license: {nameOnLicense}
              </ThemedText>
            )}
          {employee &&
            (occupation == "Driver" ||
              occupation == "Driver and Conductor") && (
              <ThemedText type={"s5"}>
                Driver's license number: {driverLicenseNo}
              </ThemedText>
            )}
          {owner && (
            <ThemedText type={"s5"}>Account holder: {accHolderName}</ThemedText>
          )}
          {owner && (
            <ThemedText type={"s5"}>Account number: {accountNo}</ThemedText>
          )}
          {owner && <ThemedText type={"s5"}>Bank name: {bankName}</ThemedText>}
          {owner && (
            <ThemedText type={"s5"}>Branch name: {branchName}</ThemedText>
          )}
        </ThemedView>
        {passenger && (
          <ThemedView
            style={[
              styles.cardBody,
              {
                flexDirection: "column",
                gap: 10,
                backgroundColor: "transparent",
              },
            ]}
          >
            <ThemedText type={"s3"}>Credits: Rs. {credits}</ThemedText>
            <Pressable
              style={styles.rechargeButton}
              onPress={() => router.replace("/index" as Href<string>)}
            >
              <ThemedText lightColor={iconColor} darkColor={iconColor}>
                RECHARGE
              </ThemedText>
            </Pressable>
          </ThemedView>
        )}
        {(employee || owner) && (
          <ThemedView
            style={[
              styles.cardBody,
              {
                flexDirection: "column",
                gap: 10,
                backgroundColor: "transparent",
              },
            ]}
          >
            <ThemedText type={"s3"}>Income: Rs. {credits}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    padding: 10,
    flex: 1,
  },
  rechargeButton: {
    alignItems: "center",
    backgroundColor: "#a8f5",
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  cardBody: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  cardHeader: {
    marginTop: 25,
    marginBottom: 5,
    marginHorizontal: 15,
    backgroundColor: "transparent",
  },
  ticketBody: {
    borderWidth: 0,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    backgroundColor: "#1cd7",
  },
  drawerHeader: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 10,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
});
