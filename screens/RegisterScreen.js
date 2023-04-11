import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import styles from "./styles/AuthStyle";
import { auth, createUserDocument } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

// Formik validation schema: https://formik.org/docs/guides/validation
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  userName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8)
    .required("Required")
    .matches(
      // Regex for strong password validation
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_]).{8,}$/,
      "Must contain minimum 8 characters, at least one uppercase letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password")], "Your passwords do not match.")
    .required("Required"),
});

const RegisterScreen = () => {
  const navigation = useNavigation();

  // Firebase Signup
  function handleSignUp({ email, password, userName, fullName }) {
    auth
      // Creates new user
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("FirstCity");
        console.log("Resgistered with:", user.email);
        // Stores email, username, and fullname in Database
        return createUserDocument(user, { email, userName, fullName });
      })
      .then(() => {
        console.log("User document created successfully");
      })
      .catch((error) => alert(error.message));
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Formik
        initialValues={{
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          setFieldTouched,
          handleSubmit,
        }) => (
          <>
            <Text style={styles.title}>Registration</Text>

            {/* Inputs View */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Full Name:</Text>
              <TextInput
                placeholder="Full Name"
                value={values.fullName}
                style={styles.input}
                onChangeText={handleChange("fullName")}
                // Tracks whether an input has been touched or not (for better UI/UX)
                onBlur={() => setFieldTouched("fullName")}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <Text style={styles.labelText}>Username:</Text>
              <TextInput
                placeholder="Username"
                value={values.userName}
                style={styles.input}
                onChangeText={handleChange("userName")}
                onBlur={() => setFieldTouched("userName")}
              />
              {touched.userName && errors.userName && (
                <Text style={styles.errorText}>{errors.userName}</Text>
              )}

              <Text style={styles.labelText}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                autoCapitalize={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.labelText}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                autoCapitalize={false}
                // Obscures users' password
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Text style={styles.labelText}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
                autoCapitalize={false}
                // Obscures users' password
                secureTextEntry={true}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Buttons View */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                /* Checks if form inputs are valid. If valid, user can click on create account. 
                If not button functionality is disabled and different background color */
                disabled={!isValid}
                style={[
                  styles.button,
                  { backgroundColor: isValid ? "#00695C" : "#A7F1A8" },
                ]}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
