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
import {
  FormDropdown,
  FormInput,
} from "@/components/FormComponents/FormInputField";
import {
  validateLicenseNo,
  validateNIC,
  validateNTCNo,
} from "@/components/FormComponents/FormFunctions";
import calculateBirthday from "@/components/CommonModules/CalculateBirthday";
import axios from "axios";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
};

export default function OpeSignupModal({ isVisible, onClose }: Props) {
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
    setNTCLicenseNo,
    setDriverLicenseNo,
    setOccupation,
  } = useAppContext();
  const occupations = [
    { label: "Driver", value: "Driver" },
    { label: "Conductor", value: "Conductor" },
    { label: "Both", value: "Both" },
  ];
  const [nicError, setNICError] = useState(false);
  const [ntcError, setNTCError] = useState(false);
  const [licenseNoError, setLicenseNoError] = useState(false);
  const [filled, setFilled] = useState(false);
  const inputRefs = useRef(
    Array.from({ length: 4 }, () => React.createRef<TextInput>())
  );

  //================================================ Functions ===============================================//

  // Update user data in the database and redirect to the correct dashboard
  function pressSubmit() {
    updateUserInfo();
    router.navigate("/(drawerOpe)/home/dashboard" as Href<string>);
    onClose();
  }

  //================================================ Backend Calls ===============================================//

  // Function to insert a new user
  const updateUserInfo = async () => {
    const userData = {
      userType: "employee",
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
      !ntcError &&
      ntcLicenseNo != "" &&
      occupation != ""
    ) {
      if (occupation == "Conductor") {
        setFilled(true);
      } else if (!licenseNoError && driverLicenseNo != "") {
        setFilled(true);
      } else {
        setFilled(false);
      }
    } else {
      setFilled(false);
    }
  }, [nic, ntcLicenseNo, driverLicenseNo, occupation]);

  //================================================ UI Control ===============================================//

  return (
    <Modal isVisible={isVisible}>
      <GestureHandlerRootView style={styles.pageBody}>
        <Pressable style={styles.cancelIcon} onPress={onClose}>
          <FontAwesomeIcon icon={faXmark} size={32} color={"gray"} />
        </Pressable>
        <FormInput
          ref={inputRefs.current[0]}
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
        <FormDropdown
          title="Occupation"
          input={occupation}
          setInput={setOccupation}
          dataList={occupations}
          placeholder="Select occupation"
        />
        <FormInput
          ref={inputRefs.current[1]}
          nextFocus={inputRefs.current[2]}
          title="NTC License Number"
          input={ntcLicenseNo}
          setInput={setNTCLicenseNo}
          error={ntcError}
          setError={setNTCError}
          errorMessage={"Invalid NTC license number"}
          validation={validateNTCNo}
          maxLength={7}
          placeholder="A-00000"
        />
        {(occupation == "Driver" || occupation == "Both") && (
          <FormInput
            ref={inputRefs.current[2]}
            title="Driver's License Number"
            input={driverLicenseNo}
            setInput={setDriverLicenseNo}
            error={licenseNoError}
            setError={setLicenseNoError}
            errorMessage={"Invalid driver's license number"}
            validation={validateLicenseNo}
            maxLength={8}
            placeholder="A0000000"
          />
        )}
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
  submitButton: {
    alignItems: "center",
    backgroundColor: "gray",
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
  },
  footer: {
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
  },
});
