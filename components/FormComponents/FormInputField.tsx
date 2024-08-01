import React, { Dispatch, RefObject, SetStateAction, useState } from "react";
import {
  TextInput,
  StyleSheet,
  useColorScheme,
  KeyboardTypeOptions,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const defaultSetInput: Dispatch<SetStateAction<string>> = () => {};
const defaultSetError: Dispatch<SetStateAction<boolean>> = () => {};
const defaultValidation = (
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<boolean>>
) => {
  setInput(input);
  setError(false);
};

type InputProps = {
  title: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  error?: boolean;
  setError?: Dispatch<SetStateAction<boolean>>;
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  validation?: (
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<boolean>>
  ) => void;
  maxLength?: number;
  placeholder?: string;
  nextFocus?: RefObject<TextInput>;
};

export const FormInput = React.forwardRef<TextInput, InputProps>(
  (
    {
      nextFocus = undefined,
      title = "",
      input = "",
      setInput = defaultSetInput,
      error = false,
      setError = defaultSetError,
      errorMessage = "",
      keyboardType = "default",
      validation = defaultValidation,
      maxLength = 125,
      placeholder = "",
    },
    ref
  ) => {
    const theme = useColorScheme() ?? "light";
    return (
      <ThemedView style={styles.InputFieldContainer}>
        <ThemedText lightColor="#777" darkColor="#eee">
          {title}
        </ThemedText>
        <TextInput
          ref={ref}
          returnKeyType="next"
          style={[
            styles.inputField,
            error && { borderColor: "red" },
            theme === "dark" && { backgroundColor: "#444", color: "#fff" },
          ]}
          value={input}
          maxLength={maxLength}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={theme === "dark" ? "#bbb" : "gray"}
          onChangeText={(text) => validation(text, setInput, setError)}
          onSubmitEditing={() => {
            nextFocus?.current?.focus();
          }}
          pointerEvents={"auto"}
        />
        <ThemedText style={[styles.formError, error && { color: "red" }]}>
          {errorMessage}
        </ThemedText>
      </ThemedView>
    );
  }
);

type DropdownProps = {
  title: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  dataList: { label: string; value: string }[];
  placeholder?: string;
};

export const FormDropdown = ({
  title = "",
  input = "",
  setInput = defaultSetInput,
  dataList = [
    { label: "item 1", value: "1" },
    { label: "item 2", value: "2" },
    { label: "item 3", value: "3" },
  ],
  placeholder = "Select item",
}: DropdownProps) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView style={styles.InputFieldContainer}>
      <ThemedText lightColor="#777" darkColor="#777">
        {title}
      </ThemedText>
      <ThemedView
        style={{ backgroundColor: "transparent", paddingBottom: 15 }}
        pointerEvents={"auto"}
      >
        <Dropdown
          style={styles.inputDropdown}
          placeholderStyle={[
            { color: "gray" },
            theme === "dark" && { color: "#444" },
          ]}
          data={dataList}
          labelField="label"
          valueField="value"
          placeholder={input == "" ? placeholder : input.valueOf()}
          value={input}
          onChange={(item) => {
            setInput(item.value);
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

type SearchProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  nextFocus?: RefObject<TextInput>;
  layer: number;
};

export const SearchInput = React.forwardRef<TextInput, SearchProps>(
  (
    {
      nextFocus = undefined,
      input = "",
      layer = 1,
      setInput = defaultSetInput,
      placeholder = "",
    },
    ref
  ) => {
    const theme = useColorScheme() ?? "light";
    const [filteredData, setFilteredData] = useState<string[]>([]);
    const data = [
      "Colombo",
      "Balangoda",
      "Kandy",
      "Peradeniya",
      "Matara",
      "Galle",
      "Jaffna",
    ];
    const updateSearch = (text: string) => {
      setInput(text);
      if (text === "") {
        setFilteredData([]);
      } else {
        setFilteredData(
          data.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
        );
      }
    };

    const selectLocation = (input: string) => {
      setInput(input);
      setFilteredData([]);
    };

    return (
      <ThemedView style={{ zIndex: layer, position: "relative" }}>
        <View
          style={[
            styles.searchInputContainer,
            theme === "dark" && {
              backgroundColor: "#444",
            },
          ]}
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            size={24}
            color={"gray"}
            style={{ marginRight: 7 }}
          />
          <TextInput
            ref={ref}
            returnKeyType="next"
            style={[styles.searchInput, theme === "dark" && { color: "#fff" }]}
            value={input}
            placeholder={placeholder}
            placeholderTextColor={theme === "dark" ? "#bbb" : "gray"}
            onChangeText={(text) => updateSearch(text)}
            onSubmitEditing={() => {
              nextFocus?.current?.focus();
            }}
            pointerEvents={"auto"}
          />
        </View>
        <FlatList
          style={styles.flatList}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ThemedView
              style={[
                styles.searchResult,
                theme === "dark" && {
                  backgroundColor: "#444",
                },
              ]}
            >
              <Pressable onPress={() => selectLocation(item)}>
                <ThemedText lightColor="#000" darkColor="#fff">
                  {item}
                </ThemedText>
              </Pressable>
            </ThemedView>
          )}
        />
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  InputFieldContainer: {
    backgroundColor: "transparent",
  },
  inputField: {
    width: 280,
    color: "#333",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    elevation: 3,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
    color: "#333",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  searchInput: {
    backgroundColor: "transparent",
    borderWidth: 0,
    width: 300,
  },
  flatList: {
    position: "absolute",
    top: 50, // Adjust this value based on the height of the search input
    left: 0,
    right: 0,
    marginHorizontal: 20,
    zIndex: 10,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  searchResult: {
    color: "#333",
    borderWidth: 2,
    borderColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    elevation: 3,
  },
  formError: {
    color: "transparent",
    marginBottom: 5,
  },
  inputDropdown: {
    width: 280,
    color: "#333",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: -10,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
});
