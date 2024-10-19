import { ThemedText } from "@/components/CommonModules/ThemedText";
import { ThemedView } from "@/components/CommonModules/ThemedView";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
// import { AllowedCardAuthMethodsType, AllowedCardNetworkType, GooglePay } from "react-native-google-pay";

type tokenizationSpecificationType = "PAYMENT_GATEWAY" | "DIRECT"; // Use the correct values based on your payment provider

// type RequestDataType = {
//   cardPaymentMethod: {
//     tokenizationSpecification: {
//       type: tokenizationSpecificationType; // It expects specific types, not just any string
//       gateway: string;
//       gatewayMerchantId: string;
//     };
//     allowedCardNetworks: AllowedCardNetworkType[];
//     allowedCardAuthMethods: AllowedCardAuthMethodsType[];
//   };
//   transaction: {
//     totalPrice: string;
//     totalPriceStatus: string;
//     currencyCode: string;
//   };
//   merchantName: string;
// };

export default function Recharge() {
  const theme = useColorScheme() ?? "light";
  const { credits } = useAppContext();

  //   useEffect(() => {
  //     // Initialize Google Pay
  //     GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST); // Use the test environment
  //   }, []);

  const handleGooglePayPress = async () => {
    // const requestData: RequestDataType = {
    //   cardPaymentMethod: {
    //     tokenizationSpecification: {
    //       type: "PAYMENT_GATEWAY", // This must match the expected literal type
    //       gateway: "example", // Replace with actual gateway like 'stripe', 'braintree'
    //       gatewayMerchantId: "your-merchant-id", // Your gateway's merchant ID
    //     },
    //     allowedCardNetworks: ["VISA", "MASTERCARD"], // Example card networks
    //     allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"], // Example methods
    //   },
    //   transaction: {
    //     totalPrice: "10.00",
    //     totalPriceStatus: "FINAL",
    //     currencyCode: "USD",
    //   },
    //   merchantName: "Example Merchant",
    // };
    // try {
    //   await GooglePay.requestPayment(requestData);
    //   alert("Google Pay success!");
    // } catch (error) {
    //   console.error("Google Pay failed", error);
    // }
  };

  return (
    <ThemedView style={styles.container}>
       <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            borderRadius: 20,
            paddingVertical: 3,
            paddingHorizontal: 5,
            marginHorizontal: "10%",
          }}
        >
          <ThemedText
            type={"h4"}
            lightColor={"#555"}
            darkColor={"#fff"}
            style={{ marginLeft: 5 }}
          >
            Balance: LKR {credits}
          </ThemedText>
        </View>
      <ThemedText type="h3">Google Pay Example</ThemedText>
      <View style={{ margin: 60 }}>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme == "dark" ? "#fff" : "#000", // Google Pay blue color
            borderRadius: 30,
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
          onPress={handleGooglePayPress}
        >
          <ThemedText type="h4" lightColor="#fff" darkColor="#000">
            Buy with
          </ThemedText>
          <Image
            source={require("@/assets/icons/google.png")}
            style={styles.logo}
          />
          <ThemedText type="h4" lightColor="#fff" darkColor="#000">
            Pay
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  googlePayButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000", // Google Pay blue color
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 22,
    height: 22,
    margin: 8,
  },
});
