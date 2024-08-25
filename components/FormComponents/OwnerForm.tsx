import { Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ThemedView } from "../ThemedView";
import {
  validateName,
  validatePhoneNo,
  validateNIC,
  validateAccountNo,
  validateBankName,
  validateBranchName,
  validateOTP,
} from "./FormFunctions";
import { formStyles } from "./FormStyles";
import { FormInput } from "./FormInputField";
import React from "react";

/********************************************************** Personal Info Page ***********************************************************/

export const OwnerFormPage1 = ({
  fname,
  setFName,
  lname,
  setLName,
  phoneNo,
  setPhoneNo,
  nic,
  setNIC,
  setNextVisible,
  setBackVisible,
  currentPos,
}: any) => {
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [nicError, setNICError] = useState(false);
  const inputRefs = useRef(
    Array.from({ length: 4 }, () => React.createRef<TextInput>())
  );

  // Make "Next" button visible
  useEffect(() => {
    if (
      !fnameError &&
      !lnameError &&
      !phoneNoError &&
      !nicError &&
      fname != "" &&
      lname != "" &&
      phoneNo != "" &&
      nic != ""
    ) {
      setNextVisible(true);
    } else {
      setNextVisible(false);
    }
  }, [fname, lname, phoneNo, nic, currentPos]);

  // Make "Back" button visible
  useEffect(() => {
    if (currentPos == 300) {
      setBackVisible(true);
    }
  }, [currentPos]);

  return (
    <GestureHandlerRootView>
      <FormInput
        ref={inputRefs.current[0]}
        nextFocus={inputRefs.current[1]}
        title="First Name"
        input={fname}
        setInput={setFName}
        error={fnameError}
        setError={setFnameError}
        errorMessage={"Invalid first name"}
        validation={validateName}
        maxLength={256}
        placeholder="John"
      />
      <FormInput
        ref={inputRefs.current[1]}
        nextFocus={inputRefs.current[2]}
        title="Last Name"
        input={lname}
        setInput={setLName}
        error={lnameError}
        setError={setLnameError}
        errorMessage={"Invalid last name"}
        validation={validateName}
        maxLength={256}
        placeholder="Doe"
      />
      <FormInput
        ref={inputRefs.current[2]}
        nextFocus={inputRefs.current[3]}
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
      <FormInput
        ref={inputRefs.current[3]}
        title="NIC"
        input={nic}
        setInput={setNIC}
        error={nicError}
        setError={setNICError}
        errorMessage={"Invalid NIC"}
        validation={validateNIC}
        maxLength={12}
        placeholder="NIC"
      />
    </GestureHandlerRootView>
  );
};

/********************************************************** Bank Details Page ***********************************************************/

export const OwnerFormPage2 = ({
  accountNo,
  setAccountNo,
  accHolderName,
  setAccHolderName,
  bankName,
  setBankName,
  branchName,
  setBranchName,
  setNextVisible,
  setBackVisible,
  currentPos,
}: any) => {
  const [accNoError, setAccNoError] = useState(false);
  const [accHolderNameError, setAccHolderNameError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [branchNameError, setBranchNameError] = useState(false);
  const inputRefs = useRef(
    Array.from({ length: 4 }, () => React.createRef<TextInput>())
  );

  // Make "Next" button visible
  useEffect(() => {
    if (
      !accNoError &&
      !accHolderNameError &&
      !bankNameError &&
      !branchNameError &&
      accountNo != "" &&
      accHolderName != "" &&
      bankName != "" &&
      branchName != ""
    ) {
      setNextVisible(true);
    } else {
      setNextVisible(false);
    }
  }, [accountNo, bankName, branchName, currentPos]);

  // Make "Back" button visible
  useEffect(() => {
    if (currentPos == 600) {
      setBackVisible(true);
    }
  }, [currentPos]);

  return (
    <GestureHandlerRootView>
      <FormInput
        ref={inputRefs.current[0]}
        nextFocus={inputRefs.current[1]}
        title="Account No"
        input={accountNo}
        setInput={setAccountNo}
        error={accNoError}
        setError={setAccNoError}
        errorMessage={"Invalid account number"}
        validation={validateAccountNo}
        maxLength={12}
        placeholder="0000 0000 0000"
      />
      <FormInput
        ref={inputRefs.current[1]}
        nextFocus={inputRefs.current[2]}
        title="Name of Account Holder"
        input={accHolderName}
        setInput={setAccHolderName}
        error={accHolderNameError}
        setError={setAccHolderNameError}
        errorMessage={"Invalid name"}
        validation={validateName}
        maxLength={256}
        placeholder="Mr. John Doe"
      />
      <FormInput
        ref={inputRefs.current[2]}
        nextFocus={inputRefs.current[3]}
        title="Bank name"
        input={bankName}
        setInput={setBankName}
        error={bankNameError}
        setError={setBankNameError}
        errorMessage={"Invalid bank name"}
        validation={validateName}
        maxLength={256}
        placeholder="Bank name"
      />
      <FormInput
        ref={inputRefs.current[3]}
        title="Branch name"
        input={branchName}
        setInput={setBranchName}
        error={branchNameError}
        setError={setBranchNameError}
        errorMessage={"Invalid branch name"}
        validation={validateName}
        maxLength={256}
        placeholder="Branch name"
      />
    </GestureHandlerRootView>
  );
};

/**************************************************************** OTP Page *******************************************************************/

export const OwnerFormPage3 = ({
  otp,
  setOTP,
  nextAction,
  setNextVisible,
  setBackVisible,
  currentPos,
}: any) => {
  const [otpError, setOTPError] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isTimerPlaying, setIsTimerPlaying] = useState(true);
  const [keyVal, setKeyVal] = useState(0);

  // Make "Back" button visible and hide "Next" button
  useEffect(() => {
    if (currentPos == 900) {
      sendOTP();
      setBackVisible(true);
      setNextVisible(false);
    }
  }, [currentPos]);

  // Move forward if OTP is correct
  useEffect(() => {
    if (!otpError && otp != "") {
      nextAction();
    }
  }, [otp, otpError]);

  // Enable "Resend OTP" button
  function enableResendOTPButton() {
    setIsTimeOut(true);
    setIsTimerPlaying(false);
  }

  // Sends an OTP and starts the timer
  function sendOTP() {
    setIsTimerPlaying(true);
    setKeyVal(keyVal + 1);
    /*
      Send a new otp
    */
  }

  return (
    <GestureHandlerRootView>
      <ThemedView style={formStyles.timer}>
        <CountdownCircleTimer
          key={keyVal}
          isPlaying={isTimerPlaying}
          size={150}
          duration={120}
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
        placeholder="000 000"
      />
      {isTimeOut && !isTimerPlaying && (
        <Pressable
          style={formStyles.resendOTPButton}
          onPress={sendOTP}
          pointerEvents={"auto"}
        >
          <ThemedText type="subtitle" lightColor="#fff" darkColor="#fff">
            Resend OTP
          </ThemedText>
        </Pressable>
      )}
    </GestureHandlerRootView>
  );
};
