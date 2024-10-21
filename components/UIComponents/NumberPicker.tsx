import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ThemedText } from "../CommonModules/ThemedText";

interface NumberPickerProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setValue(value - 1)}>
        <FontAwesomeIcon icon={faMinusCircle} size={20} color={"#b99"} />
      </Pressable>
      <ThemedText type={'h4'} style={styles.value}>{value}</ThemedText>
      <Pressable onPress={() => setValue(value + 1)}>
        <FontAwesomeIcon icon={faPlusCircle} size={20} color={"#b99"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b995",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  value: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});

export default NumberPicker;
