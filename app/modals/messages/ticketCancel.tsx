import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text , StyleSheet, GestureResponderEvent, Pressable} from "react-native";
import Modal from "react-native-modal";


type Props = {
    isVisible: boolean;
    onClose: (event: GestureResponderEvent) => void;
    refNo: string;
        billingDate: string;
        billingTime: string;
        cancelDate: string;
        cancelTime: string;
        duration: string;
        amount: string;
        refund: string;
}

export const TicketCancelModal = ({
    isVisible, onClose, refNo, billingTime, billingDate, cancelDate, cancelTime, duration, amount, refund
  }: Props) => {
 return ( <Modal isVisible={isVisible} style={styles.resultContainer}>
     <Pressable style={styles.cancelIcon} onPress={onClose}>
          <FontAwesomeIcon icon={faXmark} size={32} color={"gray"} />
        </Pressable>
    <Text style={styles.resultText}>Refund Details:</Text>
    <Text>Ticket RefNo: {refNo}</Text>
    <Text>Billing Date: {billingDate}</Text>
    <Text>Billing Time: {billingTime}</Text>
    <Text>Cancel Date: {cancelDate}</Text>
    <Text>Cancel Time: {cancelTime}</Text>
    <Text>Duration: {duration}</Text>
    <Text>Amount: LKR {amount}</Text>
    <Text>Refund: LKR {refund}</Text>
  </Modal>)
  }

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    resultContainer: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },cancelIcon: {
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: "row",
        alignSelf: "flex-end",
      },
  });
  
  