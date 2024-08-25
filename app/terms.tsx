import { Modal, Pressable, StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function Terms() {
  const theme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <ThemedView style={styles.pageBody} lightColor="#fff" darkColor="#222">
        <Pressable
          style={styles.cancelIcon}
          onPress={() => {
            closeModal();
          }}
        >
          <FontAwesomeIcon icon={faXmark} size={32} color={"gray"} />
        </Pressable>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="h3" lightColor="#33aefc" darkColor="#33aefc">
            Terms and Conditions
          </ThemedText>
        </ThemedView>
        <ThemedText>these are terms</ThemedText>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pageBody: {
    flex: 1,
    paddingHorizontal: 10,
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
});
