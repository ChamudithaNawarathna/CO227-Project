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
import { LineChart, ruleTypes } from "react-native-gifted-charts";
import { LineGraph } from "@/components/UIComponents/LineGraph";
import { StringDate } from "@/components/CommonModules/StringDateTime";

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

const today = new Date();

type PointerItem = {
  date: string;
  value: number;
};

export default function Analytics() {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#ddd" : "#777";
  const income30 = [
    {
      value: 15100,
      date: "10 Apr 2022",
      label: "10 Apr",
    },
    {
      value: 11100,
      date: "11 Apr 2022",
    },
    {
      value: 19000,
      date: "12 Apr 2022",
    },
    {
      value: 15100,
      date: "13 Apr 2022",
    },
    {
      value: 14100,
      date: "14 Apr 2022",
    },
    {
      value: 15100,
      date: "15 Apr 2022",
      label: "15 Apr",
    },
    {
      value: 11100,
      date: "16 Apr 2022",
    },
    {
      value: 19000,
      date: "17 Apr 2022",
    },
    {
      value: 20100,
      date: "18 Apr 2022",
    },
    {
      value: 14100,
      date: "19 Apr 2022",
    },
    {
      value: 15100,
      date: "20 Apr 2022",
      label: "20 Apr",
    },
    {
      value: 11100,
      date: "21 Apr 2022",
    },
    {
      value: 19000,
      date: "22 Apr 2022",
    },
    {
      value: 30100,
      date: "23 Apr 2022",
    },
    {
      value: 14100,
      date: "24 Apr 2022",
    },
    {
      value: 15100,
      date: "25 Apr 2022",
      label: "25 Apr",
    },
    {
      value: 11100,
      date: "26 Apr 2022",
    },
    {
      value: 28000,
      date: "26 Apr 2022",
    },
    {
      value: 12100,
      date: "27 Apr 2022",
    },
    {
      value: 9100,
      date: "27 Apr 2022",
    },
    {
      value: 8100,
      date: "28 Apr 2022",
      label: "28 Apr",
    },
    {
      value: 23100,
      date: "29 Apr 2022",
    },
    {
      value: 13000,
      date: "30 Apr 2022",
    },
    {
      value: 27100,
      date: "31 Apr 2022",
    },
    {
      value: 14100,
      date: "1 May 2022",
    },
    {
      value: 12100,
      date: "2 May 2022",
      label: "2 May",
    },
    {
      value: 1100,
      date: "3 May 2022",
    },
    {
      value: 19000,
      date: "4 May 2022",
    },
    {
      value: 23100,
      date: "5 May 2022",
    },
    {
      value: 14100,
      date: "6 May 2022",
    },
    {
      value: 16100,
      date: "7 May 2022",
      label: "7 May",
    },
    {
      value: 7100,
      date: "8 May 2022",
    },
    {
      value: 19000,
      date: "9 May 2022",
    },
    {
      value: 21100,
      date: "10 May 2022",
    },
  ];

  const incomeYear = [
    {
      value: 1260000,
      date: "11 Jan 2022",
      label: "Jan",
    },
    {
      value: 2500000,
      date: "12 Feb 2022",
      label: "Feb",
    },
    {
      value: 895000,
      date: "13 Mar 2022",
      label: "Mar",
    },
    {
      value: 2370000,
      date: "14 Apr 2022",
      label: "Apr",
    },
    {
      value: 3090000,
      date: "15 May 2022",
      label: "May",
    },
    {
      value: 1430000,
      date: "16 Jun 2022",
      label: "Jun",
    },
    {
      value: 1630000,
      date: "16 Jul 2022",
      label: "Jul",
    },
    {
      value: 5130000,
      date: "16 Aug 2022",
      label: "Aug",
    },
    {
      value: 7630000,
      date: "16 Sep 2022",
      label: "Sep",
    },
    {
      value: 1130000,
      date: "16 Oct 2022",
      label: "Oct",
    },
    {
      value: 2630000,
      date: "16 Nov 2022",
      label: "Nov",
    },
    {
      value: 8630000,
      date: "16 Dec 2022",
      label: "Dec",
    },
  ];

  const income7 = [
    {
      value: 12600,
      date: "11 Apr 2022",
      label: "11 Apr",
    },
    {
      value: 25000,
      date: "12 Apr 2022",
      label: "12 Apr",
    },
    {
      value: 8950,
      date: "13 Apr 2022",
      label: "13 Apr",
    },
    {
      value: 23700,
      date: "14 Apr 2022",
      label: "14 Apr",
    },
    {
      value: 30900,
      date: "15 Apr 2022",
      label: "15 Apr",
    },
    {
      value: 16300,
      date: "16 Apr 2022",
      label: "16 Apr",
    },
  ];

  const ptData = [
    { value: 160, date: "1 Apr 2022" },
    { value: 180, date: "2 Apr 2022" },
    { value: 190, date: "3 Apr 2022" },
    { value: 180, date: "4 Apr 2022" },
    { value: 140, date: "5 Apr 2022" },
    { value: 145, date: "6 Apr 2022" },
    { value: 160, date: "7 Apr 2022" },
    { value: 200, date: "8 Apr 2022" },

    { value: 220, date: "9 Apr 2022" },
    {
      value: 240,
      date: "10 Apr 2022",
      label: "10 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 280, date: "11 Apr 2022" },
    { value: 260, date: "12 Apr 2022" },
    { value: 340, date: "13 Apr 2022" },
    { value: 385, date: "14 Apr 2022" },
    { value: 280, date: "15 Apr 2022" },
    { value: 390, date: "16 Apr 2022" },

    { value: 370, date: "17 Apr 2022" },
    { value: 285, date: "18 Apr 2022" },
    { value: 295, date: "19 Apr 2022" },
    {
      value: 300,
      date: "20 Apr 2022",
      label: "20 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 280, date: "21 Apr 2022" },
    { value: 295, date: "22 Apr 2022" },
    { value: 260, date: "23 Apr 2022" },
    { value: 255, date: "24 Apr 2022" },

    { value: 190, date: "25 Apr 2022" },
    { value: 220, date: "26 Apr 2022" },
    { value: 205, date: "27 Apr 2022" },
    { value: 230, date: "28 Apr 2022" },
    { value: 210, date: "29 Apr 2022" },
    {
      value: 200,
      date: "30 Apr 2022",
      label: "30 Apr",
      labelTextStyle: { color: "lightgray", width: 60 },
    },
    { value: 240, date: "1 May 2022" },
    { value: 250, date: "2 May 2022" },
    { value: 280, date: "3 May 2022" },
    { value: 250, date: "4 May 2022" },
    { value: 210, date: "5 May 2022" },
  ];
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
    <View style={styles.mainBody}>
      <ScrollView
        style={{
          backgroundColor: "transparent",
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <ThemedText
            type="h4"
            style={{ marginTop: 25, marginBottom: 10, marginHorizontal: 5 }}
          >
            Income (7 days)
          </ThemedText>
          <LineGraph
            input={income7}
            lineColorDark="#0f8"
            lineColorLight="#0d8"
            startColorDark="#0f8"
            startColorLight="#0d8"
            endColorDark="#0f8"
            endColorLight="#0d8"
            xSpacing={55}
            xLabelWidth={90}
            yLabelWidth={45}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <ThemedText
            type="h4"
            style={{ marginTop: 25, marginBottom: 10, marginHorizontal: 5 }}
          >
            Income (30 days)
          </ThemedText>
          <LineGraph
            input={income30}
            lineColorDark="#fa8"
            lineColorLight="#f98"
            startColorDark="#fa8"
            startColorLight="#f98"
            endColorDark="#fa8"
            endColorLight="#fa8"
            xSpacing={9}
            xLabelWidth={50}
            yLabelWidth={45}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <ThemedText
            type="h4"
            style={{ marginTop: 25, marginBottom: 10, marginHorizontal: 5 }}
          >
            Income (Year)
          </ThemedText>
          <LineGraph
            input={incomeYear}
            lineColorDark="#f4f"
            lineColorLight="#f1f"
            startColorDark="#f4f"
            startColorLight="#f1f"
            endColorDark="#f4f"
            endColorLight="#f4f"
            xSpacing={27}
            xLabelWidth={50}
            yLabelWidth={45}
          />
        </View>
      </ScrollView>
    </View>
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
