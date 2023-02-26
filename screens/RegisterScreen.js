import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./styles/AuthStyle"

const RegisterScreen = ({ navigation }) => {
  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Registration</Text>

      {/* Inputs View */}
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Full Name:</Text>
        <TextInput placeholder="Full Name" style={styles.input} />

        <Text style={styles.labelText}>Email:</Text>
        <TextInput placeholder="Email" style={styles.input} />

        <Text style={styles.labelText}>Username:</Text>
        <TextInput placeholder="Username" style={styles.input} />

        <Text style={styles.labelText}>Password:</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          // Obscures users' password
          secureTextEntry
        />
      </View>

      {/* Buttons View */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding")}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;