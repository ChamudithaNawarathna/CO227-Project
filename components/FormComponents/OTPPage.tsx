import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert, Pressable } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemedText } from "../CommonModules/ThemedText";
import { ThemedView } from "../CommonModules/ThemedView";
import { validateOTP } from "./FormFunctions";
import { FormInput } from "./FormInputField";
import { formStyles } from "./FormStyles";

export const OTPPage = ({
  otp,
  setOTP,
  nextAction,
  setNextVisible,
  setBackVisible,
  currentPos,
}: any) => {
  const { baseURL, phoneNo, email } = useAppContext();
  const [otpError, setOTPError] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isTimerPlaying, setIsTimerPlaying] = useState(true);
  const [keyVal, setKeyVal] = useState(0);

  // Make "Back" button visible and hide "Next" button
  useEffect(() => {
    setKeyVal(keyVal + 1);
    setIsTimerPlaying(true);
  }, [currentPos]);

  // Enable "Resend OTP" button
  function enableResendOTPButton() {
    setIsTimeOut(true);
    setIsTimerPlaying(false);
  }

  // Function to request OTP
  const requestOTP = async () => {
    try {
      const response = await axios.post(`${baseURL}/otp/request`, {
        data: { email, mobile: phoneNo, origin: "Verify email & mobile" },
      });
      if (response.status === 201) {
        Alert.alert("OTP sent", "Please check your email or mobile");
        setIsTimerPlaying(true);
        setKeyVal(keyVal + 1);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to request OTP");
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${baseURL}/otp/verify`, {
        data: { email, mobile: phoneNo, value: otp, origin: "Mobile" },
      });
      if (response.data.success) {
        Alert.alert("Success", "OTP verified successfully");
        nextAction();
      } else {
        Alert.alert("Failure", "Invalid OTP");
      }      
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to verify OTP");
    }
  };

  return (
    <GestureHandlerRootView>
      <ThemedView style={formStyles.timer}>
        <CountdownCircleTimer
          key={keyVal}
          isPlaying={isTimerPlaying}
          size={150}
          duration={180}
          colors={["#0cf", "#0cf", "#c33"]}
          colorsTime={[120, 60, 0]}
          onComplete={() => {
            enableResendOTPButton();
          }}
        >
          {({ remainingTime }) => <ThemedText>{remainingTime}</ThemedText>}
        </CountdownCircleTimer>
      </ThemedView>

      <FormInput
        title="Enter the OTP"
        input={otp}
        setInput={setOTP}
        error={otpError}
        setError={setOTPError}
        errorMessage={"Incorrect OTP"}
        validation={validateOTP}
        maxLength={6}
        keyboardType="number-pad"
        placeholder="000000"
      />
      {isTimeOut && !isTimerPlaying && (
        <Pressable
          style={formStyles.resendOTPButton}
          onPress={requestOTP}
          pointerEvents={"auto"}
        >
          <ThemedText type="subtitle" lightColor="#fff" darkColor="#fff">
            Resend OTP
          </ThemedText>
        </Pressable>
      )}
      {(!isTimeOut || isTimerPlaying) && (
        <Pressable
          style={formStyles.resendOTPButton}
          onPress={verifyOTP}
          pointerEvents={"auto"}
        >
          <ThemedText type="subtitle" lightColor="#fff" darkColor="#fff">
            Done
          </ThemedText>
        </Pressable>
      )}
    </GestureHandlerRootView>
  );
};
