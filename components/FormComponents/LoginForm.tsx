import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ThemedView } from "../CommonModules/ThemedView";
import {
  validateName,
  validatePhoneNo,
  validateNIC,
  validateOTP,
} from "./FormFunctions";
import { formStyles } from "./FormStyles";
import { FormInput } from "./FormInputField";
import React from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

/********************************************************** Personal Info Page ***********************************************************/

export const LogInFormPage1 = ({
  phoneNo,
  setPhoneNo,
  setNextVisible,
  setBackVisible,
  currentPos,
}: any) => {
  const theme = useColorScheme() ?? "light";
  const [phoneNoError, setPhoneNoError] = useState(false);
  const inputRefs = useRef(
    Array.from({ length: 3 }, () => React.createRef<TextInput>())
  );

  // Make "Next" button visible
  useEffect(() => {
    if (!phoneNoError && phoneNo != "") {
      setNextVisible(true);
    } else {
      setNextVisible(false);
    }
  }, [phoneNo, currentPos]);

  // Make "Back" button visible
  useEffect(() => {
    if (currentPos == 0) {
      setBackVisible(true);
    }
  }, [currentPos]);

  return (
    <GestureHandlerRootView style={{
      paddingVertical: 50
    }}>
      <FormInput
        ref={inputRefs.current[0]}
        title="Phone Number"
        input={phoneNo}
        setInput={setPhoneNo}
        error={phoneNoError}
        setError={setPhoneNoError}
        errorMessage={"Invalid phone number"}
        keyboardType="number-pad"
        validation={validatePhoneNo}
        maxLength={10}
        placeholder="Phone number"
      />
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, height: 2, backgroundColor: theme == "dark" ? "#ccc" : "#aaa" }} />
        <ThemedText type="h5" lightColor="#aaa" darkColor="#ccc">
          or
        </ThemedText>
        <View style={{ flex: 1, height: 2, backgroundColor: theme == "dark" ? "#ccc" : "#aaa" }} />
      </View>
      <View style={{ marginVertical: 30}}>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#fff", // Google Pay blue color
            borderRadius: 30,
            paddingVertical: 1,
            paddingHorizontal: 20,
            elevation: 5,
          }}
          onPress={() => {}}
        >
          <Image
            source={require("@/assets/icons/google.png")}
            style={styles.logo}
          />
          <ThemedText type="s5" lightColor="#000" darkColor="#000">
            Continue with Google
          </ThemedText>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};

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
