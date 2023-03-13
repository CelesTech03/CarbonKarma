import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React } from 'react'
import styles from "./styles/AuthStyle"

const HistoryScreen = ({ navigation }) =>  {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>This is the History page.</Text>    
    </KeyboardAvoidingView>
  );
};

export default HistoryScreen