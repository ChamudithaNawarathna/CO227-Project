import {
  Alert,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Href, router } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { useAppContext } from "@/context/AppContext";
import { ThemedText } from "@/components/CommonModules/ThemedText";
import { FormInput } from "@/components/FormComponents/FormInputField";
import {
  validateAccountNo,
  validateName,
  validateNIC,
} from "@/components/FormComponents/FormFunctions";
import calculateBirthday from "@/components/CommonModules/CalculateBirthday";
import axios from "axios";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
};

export default function SignupModal({ isVisible, onClose }: Props) {
  const {
    baseURL,
    id,
    fName,
    lName,
    phoneNo,
    email,
    nic,
    accountNo,
    accHolderName,
    bankName,
    branchName,
    ntcLicenseNo,
    driverLicenseNo,
    occupation,
    setNIC,
    setAccountNo,
    setAccHolderName,
    setBankName,
    setBranchName,
  } = useAppContext();
  const [nicError, setNICError] = useState(false);
  const [accNoError, setAccNoError] = useState(false);
  const [accHolderNameError, setAccHolderNameError] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [branchNameError, setBranchNameError] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRefs = useRef(
    Array.from({ length: 7 }, () => React.createRef<TextInput>())
  );

  //================================================ Functions ===============================================//

  // Update user data in the database and redirect to the correct dashboard
  const pressSubmit = () => {
    updateUserInfo();
    router.navigate("/(drawerOwn)/home/dashboard" as Href<string>);
    onClose();
  };

  //================================================ Backend Calls ===============================================//

  // Function to insert a new user
  const updateUserInfo = async () => {
    const userData = {
      userType: "owner",
      empType: occupation,
      fName: fName,
      lName: lName,
      email: email,
      phoneNo: phoneNo,
      nic: nic,
      birthday: calculateBirthday(nic),
      ntc: ntcLicenseNo,
      licence: driverLicenseNo,
      accName: accHolderName,
      accNo: accountNo,
      bank: bankName,
      branch: branchName,
      userID: id,
    };

    try {
      const response = await axios.post(`${baseURL}/users/req7`, {
        data: { userData },
      });

      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Failed to register user. Please try again.");
    }
  };

  //================================================ Use Effects ===============================================//

  // Check if all the fields are filled
  useEffect(() => {
    if (
      !nicError &&
      nic != "" &&
      !accNoError &&
      !accHolderNameError &&
      !bankNameError &&
      !branchNameError &&
      accountNo != "" &&
      accHolderName != "" &&
      bankName != "" &&
      branchName != ""
    ) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [nic, accHolderName, accountNo, bankName, branchName]);

  //================================================ UI Control ===============================================//

  return (
    <Modal isVisible={isVisible}>
      <GestureHandlerRootView style={styles.pageBody}>
        <Pressable style={styles.cancelIcon} onPress={onClose}>
          <FontAwesomeIcon icon={faXmark} size={32} color={"gray"} />
        </Pressable>
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
        <Pressable
          style={[
            styles.submitButton,
            filled && { backgroundColor: "#1eceda" },
          ]}
          disabled={!filled}
          onPress={pressSubmit}
        >
          <ThemedText type="subtitle" lightColor="#fff" darkColor="#fff">
            Sign Up
          </ThemedText>
        </Pressable>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pageBody: {
    flex: 1,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  titleContainer: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center",
  },
  cancelIcon: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  addButton: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#33aefc",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "gray",
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
  },
});
