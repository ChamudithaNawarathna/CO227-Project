import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faArrowRight,
  faChevronRight,
  faC,
  faBars,
  faPhone,
  faIdCard,
  faSignature,
  faFileSignature,
  faPerson,
  faUserCircle,
  faBank,
  faDriversLicense,
  faListNumeric,
  faSortNumericAsc,
  faList12,
  faPalette,
  faN,
} from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
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
import { InfoCard } from "@/components/UIComponents/InfoCard";

var passenger = false;
var employee = true;
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
  const iconColor = theme === "dark" ? "#ddd" : "#777";
  const iconSize = 15;
  const {
    accountType,

    fName,
    lName,
    phoneNo,
    nic,
    accountNo,
    accHolderName,
    bankName,
    branchName,
    nameOnLicense,
    ntcLicenseNo,
    driverLicenseNo,
    occupation,
  } = useAppContext();

  const credits = 500.25;

  return (
    <ScreenWrapper>
      <View style={styles.mainBody}>
        <View style={{ alignItems: "center", marginBottom: 5 }}>
          <Image
            source={
              theme === "dark"
                ? require("@/assets/logos/logo_darkmode.png")
                : require("@/assets/logos/logo_darkmode.png")
            }
            style={styles.profileImage}
          />
          <ThemedText type={"s3"}>
            {fName} {lName}
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
            marginBottom: 30,
            borderRadius: 20,
            paddingVertical: 3,
            paddingHorizontal:  5,
            marginHorizontal: '10%',
          }}
        >
          <ThemedText type={"h4"} lightColor={"#555"} darkColor={"#fff"} style={{marginLeft: 5}}>Rs. {credits}</ThemedText>
          <Pressable
            style={[
              styles.rechargeButton,
              { borderColor: theme === "dark" ? "#fff" : "#666", borderWidth: 2, },
            ]}
            onPress={() => router.replace("/index" as Href<string>)}
          >
            <ThemedText type="h6" lightColor={"#666"} darkColor={"#fff"}>
              Recharge
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView
          style={
            {
              backgroundColor: 'transparent',
              marginHorizontal: 20,
            }
          }
        >
          <View>
            <View>
              <ThemedText
                type="h5"
                lightColor={iconColor}
                darkColor={iconColor}
                style={{ marginVertical: 20 }}
              >
                Personal Info
              </ThemedText>
              <InfoCard
                title="Phone Number"
                iconName={faPhone}
                info={phoneNo}
                iconColor={iconColor}
              />

              {owner && (
                <InfoCard
                  title="NIC"
                  iconName={faIdCard}
                  info={nic}
                  iconColor={iconColor}
                />
              )}

              <View
                style={{
                  height: 1,
                  backgroundColor: iconColor,
                  marginBottom: 15,
                }}
              />
            </View>
            {owner && (
              <View>
                <ThemedText
                  type="h5"
                  lightColor={iconColor}
                  darkColor={iconColor}
                  style={{ marginVertical: 20 }}
                >
                  Bank Info
                </ThemedText>
                <InfoCard
                  title="Bank"
                  iconName={faBank}
                  info={bankName}
                  iconColor={iconColor}
                />

                <InfoCard
                  title="Account Number"
                  iconName={faUserCircle}
                  info={accountNo}
                  iconColor={iconColor}
                />
                <InfoCard
                  title="Name"
                  iconName={faSignature}
                  info={accHolderName}
                  iconColor={iconColor}
                />
                {employee && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: iconColor,
                      marginVertical: 15,
                    }}
                  />
                )}
              </View>
            )}
            {employee && (
              <View>
                <ThemedText
                  type="h5"
                  lightColor={iconColor}
                  darkColor={iconColor}
                  style={{ marginVertical: 20 }}
                >
                  Licence Info
                </ThemedText>
                <InfoCard
                  title="Driver's license number"
                  iconName={faDriversLicense}
                  info={driverLicenseNo}
                  iconColor={iconColor}
                />

                <InfoCard
                  title="Name"
                  iconName={faSignature}
                  info={nameOnLicense}
                  iconColor={iconColor}
                />
                <InfoCard
                  title="NTC license number"
                  iconName={faN}
                  info={ntcLicenseNo}
                  iconColor={iconColor}
                />
                <InfoCard
                  title="Occupation"
                  iconName={faUser}
                  info={occupation}
                  iconColor={iconColor}
                />
              </View>
            )}
          </View>
        </ScrollView>
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
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  cardBody: {
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
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
    marginBottom: 12,
    backgroundColor: "#000",
  },
});
