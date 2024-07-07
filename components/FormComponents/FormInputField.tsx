import React, { Dispatch, RefObject, SetStateAction } from "react";
import { TextInput , StyleSheet, useColorScheme, KeyboardTypeOptions } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Dropdown } from "react-native-element-dropdown";

type InputProps = {
    title: string;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    error?: boolean;
    setError?: Dispatch<SetStateAction<boolean>>;
    errorMessage?: string;
    keyboardType?: KeyboardTypeOptions;
    validation?: (input: string, setInput: Dispatch<SetStateAction<string>>, setError: Dispatch<SetStateAction<boolean>>) => void;
    maxLength?: number;
    placeholder?: string;
    nextFocus?: RefObject<TextInput>;
};

const defaultSetInput: Dispatch<SetStateAction<string>> = () => {};
const defaultSetError: Dispatch<SetStateAction<boolean>> = () => {};
const defaultValidation = (input: string, setInput: Dispatch<SetStateAction<string>>, setError: Dispatch<SetStateAction<boolean>>) => {
    setInput(input);
    setError(false);
};

export const FormInput = React.forwardRef<TextInput, InputProps>(({
    nextFocus = undefined,
    title = '', 
    input = '', 
    setInput = defaultSetInput , 
    error = false, 
    setError = defaultSetError, 
    errorMessage = '',
    keyboardType = 'default',
    validation = defaultValidation, 
    maxLength = 125, 
    placeholder = ''}, ref) => {
        const theme = useColorScheme() ?? 'light';
        return (
            <ThemedView style={styles.InputFieldContainer}>
                <ThemedText lightColor="#777" darkColor="#eee">{title}</ThemedText>
                <TextInput 
                    ref={ref}
                    returnKeyType='next'
                    style={[styles.inputField, error && {borderColor: 'red'}, theme === 'dark' && {backgroundColor: '#444', color: '#fff'}]}
                    value={input}
                    maxLength={maxLength}
                    keyboardType = {keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={theme === 'dark' ? '#bbb' : 'gray'}
                    onChangeText={(text) => validation(text, setInput, setError)}
                    onSubmitEditing={() => {nextFocus?.current?.focus()}}
                    pointerEvents={'auto'}/>
                <ThemedText style={[styles.formError, error && {color : 'red'}]}>{errorMessage}</ThemedText>
            </ThemedView>
        );
});

type DropdownProps = {
    title: string;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    dataList: {label: string, value: string}[];
    placeholder?: string;
};

export const FormDropdown = ({ 
    title = '', 
    input = '', 
    setInput = defaultSetInput , 
    dataList = [
        { label: 'item 1', value: '1' },
        { label: 'item 2', value: '2' },
        { label: 'item 3', value: '3' },
      ],
    placeholder = 'Select item'}: DropdownProps) => {
        const theme = useColorScheme() ?? 'light';
        return (
            <ThemedView style={styles.InputFieldContainer}>
                <ThemedText lightColor="#777" darkColor="#777">{title}</ThemedText>
                <ThemedView style={{backgroundColor: 'transparent', paddingBottom : 15}} pointerEvents={'auto'}>
                    <Dropdown 
                        style={styles.inputDropdown} 
                        placeholderStyle={[{color: 'gray'}, theme === 'dark' && {color: '#444'}]} 
                        data={dataList} 
                        labelField="label" 
                        valueField="value" 
                        placeholder={input == '' ? placeholder : input.valueOf()} 
                        value={input} 
                        onChange={item => {setInput(item.value);}} />
                </ThemedView>
            </ThemedView>
        );
};

const styles = StyleSheet.create({
    InputFieldContainer: {
        backgroundColor: 'transparent',
    },
    inputField: {
        width: 280,
        color: '#333',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        elevation: 3,
      },
      formError: {
        color: 'transparent',
        marginBottom: 5,
      },
      inputDropdown: {
        width: 280,
        color: '#333',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: -10,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 3,
      },
});
