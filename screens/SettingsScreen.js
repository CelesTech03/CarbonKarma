import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { React, useContext } from 'react'
import styles from "./styles/AuthStyle"

import { auth } from "../config/firebase"
import { signOut } from "firebase/auth/react-native";

import { AuthContext } from "../AuthContext";
import { resetScore } from "../score";

const SettingsScreen = ({ navigation }) =>  {

  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        resetScore();
        logOut();
        console.log("Sign out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
      onPress = {handleLogOut}
      style = {{width: '20%', height: 50,  borderWidth: 1}}>
        <Text style={{textAlign: 'center'}}>Log out</Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default SettingsScreen