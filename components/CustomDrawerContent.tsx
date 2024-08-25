import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Href, useRouter } from "expo-router";
import { getBackgroundColorAsync } from "expo-system-ui";
import { Pressable, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { accountType, useAppContext } from "@/context/AppContext";
import { Dropdown } from "react-native-element-dropdown";

export default function CustomDrawerContent(props: any) {
  const theme = useColorScheme() ?? "light";
  const iconColor = theme === "dark" ? "#eee" : "#777";
  const iconSize = 24;
  const router = useRouter();
  const { firstName, lasttName, accountType, setAccountType } = useAppContext();
  const dataList = [
    { label: "Passenger", value: "Passenger" as accountType },
    { label: "Bus employee", value: "Bus employee" as accountType },
    { label: "Bus owner", value: "Bus owner" as accountType },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ padding: 5 }}>
          <ThemedText type="h4" style={{ textAlign: "center" }}>
            {firstName} {lasttName}
          </ThemedText>
          <ThemedText
            type="s5"
            style={{ textAlign: "center" }}
            lightColor="#0bf"
            darkColor="#1ff"
          >
            {accountType} account
          </ThemedText>
          <Dropdown
            style={{
              backgroundColor: '#e28',
              borderWidth: 0,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginHorizontal: 5,
              marginVertical: 20,
              elevation: 3,
            }}
            placeholderStyle={{color: '#fff', textAlign: 'center'  }}
            data={dataList}
            labelField="label"
            valueField="value"
            placeholder={"Switch Account"}
            value={null}
            onChange={(item) => {
              setAccountType(item.value);
            }}
            itemContainerStyle={{backgroundColor: '#e28', margin: -1}}
            activeColor='#e28'
            itemTextStyle={{color: '#fff', textAlign: 'center'}}
            iconColor='#fff'
            selectedTextStyle={{color: '#fff', textAlign: 'center'}}
          />
        </View>
        <View
          style={{
            paddingTop: 5,
          }}
        >
          <DrawerItemList {...props} />
          <DrawerItem
            label={"Logout"}
            labelStyle={{ color: iconColor }}
            icon={() => (
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size={iconSize}
                color={iconColor}
              />
            )}
            onPress={() => router.replace("/")}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
