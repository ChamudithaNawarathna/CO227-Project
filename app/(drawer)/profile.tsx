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
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Ticket } from "@/controller/Ticket";
import { TicketView } from "@/components/UIComponents/TicketView";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAppContext } from "@/context/AppContext";
import { CreditCardView } from "@/components/UIComponents/CreditCardView";

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
  const { firstName, lasttName, accountType, setAccountType } = useAppContext();

  const credits = 500.25;

  return (
    <ScreenWrapper>
      <View style={styles.mainBody}>
        <View style={{alignItems: 'center', marginBottom: 50}}>
          <Image
            source={
              theme === "dark"
                ? require("@/assets/logos/logo_darkmode.png")
                : require("@/assets/logos/logo_darkmode.png")
            }
            style={styles.profileImage}
          />
          <ThemedText type={"s3"}>
            {firstName} {lasttName}
          </ThemedText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', marginBottom: 50}}>
        <ThemedText type={"s6"}>Credits: Rs. {credits}</ThemedText>
          <Pressable
            style={styles.rechargeButton}
            onPress={() => router.replace("/index" as Href<string>)}
          >
            <ThemedText lightColor={iconColor} darkColor={iconColor}>
              RECHARGE
            </ThemedText>
          </Pressable>
        </View>
        <CreditCardView ticket={new Ticket()}/>
        <ThemedView
          style={[
            styles.cardBody,
            {
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
              backgroundColor: theme === "dark" ? "#555d" : "#fff",
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
              <ThemedText type={"s5"}>
                Account holder: {accHolderName}
              </ThemedText>
            )}
            {owner && (
              <ThemedText type={"s5"}>Account number: {accountNo}</ThemedText>
            )}
            {owner && (
              <ThemedText type={"s5"}>Bank name: {bankName}</ThemedText>
            )}
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
      </View>
    </ScreenWrapper>
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
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 35,
    backgroundColor: '#000'
  },
});
