import {
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import { React, useState, useEffect } from "react";
import styles from "./styles/AuthStyle";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const db = firebase.firestore();

  // Fetches user data from the users collection in database using their uid (unique id)
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setUser(snapshot.data());
            }
          });
      }
    });
    return () => unsubscribe();
  }, []);

  // Displays loading screen while data is being fetched
  if (!user) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Text>Loading...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text>Welcome, {user.fullName}!</Text>
        <Text>Your username is: {user.userName}</Text>
        <Text>Score: 342</Text>  
      </View>
    </KeyboardAvoidingView>
  );
};

export default Homepage;
