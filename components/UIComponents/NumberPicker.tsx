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
        <FontAwesomeIcon icon={faMinusCircle} size={32} color={"gray"} />
      </Pressable>
      <ThemedText type={'h5'} style={styles.value}>{value}</ThemedText>
      <Pressable onPress={() => setValue(value + 1)}>
        <FontAwesomeIcon icon={faPlusCircle} size={32} color={"gray"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginHorizontal: 20,
    fontSize: 20,
  },
});

export default NumberPicker;
