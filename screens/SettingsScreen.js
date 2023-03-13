import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React } from 'react'
import styles from "./styles/AuthStyle"

const SettingsScreen = ({ navigation }) =>  {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>This is the Settings page.</Text>    
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen