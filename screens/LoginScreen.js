import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import React from "react";
import styles from "./styles/AuthStyle"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Carbon Karma</Text>

      {/* Inputs View */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email:</Text>
        <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input} 
        required
        />
        <Text style={styles.labelText}>Password:</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          // Obscures users' password
          secureTextEntry
        />
      </View>

      {/* Buttons View */}
      <View style={styles.buttonContainer}>
        {/* TouchableOpacity = A wrapper for making views respond properly to touches */}
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")} onPressIn={this.validates}
        style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;