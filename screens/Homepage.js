import { KeyboardAvoidingView, Text, View, Image } from "react-native";
import { React, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import styles from "./styles/HomepageStyles";

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
      <View style={styles.header}>
        <Text style={styles.username}>{user.userName}</Text>
        <Image
          source={require("../assets/who_pokemon.jpg")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.scoresContainer}>
        <View style={styles.score}>
          <Text style={styles.dailyScoreLabel}>Daily Score</Text>
          <Text style={styles.dailyScoreValue}>342</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Food</Text>
            <Text style={styles.scoreValue}>99</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Transportation</Text>
            <Text style={styles.scoreValue}>129</Text>
          </View>
          <View style={[styles.score, { flex: 1 }]}>
            <Text style={styles.scoreLabel}>Energy</Text>
            <Text style={styles.scoreValue}>114</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Homepage;
