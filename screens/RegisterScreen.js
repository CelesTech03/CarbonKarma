import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { React, useContext } from "react";
import styles from "./styles/LoginScreen";
import { auth, createUserDocument } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { addScore } from "../score";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { AuthContext } from "../AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth/react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "react-native-paper";

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
  const { colors } = useTheme();
  const { register } = useContext(AuthContext);

  // Firebase Signup
  function handleSignUp({ email, password, userName, fullName }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log("Resgistered with:", user.email);

        // Stores email, username, and fullname in Database
        return createUserDocument(user, { email, userName, fullName }).then(
          () => {
            console.log("User document created successfully");
            addScore();
            navigateToHomepage();
          }
        );
      })
      .catch((error) => alert(error.message));
  }

  // Ensures user data is loaded before navigating to homepage
  async function navigateToHomepage() {
    const user = await firebase.auth().currentUser;

    if (user) {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (snapshot.exists) {
        register();
      }
    }
  }

  return (
    // KeyboardAvoidingView = Prevents keyboard from blocking input fields
    <KeyboardAvoidingView style={styles.container}>
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
            <View style={styles.header}>
              <Text style={styles.text_header}>Register</Text>
            </View>

            {/* Inputs View */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Full Name
              </Text>
              <View style={styles.action}>
                <Feather name="user" color={colors.text} size={20} />
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#666666"
                  value={values.fullName}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  onChangeText={handleChange("fullName")}
                  // Tracks whether an input has been touched or not (for better UI/UX)
                  onBlur={() => setFieldTouched("fullName")}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                    marginTop: 20,
                  },
                ]}
              >
                Username
              </Text>
              <View style={styles.action}>
                <Feather name="user" color={colors.text} size={20} />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#666666"
                  value={values.userName}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  onChangeText={handleChange("userName")}
                  onBlur={() => setFieldTouched("userName")}
                />
                {touched.userName && errors.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                    marginTop: 20,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color={colors.text} size={20} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#666666"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  autoCapitalize={false}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                    marginTop: 20,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={colors.text} size={20} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#666666"
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
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                    marginTop: 20,
                  },
                ]}
              >
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={colors.text} size={20} />
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#666666"
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
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  /* Checks if form inputs are valid. If valid, user can click on create account. 
                If not button functionality is disabled and different background color */
                  //disabled={!isValid}
                  style={[
                    styles.signIn,
                    { backgroundColor: isValid ? "#00695C" : "#A7F1A8" },
                  ]}
                >
                  <LinearGradient
                    colors={["#08d4c4", "#00695C"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Create Account
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#00695C",
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#00695C",
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

// Gets device screen dimensions
const { height } = Dimensions.get("screen");
